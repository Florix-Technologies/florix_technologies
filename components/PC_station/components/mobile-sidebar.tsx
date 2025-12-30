"use client"

import { X } from "lucide-react"
import { motion } from "framer-motion"

const components = [
  {
    icon: null,
    color: "text-red-400",
    bgColor: "bg-red-400/10",
    title: "AMD CPU",
    description:
      "AMD CPUs offer excellent multi-core performance and strong value for money. They are ideal for gaming, content creation, and multitasking workloads.",
  },
  {
    icon: null,
    color: "text-red-400",
    bgColor: "bg-red-400/10",
    title: "AMD GPU",
    description:
      "AMD GPUs provide high performance at competitive prices with good rasterization power. They are a solid choice for gaming and productivity on a budget.",
  },
  {
    icon: null,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    title: "Intel CPU",
    description:
      "Intel CPUs are known for strong single-core performance and stability. They are great for office work, programming, and applications that rely on fewer cores.",
  },
  {
    icon: null,
    color: "text-green-400",
    bgColor: "bg-green-400/10",
    title: "NVIDIA GPU",
    description:
      "NVIDIA GPUs excel in graphics performance, ray tracing, and AI-based features like DLSS. They are the preferred choice for gaming, 3D rendering, and professional workloads.",
  },
]

export function MobileSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      <motion.aside
        initial={{ x: -320 }}
        animate={{ x: 0 }}
        exit={{ x: -320 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 z-50 h-full w-80 bg-black/80 backdrop-blur-xl border-r border-white/10 p-6 overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold">Component Guide</h2>
          <button onClick={onClose} aria-label="Close" className="p-2 rounded-md hover:bg-white/5">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {components.map((c) => (
            <div key={c.title} className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 ${c.bgColor} rounded-lg`} />
                <h3 className="font-semibold">{c.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.description}</p>
            </div>
          ))}
        </div>
      </motion.aside>
    </>
  )
}
