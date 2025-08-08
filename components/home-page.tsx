"use client"

import { useState, useEffect } from "react"
import { ArrowRight, BarChart3, Brain, CheckCircle, Mail, Phone, Target, Users, Zap, Star, Award, Rocket } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FacebookEvents } from "@/lib/facebook-conversions"

export default function HomePage() {
const [isTrafficFormOpen, setIsTrafficFormOpen] = useState(false)
const [isCrmFormOpen, setIsCrmFormOpen] = useState(false)
const [isGeneralFormOpen, setIsGeneralFormOpen] = useState(false)

useEffect(() => {
  // Send Facebook PageView event when homepage loads
  FacebookEvents.pageView()
}, [])

const openTrafficForm = async () => {
  setIsTrafficFormOpen(true)

  // Track form opening
  await FacebookEvents.viewContent(
    {}, // No user data yet
    {
      content_name: "Traffic Optimization Form",
      content_category: "lead_generation",
    },
  )
}

const openCrmForm = async () => {
  setIsCrmFormOpen(true)

  // Track form opening
  await FacebookEvents.viewContent(
    {}, // No user data yet
    {
      content_name: "CRM Systems Form",
      content_category: "lead_generation",
    },
  )
}

const openGeneralForm = async () => {
  setIsGeneralFormOpen(true)

  // Track form opening
  await FacebookEvents.viewContent(
    {}, // No user data yet
    {
      content_name: "General Consultation Form",
      content_category: "lead_generation",
    },
  )
}

const handleTrafficSubmit = async () => {
  // Get form data
  const firstName = (document.getElementById("traffic-firstName") as HTMLInputElement)?.value
  const lastName = (document.getElementById("traffic-lastName") as HTMLInputElement)?.value
  const email = (document.getElementById("traffic-email") as HTMLInputElement)?.value
  const company = (document.getElementById("traffic-company") as HTMLInputElement)?.value

  if (!firstName || !lastName || !email || !company) {
    alert("Please fill in all required fields")
    return
  }

  // Generate unique lead ID
  const leadId = `homepage_traffic_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  // Send Facebook Lead event
  await FacebookEvents.lead(
    {
      email: email,
      firstName: firstName,
      lastName: lastName,
      externalId: leadId,
    },
    {
      content_name: "Traffic Optimization Request",
      content_category: "homepage_lead",
      currency: "USD",
      value: 297.5, // Estimated lead value
    },
  )

  // Close form and show success
  setIsTrafficFormOpen(false)
  alert("Thank you! We'll contact you within 24 hours to discuss your traffic optimization needs.")
}

const handleCrmSubmit = async () => {
  // Get form data
  const firstName = (document.getElementById("crm-firstName") as HTMLInputElement)?.value
  const lastName = (document.getElementById("crm-lastName") as HTMLInputElement)?.value
  const email = (document.getElementById("crm-email") as HTMLInputElement)?.value
  const company = (document.getElementById("crm-company") as HTMLInputElement)?.value

  if (!firstName || !lastName || !email || !company) {
    alert("Please fill in all required fields")
    return
  }

  // Generate unique lead ID
  const leadId = `homepage_crm_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  // Send Facebook Lead event
  await FacebookEvents.lead(
    {
      email: email,
      firstName: firstName,
      lastName: lastName,
      externalId: leadId,
    },
    {
      content_name: "CRM Systems Consultation",
      content_category: "homepage_lead",
      currency: "USD",
      value: 497.5, // Estimated lead value
    },
  )

  // Close form and show success
  setIsCrmFormOpen(false)
  alert("Thank you! We'll contact you within 24 hours to discuss your CRM optimization needs.")
}

const handleGeneralSubmit = async () => {
  // Get form data
  const firstName = (document.getElementById("general-firstName") as HTMLInputElement)?.value
  const lastName = (document.getElementById("general-lastName") as HTMLInputElement)?.value
  const email = (document.getElementById("general-email") as HTMLInputElement)?.value
  const phone = (document.getElementById("general-phone") as HTMLInputElement)?.value
  const company = (document.getElementById("general-company") as HTMLInputElement)?.value

  if (!firstName || !lastName || !email || !phone || !company) {
    alert("Please fill in all required fields")
    return
  }

  // Generate unique lead ID
  const leadId = `homepage_general_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  // Send Facebook Lead event
  await FacebookEvents.lead(
    {
      email: email,
      phone: phone,
      firstName: firstName,
      lastName: lastName,
      externalId: leadId,
    },
    {
      content_name: "General Business Consultation",
      content_category: "homepage_lead",
      currency: "USD",
      value: 197.5, // Estimated lead value
    },
  )

  // Close form and show success
  setIsGeneralFormOpen(false)
  alert("Thank you! We'll contact you within 24 hours to schedule your free consultation.")
}

return (
  <div className="flex flex-col min-h-screen bg-white">
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
        <Link
          className="text-sm font-medium hover:text-profit-teal-500 transition-all duration-300 relative group"
          href="#services"
        >
          Services
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-profit-teal-500 transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link
          className="text-sm font-medium hover:text-profit-teal-500 transition-all duration-300 relative group"
          href="#about"
        >
          About
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-profit-teal-500 transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link
          className="text-sm font-medium hover:text-profit-teal-500 transition-all duration-300 relative group"
          href="#contact"
        >
          Contact
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-profit-teal-500 transition-all duration-300 group-hover:w-full"></span>
        </Link>
      </nav>
      <Button className="md:hidden bg-gradient-to-r from-profit-teal-500 to-profit-coral-500 text-white px-4 py-2 text-sm">
        Menu
      </Button>
    </header>

    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative w-full py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-profit-teal-50 via-white to-profit-coral-50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(4,176,186,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(240,92,62,0.1),transparent_50%)]"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
          <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8 text-center min-h-[40vh]">
            <div className="space-y-4 sm:space-y-6">
              <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-profit-teal-100 text-profit-teal-800 rounded-full text-xs sm:text-sm font-medium">
                <Rocket className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                Boost Your Business Growth
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-profit-teal-500 via-profit-coral-500 to-profit-teal-600 bg-clip-text text-transparent">
                  Profit Geeks
                </span>
              </h1>
              <p className="mx-auto max-w-[90%] sm:max-w-[600px] lg:max-w-[800px] text-slate-600 text-base sm:text-lg md:text-xl leading-relaxed px-4 sm:px-0">
                We specialise in data-driven paid traffic optimisation and intelligent CRM systems to maximise your
                business growth and profitability. Transform your marketing ROI today.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <Button
                size="lg"
                className="bg-gradient-to-r from-profit-teal-500 to-profit-coral-500 hover:from-profit-teal-600 hover:to-profit-coral-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                onClick={() => openGeneralForm()}
              >
                Get Started Today
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Link href="/attribution-fix">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-profit-teal-200 hover:border-profit-teal-300 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg hover:bg-profit-teal-50 transition-all duration-300 bg-transparent w-full sm:w-auto"
                >
                  Attribution Fix
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex justify-center w-full mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-profit-teal-100">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-12 max-w-2xl w-full">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-profit-teal-500">250%</div>
                  <div className="text-xs sm:text-sm text-slate-600 mt-1">Average ROI Increase</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-profit-coral-500">500+</div>
                  <div className="text-xs sm:text-sm text-slate-600 mt-1">Businesses Optimised</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-profit-teal-500">98%</div>
                  <div className="text-xs sm:text-sm text-slate-600 mt-1">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="w-full py-12 sm:py-16 md:py-24 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-profit-teal-100 text-profit-teal-800 rounded-full text-xs sm:text-sm font-medium mb-4">
              <Award className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Our Expertise
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">Our Core Services</h2>
            <p className="mx-auto max-w-[90%] sm:max-w-[700px] text-slate-600 text-base sm:text-lg px-4 sm:px-0">
              We focus on two critical areas that drive exponential business success
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
            {/* Paid Traffic Optimization */}
            <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white to-profit-teal-50">
              <div className="absolute inset-0 bg-gradient-to-br from-profit-teal-500/5 to-profit-coral-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative z-10 pb-4 sm:pb-6 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-4">
                  <div className="p-2 sm:p-3 bg-gradient-to-br from-profit-teal-500 to-profit-coral-500 rounded-xl shadow-lg self-start">
                    <Target className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl sm:text-2xl font-bold">Paid Traffic Optimisation</CardTitle>
                    <CardDescription className="text-sm sm:text-base text-slate-600 mt-1">
                      Data-driven strategies to maximise your advertising ROI
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative z-10 space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
                <div className="grid gap-3 sm:gap-4">
                  {[
                    "Advanced analytics and performance tracking",
                    "A/B testing and conversion optimisation",
                    "Multi-platform campaign management",
                    "Real-time bid optimisation",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start sm:items-center space-x-3 group/item">
                      <div className="p-1 bg-profit-teal-100 rounded-full group-hover/item:bg-profit-teal-200 transition-colors flex-shrink-0 mt-0.5 sm:mt-0">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-profit-teal-500" />
                      </div>
                      <span className="text-sm sm:text-base text-slate-700 leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button
                  className="w-full mt-4 sm:mt-6 bg-gradient-to-r from-profit-teal-500 to-profit-coral-500 hover:from-profit-teal-600 hover:to-profit-coral-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 py-2 sm:py-3"
                  onClick={() => openTrafficForm()}
                >
                  Optimise My Traffic
                  <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Intelligent CRM Systems */}
            <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white to-profit-coral-50">
              <div className="absolute inset-0 bg-gradient-to-br from-profit-coral-500/5 to-profit-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative z-10 pb-4 sm:pb-6 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-4">
                  <div className="p-2 sm:p-3 bg-gradient-to-br from-profit-coral-500 to-profit-teal-500 rounded-xl shadow-lg self-start">
                    <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl sm:text-2xl font-bold">Intelligent CRM Systems</CardTitle>
                    <CardDescription className="text-sm sm:text-base text-slate-600 mt-1">
                      Smart customer relationship management powered by AI
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative z-10 space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
                <div className="grid gap-3 sm:gap-4">
                  {[
                    "Automated lead scoring and nurturing",
                    "Predictive customer behaviour analysis",
                    "Personalised customer journeys",
                    "Integration with existing tools",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start sm:items-center space-x-3 group/item">
                      <div className="p-1 bg-profit-coral-100 rounded-full group-hover/item:bg-profit-coral-200 transition-colors flex-shrink-0 mt-0.5 sm:mt-0">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-profit-coral-500" />
                      </div>
                      <span className="text-sm sm:text-base text-slate-700 leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button
                  className="w-full mt-4 sm:mt-6 bg-gradient-to-r from-profit-coral-500 to-profit-teal-500 hover:from-profit-coral-600 hover:to-profit-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 py-2 sm:py-3"
                  onClick={() => openCrmForm()}
                >
                  Upgrade My CRM
                  <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 sm:py-16 md:py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(4,176,186,0.05),transparent_70%)]"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-profit-coral-100 text-profit-coral-800 rounded-full text-xs sm:text-sm font-medium mb-4">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Why Choose Us
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Why Choose Profit Geeks?
            </h2>
            <p className="mx-auto max-w-[90%] sm:max-w-[700px] text-slate-600 text-base sm:text-lg px-4 sm:px-0">
              We combine technical expertise with business acumen to deliver measurable results
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {[
              {
                icon: BarChart3,
                title: "Data-Driven Approach",
                description: "Every decision is backed by comprehensive data analysis and proven methodologies",
                color: "teal",
              },
              {
                icon: Zap,
                title: "Rapid Implementation",
                description: "Quick deployment and optimisation to start seeing results in weeks, not months",
                color: "coral",
              },
              {
                icon: Users,
                title: "Expert Team",
                description: "Seasoned professionals with deep expertise in digital marketing and CRM optimisation",
                color: "teal",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="group text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white to-slate-50 md:col-span-1 lg:col-span-1"
              >
                <CardContent className="p-6 sm:p-8">
                  <div
                    className={`inline-flex p-3 sm:p-4 rounded-2xl bg-gradient-to-br ${
                      feature.color === "teal"
                        ? "from-profit-teal-500 to-profit-coral-500"
                        : "from-profit-coral-500 to-profit-teal-500"
                    } shadow-lg mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="w-full py-12 sm:py-16 md:py-24 lg:py-32 bg-gradient-to-br from-slate-50 to-profit-teal-50"
      >
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-profit-teal-100 text-profit-teal-800 rounded-full text-xs sm:text-sm font-medium mb-4">
              <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Get In Touch
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Ready to Boost Your Profits?
            </h2>
            <p className="mx-auto max-w-[90%] sm:max-w-[700px] text-slate-600 text-base sm:text-lg px-4 sm:px-0">
              Get in touch with us to discuss how we can optimise your business growth
            </p>
          </div>

          <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 max-w-6xl mx-auto">
            <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
              <div className="flex items-start space-x-3 sm:space-x-4 p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
                <div className="p-2 sm:p-3 bg-gradient-to-br from-profit-teal-500 to-profit-coral-500 rounded-xl flex-shrink-0">
                  <Mail className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg mb-1">Email Us</h3>
                  <p className="text-slate-600 text-sm sm:text-base">support@profitgeeks.com.au</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 sm:space-x-4 p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
                <div className="p-2 sm:p-3 bg-gradient-to-br from-profit-coral-500 to-profit-teal-500 rounded-xl flex-shrink-0">
                  <Phone className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg mb-1">Call Us</h3>
                  <p className="text-slate-600 text-sm sm:text-base">+61 455 221 921</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-profit-teal-500 to-profit-coral-500 p-6 sm:p-8 rounded-2xl text-white shadow-xl">
                <h3 className="font-bold text-lg sm:text-xl mb-3">Free Consultation</h3>
                <p className="text-profit-teal-100 leading-relaxed text-sm sm:text-base mb-4">
                  Book a 30-minute strategy session to discover how we can increase your profits by up to 250%
                </p>
                <Button
                  className="bg-white text-profit-teal-600 hover:bg-profit-teal-50 text-sm sm:text-base px-4 sm:px-6 py-2"
                  onClick={() => openGeneralForm()}
                >
                  Book Now
                </Button>
              </div>
            </div>

            <Card className="border-0 shadow-2xl bg-white order-1 lg:order-2">
              <CardHeader className="pb-4 sm:pb-6 p-4 sm:p-6">
                <CardTitle className="text-xl sm:text-2xl">Send us a message</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  {"We'll get back to you within 24 hours"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
                <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                  <Input
                    placeholder="First name"
                    className="border-2 border-slate-200 focus:border-profit-teal-500 text-sm sm:text-base"
                  />
                  <Input
                    placeholder="Last name"
                    className="border-2 border-slate-200 focus:border-profit-teal-500 text-sm sm:text-base"
                  />
                </div>
                <Input
                  placeholder="Email"
                  type="email"
                  className="border-2 border-slate-200 focus:border-profit-teal-500 text-sm sm:text-base"
                />
                <Input
                  placeholder="Company"
                  className="border-2 border-slate-200 focus:border-profit-teal-500 text-sm sm:text-base"
                />
                <Textarea
                  placeholder="Tell us about your business goals..."
                  className="min-h-[100px] sm:min-h-[120px] border-2 border-slate-200 focus:border-profit-teal-500 text-sm sm:text-base"
                />
                <Button className="w-full bg-gradient-to-r from-profit-teal-500 to-profit-coral-500 hover:from-profit-teal-600 hover:to-profit-coral-600 text-white py-2 sm:py-3 shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base">
                  Send Message
                  <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>

    {/* Footer */}
    <footer className="bg-gradient-to-r from-profit-teal-500 to-profit-coral-500 text-white py-8 sm:py-12">
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
          <p className="text-white/90 text-sm sm:text-base text-center sm:text-right">
            © 2025 Profit Geeks. All rights reserved.
          </p>
        </div>
      </div>
    </footer>

    {/* Traffic Optimization Form */}
    <Dialog
      open={isTrafficFormOpen}
      onOpenChange={(open) => {
        if (!open) {
          // Track form abandonment
          FacebookEvents.viewContent(
            {},
            {
              content_name: "Traffic Form Abandoned",
              content_category: "form_abandonment",
            },
          )
        }
        setIsTrafficFormOpen(open)
      }}
    >
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="sticky top-0 bg-white pb-4 border-b">
          <DialogTitle className="text-xl font-bold flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-profit-teal-500 to-profit-coral-500 rounded-xl">
              <Target className="h-6 w-6 text-white" />
            </div>
            Paid Traffic Optimization
          </DialogTitle>

          <DialogDescription>
            Get a free audit of your current advertising campaigns and discover optimization opportunities.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <form className="space-y-4">
            {/* Keep all existing form fields exactly the same */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="traffic-firstName">First Name *</Label>
                <Input
                  id="traffic-firstName"
                  placeholder="John"
                  className="border-2 border-slate-200 focus:border-profit-teal-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="traffic-lastName">Last Name *</Label>
                <Input
                  id="traffic-lastName"
                  placeholder="Smith"
                  className="border-2 border-slate-200 focus:border-profit-teal-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="traffic-email">Business Email *</Label>
              <Input
                id="traffic-email"
                type="email"
                placeholder="john@company.com"
                className="border-2 border-slate-200 focus:border-profit-teal-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="traffic-company">Company Name *</Label>
              <Input
                id="traffic-company"
                placeholder="Your Company Inc."
                className="border-2 border-slate-200 focus:border-profit-teal-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="traffic-spend">Monthly Ad Spend *</Label>
              <Select>
                <SelectTrigger className="border-2 border-slate-200 focus:border-profit-teal-500">
                  <SelectValue placeholder="Select your monthly ad spend" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5k-10k">$5K - $10K</SelectItem>
                  <SelectItem value="10k-25k">$10K - $25K</SelectItem>
                  <SelectItem value="25k-50k">$25K - $50K</SelectItem>
                  <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                  <SelectItem value="100k+">$100K+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="traffic-platforms">Primary Platforms *</Label>
              <Select>
                <SelectTrigger className="border-2 border-slate-200 focus:border-profit-teal-500">
                  <SelectValue placeholder="Select your primary platforms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="meta-google">Meta + Google</SelectItem>
                  <SelectItem value="meta-google-tiktok">Meta + Google + TikTok</SelectItem>
                  <SelectItem value="all-platforms">All Platforms</SelectItem>
                  <SelectItem value="meta-only">Meta Only</SelectItem>
                  <SelectItem value="google-only">Google Only</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="traffic-challenges">Current Challenges (Optional)</Label>
              <Textarea
                id="traffic-challenges"
                placeholder="e.g., High CPA, low ROAS, attribution issues..."
                className="border-2 border-slate-200 focus:border-profit-teal-500"
                rows={3}
              />
            </div>

            <div className="sticky bottom-0 bg-white pt-4 border-t">
              <Button
                className="w-full bg-gradient-to-r from-profit-teal-500 to-profit-coral-500 hover:from-profit-teal-600 hover:to-profit-coral-600 text-white py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={handleTrafficSubmit}
              >
                Request Traffic Audit
                <Target className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>

    {/* CRM Systems Form */}
    <Dialog
      open={isCrmFormOpen}
      onOpenChange={(open) => {
        if (!open) {
          // Track form abandonment
          FacebookEvents.viewContent(
            {},
            {
              content_name: "CRM Form Abandoned",
              content_category: "form_abandonment",
            },
          )
        }
        setIsCrmFormOpen(open)
      }}
    >
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="sticky top-0 bg-white pb-4 border-b">
          <DialogTitle className="text-xl font-bold flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-profit-coral-500 to-profit-teal-500 rounded-xl">
              <Brain className="h-6 w-6 text-white" />
            </div>
            Intelligent CRM Systems
          </DialogTitle>
          <DialogDescription>
            Discover how AI-powered CRM can transform your customer relationships and boost conversions.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <form className="space-y-4">
            {/* Keep all existing form fields exactly the same */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="crm-firstName">First Name *</Label>
                <Input
                  id="crm-firstName"
                  placeholder="John"
                  className="border-2 border-slate-200 focus:border-profit-coral-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="crm-lastName">Last Name *</Label>
                <Input
                  id="crm-lastName"
                  placeholder="Smith"
                  className="border-2 border-slate-200 focus:border-profit-coral-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="crm-email">Business Email *</Label>
              <Input
                id="crm-email"
                type="email"
                placeholder="john@company.com"
                className="border-2 border-slate-200 focus:border-profit-coral-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="crm-company">Company Name *</Label>
              <Input
                id="crm-company"
                placeholder="Your Company Inc."
                className="border-2 border-slate-200 focus:border-profit-coral-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="crm-size">Team Size *</Label>
              <Select>
                <SelectTrigger className="border-2 border-slate-200 focus:border-profit-coral-500">
                  <SelectValue placeholder="Select your team size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-5">1-5 people</SelectItem>
                  <SelectItem value="6-20">6-20 people</SelectItem>
                  <SelectItem value="21-50">21-50 people</SelectItem>
                  <SelectItem value="51-100">51-100 people</SelectItem>
                  <SelectItem value="100+">100+ people</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="crm-current">Current CRM System</Label>
              <Select>
                <SelectTrigger className="border-2 border-slate-200 focus:border-profit-coral-500">
                  <SelectValue placeholder="Select your current CRM" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No CRM system</SelectItem>
                  <SelectItem value="hubspot">HubSpot</SelectItem>
                  <SelectItem value="salesforce">Salesforce</SelectItem>
                  <SelectItem value="pipedrive">Pipedrive</SelectItem>
                  <SelectItem value="zoho">Zoho CRM</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="crm-goals">CRM Goals (Optional)</Label>
              <Textarea
                id="crm-goals"
                placeholder="e.g., Better lead scoring, automated nurturing, integration needs..."
                className="border-2 border-slate-200 focus:border-profit-coral-500"
                rows={3}
              />
            </div>

            <div className="sticky bottom-0 bg-white pt-4 border-t">
              <Button
                className="w-full bg-gradient-to-r from-profit-coral-500 to-profit-teal-500 hover:from-profit-coral-600 hover:to-profit-teal-600 text-white py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={handleCrmSubmit}
              >
                Request CRM Consultation
                <Brain className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>

    {/* General Consultation Form */}
    <Dialog
      open={isGeneralFormOpen}
      onOpenChange={(open) => {
        if (!open) {
          // Track form abandonment
          FacebookEvents.viewContent(
            {},
            {
              content_name: "General Form Abandoned",
              content_category: "form_abandonment",
            },
          )
        }
        setIsGeneralFormOpen(open)
      }}
    >
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="sticky top-0 bg-white pb-4 border-b">
          <DialogTitle className="text-xl font-bold flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-profit-teal-500 to-profit-coral-500 rounded-xl">
              <Rocket className="h-6 w-6 text-white" />
            </div>
            Free Business Growth Consultation
          </DialogTitle>
          <DialogDescription>
            Book a 30-minute strategy session to discover how we can boost your business growth and profitability.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <form className="space-y-4">
            {/* Keep all existing form fields exactly the same */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="general-firstName">First Name *</Label>
                <Input
                  id="general-firstName"
                  placeholder="John"
                  className="border-2 border-slate-200 focus:border-profit-teal-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="general-lastName">Last Name *</Label>
                <Input
                  id="general-lastName"
                  placeholder="Smith"
                  className="border-2 border-slate-200 focus:border-profit-teal-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="general-email">Business Email *</Label>
              <Input
                id="general-email"
                type="email"
                placeholder="john@company.com"
                className="border-2 border-slate-200 focus:border-profit-teal-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="general-phone">Phone Number *</Label>
              <Input
                id="general-phone"
                type="tel"
                placeholder="+61 2 1234 5678"
                className="border-2 border-slate-200 focus:border-profit-teal-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="general-company">Company Name *</Label>
              <Input
                id="general-company"
                placeholder="Your Company Inc."
                className="border-2 border-slate-200 focus:border-profit-teal-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="general-revenue">Annual Revenue *</Label>
              <Select>
                <SelectTrigger className="border-2 border-slate-200 focus:border-profit-teal-500">
                  <SelectValue placeholder="Select your annual revenue" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-100k">Under $100K</SelectItem>
                  <SelectItem value="100k-500k">$100K - $500K</SelectItem>
                  <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                  <SelectItem value="1m-5m">$1M - $5M</SelectItem>
                  <SelectItem value="5m+">$5M+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="general-interest">Primary Interest *</Label>
              <Select>
                <SelectTrigger className="border-2 border-slate-200 focus:border-profit-teal-500">
                  <SelectValue placeholder="What interests you most?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="traffic">Paid Traffic Optimization</SelectItem>
                  <SelectItem value="crm">Intelligent CRM Systems</SelectItem>
                  <SelectItem value="both">Both Services</SelectItem>
                  <SelectItem value="other">Other/Not Sure</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="general-goals">Business Goals (Optional)</Label>
              <Textarea
                id="general-goals"
                placeholder="Tell us about your current challenges and growth goals..."
                className="border-2 border-slate-200 focus:border-profit-teal-500"
                rows={3}
              />
            </div>

            <div className="sticky bottom-0 bg-white pt-4 border-t">
              <Button
                className="w-full bg-gradient-to-r from-profit-teal-500 to-profit-coral-500 hover:from-profit-teal-600 hover:to-profit-coral-600 text-white py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={handleGeneralSubmit}
              >
                Book Free Consultation
                <Rocket className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  </div>
)
}
