"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import BookingForm from "./components/booking-form"
import { CheckCircle, TrendingUp, Target, Zap, BarChart3, Shield, ArrowRight, AlertTriangle, Users, Clock, Star } from 'lucide-react'
import { FacebookEvents } from "@/lib/facebook-conversions"
import DebugPanel from "./components/debug-panel"
import Link from "next/link"
import Image from "next/image"

// GTM tracking functions
const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...parameters,
    })
  }
}

export default function TrackingAuditLanding() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [currentCtaLocation, setCurrentCtaLocation] = useState("")

  useEffect(() => {
    // Send Facebook PageView event when component mounts
    // This will work with just browser data (fbp/fbc) + IP + User Agent
    FacebookEvents.pageView()
  }, [])

  const openForm = async (ctaLocation: string) => {
    setCurrentCtaLocation(ctaLocation)
    setIsFormOpen(true)
    trackEvent("cta_click", {
      cta_location: ctaLocation,
      action: "open_form",
    })

    // Send Facebook ViewContent event for form opening
    // This will work with minimal data
    await FacebookEvents.viewContent(
      {}, // No user data yet
      {
        content_name: "Booking Form",
        content_category: "lead_generation",
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
          <Link
            className="text-sm font-medium hover:text-primary transition-all duration-300 relative group"
            href="#contact"
          >
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>
        <Button className="md:hidden bg-primary text-primary-foreground px-4 py-2 text-sm">Menu</Button>
      </header>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] [mask-image:radial-gradient(white,transparent_70%)]" />
        <div className="container relative mx-auto px-4 py-16 lg:py-20 max-w-7xl">
          <div className="text-center max-w-4xl mx-auto">
            <Badge
              variant="secondary"
              className="mb-8 px-4 py-2 text-sm font-medium bg-primary/10 text-primary border-primary/20"
            >
              <Users className="w-4 h-4 mr-2" />
              For Businesses Spending $10K+/Month on Ads
            </Badge>

            <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent mb-8 leading-tight">
              Unlock 35% More Profit
              <span className="block text-primary">Without Increasing Ad Spend</span>
            </h1>

            <p className="text-xl lg:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
              Discover how platform-grade data optimisation recovers wasted ad spend and lifts ROAS fast.
            </p>

            <div className="flex flex-col items-center gap-6 mb-16">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
                onClick={() => openForm("hero")}
              >
                Book Your Free Signal Audit
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>No obligation</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>30-minute assessment</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-yellow-600" />
                  <span>Immediate insights</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
              <Card className="border-2 border-green-200 bg-green-50/50 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <TrendingUp className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Average Recovery</h3>
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
                  <p className="text-4xl font-bold text-blue-600 mb-2">8 Weeks</p>
                  <p className="text-muted-foreground">To full optimisation</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-200 bg-purple-50/50 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Zap className="h-10 w-10 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">ROAS Improvement</h3>
                  <p className="text-4xl font-bold text-purple-600 mb-2">2-4x</p>
                  <p className="text-muted-foreground">Within 30 Days</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Positioning Section */}
      <section className="py-16 bg-gradient-to-r from-slate-50 to-blue-50/30 border-y border-slate-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              <Shield className="w-4 h-4 mr-2" />
              For Advanced Marketing Teams
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
              Your team's tracking and signals are solid - but platform changes demand expert tweaks.
            </h2>
            
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
              As advisors to top enterprises, we optimise algorithms, boost match rates, and recover wasted budget fast. 
              Scale smarter with proven strategies tailored to your goals.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300">
                <div className="bg-blue-100 p-3 rounded-xl mb-4">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Algorithm Optimisation</h3>
                <p className="text-sm text-muted-foreground text-center">Fine-tune platform algorithms for maximum efficiency</p>
              </div>
              
              <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300">
                <div className="bg-green-100 p-3 rounded-xl mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Enhanced Match Rates</h3>
                <p className="text-sm text-muted-foreground text-center">Improve audience targeting and conversion matching</p>
              </div>
              
              <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300">
                <div className="bg-purple-100 p-3 rounded-xl mb-4">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Budget Recovery</h3>
                <p className="text-sm text-muted-foreground text-center">Identify and eliminate wasteful spending patterns</p>
              </div>
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

      {/* What We Fix */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              What We Fix in Your Tracking Infrastructure
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Most businesses only track one or two events in their funnel at most. Sending the full customer journey
              creates much stronger signals to the platforms, dramatically improving their ability to optimise your
              campaigns.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/20">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <div className="bg-red-100 p-3 rounded-xl group-hover:bg-red-200 transition-colors">
                    <Shield className="h-8 w-8 text-red-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Missing Server Events</CardTitle>
                    <CardDescription className="text-base">Critical data loss from browser limitations</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Browser-only tracking misses 20-40% of conversions due to iOS updates, ad blockers, and privacy
                  settings. This creates massive blind spots in your data.
                </p>
                <Separator />
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-sm">Implement bulletproof server-side event tracking</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-sm">Capture 100% of conversion events reliably</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-sm">Eliminate iOS 14.5+ tracking disruptions</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/20">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <div className="bg-orange-100 p-3 rounded-xl group-hover:bg-orange-200 transition-colors">
                    <BarChart3 className="h-8 w-8 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Weak Deduplication</CardTitle>
                    <CardDescription className="text-base">Duplicate events confusing algorithms</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Duplicate events confuse the algorithm and inflate your cost per acquisition metrics, leading to poor
                  bidding decisions and wasted budget.
                </p>
                <Separator />
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-sm">Advanced event deduplication logic</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-sm">Clean, accurate conversion data streams</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-sm">Eliminate false positive conversions</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/20">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <div className="bg-purple-100 p-3 rounded-xl group-hover:bg-purple-200 transition-colors">
                    <Target className="h-8 w-8 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">No Post-Lead or LTV Data</CardTitle>
                    <CardDescription className="text-base">Optimising for leads, not revenue</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Platforms optimise for leads, not revenue. Without value-based signals, you attract low-quality
                  prospects who don't convert to paying customers.
                </p>
                <Separator />
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-sm">Customer lifetime value tracking implementation</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-sm">Revenue-optimised bidding signals</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-sm">Post-purchase event tracking</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/20">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-xl group-hover:bg-blue-200 transition-colors">
                    <Zap className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Poor Match Rates</CardTitle>
                    <CardDescription className="text-base">Low-quality customer data</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Low-quality customer data reduces the platform's ability to find similar high-value prospects,
                  limiting your audience expansion potential.
                </p>
                <Separator />
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-sm">Enhanced customer data collection protocols</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-sm">Improved audience matching accuracy</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-sm">Higher-quality lookalike audiences</span>
                  </div>
                </div>
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
              See how our tracking optimisation has transformed businesses just like yours
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

          {/* Additional credibility row */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-8 px-8 py-4 bg-white rounded-2xl shadow-lg border border-slate-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">$62.7M+</div>
                <div className="text-sm text-muted-foreground">Revenue Uplift</div>
              </div>
              <Separator orientation="vertical" className="h-12" />
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">6+ Years</div>
                <div className="text-sm text-muted-foreground">Track Record</div>
              </div>
              <Separator orientation="vertical" className="h-12" />
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Businesses Helped</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mid-page CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
        <div className="container relative mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-primary-foreground mb-6">Ready to Recover Your Lost Profit?</h2>
          <p className="text-xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Get your free Conversion Signal Audit and discover exactly where your tracking is leaking revenue.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-background text-foreground hover:bg-background/90 px-10 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 group"
            onClick={() => openForm("mid_page")}
          >
            Book Your Free Audit Now
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              How We Optimise Your Data Infrastructure
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our proven three-step methodology transforms your tracking from liability to competitive advantage
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>
              <CardContent className="p-8 text-center">
                <div className="bg-blue-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-blue-200 transition-colors">
                  <span className="text-3xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Full-Funnel Event Mapping</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  We audit every touchpoint in your customer journey, identifying missing events and weak signal points
                  that are costing you conversions.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-blue-600 font-medium">
                  <BarChart3 className="w-4 h-4" />
                  <span>Comprehensive Analysis</span>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 to-green-600"></div>
              <CardContent className="p-8 text-center">
                <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-green-200 transition-colors">
                  <span className="text-3xl font-bold text-green-600">2</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Server + Browser-Side Optimisation</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  We implement dual-layer tracking that captures 100% of conversions while maintaining data accuracy and
                  compliance with privacy regulations.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-green-600 font-medium">
                  <Shield className="w-4 h-4" />
                  <span>Bulletproof Implementation</span>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-purple-600"></div>
              <CardContent className="p-8 text-center">
                <div className="bg-purple-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-purple-200 transition-colors">
                  <span className="text-3xl font-bold text-purple-600">3</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Funnel-Wide Signal Density Boost</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  We enhance your conversion signals with customer lifetime value data, enabling platforms to optimise
                  for revenue, not just volume.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-purple-600 font-medium">
                  <TrendingUp className="w-4 h-4" />
                  <span>Revenue Optimisation</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-6 px-4 py-2">
              <Star className="w-4 h-4 mr-2" />
              Free Audit Includes
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              What You Get in Your Free Conversion Signal Audit
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A comprehensive 30-minute assessment that reveals exactly where your tracking is failing and how to fix it
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="relative overflow-hidden border-2 border-blue-200 bg-gradient-to-br from-blue-50/50 to-background hover:shadow-2xl transition-all duration-300 group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-100 rounded-bl-full opacity-50"></div>
              <CardHeader className="relative">
                <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl mb-2">Signal Strength Score</CardTitle>
                <CardDescription className="text-base">
                  Comprehensive assessment of your current tracking infrastructure
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Separator />
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-sm">Event completeness analysis across all platforms</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-sm">Data quality assessment and scoring</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-sm">Platform integration review and optimisation</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-sm">Benchmarking against industry standards</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-2 border-green-200 bg-gradient-to-br from-green-50/50 to-background hover:shadow-2xl transition-all duration-300 group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-green-100 rounded-bl-full opacity-50"></div>
              <CardHeader className="relative">
                <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl mb-2">Lost Revenue Estimate</CardTitle>
                <CardDescription className="text-base">
                  Quantified analysis of profit currently being lost to poor tracking
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Separator />
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-sm">Monthly revenue leak calculation with projections</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-sm">ROAS improvement projections by platform</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-sm">Cost per acquisition impact analysis</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-sm">12-month profit recovery forecast</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-2 border-purple-200 bg-gradient-to-br from-purple-50/50 to-background hover:shadow-2xl transition-all duration-300 group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-purple-100 rounded-bl-full opacity-50"></div>
              <CardHeader className="relative">
                <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors">
                  <Target className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-2xl mb-2">Custom Fix Plan</CardTitle>
                <CardDescription className="text-base">
                  Tailored roadmap mapped specifically to your current tech stack
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Separator />
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-sm">Priority-ranked implementation steps</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-sm">Platform-specific optimisation guide</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-sm">Technical requirements breakdown</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-sm">Timeline and resource allocation</span>
                  </div>
                </div>
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
              Book Your Free Conversion Signal Audit
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
              If you're spending $10K+/month, and your tracking hasn't been reviewed in the last 30 days, you're likely
              leaving 30%+ on the table.
            </p>
          </div>

          <Card className="max-w-3xl mx-auto border-2 shadow-2xl">
            <CardContent className="p-12">
              <div className="text-center mb-10">
                <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-4">Schedule Your 30-Minute Assessment</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  We'll analyse your current tracking setup and identify immediate opportunities for profit recovery -
                  completely free, no strings attached.
                </p>
              </div>

              <Button
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-xl font-semibold mb-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
                onClick={() => openForm("final")}
              >
                Book Your Free Audit Now
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center justify-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm font-medium">No obligation</span>
                </div>
                <div className="flex items-center justify-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <span className="text-sm font-medium">30-minute session</span>
                </div>
                <div className="flex items-center justify-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <Zap className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                  <span className="text-sm font-medium">Immediate insights</span>
                </div>
              </div>

              <Separator className="mb-6" />

              <p className="text-muted-foreground text-center text-sm leading-relaxed">
                This audit is exclusively for businesses spending $10,000+ monthly on digital advertising. Limited
                availability - we only take on clients we can guarantee results for.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Debug Panel - only visible in development */}
      {process.env.NODE_ENV === "development" && <DebugPanel />}

      {/* Booking Form Modal */}
      <BookingForm isOpen={isFormOpen} onClose={closeForm} ctaLocation={currentCtaLocation} />
    </div>
  )
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    dataLayer: any[]
  }
}
