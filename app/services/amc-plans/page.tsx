"use client"

import { AMCPlans } from "@/components/amc-plans"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function AMCPlansPage() {
    return (
        <div className="min-h-screen bg-black">
            <Navbar />
            <div className="pt-20">
                <AMCPlans />
            </div>
            <Footer />
        </div>
    )
}
