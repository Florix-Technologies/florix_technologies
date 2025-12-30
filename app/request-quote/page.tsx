"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { QuoteForm } from "@/components/quote-form"
import QuoteRobot from "@/components/quote-robot"

export default function RequestQuotePage() {
    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-black text-foreground">
            <Navbar />

            <main className="pt-24 min-h-screen flex flex-col-reverse lg:flex-row">
                {/* Left Side: Form */}
                <div className="w-full lg:w-1/2 px-6 pb-6 pt-0 lg:p-12 flex items-start justify-center relative z-10 lg:pt-8">
                    <QuoteForm />
                </div>

                {/* Right Side: Robot */}
                <div className="w-full lg:w-1/2 h-[30vh] lg:h-auto relative lg:sticky lg:top-0 right-0 lg:flex items-start justify-center pointer-events-none lg:pointer-events-auto bg-gradient-to-b from-transparent to-white/10 lg:bg-none pt-0 lg:pt-20">
                    <div className="w-full h-full relative">
                        {/* Background Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[100px] rounded-full" />
                        <QuoteRobot />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
