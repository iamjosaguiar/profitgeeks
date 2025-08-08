import { type NextRequest, NextResponse } from "next/server"

// Use environment variables for security
const FACEBOOK_PIXEL_ID = process.env.FACEBOOK_PIXEL_ID || "1158109325837009"
const FACEBOOK_ACCESS_TOKEN =
  process.env.FACEBOOK_ACCESS_TOKEN ||
  "EACDJFc9I9pIBPGAtvLoo4XH0AS4vOkzoPjTt69AUGvjxh9qd1pAsd7ieUboMVk3zRRHlgaXJM9W1E1NY9ETKlZAgJ5lMu1KTeKkvMvumrN4DcjVLnTl9a2zDjUoZB7J3nLq1ZCjNwGxpW2W610kw9vLkS46BMZCKP3fgWuHOZC1r1OGTSPoZCB1dZABLVvjeQZDZD"

// Hash function for server-side data
async function hashData(data: string): Promise<string> {
  if (!data) return ""

  const encoder = new TextEncoder()
  const dataBuffer = encoder.encode(data.toLowerCase().trim())
  const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}

// Get location data from IP address with multiple fallback services
async function getLocationFromIP(ip: string) {
  console.log(`🌍 Attempting to get location for IP: ${ip}`)

  // Try multiple IP geolocation services for better accuracy
  const services = [
    {
      name: "ip-api.com",
      url: `http://ip-api.com/json/${ip}?fields=status,country,countryCode,region,regionName,city,zip,lat,lon,timezone`,
      parser: (data: any) => {
        if (data.status === "success") {
          return {
            country: data.countryCode?.toLowerCase() || "",
            state: data.region?.toLowerCase() || "",
            city: data.city?.toLowerCase() || "",
            zip: data.zip || "",
            timezone: data.timezone || "",
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
            raw: data,
          }
        }
        return null
      },
    },
  ]

  for (const service of services) {
    try {
      console.log(`🔍 Trying ${service.name} for IP geolocation...`)
      const response = await fetch(service.url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; FacebookConversionAPI/1.0)",
        },
      })

      if (!response.ok) {
        console.log(`❌ ${service.name} returned status: ${response.status}`)
        continue
      }

      const data = await response.json()
      console.log(`📍 ${service.name} raw response:`, data)

      const parsed = service.parser(data)
      if (parsed) {
        console.log(`✅ ${service.name} successfully parsed location:`, parsed)
        return parsed
      } else {
        console.log(`⚠️ ${service.name} could not parse location data`)
      }
    } catch (error) {
      console.log(`❌ ${service.name} failed:`, error)
      continue
    }
  }

  console.log("❌ All IP geolocation services failed, using fallback")
  return null
}

export async function POST(request: NextRequest) {
  console.log("🚀 Facebook Conversion API Route Called")

  try {
    const payload = await request.json()
    console.log("📦 Received payload:", JSON.stringify(payload, null, 2))

    // Validate payload structure
    if (!payload.data || !Array.isArray(payload.data) || payload.data.length === 0) {
      console.error("❌ Invalid payload structure:", payload)
      return NextResponse.json({ error: "Invalid payload structure" }, { status: 400 })
    }

    // Validate that we have the required credentials
    if (!FACEBOOK_PIXEL_ID || !FACEBOOK_ACCESS_TOKEN) {
      console.error("❌ Missing Facebook credentials")
      return NextResponse.json({ error: "Missing Facebook credentials" }, { status: 500 })
    }

    console.log("✅ Using Pixel ID:", FACEBOOK_PIXEL_ID)
    console.log("✅ Access Token length:", FACEBOOK_ACCESS_TOKEN.length)

    // Enhanced IP address detection
    const forwardedFor = request.headers.get("x-forwarded-for")
    const realIp = request.headers.get("x-real-ip")
    const cfConnectingIp = request.headers.get("cf-connecting-ip")
    const xClientIp = request.headers.get("x-client-ip")
    // NextRequest doesn't expose a typed remote IP; rely on headers only
    const requestIp: string | null = null

    console.log("🌐 IP Detection Debug:", {
      "x-forwarded-for": forwardedFor,
      "x-real-ip": realIp,
      "cf-connecting-ip": cfConnectingIp,
      "x-client-ip": xClientIp,
      "request.ip": requestIp,
    })

    let clientIp = cfConnectingIp || realIp || xClientIp || forwardedFor || requestIp

    if (clientIp && clientIp.includes(",")) {
      clientIp = clientIp.split(",")[0].trim()
    }

    console.log("🌐 Final client IP:", clientIp)

    // Get location data from IP
    let locationData = null
    if (clientIp && clientIp !== "127.0.0.1" && clientIp !== "::1") {
      locationData = await getLocationFromIP(clientIp)
      if (locationData) {
        console.log("📍 Successfully retrieved location data:", locationData)
      } else {
        console.log("⚠️ Could not retrieve location data for IP:", clientIp)
      }
    } else {
      console.log("⚠️ Invalid or local IP address, skipping geolocation:", clientIp)
    }

    // Enhance each event with server-side data
    for (let eventIndex = 0; eventIndex < payload.data.length; eventIndex++) {
      const event = payload.data[eventIndex]
      console.log(`📋 Processing event ${eventIndex + 1}:`, event.event_name)

      if (event.user_data) {
        // Add client IP if available
        if (clientIp) {
          event.user_data.client_ip_address = clientIp
          console.log(`✅ Added IP address: ${clientIp}`)
        }

        // Add location data from IP if we don't have it already and we successfully got location data
        if (locationData) {
          // Only add if not already present and we have valid data
          if (!event.user_data.country && locationData.country) {
            event.user_data.country = [await hashData(locationData.country)]
            console.log(`✅ Added country from IP: ${locationData.country} (raw) -> [HASHED]`)
          }

          if (!event.user_data.st && locationData.state) {
            event.user_data.st = [await hashData(locationData.state)]
            console.log(`✅ Added state from IP: ${locationData.state} (raw) -> [HASHED]`)
          }

          if (!event.user_data.ct && locationData.city) {
            event.user_data.ct = [await hashData(locationData.city)]
            console.log(`✅ Added city from IP: ${locationData.city} (raw) -> [HASHED]`)
          }

          if (!event.user_data.zp && locationData.zip) {
            event.user_data.zp = [await hashData(locationData.zip)]
            console.log(`✅ Added zip from IP: ${locationData.zip} (raw) -> [HASHED]`)
          }
        } else {
          console.log("⚠️ No location data available to enhance event")
        }

        // Count available identifiers
        const hasEmail = event.user_data.em && event.user_data.em.length > 0
        const hasPhone = event.user_data.ph && event.user_data.ph.length > 0
        const hasFbp = event.user_data.fbp
        const hasFbc = event.user_data.fbc
        const hasIp = event.user_data.client_ip_address
        const hasUserAgent = event.user_data.client_user_agent
        const hasExternalId = event.user_data.external_id && event.user_data.external_id.length > 0
        const hasCountry = event.user_data.country && event.user_data.country.length > 0
        const hasState = event.user_data.st && event.user_data.st.length > 0
        const hasCity = event.user_data.ct && event.user_data.ct.length > 0
        const hasZip = event.user_data.zp && event.user_data.zp.length > 0

        // Log comprehensive data summary
        console.log(`📊 Event ${eventIndex + 1} complete data summary:`, {
          event_name: event.event_name,
          event_id: event.event_id,
          pixel_id: FACEBOOK_PIXEL_ID,
          // Identity data
          has_email: hasEmail,
          has_phone: hasPhone,
          has_fbp: hasFbp,
          has_fbc: hasFbc,
          has_external_id: hasExternalId,
          // Technical data
          has_ip: hasIp,
          has_user_agent: hasUserAgent,
          ip_address: hasIp ? clientIp : "MISSING",
          user_agent_length: hasUserAgent ? event.user_data.client_user_agent.length : 0,
          // Location data
          has_country: hasCountry,
          has_state: hasState,
          has_city: hasCity,
          has_zip: hasZip,
          location_source: locationData ? "IP_LOOKUP" : "NOT_AVAILABLE",
          location_raw: locationData ? `${locationData.city}, ${locationData.state}, ${locationData.country}` : "N/A",
          // Demographics
          has_first_name: !!(event.user_data.fn && event.user_data.fn.length > 0),
          has_last_name: !!(event.user_data.ln && event.user_data.ln.length > 0),
          has_gender: !!(event.user_data.ge && event.user_data.ge.length > 0),
          has_birth_date: !!(event.user_data.db && event.user_data.db.length > 0),
          // Total score
          total_identifiers: [
            hasEmail,
            hasPhone,
            hasFbp,
            hasFbc,
            hasExternalId,
            hasIp && hasUserAgent,
            hasCountry,
            hasState,
            hasCity,
            hasZip,
          ].filter(Boolean).length,
        })

        // Enhanced validation
        const viewEvents = ["PageView", "ViewContent", "Search", "AddToCart", "InitiateCheckout"]
        const isViewEvent = viewEvents.includes(event.event_name)

        if (isViewEvent) {
          const hasMinimalData = hasFbp || hasFbc || (hasIp && hasUserAgent) || hasExternalId || hasEmail
          if (!hasMinimalData) {
            console.warn(`⚠️ View event ${event.event_name} has very limited data - may have low match rate`)
          } else {
            console.log(`✅ View event ${event.event_name} has sufficient data for processing`)
          }
        } else {
          if (!hasEmail && !hasPhone && !hasExternalId) {
            console.warn(`⚠️ Conversion event ${event.event_name} lacks strong identifiers - may be rejected`)
          } else {
            console.log(`✅ Conversion event ${event.event_name} has strong identifiers`)
          }
        }

        // Log the complete user_data object structure (without exposing hashed values)
        console.log(`📋 Complete user_data structure for event ${eventIndex + 1}:`, {
          client_ip_address: event.user_data.client_ip_address,
          client_user_agent: event.user_data.client_user_agent
            ? `[${event.user_data.client_user_agent.length} chars]`
            : undefined,
          fbp: event.user_data.fbp,
          fbc: event.user_data.fbc,
          em: event.user_data.em ? `[HASHED EMAIL]` : undefined,
          ph: event.user_data.ph ? `[HASHED PHONE]` : undefined,
          fn: event.user_data.fn ? `[HASHED FIRST NAME]` : undefined,
          ln: event.user_data.ln ? `[HASHED LAST NAME]` : undefined,
          country: event.user_data.country ? `[HASHED COUNTRY]` : undefined,
          st: event.user_data.st ? `[HASHED STATE]` : undefined,
          ct: event.user_data.ct ? `[HASHED CITY]` : undefined,
          zp: event.user_data.zp ? `[HASHED ZIP]` : undefined,
          ge: event.user_data.ge ? `[HASHED GENDER]` : undefined,
          db: event.user_data.db ? `[HASHED DOB]` : undefined,
          external_id: event.user_data.external_id ? `[HASHED EXTERNAL ID]` : undefined,
        })
      }
    }

    // Send to Facebook Conversion API
    const facebookUrl = `https://graph.facebook.com/v18.0/${FACEBOOK_PIXEL_ID}/events?access_token=${FACEBOOK_ACCESS_TOKEN}`
    console.log("🌐 Sending to Facebook URL:", facebookUrl.replace(FACEBOOK_ACCESS_TOKEN, "***TOKEN***"))
    console.log("📤 Final payload being sent:", JSON.stringify(payload, null, 2))

    // Log the actual data being sent to Facebook (after all enhancements)
    console.log("🔍 DETAILED PAYLOAD ANALYSIS:")
    payload.data.forEach((event: any, index: number) => {
      console.log(`\n📋 Event ${index + 1} - ${event.event_name}:`)
      console.log(`  Event ID: ${event.event_id}`)
      console.log(`  Event Time: ${event.event_time}`)
      console.log(`  Source URL: ${event.event_source_url}`)

      console.log(`  📊 User Data Fields:`)
      const userData = event.user_data || {}

      // Technical identifiers
      console.log(`    🔧 Technical:`)
      console.log(`      IP Address: ${userData.client_ip_address || "MISSING"}`)
      console.log(
        `      User Agent: ${userData.client_user_agent ? `${userData.client_user_agent.substring(0, 50)}...` : "MISSING"}`,
      )
      console.log(`      Facebook Browser ID (fbp): ${userData.fbp || "MISSING"}`)
      console.log(`      Facebook Click ID (fbc): ${userData.fbc || "MISSING"}`)

      // Personal identifiers
      console.log(`    👤 Personal:`)
      console.log(`      Email: ${userData.em ? "PRESENT (hashed)" : "MISSING"}`)
      console.log(`      Phone: ${userData.ph ? "PRESENT (hashed)" : "MISSING"}`)
      console.log(`      First Name: ${userData.fn ? "PRESENT (hashed)" : "MISSING"}`)
      console.log(`      Last Name: ${userData.ln ? "PRESENT (hashed)" : "MISSING"}`)
      console.log(`      External ID: ${userData.external_id ? "PRESENT (hashed)" : "MISSING"}`)

      // Location data
      console.log(`    📍 Location:`)
      console.log(`      Country: ${userData.country ? "PRESENT (hashed)" : "MISSING"}`)
      console.log(`      State: ${userData.st ? "PRESENT (hashed)" : "MISSING"}`)
      console.log(`      City: ${userData.ct ? "PRESENT (hashed)" : "MISSING"}`)
      console.log(`      Zip: ${userData.zp ? "PRESENT (hashed)" : "MISSING"}`)

      // Demographics
      console.log(`    🎂 Demographics:`)
      console.log(`      Gender: ${userData.ge ? "PRESENT (hashed)" : "MISSING"}`)
      console.log(`      Birth Date: ${userData.db ? "PRESENT (hashed)" : "MISSING"}`)

      // Custom data
      if (event.custom_data) {
        console.log(`  💰 Custom Data:`)
        Object.entries(event.custom_data).forEach(([key, value]) => {
          console.log(`      ${key}: ${value}`)
        })
      }

      // Data quality score
      const totalFields = Object.keys(userData).length
      const identifierFields = [
        userData.em,
        userData.ph,
        userData.fbp,
        userData.fbc,
        userData.external_id,
        userData.client_ip_address && userData.client_user_agent,
        userData.country,
        userData.st,
        userData.ct,
        userData.zp,
      ].filter(Boolean).length

      console.log(`  📈 Data Quality Score: ${identifierFields}/${totalFields} fields present`)
      console.log(
        `  🎯 Match Rate Prediction: ${identifierFields >= 3 ? "HIGH" : identifierFields >= 2 ? "MEDIUM" : "LOW"}`,
      )
    })

    const facebookResponse = await fetch(facebookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    const responseData = await facebookResponse.json()
    console.log("📥 Facebook Response Status:", facebookResponse.status)
    console.log("📥 Facebook Response Data:", JSON.stringify(responseData, null, 2))

    // Enhanced response analysis
    if (responseData.events_received) {
      console.log("✅ Facebook confirmed events received:", responseData.events_received)
    }

    if (responseData.messages && responseData.messages.length > 0) {
      console.log("📋 Facebook messages:")
      responseData.messages.forEach((message: any, index: number) => {
        console.log(`  Message ${index + 1}:`, JSON.stringify(message, null, 2))

        if (message.message) {
          if (message.message.includes("Insufficient customer information")) {
            console.log("💡 Tip: Facebook needs more customer identifiers. Current data quality may be low.")
          }
          if (message.message.includes("Invalid")) {
            console.log("💡 Tip: Check data format - phone numbers, emails, etc.")
          }
          if (message.message.includes("duplicate")) {
            console.log("💡 Tip: Event may be duplicate - check event_id uniqueness")
          }
        }
      })
    }

    if (responseData.fbtrace_id) {
      console.log("🔍 Facebook trace ID:", responseData.fbtrace_id)
    }

    if (!facebookResponse.ok) {
      console.error("Facebook API Error:", {
        status: facebookResponse.status,
        statusText: facebookResponse.statusText,
        data: responseData,
        pixel_id: FACEBOOK_PIXEL_ID,
      })

      return NextResponse.json(
        {
          error: "Facebook API Error",
          details: responseData,
          status: facebookResponse.status,
        },
        { status: facebookResponse.status },
      )
    }

    // Log successful events with enhanced details
    console.log("Facebook Conversion API Success:", {
      pixel_id: FACEBOOK_PIXEL_ID,
      events_received: responseData.events_received,
      messages: responseData.messages,
      client_ip_used: clientIp,
      location_enhanced: !!locationData,
      location_details: locationData
        ? `${locationData.city}, ${locationData.state}, ${locationData.country}`
        : "Not available",
    })

    return NextResponse.json({
      success: true,
      events_received: responseData.events_received,
      messages: responseData.messages,
      client_ip_used: clientIp,
      location_enhanced: !!locationData,
      location_details: locationData
        ? `${locationData.city}, ${locationData.state}, ${locationData.country}`
        : "Not available",
    })
  } catch (error) {
    console.error("Facebook Conversion API Route Error:", error)
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
