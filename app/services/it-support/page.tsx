"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Headphones, Clock, AlertCircle, BarChart3, Users, Zap, ArrowRight } from "lucide-react"
import Image from "next/image"

export default function ITSupportPage() {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollY = window.scrollY
        const elements = containerRef.current.querySelectorAll("[data-scroll]")
        elements.forEach((el: Element) => {
          const element = el as HTMLElement
          const speed = element.getAttribute("data-scroll") || "0.5"
          element.style.transform = `translateY(${scrollY * Number.parseFloat(speed)}px)`
        })
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const features = [
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock technical assistance whenever you need it",
    },
    {
      icon: Zap,
      title: "Rapid Response",
      description: "Quick troubleshooting and resolution of IT issues",
    },
    {
      icon: AlertCircle,
      title: "Proactive Monitoring",
      description: "Identify and resolve issues before they impact your business",
    },
    {
      icon: BarChart3,
      title: "Performance Optimization",
      description: "Continuous system monitoring and optimization",
    },
    {
      icon: Users,
      title: "Dedicated Team",
      description: "Experienced technicians familiar with your infrastructure",
    },
    {
      icon: Headphones,
      title: "Expert Consultants",
      description: "Professional guidance for technology decisions",
    },
  ]

  return (
    <div className="min-h-screen bg-white" ref={containerRef}>
      <Navbar />

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" data-scroll="0.2" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" data-scroll="0.15" />
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl" data-scroll="0.3" />
      </div>

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
                <Headphones className="w-4 h-4" />
                <span>IT Support Services</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight text-gray-900">
                Keep Your Systems <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Running Smoothly</span>
              </h1>
              <p className="text-gray-600 text-xl mb-8 leading-relaxed max-w-lg mx-auto">
                Comprehensive IT support services that ensure minimal downtime, maximum productivity, and reliable infrastructure for your business.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 h-14 text-lg shadow-lg shadow-green-200"
                  onClick={() => router.push("/request-quote")}
                >
                  Schedule Support <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-full px-8 h-14 text-lg bg-transparent"
                  onClick={() => window.open("https://wa.me/919986639994?text=I%20am%20interested%20in%20IT%20Support%20services")}
                >
                  Contact Us Today <ArrowRight className="ml-2 w-5 h-5" />
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
                  src="/images/it-support-hero.png"
                  alt="IT Support Hero"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-gray-50 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4">Comprehensive IT Support</h2>
            <p className="text-xl text-muted-foreground">Everything you need to maintain peak system performance</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-2xl bg-white border border-gray-100 hover:border-primary/50 hover:shadow-xl transition-all duration-300 group"
                >
                  <motion.div
                    className="p-4 rounded-xl bg-primary/10 inline-block group-hover:bg-primary/20 transition-colors mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Icon className="w-6 h-6 text-primary" />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              )
            })}
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
            <h2 className="text-4xl font-bold">Need IT Support Right Now?</h2>
            <p className="text-lg text-muted-foreground">
              Get immediate assistance from our experienced IT support team.
            </p>
            <Button
              size="lg"
              className="rounded-full bg-primary hover:bg-primary/90 text-white px-8"
              onClick={() => window.open("https://wa.me/919986639994?text=I%20need%20IT%20Support%20services")}
            >
              Contact Support Team
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div >
  )
}
