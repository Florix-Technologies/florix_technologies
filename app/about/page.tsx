"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { motion, useScroll, useTransform } from "framer-motion"

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Parallax transforms
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 100])
  const storyOpacity = useTransform(scrollYProgress, [0, 1], [1, 1])
  const storyY = useTransform(scrollYProgress, [0.1, 0.3], [100, 0])
  const expertiseOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1])
  const expertiseY = useTransform(scrollYProgress, [0.3, 0.5], [100, 0])
  const valuesOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1])

  const [scrollY, setScrollY] = useState(0) // Timeline Animations
  const timelineRef = useRef<HTMLDivElement>(null)
  const dotRefs = useRef<(HTMLDivElement | null)[]>([])
  const [curvePath, setCurvePath] = useState("")

  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"],
  })

  // Dynamic Curve Calculation to match exact dot positions
  useEffect(() => {
    const calculateCurve = () => {
      if (!timelineRef.current || dotRefs.current.length === 0) return

      const containerRect = timelineRef.current.getBoundingClientRect()
      const startX = containerRect.width / 2
      const startY = 0

      // Collect dot coordinates
      const points = dotRefs.current
        .filter(el => el !== null)
        .map(el => {
          const rect = el!.getBoundingClientRect()
          // Relative to container
          const x = rect.left - containerRect.left + rect.width / 2
          const y = rect.top - containerRect.top + rect.height / 2
          return { x, y }
        })

      if (points.length === 0) return

      // Construct Smooth Bezier Path through all points
      let path = `M ${startX} ${startY}`

      // We will create S-curves between points
      // Start to first point
      let prevX = startX
      let prevY = startY

      points.forEach((point, i) => {
        // Create control points for vertical smooth flow
        // Control Point 1: Down from previous (vertical tangent)
        const cp1X = prevX
        const cp1Y = prevY + (point.y - prevY) * 0.5

        // Control Point 2: Up from current (vertical tangent)
        const cp2X = point.x
        const cp2Y = point.y - (point.y - prevY) * 0.5

        path += ` C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${point.x} ${point.y}`

        prevX = point.x
        prevY = point.y
      })

      // Continue to bottom
      const endY = containerRect.height
      const endX = startX // Return to center? Or Keep flowing? 
      // Let's curve back to center bottom
      const cp1X = prevX
      const cp1Y = prevY + (endY - prevY) * 0.5
      const cp2X = endX
      const cp2Y = endY - (endY - prevY) * 0.5
      path += ` C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`

      setCurvePath(path)
    }

    calculateCurve()
    window.addEventListener("resize", calculateCurve)
    // Recalculate after a slight delay to ensure layout is settled
    const timer = setTimeout(calculateCurve, 100)

    return () => {
      window.removeEventListener("resize", calculateCurve)
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const AnimatedCounter = ({ end, duration }: { end: number; duration: number }) => {
    const [count, setCount] = useState(0)
    const countRef = useRef<HTMLSpanElement>(null)

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            let currentCount = 0
            const increment = end / (duration * 60)
            const interval = setInterval(() => {
              currentCount += increment
              if (currentCount >= end) {
                setCount(end)
                clearInterval(interval)
              } else {
                setCount(Math.floor(currentCount))
              }
            }, 16)
            return () => clearInterval(interval)
          }
        },
        { threshold: 0.5 },
      )

      if (countRef.current) observer.observe(countRef.current)
      return () => observer.disconnect()
    }, [end, duration])

    return <span ref={countRef}>{count}</span>
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-black relative overflow-hidden">
      <div className="relative pt-24 pb-8 px-6 overflow-hidden flex flex-col items-center justify-center min-h-[60vh]">
        {/* Animated background orbs & Central Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-40 animate-pulse"></div>
        <div
          className="absolute bottom-40 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <motion.div ref={heroRef} style={{ y: heroY }} className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="flex flex-col items-center mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-extrabold mb-6 text-balance bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent tracking-tight"
            >
              About Florix
            </motion.h1>

            {/* Green Accent Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "circOut" }}
              viewport={{ once: true }}
              className="h-1.5 w-24 bg-primary rounded-full mb-8 shadow-[0_0_15px_rgba(34,197,94,0.6)]"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto text-balance leading-relaxed font-medium"
            >
              We are Florix Technologies, building technology that empowers progress.
            </motion.p>
          </div>
        </motion.div>
      </div>
      {/* 
      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-6 mb-20">
        {[
          { label: "Projects Completed", value: 600, icon: "⚡" },
          { label: "Happy Clients", value: 185, icon: "🤝" },
          { label: "Awards Won", value: 5, icon: "🏆" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group"
          >
            <Card className="p-8 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md border border-primary/20 hover:border-primary/50 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-primary/20 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="text-5xl mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold text-primary mb-2">
                  <AnimatedCounter end={stat.value} duration={2} />
                  {stat.value >= 100 ? "+" : ""}
                </div>
                <p className="text-gray-700">{stat.label}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div> */}

      {/* Full Width Curvaceous Timeline Section */}
      <motion.div
        style={{ opacity: storyOpacity }}
        className="max-w-7xl mx-auto px-6 mb-32 relative"
      >
        {/* Subtle Background Glow for Section */}
        <div className="absolute top-0 left-0 w-full h-full bg-primary/5 blur-[100px] -z-10 rounded-full opacity-50"></div>

        {/* Section Header (Centered) */}
        <div className="text-center mb-20 relative z-10">
          <h2 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-primary to-white bg-clip-text text-transparent mb-6 tracking-tight">
            Our Story
          </h2>
          <p className="text-xl lg:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Built from Real-World Engineering Challenges
          </p>
          <div className="w-1 h-24 bg-gradient-to-b from-primary to-transparent rounded-full opacity-50 mx-auto mt-8"></div>
        </div>

        {/* Timeline Container (Full Width) */}
        <div ref={timelineRef} className="relative flex flex-col gap-24 py-10">

          {/* Central Curvaceous Timeline Line (Desktop) */}
          <div className="absolute inset-0 hidden md:block pointer-events-none">
            <svg className="h-full w-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradient-flow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(34,197,94,0.1)" />
                  <stop offset="50%" stopColor="rgba(34,197,94,0.3)" />
                  <stop offset="100%" stopColor="rgba(34,197,94,0.1)" />
                </linearGradient>
              </defs>
              {/* Dynamic Path calculated in effect */}
              {curvePath && (
                <>
                  <path
                    d={curvePath}
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="2"
                  />
                  <motion.path
                    d={curvePath}
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="3"
                    strokeLinecap="round"
                    style={{ pathLength: timelineProgress }}
                  />
                </>
              )}
            </svg>
          </div>

          {/* Mobile Straight Line (Left sided) */}
          <div className="absolute left-[20px] top-0 bottom-0 w-0.5 bg-white/10 md:hidden"></div>
          <motion.div
            style={{ scaleY: timelineProgress }}
            className="absolute left-[20px] top-0 bottom-0 w-0.5 bg-primary origin-top md:hidden"
          ></motion.div>

          {[
            {
              id: "01",
              title: "The Belief",
              content: "Florix Technologies was founded with a simple belief: technology should be engineered around people, not forced into generic configurations."
            },
            {
              id: "02",
              title: "The Challenge",
              content: "The journey began under Florix Smart Infra Solutions Pvt. Ltd., where real-world infrastructure projects highlighted a growing challenge. Individuals, startups, and businesses were investing in technology, yet struggling with performance, reliability, and long-term support.\n\nSystems were assembled, but not engineered. Services were provided, but not aligned to actual workflows. Florix Technologies was created to change that."
            },
            {
              id: "03",
              title: "The Evolution",
              content: "What started as a focused initiative in custom computing and IT consulting evolved into a full-spectrum technology division delivering engineered computing systems and complete IT care.\n\nFrom high-performance custom and industrial PC builds to enterprise-grade workstations, networking, managed IT services, and annual maintenance contracts, Florix Technologies was designed to support technology throughout its entire lifecycle."
            },
            {
              id: "04",
              title: "How We Work",
              content: "At the core of Florix Technologies is a consultation-first approach. Every solution begins by understanding how the system will be used, what performance is expected, and how it must scale over time.\n\nWhether it is a gaming and creator workstation, a business-critical office setup, or a managed IT environment, each deployment is purpose-built, tested, and optimized for real-world workloads."
            },
            {
              id: "05",
              title: "Florix Today & Our Difference",
              content: "Today, Florix Technologies delivers eight major service verticals, including custom and industrial PC building, laptop sales and service, AMC and preventive maintenance, IT support, workstation and network infrastructure setup, web development, and managed IT services for businesses. These services are unified under one principle: precision engineering with reliable long-term support.\n\nUnlike traditional IT vendors, Florix Technologies does not operate on one-size-fits-all solutions. Systems are designed, built, stress-tested, deployed, and maintained with accountability. From clean cable management and thermal tuning to structured networking and dedicated AMC support, every detail reflects engineering discipline.\n\nFlorix Technologies stands as the technology backbone for individuals and organizations that demand performance, stability, and clarity in IT operations. What began as custom builds has grown into complete IT stewardship.\n\nFrom custom systems to complete IT care, Florix Technologies continues to build, upgrade, and maintain technology that works the way it is meant to."
            }
          ].map((item, index) => (
            <div
              key={item.id}
              className="w-full relative"
            >
              {/* Desktop Layout: 3-Column Grid */}
              <div className={`hidden md:grid md:grid-cols-[1fr_auto_1fr] items-center gap-12 w-full`}>

                {/* Left Side */}
                <div className={`flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                  {index % 2 === 0 ? (
                    /* Even: Card on Left */
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="w-full max-w-xl"
                    >
                      <Card className="p-8 bg-white/5 backdrop-blur-md border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.03)] rounded-2xl hover:border-white/60 transition-all duration-500 hover:shadow-[0_0_35px_rgba(255,255,255,0.15)]">
                        <p className="text-gray-400 leading-relaxed text-lg whitespace-pre-line">
                          {item.content}
                        </p>
                      </Card>
                    </motion.div>
                  ) : (
                    /* Odd: Heading on Left */
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="w-full max-w-xl text-right"
                    >
                      <span className="text-8xl font-black text-white/[0.03] block -mb-10 relative z-0">{item.id}</span>
                      <h3 className="relative z-10 text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-l from-primary to-white">
                        {item.title}
                      </h3>
                    </motion.div>
                  )}
                </div>

                {/* Center Axis (Dot) */}
                <div className="relative flex justify-center w-[20px]">
                  <div
                    ref={el => {
                      if (el) dotRefs.current[index] = el;
                    }}
                    className="absolute top-1/2 -translate-y-1/2 z-20"
                  >
                    <motion.div
                      initial={{ scale: 0.8, backgroundColor: "rgb(55, 65, 81)" }}
                      whileInView={{ scale: 1.2, backgroundColor: "#22c55e" }}
                      viewport={{ once: false, margin: "-100px" }}
                      transition={{ duration: 0.3 }}
                      className="w-4 h-4 rounded-full ring-4 ring-black shadow-[0_0_15px_rgba(34,197,94,0.5)]"
                    ></motion.div>
                  </div>
                </div>

                {/* Right Side */}
                <div className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  {index % 2 === 0 ? (
                    /* Even: Heading on Right */
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="w-full max-w-xl text-left"
                    >
                      <span className="text-8xl font-black text-white/[0.03] block -mb-10 relative z-0">{item.id}</span>
                      <h3 className="relative z-10 text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">
                        {item.title}
                      </h3>
                    </motion.div>
                  ) : (
                    /* Odd: Card on Right */
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="w-full max-w-xl"
                    >
                      <Card className="p-8 bg-white/5 backdrop-blur-md border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.03)] rounded-2xl hover:border-white/60 transition-all duration-500 hover:shadow-[0_0_35px_rgba(255,255,255,0.15)]">
                        <p className="text-gray-400 leading-relaxed text-lg whitespace-pre-line">
                          {item.content}
                        </p>
                      </Card>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Mobile Layout (Stacked) */}
              <motion.div
                className="md:hidden flex flex-col pl-12 relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {/* Mobile Dot */}
                <div className="absolute left-[14px] top-6 w-3 h-3 bg-gray-700 rounded-full ring-4 ring-black z-10"></div>

                <div className="mb-6">
                  <span className="text-5xl font-black text-white/[0.05] block -mb-6">{item.id}</span>
                  <h3 className="text-3xl font-bold text-white relative z-10">{item.title}</h3>
                </div>
                <Card className="p-6 bg-white/5 backdrop-blur-md border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.03)] rounded-xl relative z-10 hover:border-white/60 transition-all duration-500 hover:shadow-[0_0_35px_rgba(255,255,255,0.15)]">
                  <p className="text-gray-400 leading-relaxed whitespace-pre-line">
                    {item.content}
                  </p>
                </Card>
              </motion.div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div style={{ opacity: expertiseOpacity, y: expertiseY }} className="max-w-7xl mx-auto px-6 mb-32 relative">
        {/* Visual Connector Line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-20 bottom-20 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent hidden md:block"></div>

        <Card className="p-10 md:p-16 bg-white/[0.02] backdrop-blur-md border border-white/5 relative overflow-hidden">

          <div className="relative z-10 text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-white bg-clip-text text-transparent">
              Our Roots & Expertise
            </h2>
            <p className="text-xl text-gray-500 font-medium tracking-wide">
              Engineering decisions shaped by <span className="text-primary/80 drop-shadow-[0_0_15px_rgba(34,197,94,0.6)]">real-world systems.</span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 relative z-10">
            {[
              {
                title: "Connected Systems Thinking",
                tagline: "Hardware, networks, and software engineered as one.",
                desc: "Our foundation comes from real operational environments under Florix Smart Infra Solutions Pvt. Ltd., where hardware, networks, and software must work together reliably. This experience shaped our belief that technology should be engineered as a connected system, not delivered as isolated services.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                )
              },
              {
                title: "Hands-On Engineering Experience",
                tagline: "Deep expertise from component-level builds to full IT infrastructure.",
                desc: "Our expertise spans custom and industrial PC builds, laptops and workstations, networking and IT infrastructure, web development, managed IT services, and AMC support. Every solution begins with understanding real requirements, followed by careful design, implementation, and validation.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )
              },
              {
                title: "End-to-End Ownership",
                tagline: "Unified execution from design to ongoing stewardship.",
                desc: "What differentiates Florix is unified execution. Consultation, system design, deployment, testing, and ongoing support are handled under one roof. This ensures accountability at every stage and solutions that are stable, scalable, and ready for long-term use.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )
              },
              {
                title: "Long-Term Technology Partnership",
                tagline: "Service that evolves with your growth, not just a one-time fix.",
                desc: "Florix Technologies operates as a long-term technology partner rather than a one-time service provider. Clients receive solutions that are purpose-built, verified for real-world performance, and supported throughout their lifecycle - ensuring reliability, clarity, and confidence.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                )
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group p-8 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.1)] hover:-translate-y-1"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-white/5 text-primary group-hover:text-white group-hover:bg-primary transition-colors duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-primary/80 font-medium tracking-wide">{item.tagline}</p>
                  </div>
                </div>

                <div className="overflow-hidden max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                  <p className="text-gray-400 leading-relaxed text-sm pt-4 border-t border-white/5">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      <motion.div style={{ opacity: valuesOpacity }} className="max-w-7xl mx-auto px-6 mb-32 relative">

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-white bg-clip-text text-transparent">
            Our Values
          </h2>
          <p className="text-gray-400 text-lg">
            The principles that guide how we <span className="text-primary">engineer, collaborate, and deliver.</span>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Mission-Driven",
              tagline: "Empowering progress through purpose.",
              desc: "Every decision is guided by our mission to empower progress through technology. We don't just build systems; we build pathways for our clients to achieve their visionary goals.",
              icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              )
            },
            {
              title: "Collaborative",
              tagline: "Solutions built on shared expertise.",
              desc: "We believe the best solutions emerge from close collaboration and open communication. We work alongside you, not just for you, turning complex requirements into shared successes.",
              icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )
            },
            {
              title: "Results-Focused",
              tagline: "Measured by tangible impact.",
              desc: "We measure our success by the tangible results we deliver for our clients. Effectiveness, stability, and performance are not just buzzwords—they are the metrics we engineer for.",
              icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              )
            },
          ].map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)] hover:-translate-y-2 overflow-hidden flex flex-col justify-between"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

              <div>
                <div className="mb-6 inline-flex p-4 rounded-xl bg-white/5 text-primary group-hover:text-white group-hover:bg-primary transition-all duration-300 shadow-[0_0_15px_rgba(34,197,94,0.1)] group-hover:shadow-[0_0_25px_rgba(34,197,94,0.4)]">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{value.title}</h3>
                <p className="text-primary/90 font-medium text-sm mb-4 tracking-wide">{value.tagline}</p>
              </div>

              <div className="relative">
                <div className="h-px w-full bg-white/10 mb-4"></div>
                <p className="text-gray-400 text-sm leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                  {value.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto text-center text-gray-500">
          <p>© 2025 Florix. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
