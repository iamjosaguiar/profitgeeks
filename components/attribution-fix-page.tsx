"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import BookingForm from '@/components/booking-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { CheckCircle, TrendingUp, Target, Zap, BarChart3, Shield, ArrowRight, AlertTriangle, Users, Clock, Star, X, HelpCircle, DollarSign } from 'lucide-react'
import ImplementationTimeline from '@/components/implementation-timeline'
import { FacebookEvents } from '@/lib/facebook-conversions'

export default function AttributionFixPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [currentCtaLocation, setCurrentCtaLocation] = useState('')

  useEffect(() => {
    FacebookEvents.pageView()
  }, [])

  const openForm = async (ctaLocation: string) => {
    setCurrentCtaLocation(ctaLocation)
    setIsFormOpen(true)
    await FacebookEvents.viewContent(
      {},
      {
        content_name: 'Attribution Fix Booking Form',
        content_category: 'attribution_fix_lead_generation',
      },
    )
  }

  const closeForm = () => {
    setIsFormOpen(false)
    setCurrentCtaLocation('')
  }

  const faqItems = [
    {
      q: 'What platforms do you support?',
      a: 'Meta, Google, TikTok, YouTube, LinkedIn, Pinterest, Reddit, Snapchat, native ads and more. If the platform supports API signals, we can optimise it.',
    },
    {
      q: 'What CRMs are compatible?',
      a: 'All major CRMs incl. HubSpot, Salesforce, Pipedrive, ActiveCampaign, GoHighLevel, Keap, Zoho, Monday.com, and any API-compatible custom stack.',
    },
    {
      q: 'How long until we see results?',
      a: 'Typically 2-4 weeks for platform feedback improvements, and full ROI lift by Weeks 6-8. The biggest results compound over 6-12 months.',
    },
    {
      q: 'Is this eCom-friendly?',
      a: 'Yes. Everything we do applies to eCom as much as lead gen: cart events, upsells, repeat purchases, LTV tracking, etc.',
    },
    {
      q: 'What if our tracking is broken?',
      a: 'Perfect. Starting from zero is often cleaner than patching. We rebuild signal systems from scratch if needed.',
    },
    {
      q: 'What\'s the investment?',
      a: 'Most packages range $15K-$50K depending on your complexity, stack, and platform count. We\'ll quote after your free implementation call.',
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header (match homepage) */}
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
          <Link
            className="text-sm font-medium hover:text-profit-teal-500 transition-all duration-300 relative group"
            href="/"
          >
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-profit-teal-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            className="text-sm font-medium hover:text-profit-teal-500 transition-all duration-300 relative group"
            href="/attribution-fix"
          >
            Attribution Fix
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-profit-teal-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>
        <Button className="md:hidden bg-gradient-to-r from-profit-teal-500 to-profit-coral-500 text-white px-4 py-2 text-sm">Menu</Button>
      </header>

      {/* Hero (match homepage background aesthetic) */}
      <section className="relative w-full py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-profit-teal-50 via-white to-profit-coral-50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(4,176,186,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(240,92,62,0.1),transparent_50%)]"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
          <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8 text-center min-h-[35vh]">
            <div className="space-y-4 sm:space-y-6">
              <Badge className="mb-2 bg-profit-coral-100 text-profit-coral-800 border border-profit-coral-200">
                Stop Losing Revenue
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                Stop Losing Up to <span className="bg-gradient-to-r from-profit-teal-500 to-profit-coral-500 bg-clip-text text-transparent">35%</span> of Your Ad Budget to Broken Attribution
              </h1>
              <p className="mx-auto max-w-[90%] sm:max-w-[700px] text-slate-600 text-base sm:text-lg md:text-xl leading-relaxed px-4 sm:px-0">
                If you're spending $10K+ per month on ads, there's a hidden leak costing you hundreds of thousands every year - and your media buyer can't see it.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <Button
                onClick={() => openForm('hero')}
                size="lg"
                className="bg-gradient-to-r from-profit-teal-500 to-profit-coral-500 hover:from-profit-teal-600 hover:to-profit-coral-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
              >
                Get Your Backend Fixed
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics (ported from landing page) */}
      <section className="w-full py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 border-profit-teal-200 bg-profit-teal-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-profit-teal-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="h-10 w-10 text-profit-teal-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Average Recovery</h3>
                <p className="text-4xl font-bold text-profit-teal-600 mb-2">30-45%</p>
                <p className="text-slate-500">Additional profit identified</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-profit-coral-200 bg-profit-coral-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-profit-coral-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="h-10 w-10 text-profit-coral-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Implementation</h3>
                <p className="text-4xl font-bold text-profit-coral-600 mb-2">2-4 Weeks</p>
                <p className="text-slate-500">To full optimisation</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-profit-teal-200 bg-profit-teal-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-profit-teal-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="h-10 w-10 text-profit-teal-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">ROAS Improvement</h3>
                <p className="text-4xl font-bold text-profit-teal-600 mb-2">2-4x</p>
                <p className="text-slate-500">Within 30 days</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* This Is For You If */}
      <section className="w-full py-12 sm:py-16 md:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900">This Is For You If:</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-profit-teal-500 mt-1 flex-shrink-0" />
                  <p className="text-lg text-gray-700">
                    You're spending <strong>$10,000+/month</strong> on Meta, Google, TikTok or multi-platform ads
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-profit-teal-500 mt-1 flex-shrink-0" />
                  <p className="text-lg text-gray-700">
                    You're scaling aggressively and need <strong>revenue clarity</strong>, not just leads
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-profit-teal-500 mt-1 flex-shrink-0" />
                  <p className="text-lg text-gray-700">You have a CRM and funnels in place, but you lack <strong>clear attribution</strong></p>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-profit-coral-500">
              <h3 className="font-semibold text-slate-800 mb-3">Not for:</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <X className="h-4 w-4 text-slate-500" />
                  <span className="text-slate-700">Beginners</span>
                </div>
                <div className="flex items-center gap-2">
                  <X className="h-4 w-4 text-slate-500" />
                  <span className="text-slate-700">Under $10k/month spenders</span>
                </div>
                <div className="flex items-center gap-2">
                  <X className="h-4 w-4 text-slate-500" />
                  <span className="text-slate-700">Teams without CRM infrastructure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hidden Profit Leak - fully matched from Tracking Audit section */}
      <section className="w-full py-12 sm:py-16 md:py-24 lg:py-32 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-12 sm:mb-16">
            <Badge className="mb-4 bg-profit-coral-100 text-profit-coral-800 border border-profit-coral-200">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Critical Issue
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-gray-900">The Hidden Profit Leak Your Media Buyer Can't See</h2>
          </div>

          <Card className="border-2 shadow-xl bg-white mb-12">
            <CardContent className="p-10">
              <div className="space-y-8">
                <div className="text-center">
                  <p className="text-2xl text-slate-600 leading-relaxed mb-4">
                    Your media buyer isn't the problem. <span className="font-bold text-slate-900">Your data infrastructure is.</span>
                  </p>
                </div>

                <Separator />

                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                      Platforms like Meta, Google, and TikTok can only optimise based on the quality of signals you send them. Most businesses are systematically underfeeding the algorithm, sending only top-of-funnel data (leads) or incomplete purchase events.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span>Signal Quality Score</span>
                      <span className="text-red-600 font-semibold">Poor</span>
                    </div>
                    <Progress value={25} className="h-3" />
                    <p className="text-xs text-slate-500">Most businesses operate at 25% signal efficiency</p>
                  </div>
                </div>

                <Card className="bg-destructive/5 border-destructive/20">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <AlertTriangle className="h-6 w-6 text-destructive mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-destructive mb-2">The Reality:</p>
                        <p className="text-slate-700">Weak signals = Poor match rates = Less optimisation power = Wasted ad spend</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <p className="text-lg text-slate-600 leading-relaxed">
                  When your tracking infrastructure sends incomplete or delayed conversion data, the algorithm makes suboptimal bidding decisions. This compounds daily, creating a systematic profit leak that grows with your ad spend.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Case Study */}
      <section className="w-full py-12 sm:py-16 md:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-profit-teal-100 text-profit-teal-800 border border-profit-teal-200">Proof in Performance</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gray-900">Case Study: Lead Gen Agency</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900">The Situation</h3>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                A fast-moving pay-per-lead agency was generating solid revenue, averaging $30,000/month. But growth had plateaued. Margins were shrinking, delivery confidence was low, and campaign performance had become unpredictable.
              </p>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                They were scaling revenue, but without attribution clarity - and it was killing their confidence.
              </p>

              <h4 className="text-xl font-semibold mb-4 text-gray-900">The Core Problems</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <X className="h-5 w-5 text-profit-coral mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Tracking Stopped at Form Fill</p>
                    <p className="text-gray-600">No insight into whether leads were accepted, rejected, or qualified.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <X className="h-5 w-5 text-profit-coral mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Inconsistent Attribution</p>
                    <p className="text-gray-600">UTMs were inconsistently applied, with no correlation to actual revenue.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <X className="h-5 w-5 text-profit-coral mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">False Platform Signals</p>
                    <p className="text-gray-600">Poor quality leads were reinforced by platforms. Profitable campaigns were shut down.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <X className="h-5 w-5 text-profit-coral mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Wrong Optimisation Metric</p>
                    <p className="text-gray-600">Media buyers were optimising for CPL instead of revenue-producing metrics.</p>
                  </div>
                </div>
              </div>

                <div className="bg-gradient-to-r from-profit-teal-500/5 to-profit-coral-500/5 p-6 rounded-lg mt-8 border-l-4 border-profit-teal-500">
                <p className="text-slate-800 italic text-lg">
                  "We were relying on guesswork. Our best campaigns were getting shut down. We didn't even realise how much money we were losing."
                </p>
              </div>
            </div>

            <div className="lg:sticky lg:top-8">
              <div className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-lg border border-slate-200">
                <h4 className="text-lg font-semibold mb-4 text-gray-900">The Dashboard We Built</h4>
                <div className="relative">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PPL%20Performance%20Jan%202024.PNG-irVptBew7mu93GbzMDOuR0ImIOW4pM.png"
                    alt="Real Dashboard Results - CPAL metric at $47.91"
                    className="rounded-lg shadow-lg w-full"
                    width={600}
                    height={400}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm font-medium">Real Dashboard, Real Results</p>
                    <p className="text-xs opacity-90">CPAL: $47.91 - Their new north star metric</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  The CPAL metric was displayed at $47.91 - this became their north star, aligning the team around profitable delivery rather than just lead volume.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Implemented */}
      <section className="w-full py-12 sm:py-16 md:py-24 lg:py-32 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-12 text-center text-gray-900">What We Implemented</h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="p-6 border-2 border-profit-teal-200 bg-gradient-to-br from-white to-profit-teal-50">
              <Zap className="h-12 w-12 text-profit-teal-500 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Attribution & Signal System Rebuild</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Implemented Conversion API + browser tracking with deduplication</li>
                <li>• Passed click IDs (fbclid, gclid, ttclid) into the CRM</li>
                <li>• Standardised UTMs across all campaigns</li>
                <li>• Created custom conversion events tied to client-accepted leads</li>
                <li>• Built platform feedback loops with verified, revenue-linked events</li>
              </ul>
            </Card>

            <Card className="p-6 border-2 border-profit-coral-200 bg-gradient-to-br from-white to-profit-coral-50">
              <TrendingUp className="h-12 w-12 text-profit-coral-500 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Path-to-Revenue Signal Mapping</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Tracked micro-conversions (form started, phone provided, validated, assigned)</li>
                <li>• Mapped journey from ad click → lead form → qualification → payment</li>
                <li>• Identified campaigns with high CPL junk vs. high revenue conversion</li>
                <li>• Created insight loops for targeting, copy, and funnel optimisation</li>
              </ul>
            </Card>

            <Card className="p-6 border-2 border-profit-teal-200 bg-gradient-to-br from-white to-profit-teal-50">
              <BarChart3 className="h-12 w-12 text-profit-teal-500 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Dashboard & North Star KPI</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Replaced Cost Per Lead (CPL) with Cost Per Assigned Lead (CPAL)</li>
                <li>• Built real-time dashboard breaking down CPAL by campaign and platform</li>
                <li>• Empowered team with faster, revenue-aligned decision making</li>
                <li>• Created operational command centre for entire agency</li>
              </ul>
            </Card>
          </div>

          {/* Results Timeline */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-slate-200">
            <h3 className="text-2xl font-bold mb-8 text-center text-gray-900">Results Timeline</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-gradient-to-br from-profit-teal to-profit-coral w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-lg mb-2">90 Days</h4>
                <p className="text-gray-600">
                  Recovered lost revenue, improved ROAS, platform algorithms optimised against verified conversion data.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-br from-profit-teal to-profit-coral w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-lg mb-2">6 Months</h4>
                <p className="text-gray-600">
                  Dashboard became daily operational centre. Paused campaigns reactivated. Messaging and creative refined.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-br from-profit-teal to-profit-coral w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-lg mb-2">12 Months</h4>
                <p className="text-gray-600">
                  Profit scaled from $30K/month to $300K/month. Team scaled with confidence. Attribution system became a competitive moat.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-profit-teal-500/5 to-profit-coral-500/5 p-6 rounded-lg mt-8 border-l-4 border-profit-teal-500 text-center">
              <p className="text-slate-800 italic text-xl font-medium">
                "CPAL changed the game for us. We're not just generating leads anymore - we're scaling profitable delivery."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bonus Add-Ons */}
      <section className="w-full py-12 sm:py-16 md:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-12 text-center text-gray-900">Bonus Revenue Expansion Add-Ons</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-lg transition-all duration-300 border border-profit-teal-200">
              <Shield className="h-8 w-8 text-profit-teal-500 mb-3" />
              <h3 className="font-semibold mb-2">Advanced UTM & tracking template automation</h3>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-all duration-300 border border-profit-coral-200">
              <BarChart3 className="h-8 w-8 text-profit-coral-500 mb-3" />
              <h3 className="font-semibold mb-2">Real-time attribution models (first-click, last-click, multi-touch)</h3>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-all duration-300 border border-profit-teal-200">
              <Target className="h-8 w-8 text-profit-teal-500 mb-3" />
              <h3 className="font-semibold mb-2">Enrichment-based retargeting audiences</h3>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-all duration-300 border border-profit-coral-200">
              <Users className="h-8 w-8 text-profit-coral-500 mb-3" />
              <h3 className="font-semibold mb-2">Lead reactivation sequences</h3>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-all duration-300 border border-profit-teal-200">
              <Zap className="h-8 w-8 text-profit-teal-500 mb-3" />
              <h3 className="font-semibold mb-2">AI lead scoring (post Month 3)</h3>
            </Card>
          </div>
        </div>
      </section>

      {/* Implementation Timeline */}
      <ImplementationTimeline />

      {/* FAQ */}
      <section className="w-full py-12 sm:py-16 md:py-24 lg:py-32 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-12 text-center text-gray-900">Frequently Asked Questions</h2>

          <div className="space-y-6">
            {faqItems.map((item, i) => (
              <Card key={i} className="p-6 hover:shadow-lg transition-all duration-300 border border-slate-200">
                <h3 className="text-lg font-semibold mb-3 text-gray-900 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-profit-teal-500 to-profit-coral-500 rounded-full flex items-center justify-center">
                    <HelpCircle className="h-4 w-4 text-white" />
                  </div>
                  {item.q}
                </h3>
                <p className="text-gray-700 ml-11">{item.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA (light aesthetic to match homepage) */}
      <section className="w-full py-12 sm:py-16 md:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 text-gray-900">Let's Fix This Once. Not Keep Patching.</h2>
          <p className="mx-auto max-w-[90%] sm:max-w-[700px] text-slate-600 text-base sm:text-lg md:text-xl leading-relaxed mb-6">
            Stop guessing which ads work. Stop feeding junk data to billion-dollar algorithms. Stop losing margin to blind optimisation.
          </p>
          <p className="text-2xl font-semibold mb-8">Let's fix it properly.</p>

          <div className="bg-gradient-to-br from-profit-teal-50 to-profit-coral-50 p-8 rounded-lg mb-8 border border-slate-200">
            <div className="flex items-center justify-center gap-2 mb-4">
              <CheckCircle className="h-6 w-6 text-profit-teal-500" />
              <span className="text-lg font-semibold text-slate-900">Schedule Your Implementation Call</span>
            </div>
            <p className="text-slate-700 mb-2">
              This call is free. No strings. We'll audit your current setup and map a custom implementation plan for your business.
            </p>
            <p className="text-sm text-slate-600">Strictly limited spots available. We only take on clients we can deliver guaranteed ROI for.</p>
          </div>

          <Button
            onClick={() => openForm('final')}
            size="lg"
            className="bg-gradient-to-r from-profit-teal-500 to-profit-coral-500 hover:from-profit-teal-600 hover:to-profit-coral-600 text-white font-semibold px-12 py-4 text-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Get Your Backend Fixed
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </div>
      </section>

      {/* Footer (match homepage) */}
      <footer className="bg-gradient-to-r from-profit-teal-500 to-profit-coral-500 text-white py-8 sm:py-12 mt-auto">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Image
                src="/images/profit-geeks-logo.png"
                alt="Profit Geeks"
                width={160}
                height={35}
                className="h-7 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-white/90 text-sm sm:text-base text-center sm:text-right">© 2025 Profit Geeks. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Booking Form Modal */}
      {isFormOpen && <BookingForm isOpen={isFormOpen} onClose={closeForm} ctaLocation={currentCtaLocation} />}
    </div>
  )
}
