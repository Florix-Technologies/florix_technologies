"use client"

import { motion } from "framer-motion"
import { Cpu, HardDrive, Monitor } from "lucide-react"

const components = [
  {
    icon: Cpu,
    color: "text-red-400",
    bgColor: "bg-red-400/10",
    title: "AMD CPU",
    description:
      "AMD CPUs offer excellent multi-core performance and strong value for money. They are ideal for gaming, content creation, and multitasking workloads.",
  },
  {
    icon: Cpu,
    color: "text-red-400",
    bgColor: "bg-red-400/10",
    title: "AMD GPU",
    description:
      "AMD GPUs provide high performance at competitive prices with good rasterization power. They are a solid choice for gaming and productivity on a budget.",
  },
  {
    icon: Cpu,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    title: "Intel CPU",
    description:
      "Intel CPUs are known for strong single-core performance and stability. They are great for office work, programming, and applications that rely on fewer cores.",
  },
  {
    icon: HardDrive,
    color: "text-green-400",
    bgColor: "bg-green-400/10",
    title: "NVIDIA GPU",
    description:
      "NVIDIA GPUs excel in graphics performance, ray tracing, and AI-based features like DLSS. They are the preferred choice for gaming, 3D rendering, and professional workloads.",
  },
]

export function ComponentGuide() {
  return (
    <aside className="hidden lg:block w-80 xl:w-96 bg-black border-r border-white/10 px-6 pb-6 pt-14 overflow-y-auto">
      <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-blue-600/20 rounded-lg">
            <Monitor className="w-6 h-6 text-blue-500" />
          </div>
          <h2 className="text-xl font-bold text-white">Component Guide</h2>
        </div>

        <div className="space-y-4">
          {components.map((component, index) => {
            const Icon = component.icon
            return (
              <motion.div
                key={component.title}
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ x: 4, transition: { duration: 0.2 } }}
                className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 ${component.bgColor} rounded-lg group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-5 h-5 ${component.color}`} />
                  </div>
                  <h3 className="font-semibold">{component.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{component.description}</p>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </aside>
  )
}
