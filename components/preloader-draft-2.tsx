"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Preloader() {
    const [show, setShow] = useState(false)
    const [stage, setStage] = useState(0) // 0: Check, 1: Show, 2: Hide

    useEffect(() => {
        const hasVisited = sessionStorage.getItem("florix-visited")
        if (!hasVisited) {
            setShow(true)
            sessionStorage.setItem("florix-visited", "true")

            // Schedule removal
            const timer = setTimeout(() => {
                setShow(false)
            }, 3000) // End at 3.0s

            return () => clearTimeout(timer)
        }
    }, [])

    if (!show) return null

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed inset-0 z-[9999] bg-white flex items-center justify-center overflow-hidden"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }} // Exit at 3.0s
                >
                    {/* Main Containment that moves */}
                    <motion.div
                        className="flex items-center"
                        initial={{ x: 0 }} // Centered
                        animate={{ x: "-12vw" }} // Move left (1.2s -> 2.1s)
                        transition={{
                            delay: 1.2,
                            duration: 0.9,
                            ease: [0.4, 0.0, 0.2, 1], // Cinematic easing
                        }}
                    >
                        {/* LOGO */}
                        <motion.img
                            src="/Florixsvg.svg"
                            alt="Florix"
                            className="w-24 h-24 md:w-32 md:h-32 object-contain"
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={{
                                opacity: 1,
                                scale: 0.92 // Final scale state
                            }}
                        // Need sequence: Appear (0-1.2) then Scale Down (1.2-2.1)
                        // We can use keyframes for fine control or separate transforms
                        />
                        {/* We need strictly scheduled animations. Let's use specific variants for opacity/scale */}
                        <style jsx>{`
                img {
                    animation: logo-sequence 3s linear forwards;
                }
                @keyframes logo-sequence {
                    0% { opacity: 0; transform: scale(0.97); }
                    10% { opacity: 1; transform: scale(1.0); } /* 0.3s approx */
                    40% { transform: scale(1.0); } /* Wait until 1.2s */
                    70% { transform: scale(0.92); } /* 2.1s */
                    100% { transform: scale(0.92); }
                }
             `}</style>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
