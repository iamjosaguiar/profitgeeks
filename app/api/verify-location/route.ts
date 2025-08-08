import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  console.log("🔍 VERIFYING REAL-TIME LOCATION DETECTION")

  // Get IP address
  const forwardedFor = request.headers.get("x-forwarded-for")
  const realIp = request.headers.get("x-real-ip")
  const cfConnectingIp = request.headers.get("cf-connecting-ip")
  const xClientIp = request.headers.get("x-client-ip")
  // NextRequest doesn't expose a typed "ip"; rely on headers
  const requestIp: string | null = null

  let clientIp = cfConnectingIp || realIp || xClientIp || forwardedFor || requestIp

  if (clientIp && clientIp.includes(",")) {
    clientIp = clientIp.split(",")[0].trim()
  }

  console.log("🌐 Detected IP:", clientIp)

  // Test multiple IP geolocation services with FULL raw responses
  const services = [
    {
      name: "ip-api.com",
      url: `http://ip-api.com/json/${clientIp}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query`,
    },
    {
      name: "ipapi.co",
      url: `https://ipapi.co/${clientIp}/json/`,
    },
    {
      name: "ipinfo.io",
      url: `https://ipinfo.io/${clientIp}/json`,
    },
  ]

  const results = []

  for (const service of services) {
    try {
      console.log(`🔍 Testing ${service.name} with IP: ${clientIp}`)
      console.log(`📡 URL: ${service.url}`)

      const startTime = Date.now()
      const response = await fetch(service.url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; LocationVerification/1.0)",
          Accept: "application/json",
        },
      })
      const endTime = Date.now()

      console.log(`⏱️ ${service.name} response time: ${endTime - startTime}ms`)
      console.log(`📊 ${service.name} status: ${response.status}`)

      if (!response.ok) {
        console.log(`❌ ${service.name} HTTP error: ${response.status} ${response.statusText}`)
        results.push({
          service: service.name,
          success: false,
          error: `HTTP ${response.status}: ${response.statusText}`,
          response_time_ms: endTime - startTime,
          url: service.url,
        })
        continue
      }

      const rawData = await response.json()
      console.log(`📍 ${service.name} RAW RESPONSE:`, JSON.stringify(rawData, null, 2))

      results.push({
        service: service.name,
        success: true,
        raw_response: rawData,
        response_time_ms: endTime - startTime,
        url: service.url,
        parsed_location: {
          country: rawData.country || rawData.countryCode || "N/A",
          region: rawData.region || rawData.regionName || "N/A",
          city: rawData.city || "N/A",
          zip: rawData.zip || rawData.postal || "N/A",
          isp: rawData.isp || rawData.org || "N/A",
          timezone: rawData.timezone || "N/A",
        },
      })
    } catch (error) {
      console.error(`❌ ${service.name} error:`, error)
      results.push({
        service: service.name,
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        url: service.url,
      })
    }
  }

  // Also test with a known IP for comparison
  console.log("🧪 Testing with known Google DNS IP (8.8.8.8) for comparison...")
  try {
    const googleResponse = await fetch("http://ip-api.com/json/8.8.8.8")
    const googleData = await googleResponse.json()
    console.log("📍 Google DNS (8.8.8.8) location:", googleData)
    results.push({
      service: "ip-api.com (Google DNS test)",
      success: true,
      raw_response: googleData,
      note: "This should show Mountain View, CA, US - used for comparison",
    })
  } catch (error) {
    console.log("❌ Google DNS test failed:", error)
  }

  // Show what would actually be sent to Facebook
  const bestResult = results.find((r) => r.success && r.parsed_location)
  let facebookPayload = null

  if (bestResult && bestResult.parsed_location) {
    // This is what would actually be hashed and sent to Facebook
    facebookPayload = {
      original_ip: clientIp,
      detected_location: bestResult.parsed_location,
      would_be_hashed: {
        country: bestResult.parsed_location.country?.toLowerCase(),
        state: bestResult.parsed_location.region?.toLowerCase(),
        city: bestResult.parsed_location.city?.toLowerCase(),
        zip: bestResult.parsed_location.zip,
      },
      source_service: bestResult.service,
    }
  }

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    your_ip: clientIp,
    ip_headers: {
      "x-forwarded-for": forwardedFor,
      "x-real-ip": realIp,
      "cf-connecting-ip": cfConnectingIp,
      "x-client-ip": xClientIp,
      "request.ip": requestIp,
    },
    location_service_results: results,
    facebook_payload_preview: facebookPayload,
    verification_notes: [
      "This shows REAL API responses from multiple services",
      "Compare your results with the Google DNS test (should be Mountain View, CA)",
      "If multiple services show the same location, it's definitely real",
      "The 'raw_response' field shows the unmodified API response",
    ],
  })
}
