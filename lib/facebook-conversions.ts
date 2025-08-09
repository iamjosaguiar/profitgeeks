interface FacebookUserData {
  em?: string[] // email (hashed)
  ph?: string[] // phone (hashed)
  fn?: string[] // first name (hashed)
  ln?: string[] // last name (hashed)
  ct?: string[] // city (hashed)
  st?: string[] // state (hashed)
  zp?: string[] // zip code (hashed)
  country?: string[] // country (hashed)
  db?: string[] // date of birth (hashed)
  ge?: string[] // gender (hashed)
  external_id?: string[] // external ID (hashed)
  fb_login_id?: string // Facebook login ID (not hashed per FB spec)
  client_ip_address?: string
  client_user_agent?: string
  fbc?: string // Facebook click ID
  fbp?: string // Facebook browser ID
}

interface FacebookCustomData {
  currency?: string
  value?: string | number
  content_type?: string
  content_ids?: string[]
  content_name?: string
  content_category?: string
  num_items?: number
  search_string?: string
  status?: string
  subscription_id?: string
  [key: string]: any
}

interface FacebookEventData {
  event_name: string
  event_time: number
  action_source: "website" | "email" | "app" | "phone_call" | "chat" | "physical_store" | "system_generated" | "other"
  user_data: FacebookUserData
  custom_data?: FacebookCustomData
  event_source_url?: string
  opt_out?: boolean
  event_id?: string
}

interface FacebookConversionPayload {
  data: FacebookEventData[]
}

// Hash function for PII data
async function hashData(data: string): Promise<string> {
  if (!data) return ""

  // Normalize the data
  let normalized = data.toLowerCase().trim()

  // Remove spaces and special characters for phone numbers
  if (data.includes("+") || data.includes("(") || data.includes(")") || data.includes("-")) {
    normalized = data.replace(/\D/g, "")
  }

  // Use Web Crypto API to hash
  const encoder = new TextEncoder()
  const dataBuffer = encoder.encode(normalized)
  const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")

  return hashHex
}

// Get Facebook browser ID from cookie
function getFacebookBrowserId(): string | undefined {
  if (typeof document === "undefined") return undefined

  // Try to get existing fbp cookie
  const fbpCookie = document.cookie.split("; ").find((row) => row.startsWith("_fbp="))
  if (fbpCookie) {
    return fbpCookie.split("=")[1]
  }

  // Check if Facebook Pixel has set the fbp in a different way
  if (typeof window !== "undefined" && (window as any).fbq && (window as any).fbq.getState) {
    try {
      const state = (window as any).fbq.getState()
      if (state && state.pixels && state.pixels.length > 0) {
        const pixel = state.pixels[0]
        if (pixel.userData && pixel.userData.fbp) {
          return pixel.userData.fbp
        }
      }
    } catch (e) {
      // Ignore errors accessing Facebook Pixel state
    }
  }

  return undefined
}

// Get Facebook click ID from URL or cookie
function getFacebookClickId(): string | undefined {
  if (typeof window === "undefined") return undefined

  // Check URL parameter first
  const urlParams = new URLSearchParams(window.location.search)
  const fbclid = urlParams.get("fbclid")
  if (fbclid) return `fb.1.${Date.now()}.${fbclid}`

  // Check cookie
  const fbcCookie = document.cookie.split("; ").find((row) => row.startsWith("_fbc="))
  return fbcCookie ? fbcCookie.split("=")[1] : undefined
}

// Generate a browser fingerprint as fallback identifier
function generateBrowserFingerprint(): string {
  if (typeof window === "undefined") return ""

  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")
  if (ctx) {
    ctx.textBaseline = "top"
    ctx.font = "14px Arial"
    ctx.fillText("Browser fingerprint", 2, 2)
  }

  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    screen.width + "x" + screen.height,
    new Date().getTimezoneOffset(),
    canvas.toDataURL(),
  ].join("|")

  // Create a simple hash
  let hash = 0
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32-bit integer
  }

  return `fp_${Math.abs(hash).toString(36)}_${Date.now()}`
}

// Check if we have sufficient data for Facebook's requirements
function hasSufficientData(eventName: string, userData: FacebookUserData): boolean {
  const hasEmail = userData.em && userData.em[0]
  const hasPhone = userData.ph && userData.ph[0]
  const hasFbp = userData.fbp
  const hasFbc = userData.fbc
  const hasExternalId = userData.external_id && userData.external_id[0]

  // Facebook requires at least ONE of these strong identifiers
  const strongIdentifiers = [hasEmail, hasPhone, hasFbp, hasFbc, hasExternalId].filter(Boolean)

  // For conversion events, we definitely need strong identifiers
  const conversionEvents = ["Lead", "Purchase", "CompleteRegistration", "Subscribe", "StartTrial"]
  if (conversionEvents.includes(eventName)) {
    return strongIdentifiers.length > 0
  }

  // For view events, we still need at least one strong identifier
  return strongIdentifiers.length > 0
}

// Send event to Facebook Conversion API
export async function sendFacebookConversionEvent(
  eventName: string,
  userData: {
    email?: string
    phone?: string
    firstName?: string
    lastName?: string
    city?: string
    state?: string
    zipCode?: string
    country?: string
    dateOfBirth?: string // YYYY-MM-DD format
    gender?: "m" | "f" | "male" | "female"
    externalId?: string
    facebookLoginId?: string
  } = {},
  customData?: FacebookCustomData,
  eventId?: string,
): Promise<boolean> {
  try {
    // Hash PII data
    const hashedUserData: FacebookUserData = {}

    if (userData.email) {
      hashedUserData.em = [await hashData(userData.email)]
    }

    if (userData.phone) {
      // Clean phone number and format for international (no leading plus)
      const cleanPhone = userData.phone.replace(/\D/g, "")
      const phoneWithCountry = cleanPhone.startsWith("1") ? cleanPhone : `1${cleanPhone}`
      if (phoneWithCountry.length >= 10) {
        hashedUserData.ph = [await hashData(phoneWithCountry)]
      }
    }

    if (userData.firstName) {
      hashedUserData.fn = [await hashData(userData.firstName)]
    }

    if (userData.lastName) {
      hashedUserData.ln = [await hashData(userData.lastName)]
    }

    if (userData.city) {
      hashedUserData.ct = [await hashData(userData.city)]
    }

    if (userData.state) {
      hashedUserData.st = [await hashData(userData.state)]
    }

    if (userData.zipCode) {
      hashedUserData.zp = [await hashData(userData.zipCode)]
    }

    if (userData.country) {
      hashedUserData.country = [await hashData(userData.country)]
    }

    if (userData.dateOfBirth) {
      // Format: YYYYMMDD
      const dobFormatted = userData.dateOfBirth.replace(/-/g, "")
      hashedUserData.db = [await hashData(dobFormatted)]
    }

    if (userData.gender) {
      // Normalize gender to single character
      const genderNormalized = userData.gender.toLowerCase().charAt(0)
      hashedUserData.ge = [await hashData(genderNormalized)]
    }

    if (userData.externalId) {
      hashedUserData.external_id = [await hashData(userData.externalId)]
    }

    // Facebook Login ID (not hashed)
    if (userData.facebookLoginId) {
      hashedUserData.fb_login_id = userData.facebookLoginId
    }

    // Add browser data
    if (typeof window !== "undefined") {
      hashedUserData.client_user_agent = navigator.userAgent

      const fbp = getFacebookBrowserId()
      if (fbp) {
        hashedUserData.fbp = fbp
      }

      const fbc = getFacebookClickId()
      if (fbc) {
        hashedUserData.fbc = fbc
      }

      // If we don't have fbp or fbc, generate a browser fingerprint as external_id
      if (!fbp && !fbc && !userData.email && !userData.phone && !userData.externalId) {
        const fingerprint = generateBrowserFingerprint()
        hashedUserData.external_id = [await hashData(fingerprint)]
      }
    }

    // Check if we have sufficient data
    if (!hasSufficientData(eventName, hashedUserData)) {
      console.log(`Skipping Facebook ${eventName} event - insufficient customer data`, {
        has_email: !!(hashedUserData.em && hashedUserData.em[0]),
        has_phone: !!(hashedUserData.ph && hashedUserData.ph[0]),
        has_fbp: !!hashedUserData.fbp,
        has_fbc: !!hashedUserData.fbc,
        has_external_id: !!(hashedUserData.external_id && hashedUserData.external_id[0]),
        event_name: eventName,
      })
      return false
    }

    // Create event data
    const eventData: FacebookEventData = {
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      action_source: "website",
      user_data: hashedUserData,
      event_source_url: typeof window !== "undefined" ? window.location.href : undefined,
      event_id: eventId || `${eventName}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    }

    if (customData) {
      eventData.custom_data = customData
    }

    const payload: FacebookConversionPayload = {
      data: [eventData],
    }

    console.log("Sending Facebook event:", {
      event_name: eventName,
      has_email: !!(hashedUserData.em && hashedUserData.em[0]),
      has_phone: !!(hashedUserData.ph && hashedUserData.ph[0]),
      has_fbp: !!hashedUserData.fbp,
      has_fbc: !!hashedUserData.fbc,
      has_external_id: !!(hashedUserData.external_id && hashedUserData.external_id[0]),
      has_first_name: !!(hashedUserData.fn && hashedUserData.fn[0]),
      has_last_name: !!(hashedUserData.ln && hashedUserData.ln[0]),
      has_city: !!(hashedUserData.ct && hashedUserData.ct[0]),
      has_state: !!(hashedUserData.st && hashedUserData.st[0]),
      has_zip: !!(hashedUserData.zp && hashedUserData.zp[0]),
      has_country: !!(hashedUserData.country && hashedUserData.country[0]),
      has_dob: !!(hashedUserData.db && hashedUserData.db[0]),
      has_gender: !!(hashedUserData.ge && hashedUserData.ge[0]),
      user_data_keys: Object.keys(hashedUserData),
    })

    console.log("🔄 About to send to API route...")
    // Log what we're sending from client-side BEFORE server enhancement
    console.log("📤 Client-side data being sent (before server enhancement):")
    console.log("  📊 User Data Summary:")
    console.log(`    Email: ${hashedUserData.em ? "PRESENT" : "MISSING"}`)
    console.log(`    Phone: ${hashedUserData.ph ? "PRESENT" : "MISSING"}`)
    console.log(`    First Name: ${hashedUserData.fn ? "PRESENT" : "MISSING"}`)
    console.log(`    Last Name: ${hashedUserData.ln ? "PRESENT" : "MISSING"}`)
    console.log(`    Facebook Browser ID: ${hashedUserData.fbp ? "PRESENT" : "MISSING"}`)
    console.log(`    Facebook Click ID: ${hashedUserData.fbc ? "PRESENT" : "MISSING"}`)
    console.log(`    External ID: ${hashedUserData.external_id ? "PRESENT" : "MISSING"}`)
    console.log(`    User Agent: ${hashedUserData.client_user_agent ? "PRESENT" : "MISSING"}`)
    console.log("  📍 Location data will be enhanced server-side from IP address")
    console.log("  🔧 Server will add: IP address, country, state, city, zip code")
    console.log("📋 Final payload:", JSON.stringify(payload, null, 2))

    // Send to our API route
    const response = await fetch("/api/facebook-conversions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    console.log("📡 API Route Response Status:", response.status)
    console.log("📡 API Route Response Headers:", Object.fromEntries(response.headers.entries()))

    const responseText = await response.text()
    console.log("📡 Raw API Route Response:", responseText)

    if (!response.ok) {
      console.error("❌ Facebook Conversion API error:", responseText)
      console.error("❌ Response status:", response.status)
      return false
    }

    let result
    try {
      result = JSON.parse(responseText)
    } catch (e) {
      console.error("❌ Failed to parse response as JSON:", responseText)
      return false
    }

    console.log("✅ Facebook Conversion API success:", result)
    console.log("✅ Events received by Facebook:", result.events_received)
    console.log("✅ Facebook messages:", result.messages)

    return true
  } catch (error) {
    console.error("Facebook Conversion API error:", error)
    return false
  }
}

// Convenience functions for common events
export const FacebookEvents = {
  // Page view event
  pageView: async (userData?: {
    email?: string
    phone?: string
    firstName?: string
    lastName?: string
    city?: string
    state?: string
    zipCode?: string
    country?: string
    dateOfBirth?: string
    gender?: "m" | "f" | "male" | "female"
    externalId?: string
  }) => {
    return sendFacebookConversionEvent("PageView", userData || {})
  },

  // View content event
  viewContent: async (
    userData?: {
      email?: string
      phone?: string
      firstName?: string
      lastName?: string
      city?: string
      state?: string
      zipCode?: string
      country?: string
      dateOfBirth?: string
      gender?: "m" | "f" | "male" | "female"
      externalId?: string
    },
    customData?: { content_name?: string; content_category?: string; content_ids?: string[] },
  ) => {
    return sendFacebookConversionEvent("ViewContent", userData || {}, customData)
  },

  // Search event
  search: async (
    userData?: {
      email?: string
      phone?: string
      firstName?: string
      lastName?: string
      city?: string
      state?: string
      zipCode?: string
      country?: string
      dateOfBirth?: string
      gender?: "m" | "f" | "male" | "female"
      externalId?: string
    },
    customData?: { search_string?: string; content_category?: string },
  ) => {
    return sendFacebookConversionEvent("Search", userData || {}, customData)
  },

  // Add to cart event
  addToCart: async (
    userData?: {
      email?: string
      phone?: string
      firstName?: string
      lastName?: string
      city?: string
      state?: string
      zipCode?: string
      country?: string
      dateOfBirth?: string
      gender?: "m" | "f" | "male" | "female"
      externalId?: string
    },
    customData?: { content_name?: string; content_ids?: string[]; value?: number; currency?: string },
  ) => {
    return sendFacebookConversionEvent("AddToCart", userData || {}, customData)
  },

  // Initiate checkout event
  initiateCheckout: async (
    userData?: {
      email?: string
      phone?: string
      firstName?: string
      lastName?: string
      city?: string
      state?: string
      zipCode?: string
      country?: string
      dateOfBirth?: string
      gender?: "m" | "f" | "male" | "female"
      externalId?: string
    },
    customData?: { content_ids?: string[]; value?: number; currency?: string; num_items?: number },
  ) => {
    return sendFacebookConversionEvent("InitiateCheckout", userData || {}, customData)
  },

  // Lead event
  lead: async (
    userData: {
      email?: string
      phone?: string
      firstName?: string
      lastName?: string
      city?: string
      state?: string
      zipCode?: string
      country?: string
      dateOfBirth?: string
      gender?: "m" | "f" | "male" | "female"
      externalId?: string
    },
    customData?: { content_name?: string; content_category?: string; currency?: string; value?: number },
  ) => {
    return sendFacebookConversionEvent("Lead", userData, customData)
  },

  // Complete registration event
  completeRegistration: async (
    userData: {
      email?: string
      phone?: string
      firstName?: string
      lastName?: string
      city?: string
      state?: string
      zipCode?: string
      country?: string
      dateOfBirth?: string
      gender?: "m" | "f" | "male" | "female"
      externalId?: string
    },
    customData?: { content_name?: string; status?: string; currency?: string; value?: number },
  ) => {
    return sendFacebookConversionEvent("CompleteRegistration", userData, customData)
  },

  // Purchase event
  purchase: async (
    userData: {
      email?: string
      phone?: string
      firstName?: string
      lastName?: string
      city?: string
      state?: string
      zipCode?: string
      country?: string
      dateOfBirth?: string
      gender?: "m" | "f" | "male" | "female"
      externalId?: string
    },
    customData: {
      currency: string
      value: string | number
      content_ids?: string[]
      num_items?: number
      content_name?: string
      content_category?: string
    },
  ) => {
    return sendFacebookConversionEvent("Purchase", userData, customData)
  },

  // Subscribe event
  subscribe: async (
    userData: {
      email?: string
      phone?: string
      firstName?: string
      lastName?: string
      city?: string
      state?: string
      zipCode?: string
      country?: string
      dateOfBirth?: string
      gender?: "m" | "f" | "male" | "female"
      externalId?: string
    },
    customData?: { content_name?: string; value?: number; currency?: string },
  ) => {
    return sendFacebookConversionEvent("Subscribe", userData, customData)
  },

  // Start trial event
  startTrial: async (
    userData: {
      email?: string
      phone?: string
      firstName?: string
      lastName?: string
      city?: string
      state?: string
      zipCode?: string
      country?: string
      dateOfBirth?: string
      gender?: "m" | "f" | "male" | "female"
      externalId?: string
    },
    customData?: { content_name?: string; value?: number; currency?: string },
  ) => {
    return sendFacebookConversionEvent("StartTrial", userData, customData)
  },
}
