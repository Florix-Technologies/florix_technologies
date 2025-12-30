"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"

export default function TermsOfServicePage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="space-y-4 border-b border-gray-100 pb-8">
                            <h1 className="text-4xl font-bold text-foreground">Terms of Service</h1>
                            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
                        </div>

                        <div className="prose prose-gray max-w-none space-y-6 text-muted-foreground">
                            <p>
                                Welcome to Florix Technologies. By accessing or using our website and services, you agree to comply with and be bound by the following Terms of Service. Please read these terms carefully before using our services.
                            </p>

                            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">1. Acceptance of Terms</h2>
                            <p>
                                By accessing this website, you accept these terms and conditions in full. Do not continue to use Florix Technologies' website if you do not accept all of the terms and conditions stated on this page.
                            </p>

                            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">2. Services</h2>
                            <p>
                                Florix Technologies provides a range of IT and technology services, including but not limited to Web Development, IT Support, IT Consulting, AI Solutions, AMC Services, PC Building, and Office Networking. We reserve the right to modify, suspend, or discontinue any aspect of our services at any time without prior notice.
                            </p>

                            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">3. Intellectual Property</h2>
                            <p>
                                Unless otherwise stated, Florix Technologies and/or its licensors own the intellectual property rights for all material on this website. All intellectual property rights are reserved. You may view and/or print pages from https://florixtechnologies.com for your own personal use subject to restrictions set in these terms and conditions.
                            </p>
                            <p>You must not:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Republish material from our website</li>
                                <li>Sell, rent, or sub-license material from our website</li>
                                <li>Reproduce, duplicate, or copy material from our website</li>
                                <li>Redistribute content from Florix Technologies (unless content is specifically made for redistribution)</li>
                            </ul>

                            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">4. User Responsibilities</h2>
                            <p>
                                When using our services or website, you agree to:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Provide accurate and complete information when requested</li>
                                <li>Use our services only for lawful purposes</li>
                                <li>Not engage in any activity that interferes with or disrupts our services</li>
                                <li>Maintain the confidentiality of any account credentials provided to you</li>
                            </ul>

                            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">5. Limitation of Liability</h2>
                            <p>
                                In no event shall Florix Technologies, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this website whether such liability is under contract. Florix Technologies, including its officers, directors, and employees shall not be held liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this website.
                            </p>

                            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">6. Indemnification</h2>
                            <p>
                                You hereby indemnify to the fullest extent Florix Technologies from and against any and/or all liabilities, costs, demands, causes of action, damages, and expenses arising in any way related to your breach of any of the provisions of these Terms.
                            </p>

                            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">7. Governing Law</h2>
                            <p>
                                These Terms will be governed by and interpreted in accordance with the laws of India, and you submit to the non-exclusive jurisdiction of the state and federal courts located in India for the resolution of any disputes.
                            </p>

                            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">8. Contact Information</h2>
                            <p>
                                If you have any questions about these Terms, please contact us at:
                            </p>
                            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                <p><strong>Florix Technologies</strong></p>
                                <p>Bangalore, India</p>
                                <p>Email: info@florixtechnologies.com</p>
                                <p>Phone: +91 9986639994</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
