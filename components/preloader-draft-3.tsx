"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Preloader() {
    const [show, setShow] = useState<boolean | null>(null)

    useEffect(() => {
        // Check session storage on mount
        const hasVisited = sessionStorage.getItem("florix-visited")
        if (!hasVisited) {
            setShow(true)
            sessionStorage.setItem("florix-visited", "true")

            // Auto-hide after 3.25s (3s animation + 0.25s fade out buffer)
            const timer = setTimeout(() => setShow(false), 3000)
            return () => clearTimeout(timer)
        } else {
            setShow(false)
        }
    }, [])

    if (show === null || show === false) return null

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed inset-0 z-[9999] bg-white flex items-center justify-center overflow-hidden"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                    <div className="relative flex items-center justify-center w-full max-w-7xl mx-auto px-4">

                        {/* Container for Logo + Text that slides left together or just Logo moves?
                "The SVG logo slides horizontally to the left... Final position: Left aligned... Text Layout (Right of logo)"
                This implies they end up side-by-side. 
                Best approach: A flex container. Initially centered. Then the whole container or just the logo moves?
                If the text is unnecessary during Phase 1, we can just move the Logo.
                Let's move the Logo Wrapper.
            */}
                        <motion.div
                            className="flex items-center gap-5 md:gap-7"
                            initial={{ x: 0 }} // Start at visual center
                            animate={{ x: "-10vw" }} // Move left (simulating the margin)
                            transition={{
                                delay: 1.2,
                                duration: 0.9,
                                ease: [0.4, 0.0, 0.2, 1], // Cubic-bezier(0.4, 0, 0.2, 1)
                            }}
                        >
                            {/* Logo */}
                            <motion.img
                                src="/Florixsvg.svg"
                                alt="Florix Logo"
                                className="w-20 h-20 md:w-24 md:h-24 object-contain"
                                initial={{ opacity: 0, scale: 0.97 }}
                                animate={{
                                    opacity: 1,
                                    scale: [0.97, 1.0, 1.0, 0.92] // Keyframes for scale
                                }}
                                transition={{
                                    opacity: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] },
                                    scale: {
                                        times: [0, 0.1, 0.4, 0.7], // 0s->0.3s (to 1.0), hold till 1.2s (0.4 relative to 3s?), wait opacity prop handles duration differently.
                                        // Let's use separate animate prop for simpler timing logic
                                        duration: 2.1, // Total duration covering Phase 1 & 2
                                        times: [0, 0.14, 0.57, 1], // 0s, 0.3s, 1.2s, 2.1s mapped to 0-1 range? No.
                                    }
                                }}
                            />

                            {/* Override Logo Animation for cleaner control */}
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center" // Wrapper to ensure centering
                                style={{ position: "relative", inset: "auto" }} // Reset absolute
                                initial={{ opacity: 0, scale: 0.97 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1.0,
                                }}
                                whileInView={{ // Use as Phase 2 trigger? No.
                                    scale: 0.92,
                                    transition: { delay: 1.2, duration: 0.9, ease: [0.4, 0.0, 0.2, 1] }
                                }}
                            // Actually, let's just stick to the simplest one-pass animation prop
                            >
                                <LogoImage />
                            </motion.div>

                            {/* Text Container */}
                            <div className="flex flex-col justify-center h-full pt-1 overflow-hidden">
                                {/* Line 1: Florix */}
                                <div className="overflow-hidden">
                                    <motion.h1
                                        className="text-4xl md:text-5xl font-bold text-black tracking-tight leading-none"
                                        initial={{ x: 36, opacity: 0, y: 6 }}
                                        animate={{ x: 0, opacity: 1, y: 0 }}
                                        transition={{
                                            delay: 2.1,
                                            duration: 0.45,
                                            ease: [0.4, 0.0, 0.2, 1]
                                        }}
                                    >
                                        Florix
                                    </motion.h1>
                                </div>

                                {/* Line 2: Technologies */}
                                <div className="overflow-hidden">
                                    <motion.p
                                        className="text-lg md:text-xl font-medium text-black/90 tracking-widest uppercase leading-none mt-1"
                                        initial={{ x: 18, opacity: 0 }}
                                        animate={{ x: 0, opacity: 0.9 }}
                                        transition={{
                                            delay: 2.35,
                                            duration: 0.4,
                                            ease: [0.4, 0.0, 0.2, 1]
                                        }}
                                    >
                                        Technologies
                                    </motion.p>
                                </div>
                            </div>

                        </motion.div>

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

function LogoImage() {
    return (
        <motion.img
            src="/Florixsvg.svg"
            className="w-20 h-20 md:w-24 md:h-24 object-contain"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1.0 }}
            transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
            // Phase 2: Scale down
            onAnimationComplete={(definition) => {
                // We can chain animations here but declared variants are better
            }}
        // HACK: Just hardcode values in the main component.
        />
    )
}
