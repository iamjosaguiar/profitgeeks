import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Clock, TrendingUp, BarChart3, Zap } from 'lucide-react'

export default function ImplementationTimeline() {
  return (
    <section className="w-full py-12 sm:py-16 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-12 sm:mb-16">
          <Badge className="mb-4 bg-profit-teal-100 text-profit-teal-800 border border-profit-teal-200">
            Roadmap
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
            8-Week Implementation Timeline
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Week 1 */}
          <Card className="border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-profit-teal-500 to-profit-coral-500 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900">Week 1: Discovery & Diagnostic</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-700">
              <ul className="list-disc pl-5 space-y-2">
                <li>Audit CRM, ad accounts, and tracking infrastructure</li>
                <li>Review current funnel and lead delivery process</li>
                <li>Interview key team members (media buyers, ops, tech)</li>
                <li>Diagnose partial leads, rejections, and signal loss</li>
              </ul>
              <Separator className="my-5" />
              <p className="font-semibold text-gray-900 mb-2">Deliverables:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Diagnostic Map: Where signals are broken</li>
                <li>Recommendation Brief: Core KPIs, event mapping strategy</li>
                <li>Tech Stack Evaluation: What to fix vs replace</li>
              </ul>
            </CardContent>
          </Card>

          {/* Weeks 2-4 */}
          <Card className="border-2 border-profit-teal-200 bg-gradient-to-br from-white to-profit-teal-50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-profit-teal-500/90 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900">Weeks 2-4: Tracking & Signal Infrastructure</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-700">
              <ul className="list-disc pl-5 space-y-2">
                <li>Implement Conversion API + browser tracking with deduplication</li>
                <li>Set up click ID passthrough (fbclid, gclid, ttclid, etc.)</li>
                <li>Standardise UTM conventions across ad accounts</li>
                <li>Configure custom events (assigned lead, verified lead)</li>
                <li>
                  Capture key enrichment fields: IP address, device type, browser, OS, referrer, timestamps, session duration, page engagement
                </li>
                <li>Build feedback loop back into Meta, Google, TikTok</li>
              </ul>
            </CardContent>
          </Card>

          {/* Weeks 5-6 */}
          <Card className="border-2 border-profit-coral-200 bg-gradient-to-br from-white to-profit-coral-50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-profit-coral-500/90 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900">Weeks 5-6: Signal Calibration & Dashboard Build</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-700">
              <ul className="list-disc pl-5 space-y-2">
                <li>Define and deploy your north star metric (e.g. CPAL)</li>
                <li>Build dashboard with clear breakdowns by campaign, platform</li>
                <li>Implement funnel drop-off tracking for partial leads</li>
                <li>Connect CRM to data visualisation tools</li>
              </ul>
            </CardContent>
          </Card>

          {/* Weeks 7-8 */}
          <Card className="border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-profit-teal-500 to-profit-coral-500 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900">Weeks 7-8: Backend Monetisation & Optimisation</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-700">
              <ul className="list-disc pl-5 space-y-2">
                <li>Segment and flag partial, failed, or unassigned leads</li>
                <li>Build follow-up automations for partial leads</li>
                <li>Set reactivation and re-nurture workflows</li>
                <li>Review performance by CPAL/CAC by source</li>
                <li>Test reactivating paused campaigns with new signal feedback</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}


