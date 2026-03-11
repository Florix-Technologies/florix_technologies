"use client"

import { Metadata } from \"next\";
import { Footer } from \"@/components/footer\"
import { Navbar } from \"@/components/navbar\"
import { Button } from \"@/components/ui/button\"
import { motion } from \"framer-motion\"
import { useEffect, useRef } from \"react\"
import { useRouter } from \"next/navigation\"
import { Globe, Code, Zap, Shield, Combine as Mobile, BarChart3, ArrowRight } from \"lucide-react\"
import { IconCloudDemo } from \"@/components/icon-cloud-demo\"
import Image from \"next/image\"\n\nexport const metadata: Metadata = {\n  title: \"Web Development Services | Custom Web Solutions | Florix Technologies\",\n  description: \"Custom web development services using React, Next.js, and Node.js. Responsive design, high performance, and modern technology stack.\",\n  openGraph: {\n    title: \"Web Development Services | Custom Web Solutions | Florix Technologies\",\n    description: \"Custom web development services using React, Next.js, and Node.js. Responsive design, high performance, and modern technology stack.\",\n    url: \"https://florixtechnologies.com/services/web-development\",\n    siteName: \"Florix Technologies\",\n    locale: \"en_US\",\n    type: \"website\",\n  }\n};\n\nexport default function WebDevelopmentPage() {
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
      icon: Code,
      title: "Custom Development",
      description: "Tailored web solutions built with modern technologies like React, Next.js, and Node.js",
    },
    {
      icon: Mobile,
      title: "Responsive Design",
      description: "Seamless experiences across all devices with mobile-first approach",
    },
    {
      icon: Zap,
      title: "High Performance",
      description: "Lightning-fast loading times and optimized user experience",
    },
    {
      icon: Shield,
      title: "Secure & Scalable",
      description: "Enterprise-grade security and architecture for growing businesses",
    },
    {
      icon: BarChart3,
      title: "Analytics Ready",
      description: "Built-in tracking and analytics for data-driven decisions",
    },
    {
      icon: Globe,
      title: "SEO Optimized",
      description: "Search engine friendly with best practices built-in",
    },
  ]

  return (
    <div className="min-h-screen bg-white" ref={containerRef}>
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
                <Globe className="w-4 h-4" />
                <span>Web Development Excellence</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight text-gray-900">
                Transform Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Digital Presence</span>
              </h1>
              <p className="text-gray-600 text-xl mb-8 leading-relaxed max-w-lg mx-auto">
                We build responsive, scalable, and high-performance web applications that drive engagement and growth for your business.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 h-14 text-lg shadow-lg shadow-green-200"
                  onClick={() => router.push("/request-quote")}
                >
                  Start Your Project <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-full px-8 h-14 text-lg bg-transparent"
                  onClick={() => window.open("https://wa.me/919986639994?text=I%20am%20interested%20in%20Web%20Development%20services")}
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
                  src="/images/web-dev-hero.png"
                  alt="Web Development Hero"
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
            <h2 className="text-5xl font-bold mb-4">Why Choose Our Web Development</h2>
            <p className="text-xl text-muted-foreground">Comprehensive solutions tailored to your business needs</p>
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

      <section className="py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Our Tech Stack</h2>
            <p className="text-lg text-muted-foreground">Built with industry-leading technologies and tools</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <IconCloudDemo />
          </motion.div>
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
            <h2 className="text-4xl font-bold">Ready to Build Something Amazing?</h2>
            <p className="text-lg text-muted-foreground">
              Let's discuss your web development project and create a solution that drives results.
            </p>
            <Button
              size="lg"
              className="rounded-full bg-primary hover:bg-primary/90 text-white px-8"
              onClick={() =>
                window.open("https://wa.me/919986639994?text=I%20am%20interested%20in%20Web%20Development%20services")
              }
            >
              Get in Touch via WhatsApp
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
