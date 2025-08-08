"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FacebookEvents } from "@/lib/facebook-conversions"
import { Bug, Send, CheckCircle, XCircle, MapPin, TestTube, Shield } from "lucide-react"

export default function DebugPanel() {
  const [isVisible, setIsVisible] = useState(false)
  const [testResults, setTestResults] = useState<
    Array<{ event: string; success: boolean; message: string; details?: any }>
  >([])
  const [isLoading, setIsLoading] = useState(false)

  const testEvents = [
    {
      name: "PageView (Minimal)",
      test: () => FacebookEvents.pageView(),
    },
    {
      name: "PageView (Full Data)",
      test: () =>
        FacebookEvents.pageView({
          email: "test@example.com",
          phone: "+1234567890",
          firstName: "Test",
          lastName: "User",
          city: "San Francisco",
          state: "CA",
          zipCode: "94102",
          country: "US",
          externalId: "test_user_123",
        }),
    },
    {
      name: "ViewContent",
      test: () =>
        FacebookEvents.viewContent(
          {
            email: "test@example.com",
            firstName: "Test",
            lastName: "User",
          },
          {
            content_name: "Debug Test Content",
            content_category: "debug",
          },
        ),
    },
    {
      name: "Lead (Full)",
      test: () =>
        FacebookEvents.lead(
          {
            email: "test@example.com",
            phone: "+1234567890",
            firstName: "Test",
            lastName: "User",
            city: "San Francisco",
            state: "CA",
            zipCode: "94102",
            country: "US",
            externalId: "debug_lead_123",
          },
          {
            content_name: "Debug Test Lead",
            content_category: "debug",
            currency: "USD",
            value: 142.52,
          },
        ),
    },
  ]

  const runTest = async (eventTest: { name: string; test: () => Promise<boolean> }) => {
    setIsLoading(true)
    try {
      console.log(`🧪 Testing ${eventTest.name} event...`)
      const success = await eventTest.test()

      const result = {
        event: eventTest.name,
        success,
        message: success ? "Event sent successfully" : "Event failed to send",
        details: success ? "Check console for Facebook response details" : "Check console for error details",
      }

      setTestResults((prev) => [result, ...prev.slice(0, 9)])
      console.log(`${success ? "✅" : "❌"} ${eventTest.name} test result:`, success)
    } catch (error) {
      console.error(`❌ ${eventTest.name} test error:`, error)
      setTestResults((prev) => [
        {
          event: eventTest.name,
          success: false,
          message: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
        },
        ...prev.slice(0, 9),
      ])
    }
    setIsLoading(false)
  }

  const runAllTests = async () => {
    setTestResults([])
    for (const test of testEvents) {
      await runTest(test)
      await new Promise((resolve) => setTimeout(resolve, 2000))
    }
  }

  const checkIpAndLocation = async () => {
    try {
      const response = await fetch(
        "http://ip-api.com/json/?fields=status,country,countryCode,region,regionName,city,zip,query",
      )
      const data = await response.json()
      console.log("🌐 Your IP and location data:", data)
      alert(
        `IP: ${data.query}\nLocation: ${data.city}, ${data.regionName}, ${data.country}\nZip: ${data.zip}\nCheck console for full details`,
      )
    } catch (error) {
      console.error("Failed to get IP/location:", error)
      alert("Failed to get IP/location data - check console")
    }
  }

  const testServerEnhancement = async () => {
    try {
      console.log("🧪 Testing server-side IP and location enhancement...")
      const response = await fetch("/api/test-ip")
      const data = await response.json()

      console.log("🔍 Server-side enhancement test results:", data)

      if (data.success) {
        console.log("✅ Server Enhancement Working!")
        console.log("📍 Your IP:", data.ip_detection.final_ip)
        console.log("🌍 Location detected:", data.best_location_data)
        console.log("🔐 Hashed location data:", data.hashed_location)
        console.log("📋 Mock Facebook payload:", data.mock_facebook_payload)
        console.log("📊 Data quality score:", data.data_quality_score)

        const location = data.best_location_data
        alert(
          `Server Enhancement Test Results:
IP: ${data.ip_detection.final_ip}
Location: ${location?.city}, ${location?.state}, ${location?.country}
ISP: ${location?.isp || "N/A"}
Data Fields: ${data.data_quality_score.total_fields}
Check console for full details!`,
        )
      } else {
        console.error("❌ Server enhancement test failed")
        alert("Server enhancement test failed - check console")
      }
    } catch (error) {
      console.error("Failed to test server enhancement:", error)
      alert("Failed to test server enhancement - check console")
    }
  }

  const verifyLocationData = async () => {
    try {
      console.log("🔍 VERIFYING REAL LOCATION DATA - NOT HARDCODED...")
      const response = await fetch("/api/verify-location")
      const data = await response.json()

      console.log("🌍 LOCATION VERIFICATION RESULTS:", data)

      if (data.location_service_results) {
        console.log("📊 Multiple Service Results:")
        data.location_service_results.forEach((result: any, index: number) => {
          console.log(`\n${index + 1}. ${result.service}:`)
          if (result.success) {
            console.log("   ✅ Success")
            console.log("   📍 Raw API Response:", result.raw_response)
            console.log("   🏙️ Parsed Location:", result.parsed_location)
            console.log(`   ⏱️ Response Time: ${result.response_time_ms}ms`)
          } else {
            console.log("   ❌ Failed:", result.error)
          }
        })

        console.log("\n🎯 What Facebook Would Receive:", data.facebook_payload_preview)

        // Show results in alert
        const successfulServices = data.location_service_results.filter((r: any) => r.success)
        if (successfulServices.length > 0) {
          const firstResult = successfulServices[0]
          const location = firstResult.parsed_location

          alert(
            `🔍 LOCATION VERIFICATION COMPLETE:

Your IP: ${data.your_ip}
Services Tested: ${data.location_service_results.length}
Successful: ${successfulServices.length}

DETECTED LOCATION:
City: ${location.city}
Region: ${location.region}  
Country: ${location.country}
ISP: ${location.isp}

This data is LIVE from ${firstResult.service}
Check console for full raw API responses!`,
          )
        } else {
          alert("❌ All location services failed. Check console for details.")
        }
      }
    } catch (error) {
      console.error("Failed to verify location:", error)
      alert("Failed to verify location - check console")
    }
  }

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsVisible(true)}
          variant="outline"
          size="sm"
          className="bg-background shadow-lg border-2"
        >
          <Bug className="h-4 w-4 mr-2" />
          Debug FB Events
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96">
      <Card className="shadow-2xl border-2">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bug className="h-5 w-5" />
              Facebook Events Debug
            </CardTitle>
            <Button onClick={() => setIsVisible(false)} variant="ghost" size="sm">
              ×
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={runAllTests} disabled={isLoading} size="sm" className="flex-1">
              <Send className="h-4 w-4 mr-2" />
              {isLoading ? "Testing..." : "Test Events"}
            </Button>
            <Button onClick={checkIpAndLocation} variant="outline" size="sm">
              <MapPin className="h-4 w-4" />
            </Button>
            <Button onClick={testServerEnhancement} variant="outline" size="sm">
              <TestTube className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex gap-2">
            <Button onClick={verifyLocationData} variant="outline" size="sm" className="flex-1 bg-transparent">
              <Shield className="h-4 w-4 mr-2" />
              Verify Real Location Data
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {testEvents.map((test) => (
              <Button
                key={test.name}
                onClick={() => runTest(test)}
                disabled={isLoading}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                {test.name}
              </Button>
            ))}
          </div>

          {testResults.length > 0 && (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              <h4 className="text-sm font-semibold">Recent Tests:</h4>
              {testResults.map((result, index) => (
                <div key={index} className="text-xs p-3 bg-muted rounded border">
                  <div className="flex items-center gap-2 mb-2">
                    {result.success ? (
                      <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-3 w-3 text-red-600 flex-shrink-0" />
                    )}
                    <Badge variant={result.success ? "default" : "destructive"} className="text-xs">
                      {result.event}
                    </Badge>
                    <span className="text-muted-foreground">{new Date().toLocaleTimeString()}</span>
                  </div>
                  <p className="text-muted-foreground">{result.message}</p>
                  {result.details && <p className="text-xs text-muted-foreground mt-1">{result.details}</p>}
                </div>
              ))}
            </div>
          )}

          <div className="text-xs text-muted-foreground space-y-1 mt-4">
            <p>
              • <strong>Shield button:</strong> Verify location is REAL
            </p>
            <p>
              • <strong>Shows raw API responses</strong> from multiple services
            </p>
            <p>
              • <strong>Compares with Google DNS</strong> for validation
            </p>
            <p>• Check console for complete verification details</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
