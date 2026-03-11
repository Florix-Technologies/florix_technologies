"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"

export default function PrivacyPolicyPage() {
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
                            <h1 className="text-4xl font-bold text-foreground">Privacy Policy</h1>
                            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
                        </div>

                        <div className="prose prose-gray max-w-none space-y-6 text-muted-foreground">
                            <p>
                                At Florix Technologies ("we," "our," or "us"), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                            </p>

                            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">1. Information We Collect</h2>
                            <p>We collect information that you validly provide to us when you:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Request a quote for our services (Web Development, IT Support, etc.)</li>
                                <li>Contact us via our contact forms or email</li>
                                <li>Subscribe to our newsletters or updates</li>
                            </ul>
                            <p className="mt-4">
                                This information may include your name, email address, phone number, company name, and specific project details necessary to provide our services.
                            </p>

                            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">2. How We Use Your Information</h2>
                            <p>We use the collected information for the following purposes:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>To provide, operate, and maintain our services</li>
                                <li>To improve, personalize, and expand our website</li>
                                <li>To understand and analyze how you use our website</li>
                                <li>To communicate with you, including for customer service, updates, and marketing purposes</li>
                                <li>To process your transactions and manage your orders</li>
                                <li>To prevent fraudulent transactions and monitor against theft</li>
                            </ul>

                            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">3. Data Security</h2>
                            <p>
                                We implement appropriate technical and organizational security measures to protect your personal information. However, please be aware that no method of transmission over the internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
                            </p>

                            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">4. Sharing of Information</h2>
                            <p>
                                We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
                            </p>

                            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">5. Third-Party Links</h2>
                            <p>
                                Our website may contain links to third-party websites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
                            </p>

                            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">6. Changes to This Privacy Policy</h2>
                            <p>
                                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                            </p>

                            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">7. Contact Us</h2>
                            <p>
                                If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at:
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
