"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Preloader() {
    const [shouldShow, setShouldShow] = useState(true)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        // Check if we've already shown the preloader in this session
        const hasVisited = sessionStorage.getItem("florix-visited")

        if (hasVisited) {
            setShouldShow(false)
        } else {
            // Mark as visited for next time
            sessionStorage.setItem("florix-visited", "true")
            setShouldShow(true)
        }

        setIsMounted(true)
    }, [])

    // Prevent flash of preloader content before we check storage
    if (!isMounted) return null
    if (!shouldShow) return null

    return (
        <AnimatePresence>
            {shouldShow && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.25, ease: "easeInOut" } }}
                    onAnimationComplete={() => {
                        // Safety fallback: ensure it hides if exit animation triggers via logic
                    }}
                >
                    <div className="relative w-full h-full flex items-center justify-center">

                        {/* Logo Container */}
                        <motion.div
                            className="flex items-center"
                            initial={{ x: 0 }}
                            animate={{
                                x: "-12vw", // Move left
                            }}
                            transition={{
                                delay: 1.2,
                                duration: 0.9,
                                ease: [0.4, 0.0, 0.2, 1], // Cubic bezier
                            }}
                        >
                            {/* SVG Logo */}
                            <motion.img
                                src="/Florixsvg.svg"
                                alt="Florix Logo"
                                className="w-24 h-24 md:w-32 md:h-32 object-contain"
                                initial={{ opacity: 0, scale: 0.97 }}
                                animate={{
                                    opacity: 1,
                                    scale: [0.97, 1.0, 0.92], // Scale up then down slightly during move
                                }}
                                transition={{
                                    opacity: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] },
                                    // Scale keyframes need to match the timeline: 
                                    // 0-1.2s: 0.97 -> 1.0
                                    // 1.2-2.1s: 1.0 -> 0.92
                                    scale: {
                                        times: [0, 0.4, 1], // Normalized times based on duration... actually better to split animations? 
                                        // Let's try separate prop animation for cleaner control or standard transition
                                        duration: 2.1,
                                        ease: "easeInOut"
                                    }
                                }}
                            // Override/Refine animations for precise phase control using variants or orchestrated values
                            // But for simplicity in one go:
                            // We use a separate orchestrator? No, let's keep it simple.
                            />

                            {/* Explicitly override the scale animation to match the phases strictly */}
                            <motion.div
                                className="absolute inset-0"
                                animate={{ scale: 0.92 }}
                                transition={{ delay: 1.2, duration: 0.9 }}
                            />
                        </motion.div>


                        {/* Text Container - Absolute positioned relative to center or flex? 
                    Since the logo moves left away from center, the text should appear to the right of the *final* logo position.
                    The simplest way is to have them in a flex container that moves together? 
                    No, the prompt says "SVG logo slides... final position... Text Layout (Right of logo)".
                */}

                        {/* Let's restructure: 
                    Center the whole group initially.
                    Then move the group left? 
                    Or absolute position elements?
                    
                    Let's use a container that starts centered, then moves left.
                    Inside that container, Logo is on the left, Text is on the right.
                    Text starts hidden.
                */}
                    </div>

                    {/* Re-implementation for precise layout control */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <motion.div
                            className="flex items-center gap-4 md:gap-6"
                            initial={{ x: 0 }}
                            animate={{ x: "-6vw" }} // Adjust final position to be visually balanced if needed, or specific left margin
                        // Prompt says "Left margin: 10-12vw". 
                        // If we start centered (approx 50vw), moving to 12vw is a large move (-38vw).
                        // Let's assume the "Centered" means geometric center.
                        // Then "Left aligned ... Left margin 10-12vw".
                        >
                            <motion.img
                                src="/Florixsvg.svg"
                                alt="Florix Logo"
                                className="w-20 h-20 md:w-24 md:h-24" // Adjusted size
                                initial={{ opacity: 0, scale: 0.97, x: "0vw" }} // Start centered (relative to parent flex)
                                animate={{
                                    opacity: 1,
                                    scale: 0.92,
                                    x: "-12vw" // This moves JUST the logo? Or the container? 
                                    // Let's move the logo wrapper.
                                }}
                            />
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

// Let's rewrite the component completely to be cleaner and strictly follow the timing.
