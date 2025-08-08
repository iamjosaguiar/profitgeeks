import { type NextRequest, NextResponse } from "next/server"

// Hash function for server-side data
async function hashData(data: string): Promise<string> {
  if (!data) return ""

  const encoder = new TextEncoder()
  const dataBuffer = encoder.encode(data.toLowerCase().trim())
  const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}

// Get location data from IP address with multiple services
async function getLocationFromIP(ip: string) {
  console.log(`🌍 Testing location lookup for IP: ${ip}`)

  const services = [
    {
      name: "ip-api.com",
      url: `http://ip-api.com/json/${ip}?fields=status,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org`,
      parser: (data: any) => {
        if (data.status === "success") {
          return {
            country: data.countryCode?.toLowerCase() || "",
            state: data.region?.toLowerCase() || "",
            city: data.city?.toLowerCase() || "",
            zip: data.zip || "",
            timezone: data.timezone || "",
            isp: data.isp || "",
            org: data.org || "",
            raw: data,
          }
        }
        return null
      },
    },
    {
      name: "ipapi.co",
      url: `https://ipapi.co/${ip}/json/`,
      parser: (data: any) => {
        if (data.country_code) {
          return {
            country: data.country_code?.toLowerCase() || "",
            state: data.region?.toLowerCase() || "",
            city: data.city?.toLowerCase() || "",
            zip: data.postal || "",
            timezone: data.timezone || "",
            isp: data.org || "",
            raw: data,
          }
        }
        return null
      },
    },
  ]

  const results = []

  for (const service of services) {
    try {
      console.log(`🔍 Testing ${service.name}...`)
      const response = await fetch(service.url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; FacebookConversionAPI/1.0)",
        },
      })

      if (!response.ok) {
        console.log(`❌ ${service.name} returned status: ${response.status}`)
        results.push({
          service: service.name,
          success: false,
          error: `HTTP ${response.status}`,
        })
        continue
      }

      const data = await response.json()
      console.log(`📍 ${service.name} raw response:`, data)

      const parsed = service.parser(data)
      if (parsed) {
        console.log(`✅ ${service.name} successfully parsed:`, parsed)
        results.push({
          service: service.name,
          success: true,
          data: parsed,
        })
      } else {
        console.log(`⚠️ ${service.name} could not parse data`)
        results.push({
          service: service.name,
          success: false,
          error: "Could not parse response",
          raw_data: data,
        })
      }
    } catch (error) {
      console.log(`❌ ${service.name} failed:`, error)
      results.push({
        service: service.name,
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      })
    }
  }

  return results
}

export async function GET(request: NextRequest) {
  console.log("🧪 Testing IP and location detection...")

  // Enhanced IP address detection
  const forwardedFor = request.headers.get("x-forwarded-for")
  const realIp = request.headers.get("x-real-ip")
  const cfConnectingIp = request.headers.get("cf-connecting-ip")
  const xClientIp = request.headers.get("x-client-ip")
  // NextRequest doesn't have a typed "ip" property; use headers only
  const requestIp: string | null = null

  let clientIp = cfConnectingIp || realIp || xClientIp || forwardedFor || requestIp

  if (clientIp && clientIp.includes(",")) {
    clientIp = clientIp.split(",")[0].trim()
  }

  console.log("🌐 IP Detection Results:", {
    "x-forwarded-for": forwardedFor,
    "x-real-ip": realIp,
    "cf-connecting-ip": cfConnectingIp,
    "x-client-ip": xClientIp,
    "request.ip": requestIp,
    final_ip: clientIp,
  })

  // Test location services
  const locationResults = await getLocationFromIP(clientIp || "8.8.8.8")

  // Find the best result
  const successfulResult = locationResults.find((r) => r.success)
  let hashedLocationData = null

  if (successfulResult && successfulResult.data) {
    const locationData = successfulResult.data
    hashedLocationData = {
      country: locationData.country ? await hashData(locationData.country) : null,
      state: locationData.state ? await hashData(locationData.state) : null,
      city: locationData.city ? await hashData(locationData.city) : null,
      zip: locationData.zip ? await hashData(locationData.zip) : null,
    }
    console.log("🔐 Hashed location data:", hashedLocationData)
  }

  // Simulate what would be added to Facebook payload
  const mockUserData: Record<string, any> = {
    client_ip_address: clientIp,
    client_user_agent: request.headers.get("user-agent"),
    fbp: "fb.2.1754365105701.409089013916559384", // Mock fbp
  }

  if (hashedLocationData) {
    if (hashedLocationData.country) mockUserData.country = [hashedLocationData.country]
    if (hashedLocationData.state) mockUserData.st = [hashedLocationData.state]
    if (hashedLocationData.city) mockUserData.ct = [hashedLocationData.city]
    if (hashedLocationData.zip) mockUserData.zp = [hashedLocationData.zip]
  }

  console.log("📋 Mock Facebook user_data that would be sent:", mockUserData)

  return NextResponse.json({
    success: true,
    ip_detection: {
      headers: {
        "x-forwarded-for": forwardedFor,
        "x-real-ip": realIp,
        "cf-connecting-ip": cfConnectingIp,
        "x-client-ip": xClientIp,
        "request.ip": requestIp,
      },
      final_ip: clientIp,
    },
    location_services_test: locationResults,
    best_location_data: successfulResult?.data || null,
    hashed_location: hashedLocationData,
    mock_facebook_payload: mockUserData,
    data_quality_score: {
      has_ip: !!clientIp,
      has_user_agent: !!request.headers.get("user-agent"),
      has_location: !!successfulResult,
      total_fields: Object.keys(mockUserData).length,
      location_source: successfulResult?.service || "none",
    },
  })
}
