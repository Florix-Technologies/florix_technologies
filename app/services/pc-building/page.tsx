"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import PCRecommendationSystem from "@/components/PC_station/page"
import { Button } from "@/components/ui/button"
import { Monitor, Cpu, PenTool, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

export default function PCBuildingPage() {
  const [builderMode, setBuilderMode] = useState<"landing" | "pc" | "laptop">("landing")

  if (builderMode !== "landing") {
    return (
      <div className="min-h-screen bg-black dark text-foreground">
        <Navbar />
        <div className="pt-20">

          <PCRecommendationSystem mode={builderMode} />
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-white text-gray-900 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-green-100 border border-green-200 rounded-full text-green-700 text-sm font-medium">
                <Monitor className="w-4 h-4" />
                <span>Custom PC & Laptop Services</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight text-gray-900">
                Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Dream Machine</span>
              </h1>
              <p className="text-gray-600 text-xl mb-8 leading-relaxed max-w-lg mx-auto">
                Expert assembly, premium cable management, and rigorous stress testing. We build high-performance PCs tailored to your specific needs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 h-14 text-lg shadow-lg shadow-green-200"
                  onClick={() => setBuilderMode("pc")}
                >
                  Configure Your PC <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-full px-8 h-14 text-lg bg-transparent"
                  onClick={() => setBuilderMode("laptop")}
                >
                  Configure Your Laptop <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full max-w-4xl mx-auto"
            >
              <div className="relative rounded-3xl overflow-hidden border border-gray-100 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50 w-full h-auto aspect-video flex items-center justify-center">
                <Image
                  src="/images/pc-build-hero.jpg"
                  alt="PC Building Hero"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Why Choose Florix Builds?</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">We don't just assemble parts; we craft machines engineered for perfection.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: PenTool,
                title: "Professional Assembly",
                desc: "Hand-built by experienced technicians with meticulous attention to cable management and airflow."
              },
              {
                icon: ShieldCheck,
                title: "Stress Tested",
                desc: "Every system undergoes 24-hour stress testing to ensure absolute stability and thermal performance."
              },
              {
                icon: CheckCircle2,
                title: "Warranty & Support",
                desc: "Comprehensive warranty on build quality and direct support from our technical team."
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white border border-gray-100 hover:border-green-500/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6 p-12 rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20"
          >
            <h2 className="text-4xl font-bold">Ready to Build Your Custom PC?</h2>
            <p className="text-lg text-muted-foreground">
              Use our advanced AI recommendation system to find the perfect components for your budget and needs.
            </p>
            <Button
              size="lg"
              className="rounded-full bg-primary hover:bg-primary/90 text-white px-8"
              onClick={() => setBuilderMode("pc")}
            >
              Start Configuration Now
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
