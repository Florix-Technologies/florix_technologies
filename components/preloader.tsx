"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Preloader() {
    const [show, setShow] = useState(true)
    const [enableExitAnimation, setEnableExitAnimation] = useState(true)

    useEffect(() => {
        // Check session storage on mount
        const hasVisited = sessionStorage.getItem("florix-visited")
        if (hasVisited) {
            // If visited, hide immediately without exit animation
            setEnableExitAnimation(false)
            setShow(false)
        } else {
            // If first visit, show and set up exit
            sessionStorage.setItem("florix-visited", "true")
            setEnableExitAnimation(true)
            const timer = setTimeout(() => setShow(false), 6000)
            return () => clearTimeout(timer)
        }
    }, [])

    // If show is false, we can probably return null, but AnimatePresence handles the exit.
    // However, if we want NO exit animation on revisit, AnimatePresence needs to see the component leave.

    // Issue: If `show` implies rendering, `!show` implies removal.
    // If `enableExitAnimation` is false, we want instant removal.

    return (
        <AnimatePresence mode="wait">
            {show && (
                <motion.div
                    className="fixed inset-0 z-[9999] bg-white flex items-center justify-center overflow-hidden pb-14 md:pb-20"
                    exit={enableExitAnimation ? { opacity: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    {/* 
            Main Container
            Uses `layout` to automatically animate height/width/position changes 
            when the text appears, ensuring perfect centering at all times.
          */}
                    <motion.div
                        layout
                        className="flex items-center gap-1 md:gap-2 -ml-4 md:ml-0" // Shift left on mobile, reset on desktop
                        transition={{
                            layout: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } // Ultra smooth expansion
                        }}
                    >
                        {/* LOGO */}
                        <motion.div layout className="flex-shrink-0">
                            <motion.img
                                src="/Florixsvg.svg"
                                alt="Florix Logo"
                                className="w-14 h-14 md:w-20 md:h-20 object-contain" // Adjusted mobile size
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                loading="eager" // Ensure browser loads this ASAP
                                decoding="sync" // Decode immediately
                            />
                        </motion.div>

                        {/* TEXT CONTAINER - Revealed after delay */}
                        <motion.div
                            className="flex flex-col justify-center overflow-hidden"
                            initial={{ opacity: 0, width: 0 }}
                            animate={{
                                opacity: 1,
                                width: "auto", // Expands to fit content
                                transition: {
                                    delay: 2.0, // Wait before expanding
                                    duration: 1.2,
                                    ease: [0.22, 1, 0.36, 1],
                                    opacity: { delay: 2.1, duration: 1.0 } // Fade in slightly after expansion starts
                                }
                            }}
                        >
                            {/* INNER TEXT WRAPPER - Removed padding for optical centering */}
                            <div className="whitespace-nowrap">
                                {/* FLORIX - Uppercase, Green, and refined weight */}
                                <motion.h1
                                    className="text-3xl md:text-5xl font-semibold text-[#307828] tracking-normal leading-none font-sans" // Using a specific brand-like green
                                    initial={{ x: 20 }}
                                    animate={{ x: 0 }}
                                    transition={{ delay: 2.1, duration: 1.0, ease: "easeOut" }}
                                >
                                    FLORIX
                                </motion.h1>

                                {/* TECHNOLOGIES */}
                                <motion.span
                                    className="block text-[8px] md:text-[10px] font-medium text-[#111]/60 tracking-[0.35em] md:tracking-[0.8em] uppercase leading-none mt-1 pl-1" // Responsive tracking: tighter on mobile, wide on desktop
                                    initial={{ x: 15 }}
                                    animate={{ x: 0 }}
                                    transition={{ delay: 2.3, duration: 1.0, ease: "easeOut" }}
                                >
                                    TECHNOLOGIES
                                </motion.span>
                            </div>
                        </motion.div>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
