"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send, Loader2, CheckCircle2 } from "lucide-react"

export function QuoteForm() {
    const [service, setService] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState("")

    // Consolidate main form data
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    })

    // State for service-specific details
    const [serviceDetails, setServiceDetails] = useState<any>({})

    const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setService(e.target.value)
        setServiceDetails({}) // Reset details when service changes
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleDetailChange = (key: string, value: string) => {
        setServiceDetails((prev: any) => ({ ...prev, [key]: value }))
    }

    const handleSubmit = async () => {
        setIsLoading(true)
        setError("")

        try {
            const payload = {
                ...formData,
                service,
                serviceDetails
            }

            const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
            const res = await fetch(`${backendUrl}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || 'Something went wrong')
            }

            setIsSuccess(true)
            // Reset form
            setFormData({ name: "", email: "", phone: "", message: "" })
            setService("")
            setServiceDetails({})

        } catch (err: any) {
            console.error(err)
            setError(err.message || "Failed to send request. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const services = [
        "Web Development",
        "IT Support",
        "IT Consulting",
        "Artificial Intelligence",
        "AMC Services",
        "PC building and Laptops",
        "Office Networking",
    ]

    const inputStyles = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    const labelStyles = "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"

    const renderServiceFields = () => {
        switch (service) {
            case "Web Development":
                return (
                    <>
                        <div className="space-y-2">
                            <label className={labelStyles}>Project Type</label>
                            <select
                                className={inputStyles}
                                onChange={(e) => handleDetailChange("items", e.target.value)}
                                value={serviceDetails.items || ""}
                            >
                                <option value="" disabled>Select type</option>
                                <option value="corporate">Corporate Website</option>
                                <option value="ecommerce">E-commerce Platform</option>
                                <option value="webapp">Web Application (SaaS)</option>
                                <option value="landing">Landing Page</option>
                                <option value="portfolio">Portfolio / Personal</option>
                                <option value="blog">Blog / CMS</option>
                                <option value="lms">Educational / LMS</option>
                                <option value="realestate">Real Estate / Portal</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className={labelStyles}>Estimated Budget</label>
                            <select
                                className={inputStyles}
                                onChange={(e) => handleDetailChange("budget", e.target.value)}
                                value={serviceDetails.budget || ""}
                            >
                                <option value="" disabled>Select range</option>
                                <option value="4-6l">₹4 Lakh - ₹6 Lakh</option>
                                <option value="6-8l">₹6 Lakh - ₹8 Lakh</option>
                                <option value="8-12l">₹8 Lakh - ₹12 Lakh</option>
                                <option value="12-18l">₹12 Lakh - ₹18 Lakh</option>
                                <option value="18-25l">₹18 Lakh - ₹25 Lakh</option>
                                <option value="25-35l">₹25 Lakh - ₹35 Lakh</option>
                                <option value="35-45l">₹35 Lakh - ₹45 Lakh</option>
                                <option value="45-50l">₹45 Lakh - ₹50 Lakh</option>
                                <option value="50l+">₹50 Lakh+</option>
                            </select>
                        </div>
                    </>
                )
            case "PC and Laptop Building":
                return (
                    <>
                        <div className="space-y-2">
                            <label className={labelStyles}>Device Type</label>
                            <select
                                className={inputStyles}
                                onChange={(e) => handleDetailChange("deviceType", e.target.value)}
                                value={serviceDetails.deviceType || ""}
                            >
                                <option value="" disabled>PC or Laptop</option>
                                <option value="pc">PC Build</option>
                                <option value="laptop">Laptop Recommendation</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className={labelStyles}>Usage Purpose</label>
                            <select
                                className={inputStyles}
                                onChange={(e) => handleDetailChange("usage", e.target.value)}
                                value={serviceDetails.usage || ""}
                            >
                                <option value="" disabled>Select purpose</option>
                                <option value="gaming">Gaming</option>
                                <option value="office">Office/Work</option>
                                <option value="editing">Editing/Rendering</option>
                                <option value="coding">Programming</option>
                            </select>
                        </div>
                    </>
                )
            case "IT Consulting":
            case "Office Networking":
                return (
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className={labelStyles}>Appointment Date</label>
                            <Input
                                type="date"
                                onChange={(e) => handleDetailChange("appointmentDate", e.target.value)}
                                value={serviceDetails.appointmentDate || ""}
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className={labelStyles}>Preferred Time</label>
                            <Input
                                type="time"
                                onChange={(e) => handleDetailChange("appointmentTime", e.target.value)}
                                value={serviceDetails.appointmentTime || ""}
                            />
                        </div>
                    </div>
                )
            case "IT Support":
            case "AMC Services":
                return (
                    <div className="space-y-2">
                        <label className={labelStyles}>Number of Systems</label>
                        <Input
                            type="number"
                            placeholder="e.g. 10"
                            onChange={(e) => handleDetailChange("systemsCount", e.target.value)}
                            value={serviceDetails.systemsCount || ""}
                        />
                    </div>
                )
            default:
                return null
        }
    }

    if (isSuccess) {
        return (
            <div className="w-full max-w-xl mx-auto p-12 bg-white dark:bg-black/50 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 dark:border-white/10 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Request Received!</h2>
                <p className="text-muted-foreground mb-8">
                    Thank you for contacting us. We have received your request and will get back to you with a quote shortly.
                </p>
                <Button onClick={() => setIsSuccess(false)} variant="outline">
                    Submit Another Request
                </Button>
            </div>
        )
    }

    return (
        <div className="w-full max-w-xl mx-auto p-4 md:p-6 bg-white dark:bg-black/50 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 dark:border-white/10">
            <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">Request a Quote</h2>
                <p className="text-muted-foreground">Tell us about your needs and we&apos;ll get back to you with a custom proposal.</p>
            </div>

            <div className="space-y-6">
                {/* Service Selection */}
                <div className="space-y-2">
                    <label className={labelStyles}>Select Service</label>
                    <div className="relative">
                        <select
                            className={`${inputStyles} h-12 text-base`}
                            onChange={handleServiceChange}
                            value={service}
                        >
                            <option value="" disabled>Choose a service...</option>
                            {services.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Dynamic Form Content */}
                <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                >
                    {/* Common Fields */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className={labelStyles}>Name</label>
                            <Input
                                name="name"
                                placeholder="Sachin Tendulkar"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className={labelStyles}>Phone</label>
                            <Input
                                name="phone"
                                placeholder="+91 98765 43210"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className={labelStyles}>Email</label>
                        <Input
                            name="email"
                            type="email"
                            placeholder="sachin.tendulkar@example.com"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Service Specific Fields */}
                    {service && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-4 p-4 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5"
                        >
                            <h3 className="font-semibold text-sm text-primary uppercase tracking-wider mb-2">
                                {service} Details
                            </h3>
                            {renderServiceFields()}
                        </motion.div>
                    )}

                    <div className="space-y-2">
                        <label className={labelStyles}>Additional Message</label>
                        <Textarea
                            name="message"
                            placeholder="Specific requirements or questions..."
                            className="min-h-[100px]"
                            value={formData.message}
                            onChange={handleInputChange}
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm bg-red-50 p-3 rounded-md border border-red-200">
                            {error}
                        </p>
                    )}

                    <Button
                        size="lg"
                        className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl h-12 text-lg font-medium shadow-lg hover:shadow-primary/25 transition-all"
                        onClick={handleSubmit}
                        disabled={isLoading || !service || !formData.name || !formData.email}
                    >
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Send className="w-5 h-5 mr-2" />}
                        {isLoading ? "Sending..." : "Submit Request"}
                    </Button>

                </motion.div>
            </div>
        </div>
    )
}
