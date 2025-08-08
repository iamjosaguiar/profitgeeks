"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import BookingForm from "./booking-form"
import { CheckCircle, TrendingUp, Target, Zap, BarChart3, Shield, ArrowRight, AlertTriangle, Users, Clock, Star, X, Gift, Package, Eye, DollarSign, FileText, Activity, HelpCircle } from 'lucide-react'
import { FacebookEvents } from "@/lib/facebook-conversions"
import Link from "next/link"
import Image from "next/image"

export default function BackendOfferPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [currentCtaLocation, setCurrentCtaLocation] = useState("")

  useEffect(() => {
    // Send Facebook PageView event when component mounts
    FacebookEvents.pageView()
  }, [])

  const openForm = async (ctaLocation: string) => {
    setCurrentCtaLocation(ctaLocation)
    setIsFormOpen(true)

    // Send Facebook ViewContent event for form opening
    await FacebookEvents.viewContent(
      {}, // No user data yet
      {
        content_name: "Backend Offer Booking Form",
        content_category: "backend_offer_lead_generation",
      },
    )
  }

  const closeForm = () => {
    setIsFormOpen(false)
    setCurrentCtaLocation("")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <Link className="flex items-center justify-center" href="/">
          <Image
            src="/images/profit-geeks-logo.png"
            alt="Profit Geeks"
            width={180}
            height={40}
            className="h-8 w-auto"
          />
        </Link>
        <nav className="hidden md:flex gap-6 lg:gap-8">
          <Link className="text-sm font-medium hover:text-primary transition-all duration-300 relative group" href="/">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link className="text-sm font-medium hover:text-primary transition-all duration-300 relative group" href="/tracking-audit">
            Tracking Audit
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>
        <Button className="md:hidden bg-primary text-primary-foreground px-4 py-2 text-sm">Menu</Button>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] [mask-image:radial-gradient(white,transparent_70%)]" />
        <div className="container relative mx-auto px-4 py-24 lg:py-32 max-w-7xl">
          <div className="text-center max-w-5xl mx-auto">
            <Badge
              variant="secondary"
              className="mb-8 px-4 py-2 text-sm font-medium bg-primary/10 text-primary border-primary/20"
            >
              <Package className="w-4 h-4 mr-2" />
              For Businesses Spending $10K+/Month on Ads
            </Badge>

            <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent mb-8 leading-tight">
              Stop Wasting 35% of Your Ad Spend
              <span className="block text-primary">on Broken Attribution</span>
            </h1>

            <p className="text-xl lg:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-4xl mx-auto">
              Our done-for-you Backend Offer Package connects your funnel, CRM, and ad platforms with full-fidelity event tracking. 
              See exactly which ads drive revenue and send those insights back to platforms for better optimisation.
            </p>

            <div className="flex flex-col items-center gap-6 mb-16">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-10 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
                onClick={() => openForm("hero")}
              >
                Get Your Implementation Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>12-week done-for-you implementation</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>Results visible within 2-4 weeks</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 w-4 text-yellow-600" />
                  <span>Typical ROI: 300-500% in first year</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
              <Card className="border-2 border-green-200 bg-green-50/50 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <TrendingUp className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Revenue Recovery</h3>
                  <p className="text-4xl font-bold text-green-600 mb-2">30-45%</p>
                  <p className="text-muted-foreground">Additional profit identified</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-200 bg-blue-50/50 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Target className="h-10 w-10 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Implementation</h3>
                  <p className="text-4xl font-bold text-blue-600 mb-2">12 Weeks</p>
                  <p className="text-muted-foreground">Complete transformation</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-200 bg-purple-50/50 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Zap className="h-10 w-10 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">ROAS Improvement</h3>
                  <p className="text-4xl font-bold text-purple-600 mb-2">2-4x</p>
                  <p className="text-muted-foreground">Within 90 Days</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* The Hidden Profit Leak */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="destructive" className="mb-6">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Critical Issue
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                The Hidden Profit Leak Your Media Buyer Can't See
              </h2>
            </div>

            <Card className="border-2 shadow-xl">
              <CardContent className="p-10">
                <div className="space-y-8">
                  <div className="text-center">
                    <p className="text-xl text-muted-foreground leading-relaxed">
                      Your media buyer isn't the problem.{" "}
                      <span className="font-semibold text-foreground">Your data infrastructure is.</span>
                    </p>
                  </div>

                  <Separator />

                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                        Platforms like Meta, Google, and TikTok can only optimise based on the quality of signals you
                        send them. Most businesses are systematically underfeeding the algorithm, sending only
                        top-of-funnel data (leads) or incomplete purchase events.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span>Signal Quality Score</span>
                        <span className="text-red-600 font-semibold">Poor</span>
                      </div>
                      <Progress value={25} className="h-3" />
                      <p className="text-xs text-muted-foreground">Most businesses operate at 25% signal efficiency</p>
                    </div>
                  </div>

                  <Card className="bg-destructive/5 border-destructive/20">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <AlertTriangle className="h-6 w-6 text-destructive mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-destructive mb-2">The Reality:</p>
                          <p className="text-muted-foreground">
                            Weak signals = Poor match rates = Less optimisation power = Wasted ad spend
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <p className="text-lg text-muted-foreground leading-relaxed">
                    When your tracking infrastructure sends incomplete or delayed conversion data, the algorithm makes
                    suboptimal bidding decisions. This compounds daily, creating a systematic profit leak that grows
                    with your ad spend.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Problems We Solve */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              7 Critical Problems We Fix in Your Attribution
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 border-red-100 bg-gradient-to-br from-red-50/50 to-background relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <X className="h-4 w-4 text-red-600" />
                </div>
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-red-600 mb-3">Only Tracking Leads, Not Sales</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Most businesses only send lead events to platforms. Sales often aren't tracked at all, or only the first sale is captured. 
                  This weakens optimisation and measurement, leaving you blind to true performance.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 border-red-100 bg-gradient-to-br from-red-50/50 to-background relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <X className="h-4 w-4 text-red-600" />
                </div>
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-red-600 mb-3">Broken CRM-Platform Connection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Sales are being recorded but not fed back to platforms. No click ID passthrough, no conversion mapping, 
                  no feedback loop. Platforms optimise blindly without knowing what actually works.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 border-red-100 bg-gradient-to-br from-red-50/50 to-background relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <X className="h-4 w-4 text-red-600" />
                </div>
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-red-600 mb-3">Short Attribution Windows</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Most setups only track within 7 days, missing delayed conversions, upgrades, and repeat buyers. 
                  You're not just missing data - you're distorting performance and telling algorithms campaigns failed when they didn't.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 border-red-100 bg-gradient-to-br from-red-50/50 to-background relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <X className="h-4 w-4 text-red-600" />
                </div>
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-red-600 mb-3">Incomplete Platform Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Meta, Google, TikTok optimise based on what you send them. If that data is partial, late, or misaligned, 
                  you're paying premium CPMs for second-rate results.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 border-red-100 bg-gradient-to-br from-red-50/50 to-background relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <X className="h-4 w-4 text-red-600" />
                </div>
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-red-600 mb-3">Fragmented Manual Reporting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Teams stuck in spreadsheet loops, patchy dashboards, and VA reports. No single source of truth, 
                  no confidence, no speed - and no one's sure which ads drive revenue.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 border-red-100 bg-gradient-to-br from-red-50/50 to-background relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <X className="h-4 w-4 text-red-600" />
                </div>
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-red-600 mb-3">No Post-Purchase Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Missing upsells, renewals, and lifetime value events. Platforms can't optimise for high-value customers 
                  when they only see the initial purchase, not the full customer journey.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 border-red-100 bg-gradient-to-br from-red-50/50 to-background relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <X className="h-4 w-4 text-red-600" />
                </div>
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-red-600 mb-3">iOS 14.5+ Signal Loss</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Apple's privacy changes have created massive blind spots in tracking. Without server-side solutions, 
                  you're missing 30-50% of conversions and feeding incomplete data to ad platforms.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mid-page CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
        <div className="container relative mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-primary-foreground mb-6">Ready to Stop Wasting Ad Spend?</h2>
          <p className="text-xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Get your done-for-you Backend Offer Package and transform your broken attribution into a profit-generating machine.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-background text-foreground hover:bg-background/90 px-10 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 group"
            onClick={() => openForm("mid_page")}
          >
            Schedule Your Implementation Call
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* What We Implement */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              What We Implement in Your Backend
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              You'll walk away with a complete signal infrastructure designed to feed ad platforms exactly what they need to optimise for{" "}
              <span className="bg-gradient-to-r from-yellow-200 to-yellow-300 px-2 py-1 rounded font-semibold text-foreground">
                buyers, not just leads
              </span>.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 border-green-100 bg-gradient-to-br from-green-50/50 to-background relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-green-600 mb-3">Conversion API & Browser Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Captures every relevant event across browser and server with verified accuracy. 
                  Includes deduplication for clean platform attribution.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 border-green-100 bg-gradient-to-br from-green-50/50 to-background relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-green-600 mb-3">Click ID Passthrough Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Tracks fbclid, gclid, ttclid and more. Connects each sale back to the exact campaign, 
                  ad, and platform - even weeks later.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 border-green-100 bg-gradient-to-br from-green-50/50 to-background relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-green-600 mb-3">CRM Audit & Mapping</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Review how your CRM captures conversion data, then configure mappings to ensure 
                  clean flow into platform signals.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 border-green-100 bg-gradient-to-br from-green-50/50 to-background relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-green-600 mb-3">Post-Lead Event Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Tracks sales, upgrades, subscriptions after first opt-in - critical for high-ticket 
                  or multi-step offers.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 border-green-100 bg-gradient-to-br from-green-50/50 to-background relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-green-600 mb-3">Platform Integration Setup</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Sends high-quality conversion and customer value data back to Meta, Google, 
                  TikTok for algorithmic optimisation.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 border-green-100 bg-gradient-to-br from-green-50/50 to-background relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-green-600 mb-3">Live Performance Dashboards</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Clear, real-time dashboard showing sales, revenue, and conversion metrics by campaign 
                  and platform. No more manual spreadsheets.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-6 px-4 py-2 bg-green-100 text-green-800 border-green-200">
              <Star className="w-4 h-4 mr-2" />
              Client Success Stories
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Real Results from Real Businesses
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See how our Backend Offer Package has transformed businesses just like yours
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Testimonial 1 - Conversion Rate Focus */}
            <Card className="relative overflow-hidden border-2 border-green-200 bg-white hover:shadow-2xl transition-all duration-300 group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-green-100 rounded-bl-full opacity-50"></div>
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="text-3xl font-bold text-green-600 mb-2">+270%</div>
                  <div className="text-lg font-semibold text-foreground mb-4">Conversions in 90 Days</div>
                </div>
                
                <blockquote className="text-muted-foreground leading-relaxed mb-6 italic">
                  "Conversions on the page have increased from 2.92% to 7.89% - a 270% increase in conversions! With his suggestions we captured an additional 200% improvement which reduced our cost per lead by HALF."
                </blockquote>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold text-lg">DD</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">David Dee</div>
                    <div className="text-sm text-muted-foreground">Founder, BookMeATrip.Com</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 2 - Revenue Focus */}
            <Card className="relative overflow-hidden border-2 border-blue-200 bg-white hover:shadow-2xl transition-all duration-300 group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-blue-100 rounded-bl-full opacity-50"></div>
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">$63,550</div>
                  <div className="text-lg font-semibold text-foreground mb-4">Sales in 30 Days</div>
                </div>
                
                <blockquote className="text-muted-foreground leading-relaxed mb-6 italic">
                  "Jos is one of those experts you meet once in a while in your life and you never want to let go of them. He did a campaign for our eCommerce business that reached around $63,550 in total sales within 30 days."
                </blockquote>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-lg">MK</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Mark Khoder</div>
                    <div className="text-sm text-muted-foreground">CEO, Your SocialChef</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 3 - Revenue Growth */}
            <Card className="relative overflow-hidden border-2 border-purple-200 bg-white hover:shadow-2xl transition-all duration-300 group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-purple-100 rounded-bl-full opacity-50"></div>
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="text-3xl font-bold text-purple-600 mb-2">+100%</div>
                  <div className="text-lg font-semibold text-foreground mb-4">Revenue to $35k/Month</div>
                </div>
                
                <blockquote className="text-muted-foreground leading-relaxed mb-6 italic">
                  "Since we've been with Jos we've converted twice as many visitors into sales and doubled our revenue to 35k p/mth. If you're looking for help with Facebook or Google Ads I highly recommend him."
                </blockquote>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold text-lg">RT</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Rich T</div>
                    <div className="text-sm text-muted-foreground">Founder, Pure Health Delivered</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Implementation Plan */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-6 px-4 py-2 bg-blue-100 text-blue-800 border-blue-200">
              <FileText className="w-4 h-4 mr-2" />
              Structured Delivery
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              12-Week Implementation Plan
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              A structured roadmap that transforms broken lead-level optimisation into revenue-aligned data infrastructure 
              for scalable, profitable growth.
            </p>
          </div>

          {/* Target & Goal */}
          <div className="max-w-4xl mx-auto mb-16">
            <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      Target Audience
                    </h3>
                    <p className="text-muted-foreground">Lead Generation Agencies or High-Volume Advertisers</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      Goal
                    </h3>
                    <p className="text-muted-foreground">Replace broken lead-level optimisation with revenue-aligned data infrastructure</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Implementation Phases */}
          <div className="space-y-8 max-w-6xl mx-auto">
            {/* Phase 1 */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50/50 to-background">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl text-blue-600 flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold">1</span>
                    </div>
                    Discovery & Diagnostic
                  </CardTitle>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Week 1</Badge>
                </div>
                <CardDescription className="text-base ml-13">
                  Identify critical data blind spots and attribution leaks. Align around a true north star metric.
                </CardDescription>
              </CardHeader>
              <CardContent className="ml-13">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Activities:</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Audit CRM, ad accounts, and tracking infrastructure</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Review current funnel and lead delivery process</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Interview key team members (media buyers, ops, tech)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Diagnose partial leads, rejections, and signal loss</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Deliverables:</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Package className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Diagnostic Map: Where signals are broken</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Package className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Recommendation Brief: Core KPIs, event mapping strategy</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Package className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Tech Stack Evaluation: What to fix vs replace</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Phase 2 */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-l-4 border-l-green-500 bg-gradient-to-r from-green-50/50 to-background">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl text-green-600 flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold">2</span>
                    </div>
                    Tracking & Signal Infrastructure
                  </CardTitle>
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Weeks 2-4</Badge>
                </div>
                <CardDescription className="text-base ml-13">
                  Rebuild accurate data flow from ad to CRM to conversion. Ensure events are correctly deduplicated and platform-optimised.
                </CardDescription>
              </CardHeader>
              <CardContent className="ml-13">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Activities:</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Implement Conversion API + browser tracking with deduplication</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Set up click ID passthrough (fbclid, gclid, ttclid, etc.)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Standardise UTM conventions across ad accounts</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Configure custom events (assigned lead, verified lead)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Capture key enrichment fields: IP address, device type, browser, OS, referrer, timestamps, session duration, page engagement</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Append enriched data to all CRM and server events</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Pass enriched event payloads back to Meta, Google, TikTok where supported</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Build feedback loop back into Meta, Google, TikTok</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Deliverables:</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Package className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Tracking Blueprint (click-to-revenue journey)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Package className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Verified Events List (with platform mapping)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Package className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Enriched Event Payload Template</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Package className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Platform-Specific Event Maps with Metadata</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Package className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Tagging architecture deployed (via GTM or server)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Package className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">CRM/Lead Object Field Expansion to Store Enrichment Data</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Package className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Platform feedback automations configured</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Phase 3 */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50/50 to-background">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl text-purple-600 flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-bold">3</span>
                    </div>
                    Signal Calibration & Dashboard Build
                  </CardTitle>
                  <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">Weeks 5-6</Badge>
                </div>
                <CardDescription className="text-base ml-13">
                  Create shared visibility and real-time performance clarity. Align the team around true performance metrics.
                </CardDescription>
              </CardHeader>
              <CardContent className="ml-13">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Activities:</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-purple-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Define and deploy your north star metric (e.g. CPAL)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-purple-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Build dashboard with clear breakdowns by campaign, platform</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-purple-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Implement funnel drop-off tracking for partial leads</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-purple-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Connect CRM to data visualisation tools</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-purple-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Segment leads by device, OS, or location using enrichment fields</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-purple-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Identify drop-off patterns by user type (e.g. low conversions from iOS Safari)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-purple-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Build dynamic dashboards showing performance by enriched dimensions</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-purple-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Feed segments into platform audiences or exclude low-intent signals</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Deliverables:</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Package className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">CPAL Dashboard or equivalent metric</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Package className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Partial Lead Report (where drop-offs occur)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Package className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Live campaign attribution view across platforms</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Package className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Enriched Segment Filters in CRM</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Package className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Dashboard Filters for OS, Geo, Device</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Package className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Retargeting Audiences Based on Enriched Attributes</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Package className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Signal health checklist and QA report</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Phase 4 */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-l-4 border-l-orange-500 bg-gradient-to-r from-orange-50/50 to-background">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl text-orange-600 flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-600 font-bold">4</span>
                    </div>
                    Backend Monetisation & Lead Recovery
                  </CardTitle>
                  <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200">Weeks 7-8</Badge>
                </div>
                <CardDescription className="text-base ml-13">
                  Increase revenue per lead by recovering and re-engaging drop-offs. Feed stronger signals back into platforms.
                </CardDescription>
              </CardHeader>
              <CardContent className="ml-13">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Activities:</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-orange-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Segment and flag partial, failed, or unassigned leads</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-orange-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Build follow-up automations for partial leads</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-orange-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Set reactivation and re-nurture workflows</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-orange-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Connect recovered conversions back to original campaign</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Deliverables:</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Package className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Partial Lead Recovery Flow</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Package className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Reactivation Automations (email/SMS/retargeting)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Package className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Recovered Revenue Attribution setup</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Package className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Platform feedback for recovered conversions</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Phase 5 */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-l-4 border-l-indigo-500 bg-gradient-to-r from-indigo-50/50 to-background">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl text-indigo-600 flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-indigo-600 font-bold">5</span>
                    </div>
                    Optimisation, Scaling & Cross-Platform Expansion
                  </CardTitle>
                  <Badge variant="outline" className="bg-indigo-100 text-indigo-800 border-indigo-200">Weeks 9-12</Badge>
                </div>
                <CardDescription className="text-base ml-13">
                  Use real signals to optimise spend, reactivate dormant campaigns. Expand into new verticals and channels with confidence.
                </CardDescription>
              </CardHeader>
              <CardContent className="ml-13">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Activities:</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-indigo-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Review performance by CPAL/CAC by source</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-indigo-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Test reactivating paused campaigns with new signal feedback</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-indigo-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Identify profitable verticals for scale</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-indigo-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Uncover cross-platform opportunities</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Deliverables:</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Package className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Campaign Optimisation Report</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Package className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Reinstatement List: Ads worth turning back on</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Package className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Vertical Expansion Opportunity Brief</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Package className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Cross-Platform Signal Map</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Optional Add-Ons & Timeline */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="bg-gradient-to-r from-slate-50 to-blue-50/30 border-slate-200">
              <CardHeader>
                <CardTitle className="text-xl text-foreground flex items-center gap-2">
                  <Gift className="h-5 w-5 text-primary" />
                  Optional Add-On Modules
                </CardTitle>
                <CardDescription>Available after Month 3</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-muted-foreground">Custom LTV modelling</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-muted-foreground">AI-driven lead scoring integration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-muted-foreground">Offline event ingestion and match rate improvement</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-muted-foreground">Sales team alignment workflows</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-50 to-emerald-50/30 border-green-200">
              <CardHeader>
                <CardTitle className="text-xl text-foreground flex items-center gap-2">
                  <Clock className="h-5 w-5 text-green-600" />
                  Timeline Options
                </CardTitle>
                <CardDescription>Flexible delivery based on your needs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-100 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-green-800">Standard Timeline</span>
                      <Badge className="bg-green-600 text-white">12 Weeks</Badge>
                    </div>
                    <p className="text-sm text-green-700">Complete implementation with full optimisation</p>
                  </div>
                  <div className="p-4 bg-blue-100 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-blue-800">Fast-Track Version</span>
                      <Badge className="bg-blue-600 text-white">6 Weeks</Badge>
                    </div>
                    <p className="text-sm text-blue-700">Available if foundational tracking already exists</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* UTM & Tracking Template Optimization */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-6 px-4 py-2 bg-blue-100 text-blue-800 border-blue-200">
              <Target className="w-4 h-4 mr-2" />
              Advanced Attribution
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              UTM & Tracking Template Optimisation
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Automatically apply consistent UTM parameters and tracking templates across all platforms for 
              seamless attribution and campaign performance analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-16">
            {/* Before/After Comparison */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-red-600 mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <X className="h-4 w-4 text-red-600" />
                  </div>
                  Before: Inconsistent Tracking
                </h3>
                <div className="space-y-4">
                  <Card className="border-2 border-red-100 bg-red-50/50">
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground mb-2">Meta Campaign URL:</p>
                      <code className="text-xs bg-white p-2 rounded block break-all">
                        yoursite.com/landing?utm_source=facebook&utm_campaign=promo
                      </code>
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-red-100 bg-red-50/50">
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground mb-2">Google Campaign URL:</p>
                      <code className="text-xs bg-white p-2 rounded block break-all">
                        yoursite.com/landing?source=google&campaign=promotion
                      </code>
                    </CardContent>
                  </Card>
                  <div className="bg-red-100 p-4 rounded-lg">
                    <p className="text-sm text-red-700">
                      <strong>Result:</strong> Fragmented data, impossible to compare platforms, 
                      manual reporting nightmares
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-green-600 mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  After: Automated Consistency
                </h3>
                <div className="space-y-4">
                  <Card className="border-2 border-green-100 bg-green-50/50">
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground mb-2">Meta Campaign URL:</p>
                      <code className="text-xs bg-white p-2 rounded block break-all">
                        yoursite.com/landing?utm_source=meta&utm_medium=paid_social&utm_campaign=q1_promo_2024&utm_content=video_ad&utm_term=targeting_interests
                      </code>
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-green-100 bg-green-50/50">
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground mb-2">Google Campaign URL:</p>
                      <code className="text-xs bg-white p-2 rounded block break-all">
                        yoursite.com/landing?utm_source=google&utm_medium=paid_search&utm_campaign=q1_promo_2024&utm_content=text_ad&utm_term=keyword_match
                      </code>
                    </CardContent>
                  </Card>
                  <div className="bg-green-100 p-4 rounded-lg">
                    <p className="text-sm text-green-700">
                      <strong>Result:</strong> Perfect attribution, automated reporting, 
                      clear ROI comparison across all channels
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Implementation Features */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 border-blue-100 bg-gradient-to-br from-blue-50/50 to-background relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Zap className="h-4 w-4 text-blue-600" />
                </div>
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-blue-600 mb-3">Dynamic UTM Generation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Automatically generate consistent UTM parameters based on campaign structure, 
                  ad creative, and targeting settings.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Platform-specific source mapping</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Campaign naming conventions</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Creative and audience tagging</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 border-purple-100 bg-gradient-to-br from-purple-50/50 to-background relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <BarChart3 className="h-4 w-4 text-purple-600" />
                </div>
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-purple-600 mb-3">Cross-Platform Templates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Standardised tracking templates that work seamlessly across Meta, Google, 
                  TikTok, LinkedIn, and other platforms.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Universal parameter structure</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Platform-specific optimisations</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Automated quality checks</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 border-green-100 bg-gradient-to-br from-green-50/50 to-background relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Activity className="h-4 w-4 text-green-600" />
                </div>
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-green-600 mb-3">Real-Time Attribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Instant attribution reporting with drill-down capabilities from campaign 
                  to keyword/creative level performance.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Live performance dashboards</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Multi-touch attribution models</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Custom conversion windows</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Technical Implementation */}
          <div className="mt-16 bg-gradient-to-r from-slate-50 to-blue-50/30 rounded-2xl p-8 border border-slate-200">
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
              Technical Implementation Includes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Template Setup</h4>
                <p className="text-sm text-muted-foreground">Platform-specific tracking templates with dynamic parameters</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Auto-Tagging</h4>
                <p className="text-sm text-muted-foreground">Automatic UTM application based on campaign structure</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Attribution Models</h4>
                <p className="text-sm text-muted-foreground">First-click, last-click, and multi-touch attribution setup</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Activity className="h-6 w-6 text-orange-600" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Quality Assurance</h4>
                <p className="text-sm text-muted-foreground">Automated validation and error detection systems</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="py-24 bg-slate-50 text-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-200/50 bg-[size:30px_30px]" />
        <div className="container relative mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-6 px-4 py-2 bg-green-100 text-green-800 border-green-200">
              <Star className="w-4 h-4 mr-2" />
              Success Story
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              From $30K to $300K/Month
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-slate-700 max-w-4xl mx-auto">
              How a Lead Gen Agency Unlocked 10x Growth by Fixing Attribution, Optimising Signal Flow, and Monetising the Backend
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* The Situation */}
            <div className="mb-16">
              <Card className="bg-white border-slate-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-slate-900 flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                    </div>
                    The Situation
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-slate-700 leading-relaxed">
                  <p className="mb-4">
                    A fast-moving pay-per-lead agency was generating solid revenue, but growth had plateaued. 
                    On paper, they were profitable - averaging $30,000/month. Behind the scenes, margins were shrinking, 
                    delivery confidence was low, and campaign performance was becoming unpredictable.
                  </p>
                  <p className="font-semibold text-slate-900">
                    They couldn't scale without feeling like they were guessing.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Core Problems */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">The Core Problems</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-red-50 border-red-200 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <X className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                      <h4 className="font-semibold text-red-800">Tracking Stopped at Form Fill</h4>
                    </div>
                    <p className="text-slate-700 text-sm">
                      Only tracking initial lead submissions. No insight into what happened after - 
                      whether leads were accepted, rejected, or qualified.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-red-50 border-red-200 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <X className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                      <h4 className="font-semibold text-red-800">Inconsistent Attribution</h4>
                    </div>
                    <p className="text-slate-700 text-sm">
                      UTMs were inconsistently applied. Attribution was pieced together manually, 
                      often with errors and no correlation to actual revenue.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-red-50 border-red-200 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <X className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                      <h4 className="font-semibold text-red-800">False Platform Signals</h4>
                    </div>
                    <p className="text-slate-700 text-sm">
                      Platforms were receiving false conversion data. Poor quality leads were being 
                      reinforced by algorithms, while profitable campaigns were shut down.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-red-50 border-red-200 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <X className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                      <h4 className="font-semibold text-red-800">Wrong Optimization Metric</h4>
                    </div>
                    <p className="text-slate-700 text-sm">
                      Media buyers optimising based on CPL - a metric with no correlation to 
                      revenue or delivery success.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 bg-white border border-slate-200 rounded-lg p-6 shadow-lg">
                <blockquote className="text-slate-700 italic text-lg text-center">
                  "We were relying on guesswork. Our best campaigns were getting shut down. 
                  We didn't even realise how much money we were losing."
                </blockquote>
              </div>
            </div>

            {/* What We Implemented */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">What We Implemented</h3>
              <div className="space-y-8">
                <Card className="bg-green-50 border-green-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl text-green-800 flex items-center gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                      Attribution & Signal System Rebuild
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-slate-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm">Implemented Conversion API + browser tracking with deduplication</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm">Passed click IDs (fbclid, gclid, ttclid) into the CRM</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm">Standardised UTMs across all campaigns</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm">Created custom conversion events tied to client-accepted leads</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm">Implemented delayed attribution logic for extended windows</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm">Built platform feedback loops with verified, revenue-linked events</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50 border-blue-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl text-blue-800 flex items-center gap-3">
                      <Activity className="h-6 w-6 text-blue-600" />
                      Path-to-Revenue Signal Mapping
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-slate-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                        <span className="text-sm">Tracked micro-conversions (form started, phone provided, validated, assigned)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                        <span className="text-sm">Mapped journey from ad click → lead form → qualification → payment</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                        <span className="text-sm">Identified campaigns with high CPL junk vs. high revenue conversion</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                        <span className="text-sm">Created insight loops for targeting, copy, and funnel optimisation</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-purple-50 border-purple-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl text-purple-800 flex items-center gap-3">
                      <BarChart3 className="h-6 w-6 text-purple-600" />
                      Dashboard & North Star KPI
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-slate-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-purple-600 mt-1 flex-shrink-0" />
                        <span className="text-sm">Replaced Cost Per Lead (CPL) with Cost Per Assigned Lead (CPAL)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-purple-600 mt-1 flex-shrink-0" />
                        <span className="text-sm">Built real-time dashboard breaking down CPAL by campaign and platform</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-purple-600 mt-1 flex-shrink-0" />
                        <span className="text-sm">Empowered team with faster, revenue-aligned decision making</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-purple-600 mt-1 flex-shrink-0" />
                        <span className="text-sm">Created operational command centre for entire agency</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Dashboard Screenshot */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">The Dashboard We Built</h3>
              <Card className="bg-white border-slate-200 shadow-lg max-w-4xl mx-auto">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <img 
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PPL%20Performance%20Jan%202024.PNG-irVptBew7mu93GbzMDOuR0ImIOW4pM.png" 
                      alt="CPAL Performance Dashboard showing $663K revenue, 7,582 sold leads, $47.91 CPAL, and detailed breakdowns by platform and region"
                      className="w-full rounded-lg border border-slate-200 shadow-md"
                    />
                  </div>
                  <div className="text-center">
                    <h4 className="text-xl font-bold text-slate-900 mb-4">Real Dashboard, Real Results</h4>
                    <p className="text-slate-700 leading-relaxed mb-4">
                      This is the actual performance dashboard we built for the case study client. Notice the CPAL (Cost Per Assigned Lead) 
                      metric prominently displayed at $47.91 - this became their north star metric that aligned the entire team around 
                      profitable delivery rather than just lead volume.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="text-2xl font-bold text-green-600">$663K</div>
                        <div className="text-sm text-green-700">Monthly Revenue</div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div className="text-2xl font-bold text-blue-600">7,582</div>
                        <div className="text-sm text-blue-700">Sold Leads</div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <div className="text-2xl font-bold text-purple-600">40.69%</div>
                        <div className="text-sm text-purple-700">Gross Profit Margin</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results Timeline */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">The Results</h3>
              <div className="space-y-8">
                <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl text-yellow-800 flex items-center gap-3">
                      <Zap className="h-6 w-6 text-yellow-600" />
                      First 90 Days
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-slate-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-yellow-600 mt-1 flex-shrink-0" />
                        <span className="text-sm">Recovered thousands of dollars in lost revenue from incomplete leads</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-yellow-600 mt-1 flex-shrink-0" />
                        <span className="text-sm">Media buyers stopped switching off profitable campaigns</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-yellow-600 mt-1 flex-shrink-0" />
                        <span className="text-sm">Platform ROAS improved as algorithms received true conversion signals</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-yellow-600 mt-1 flex-shrink-0" />
                        <span className="text-sm">New benchmark metric (CPAL) aligned entire team around real growth</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl text-blue-800 flex items-center gap-3">
                      <TrendingUp className="h-6 w-6 text-blue-600" />
                      After 6 Months
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-slate-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                        <span className="text-sm">Dashboard became the operational command centre</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                        <span className="text-sm">Reduced lead rejection rates and improved delivery consistency</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                        <span className="text-sm">Re-activated previously paused campaigns based on real performance data</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                        <span className="text-sm">Refined messaging and creative using funnel drop-off insights</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl text-green-800 flex items-center gap-3">
                      <Target className="h-6 w-6 text-green-600" />
                      After 12 Months
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-slate-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm font-semibold">Profit scaled from $30K/month to $300K/month</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm">Confidently expanded into new verticals using same measurement system</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm">Scaled team across media buying, client delivery, and operations</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm">Backend, attribution, and dashboard became their defensible advantage</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Key Insight */}
            <div className="text-center">
              <Card className="bg-white border-slate-200 shadow-xl max-w-4xl mx-auto">
                <CardContent className="p-8">
                  <h4 className="text-2xl font-bold text-slate-900 mb-4">Strategic Insight</h4>
                  <p className="text-slate-700 text-lg leading-relaxed mb-6">
                    Most lead gen agencies stop at the form fill. This team learned to optimise the entire journey - 
                    from click to client payment.
                  </p>
                  <blockquote className="text-green-700 text-xl font-semibold italic">
                    "CPAL changed the game for us. We're not just generating leads anymore - we're scaling profitable delivery."
                  </blockquote>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Revenue Expansion Opportunities */}
      <section className="py-24 bg-gradient-to-br from-orange-50/50 to-yellow-50/50 border-y border-orange-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-6 px-4 py-2 bg-orange-100 text-orange-800 border-orange-200">
              <Gift className="w-4 h-4 mr-2" />
              Bonus Value
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Revenue Expansion Opportunities
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              We don't just fix your tracking - we help uncover and activate untapped revenue potential in your backend systems.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 border-orange-100 bg-gradient-to-br from-orange-50/50 to-background relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-orange-600" />
                </div>
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-orange-600 mb-3">Backend Lead Follow-Up Audit</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Review how non-buyers and inactive leads are handled. Identify missed opportunities and surface 
                  fast actions to convert high-intent prospects.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 border-orange-100 bg-gradient-to-br from-orange-50/50 to-background relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-orange-600" />
                </div>
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-orange-600 mb-3">Cross-Platform Optimisation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Surface overlooked retargeting opportunities across Meta, Google, TikTok, YouTube, and email. 
                  Identify profitable additional channels based on real buyer behaviour.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 border-orange-100 bg-gradient-to-br from-orange-50/50 to-background relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-orange-600" />
                </div>
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-orange-600 mb-3">Advanced Remarketing Setup</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Ensure CRM events trigger platform campaigns. Create smarter custom audiences for cold, warm, 
                  and return buyers aligned with dynamic ad strategies.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Complete Deliverables */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Complete Deliverables
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              "End-to-end audit of tracking, CRM, and attribution setup",
              "Server-side and browser-side tracking implementation",
              "UTM parameter automation and tracking template setup",
              "Click ID passthrough and CRM mapping",
              "Customised performance dashboard",
              "Post-lead and multi-event tracking setup",
              "Conversion feedback connection to all ad platforms",
              "Backend follow-up review and remarketing report"
            ].map((deliverable, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary bg-gradient-to-r from-primary/5 to-background">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Package className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-sm font-medium text-foreground leading-relaxed">{deliverable}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Expected Outcomes */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Expected Outcomes
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <Card className="group hover:shadow-2xl transition-all duration-300 text-center border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                  <Eye className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Full Revenue Visibility</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Gain complete insight into which ads, platforms, and campaigns drive real revenue - not just leads.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 text-center border-2 border-green-200 bg-gradient-to-br from-green-50/50 to-background">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Improved ROAS</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Better platform optimisation through higher-quality signal data and more accurate attribution.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 text-center border-2 border-blue-200 bg-gradient-to-br from-blue-50/50 to-background">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Clear Daily Reporting</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Replace guesswork with transparent, actionable reporting you can trust and act on immediately.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 text-center border-2 border-purple-200 bg-gradient-to-br from-purple-50/50 to-background">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
                  <Activity className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Backend Revenue Activation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Unlock missed revenue from backend sequences, lead reactivation, and verified buyer behaviour.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Frequently Asked Questions
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Common questions about our Backend Offer Package implementation service.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl text-foreground flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <HelpCircle className="h-4 w-4 text-primary" />
                  </div>
                  What platforms do you work with beyond Meta, Google, and TikTok?
                </CardTitle>
              </CardHeader>
              <CardContent className="ml-11">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We work with virtually any advertising platform that supports conversion tracking. This includes:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">LinkedIn Ads</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">YouTube Ads</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Pinterest Ads</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Snapchat Ads</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Microsoft Ads (Bing)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Twitter Ads</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Reddit Ads</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Native advertising platforms</span>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  If you're running ads on a platform not listed here, we can likely integrate it. Our approach focuses on 
                  universal tracking principles that work across any platform with API access.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl text-foreground flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <HelpCircle className="h-4 w-4 text-primary" />
                  </div>
                  What CRM systems do you integrate with?
                </CardTitle>
              </CardHeader>
              <CardContent className="ml-11">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We work with all major CRM and lead management systems, including:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">HubSpot</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Salesforce</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Pipedrive</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">ActiveCampaign</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">GoHighLevel</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Keap (Infusionsoft)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Zoho CRM</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Monday.com</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Custom CRMs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Zapier workflows</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Make.com automations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">API-based systems</span>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Our implementation works with any system that can receive webhooks or has API access. 
                  We'll audit your current setup and recommend the best integration approach.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl text-foreground flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <HelpCircle className="h-4 w-4 text-primary" />
                  </div>
                  How long before we see results?
                </CardTitle>
              </CardHeader>
              <CardContent className="ml-11">
                <p className="text-muted-foreground leading-relaxed">
                  Most clients see immediate improvements within the first 2-4 weeks as we fix broken tracking and implement 
                  proper attribution. However, the full impact becomes clear after 6-8 weeks when platforms have enough clean 
                  data to optimise effectively. The case study results (10x growth) typically manifest over 6-12 months as 
                  the entire system matures and you leverage the insights for strategic decisions.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl text-foreground flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <HelpCircle className="h-4 w-4 text-primary" />
                  </div>
                  Do you provide ongoing support after implementation?
                </CardTitle>
              </CardHeader>
              <CardContent className="ml-11">
                <p className="text-muted-foreground leading-relaxed">
                  Yes, the 12-week implementation includes 30 days of post-launch support to ensure everything runs smoothly. 
                  After that, we offer optional monthly retainer packages for ongoing optimisation, new platform integrations, 
                  and strategic guidance. Many clients choose to keep us on retainer to continuously improve their attribution 
                  and expand into new channels.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl text-foreground flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <HelpCircle className="h-4 w-4 text-primary" />
                  </div>
                  What if our current tracking is completely broken?
                </CardTitle>
              </CardHeader>
              <CardContent className="ml-11">
                <p className="text-muted-foreground leading-relaxed">
                  That's actually ideal - it means you have the most to gain! We specialise in rebuilding tracking from the ground up. 
                  In fact, starting fresh often produces better results than trying to patch existing broken systems. 
                  We'll conduct a thorough audit, identify what can be salvaged, and rebuild everything else using best practices. 
                  The more broken your current setup, the more dramatic your improvements will be.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl text-foreground flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <HelpCircle className="h-4 w-4 text-primary" />
                  </div>
                  Is this suitable for e-commerce businesses?
                </CardTitle>
              </CardHeader>
              <CardContent className="ml-11">
                <p className="text-muted-foreground leading-relaxed">
                  Absolutely. While our case study focuses on lead generation, the same principles apply to e-commerce. 
                  We track the full customer journey from ad click to purchase, including cart abandonment recovery, 
                  upsells, repeat purchases, and lifetime value. E-commerce businesses often see even more dramatic 
                  improvements because there are more conversion events to optimise around (add to cart, initiate checkout, 
                  purchase, repeat purchase, etc.).
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl text-foreground flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <HelpCircle className="h-4 w-4 text-primary" />
                  </div>
                  What's the investment for the Backend Offer Package?
                </CardTitle>
              </CardHeader>
              <CardContent className="ml-11">
                <p className="text-muted-foreground leading-relaxed">
                  Investment varies based on your current setup complexity, number of platforms, and specific requirements. 
                  Most implementations range from $15,000 to $50,000 for the complete 12-week package. Given that our case study 
                  client scaled from $30K to $300K monthly profit, the ROI typically pays for itself within the first few months. 
                  We'll provide a detailed quote after our initial discovery call where we assess your specific needs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-black/5 bg-[size:20px_20px] [mask-image:radial-gradient(white,transparent_70%)]" />
        <div className="container relative mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Ready to Transform Your Attribution?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
              Stop losing revenue to broken tracking and blind optimisation. Get your Backend Offer Package and transform 
              your attribution into a profit-generating machine.
            </p>
          </div>

          <Card className="max-w-3xl mx-auto border-2 shadow-2xl">
            <CardContent className="p-12">
              <div className="text-center mb-10">
                <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-4">Schedule Your Implementation Call</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  We'll analyse your current setup and create a custom implementation plan for your business - 
                  completely free, no strings attached.
                </p>
              </div>

              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-6 text-xl font-semibold mb-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
                onClick={() => openForm("final")}
              >
                Get Your Implementation Started
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center justify-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm font-medium">12-week implementation</span>
                </div>
                <div className="flex items-center justify-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <span className="text-sm font-medium">Results in 2-4 weeks</span>
                </div>
                <div className="flex items-center justify-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <Zap className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                  <span className="text-sm font-medium">300-500% ROI typical</span>
                </div>
              </div>

              <Separator className="mb-6" />

              <p className="text-muted-foreground text-center text-sm leading-relaxed">
                This implementation is exclusively for businesses spending $10,000+ monthly on digital advertising. Limited
                availability - we only take on clients we can guarantee results for.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Booking Form Modal */}
      <BookingForm isOpen={isFormOpen} onClose={closeForm} ctaLocation={currentCtaLocation} />
    </div>
  )
}
