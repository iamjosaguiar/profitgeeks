"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, ArrowRight, ArrowLeft, User, Building, DollarSign, MessageSquare } from 'lucide-react'
import { FacebookEvents } from "@/lib/facebook-conversions"

interface BookingFormProps {
  isOpen: boolean
  onClose: () => void
  ctaLocation: string
}

// GTM tracking function
const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...parameters,
    })
  }
}

export default function BookingForm({ isOpen, onClose, ctaLocation }: BookingFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    monthlyAdSpend: "",
    platforms: "",
    currentChallenges: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = async () => {
    if (currentStep < totalSteps) {
      // Track GTM event
      trackEvent("form_step_completed", {
        step: currentStep,
        cta_location: ctaLocation,
        form_type: "multi_step_booking",
      })

      // Send Facebook Conversion API event for step completion (only if we have email)
      if (currentStep === 1 && formData.email) {
        await FacebookEvents.viewContent(
          {
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            country: "US", // Default to US, could be detected
            externalId: `lead_${Date.now()}`, // Generate unique lead ID
          },
          {
            content_name: "Booking Form Step 1 Completed",
            content_category: "form_progress",
          },
        )
      }

      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Generate unique lead ID
      const leadId = `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

      // Track GTM form submission
      trackEvent("form_submit", {
        form_type: "multi_step_booking",
        cta_location: ctaLocation,
        monthly_ad_spend: formData.monthlyAdSpend,
        platforms: formData.platforms,
        steps_completed: totalSteps,
        lead_id: leadId,
      })

      // Send Facebook Lead event with comprehensive data
      if (formData.email) {
        await FacebookEvents.lead(
          {
            email: formData.email,
            phone: formData.phone,
            firstName: formData.firstName,
            lastName: formData.lastName,
            country: "US", // Could be detected from IP or form field
            externalId: leadId,
          },
          {
            content_name: "Conversion Signal Audit",
            content_category: "lead_generation",
            currency: "USD",
            value: 142.52, // Estimated lead value
          },
        )
      }

      // Simulate form submission (replace with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Track successful submission
      trackEvent("form_submit_success", {
        form_type: "multi_step_booking",
        cta_location: ctaLocation,
        lead_id: leadId,
      })

      // Send Facebook Complete Registration event
      if (formData.email) {
        await FacebookEvents.completeRegistration(
          {
            email: formData.email,
            phone: formData.phone,
            firstName: formData.firstName,
            lastName: formData.lastName,
            country: "US",
            externalId: leadId,
          },
          {
            content_name: "Conversion Signal Audit Booking",
            status: "completed",
            currency: "USD",
            value: 142.52,
          },
        )
      }

      setIsSubmitting(false)
      setShowThankYou(true)
    } catch (error) {
      console.error("Form submission error:", error)
      setIsSubmitting(false)
      // Handle error state here
    }
  }

  const handleClose = async () => {
    if (showThankYou) {
      setShowThankYou(false)
      setCurrentStep(1)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        monthlyAdSpend: "",
        platforms: "",
        currentChallenges: "",
      })
    } else {
      // Track form abandonment
      trackEvent("form_abandoned", {
        step: currentStep,
        cta_location: ctaLocation,
        form_type: "multi_step_booking",
      })

      // Send Facebook event for form abandonment only if we have email
      if (formData.email) {
        await FacebookEvents.viewContent(
          {
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            country: "US",
            externalId: `abandoned_${Date.now()}`,
          },
          {
            content_name: "Booking Form Abandoned",
            content_category: "form_abandonment",
          },
        )
      }
    }
    onClose()
  }

  // Validation functions for each step
  const isStep1Valid = formData.firstName && formData.lastName && formData.email
  const isStep2Valid = formData.phone && formData.company
  const isStep3Valid = formData.monthlyAdSpend && formData.platforms

  if (showThankYou) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <DialogTitle className="text-2xl font-bold text-green-600">Thank You!</DialogTitle>
            <DialogDescription className="text-base text-muted-foreground">
              Your audit request has been submitted successfully.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-center">
            <div className="rounded-lg bg-green-50 p-4">
              <h3 className="font-semibold text-green-800 mb-2">What happens next?</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• We'll review your information within 24 hours</li>
                <li>• Our team will contact you to schedule your audit</li>
                <li>• You'll receive a calendar link to book your preferred time</li>
              </ul>
            </div>
            <p className="text-sm text-muted-foreground">Check your email for confirmation and next steps.</p>
            <Button onClick={handleClose} className="w-full">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Book Your Free Conversion Signal Audit</DialogTitle>
          <DialogDescription>
            Step {currentStep} of {totalSteps} - This will only take 2 minutes
          </DialogDescription>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="mb-6">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">{Math.round(progress)}% complete</p>
        </div>

        <form
          onSubmit={
            currentStep === totalSteps
              ? handleSubmit
              : (e) => {
                  e.preventDefault()
                  nextStep()
                }
          }
        >
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold">Let's start with your details</h3>
                <p className="text-sm text-muted-foreground">We need this to personalize your audit</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    placeholder="John"
                    autoFocus
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    placeholder="Smith"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Business Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="john@company.com"
                />
              </div>

              <Button type="submit" disabled={!isStep1Valid} className="w-full">
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Step 2: Company Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Building className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold">Tell us about your business</h3>
                <p className="text-sm text-muted-foreground">This helps us prepare for your audit</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name *</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    placeholder="Your Company Inc."
                    autoFocus
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={prevStep} className="flex-1 bg-transparent">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button type="submit" disabled={!isStep2Valid} className="flex-1">
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Ad Spend & Platforms */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold">Your advertising details</h3>
                <p className="text-sm text-muted-foreground">This determines your audit focus areas</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="monthlyAdSpend">Monthly Ad Spend *</Label>
                  <Select
                    value={formData.monthlyAdSpend}
                    onValueChange={(value) => handleInputChange("monthlyAdSpend", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your monthly ad spend" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10k-25k">$10K - $25K</SelectItem>
                      <SelectItem value="25k-50k">$25K - $50K</SelectItem>
                      <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                      <SelectItem value="100k-250k">$100K - $250K</SelectItem>
                      <SelectItem value="250k+">$250K+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="platforms">Primary Advertising Platforms *</Label>
                  <Select value={formData.platforms} onValueChange={(value) => handleInputChange("platforms", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your primary platforms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meta-google">Meta + Google</SelectItem>
                      <SelectItem value="meta-google-tiktok">Meta + Google + TikTok</SelectItem>
                      <SelectItem value="meta-google-youtube">Meta + Google + YouTube</SelectItem>
                      <SelectItem value="all-platforms">All Platforms</SelectItem>
                      <SelectItem value="meta-only">Meta Only</SelectItem>
                      <SelectItem value="google-only">Google Only</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={prevStep} className="flex-1 bg-transparent">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button type="submit" disabled={!isStep3Valid} className="flex-1">
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Final Details & Submit */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MessageSquare className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold">Almost done!</h3>
                <p className="text-sm text-muted-foreground">Any specific challenges we should know about?</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentChallenges">Current Tracking Challenges (Optional)</Label>
                  <Textarea
                    id="currentChallenges"
                    value={formData.currentChallenges}
                    onChange={(e) => handleInputChange("currentChallenges", e.target.value)}
                    placeholder="e.g., iOS 14.5 impact, attribution issues, duplicate events..."
                    rows={3}
                    autoFocus
                  />
                </div>

                <div className="rounded-lg bg-blue-50 p-4 border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">What happens next:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• We'll review your information within 24 hours</li>
                    <li>• Our team will contact you to schedule your 30-minute audit</li>
                    <li>• You'll receive immediate insights about your tracking setup</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={prevStep} className="flex-1 bg-transparent">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button type="submit" disabled={isSubmitting} className="flex-1 bg-green-600 hover:bg-green-700">
                  {isSubmitting ? (
                    "Booking Your Audit..."
                  ) : (
                    <>
                      Book My Free Audit
                      <CheckCircle className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </form>

        <p className="text-xs text-muted-foreground text-center mt-4">
          By continuing, you agree to be contacted regarding your audit request.
        </p>
      </DialogContent>
    </Dialog>
  )
}
