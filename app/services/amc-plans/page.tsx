"use client"

import { Metadata } from "next";
import { AMCPlans } from "@/components/amc-plans"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "AMC Plans & Pricing | Flexible Maintenance Plans | Florix Technologies",
  description: "Flexible AMC plans tailored to your needs. Choose from Basic, Standard, and Premium plans with different coverage levels.",
  openGraph: {
    title: "AMC Plans & Pricing | Flexible Maintenance Plans | Florix Technologies",
    description: "Flexible AMC plans tailored to your needs. Choose from Basic, Standard, and Premium plans with different coverage levels.",
    url: "https://florixtechnologies.com/services/amc-plans",
    siteName: "Florix Technologies",
    locale: "en_US",
    type: "website",
  }
};

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
