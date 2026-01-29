"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  Cloud,
  Shield,
  Zap,
  Server,
  BarChart3,
  Settings,
  ArrowRight,
} from "lucide-react"
import Image from "next/image"

export default function CloudClient() {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollY = window.scrollY
        const elements = containerRef.current.querySelectorAll("[data-scroll]")
        elements.forEach((el) => {
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
      icon: Cloud,
      title: "Cloud Migration & Adoption",
      description:
        "Seamlessly move applications, databases, and workloads to the cloud with minimal downtime and maximum reliability.",
    },
    {
      icon: Server,
      title: "Scalable Cloud Infrastructure",
      description:
        "Design and deploy highly available, auto-scaling cloud architectures tailored to your business needs.",
    },
    {
      icon: Zap,
      title: "DevOps & Automation",
      description:
        "Accelerate deployments with CI/CD pipelines, Infrastructure as Code, and automated monitoring.",
    },
    {
      icon: Shield,
      title: "Security & Compliance",
      description:
        "Security-first cloud setups with IAM, network protection, encryption, and compliance-ready architectures.",
    },
    {
      icon: BarChart3,
      title: "Cost Optimization",
      description:
        "Optimize cloud spending through usage analysis, right-sizing, and continuous performance tuning.",
    },
    {
      icon: Settings,
      title: "ServiceNow Solutions",
      description:
        "Implement and customize ServiceNow for ITSM, ITOM, workflows, and enterprise automation.",
    },
  ]

  return (
    <div className="min-h-screen bg-white" ref={containerRef}>
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-white text-gray-900 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-green-500/20 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-blue-100 border border-blue-200 rounded-full text-blue-700 text-sm font-medium">
                <Cloud className="w-4 h-4" />
                <span>Cloud Services</span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                Build, Scale & Secure on the{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                  Cloud
                </span>
              </h1>

              <p className="text-gray-600 text-xl mb-8 leading-relaxed max-w-xl mx-auto">
                We help businesses adopt, migrate, and optimize cloud platforms
                like AWS, Azure, GCP, and ServiceNow with secure, scalable, and
                cost-efficient solutions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 h-14 text-lg shadow-lg shadow-blue-200"
                >
                  <a href="/request-quote">
                    Start Your Cloud Journey <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-200 text-gray-700 hover:bg-gray-100 rounded-full px-8 h-14 text-lg"
                  onClick={() =>
                    window.open(
                      "https://wa.me/919986639994?text=I%20am%20interested%20in%20Cloud%20Services"
                    )
                  }
                >
                  Talk to an Expert <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full max-w-4xl mx-auto"
            >
              <div className="relative rounded-3xl overflow-hidden border border-gray-100 shadow-xl bg-gradient-to-br from-blue-50 to-green-50 aspect-video flex items-center justify-center">
                <Image
                  src="/images/cloud-hero.png"
                  alt="Cloud Services"
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
            <h2 className="text-5xl font-bold mb-4">
              End-to-End Cloud Capabilities
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to run confidently on the cloud
            </p>
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
                  className="p-8 rounded-2xl bg-white border border-gray-100 hover:border-primary/50 hover:shadow-xl transition-all group"
                >
                  <motion.div
                    className="p-4 rounded-xl bg-primary/10 inline-block mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Icon className="w-6 h-6 text-primary" />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-6"
          >
            Cloud Platforms We Work With
          </motion.h2>
          <p className="text-lg text-muted-foreground mb-10">
            Vendor-neutral expertise — we choose what fits your business best
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-lg font-medium">
            <span className="px-6 py-3 rounded-full bg-blue-100 text-blue-700">AWS</span>
            <span className="px-6 py-3 rounded-full bg-green-100 text-green-700">Google Cloud</span>
            <span className="px-6 py-3 rounded-full bg-indigo-100 text-indigo-700">Microsoft Azure</span>
            <span className="px-6 py-3 rounded-full bg-gray-100 text-gray-700">ServiceNow</span>
            <span className="px-6 py-3 rounded-full bg-teal-100 text-teal-700">Hybrid Cloud</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6 p-12 rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20"
          >
            <h2 className="text-4xl font-bold">
              Ready to Scale with Cloud?
            </h2>
            <p className="text-lg text-muted-foreground">
              Let’s design a cloud strategy that’s secure, scalable, and
              cost-effective for your business.
            </p>
            <Button
              size="lg"
              className="rounded-full bg-primary hover:bg-primary/90 text-white px-8"
              onClick={() =>
                window.open(
                  "https://wa.me/919986639994?text=I%20am%20interested%20in%20Cloud%20Services"
                )
              }
            >
              Get Cloud Consultation
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
