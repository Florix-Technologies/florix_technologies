"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select"
import { Textarea } from "./components/ui/textarea"
import { Checkbox } from "./components/ui/checkbox"
import { ComponentGuide } from "./components/component-guide"
import { ModelViewer } from "./components/model-viewer"
import { Monitor, User, Settings, Database, ChevronRight, Sparkles, Menu } from "lucide-react"
import { MobileSidebar } from "./components/mobile-sidebar"

type FormData = {
  name: string
  email: string
  phone: string
  usage: string
  requirements: string
  brands: string[]
  cabinetType: string
  rgbPreference: string
  speed: string
  storageCapacity: string
  graphicsPower: string
  quietCooling: string
  budget: string
  additionalNotes: string
  agreedToTerms: boolean
}

export default function PCRecommendationSystem({ mode = "pc" }: { mode?: "pc" | "laptop" }) {
  const [currentStep, setCurrentStep] = useState(0)
  const isLaptop = mode === "laptop"
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    usage: "",
    requirements: "",
    brands: [],
    cabinetType: "", // Reused for screen size in laptop mode to avoid type errors for now
    rgbPreference: "",
    speed: "",
    storageCapacity: "",
    graphicsPower: "",
    quietCooling: "",
    budget: "",
    additionalNotes: "",
    agreedToTerms: false,
  })


  const steps = [
    { icon: User, title: "Your Details", id: "details" },
    { icon: Settings, title: `${isLaptop ? "Laptop" : "PC"} Requirements`, id: "requirements" },
    { icon: Database, title: "Storage & Performance", id: "performance" },
  ]

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleBrand = (brand: string) => {
    setFormData((prev) => {
      const has = prev.brands.includes(brand)
      return { ...prev, brands: has ? prev.brands.filter((b) => b !== brand) : [...prev.brands, brand] }
    })
  }

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [recommendations, setRecommendations] = useState<any[] | null>(null)
  const [loadingRecommendations, setLoadingRecommendations] = useState(false)
  const [recommendationsError, setRecommendationsError] = useState<string | null>(null)

  const [errors, setErrors] = useState<Partial<FormData>>({})

  const validateStep = (step: number) => {
    const newErrors: Partial<FormData> = {}
    let isValid = true

    if (step === 0) {
      if (!formData.name.trim()) { newErrors.name = "Name is required"; isValid = false }
      if (!formData.email.trim()) { newErrors.email = "Email is required"; isValid = false }
      else if (!/\S+@\S+\.\S+/.test(formData.email)) { newErrors.email = "Invalid email format"; isValid = false }
      if (!formData.phone.trim()) { newErrors.phone = "Phone is required"; isValid = false }
    }

    if (step === 1) {
      if (!formData.usage) { newErrors.usage = "Usage selection is required"; isValid = false }
      if (!formData.requirements.trim()) { newErrors.requirements = "Requirements are required"; isValid = false }
      if (!formData.cabinetType) { newErrors.cabinetType = isLaptop ? "Screen size is required" : "Cabinet type is required"; isValid = false }
      if (!formData.rgbPreference) { newErrors.rgbPreference = "RGB preference is required"; isValid = false }
      // Brands can be optional or required. User said "every field". Let's require at least one brand? 
      // "Preferred Brands / Components" often implies optional. But let's stick to "every field" request unless it breaks flow.
      // If brands is empty, let's not block, as it says "Preferred". But specific instruction "every field compusary".
      // I'll leave brands effectively optional as it's a checkbox group often used for "any", but adds validation if user wants "every field". 
      // Actually, let's make it optional as strictly required might be annoying if they have no preference.
      // Wait, user said "every field should be compulsory". I will make it required then. 
      if (formData.brands.length === 0) { newErrors.brands = ["Please select at least one brand"] as any; isValid = false }
    }

    if (step === 2) {
      if (!formData.speed) { newErrors.speed = "Speed preference is required"; isValid = false }
      if (!formData.storageCapacity) { newErrors.storageCapacity = "Storage capacity is required"; isValid = false }
      if (!formData.graphicsPower) { newErrors.graphicsPower = "Graphics power is required"; isValid = false }
      if (!formData.quietCooling) { newErrors.quietCooling = "Cooling preference is required"; isValid = false }
      if (!formData.budget) { newErrors.budget = "Budget range is required"; isValid = false }
    }

    setErrors(newErrors)
    return isValid
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    if (!validateStep(2)) return

    console.log("Form submitted:", formData)
    setRecommendations(null)
    setRecommendationsError(null)
    setLoadingRecommendations(true)

    // Helper to map storage capacity
    const mapStorage = (value: string) => {
      switch (value) {
        case "low": return "Low(256GB-512GB)"
        case "medium": return "Medium(1TB-2TB)"
        case "high": return "High(4TB+)"
        default: return "Medium(1TB-2TB)"
      }
    }

    // Helper to map graphics power
    const mapGraphics = (value: string) => {
      switch (value) {
        case "low": return "Low(Integrated)"
        case "medium": return "Medium(Entry GPU)"
        case "high": return "High(Gaming GPU)"
        case "ultra": return "Ultra(Enthusiast GPU)"
        default: return "Medium(Entry GPU)"
      }
    }

    // Helper to map budget (remove currency symbol)
    const mapBudget = (value: string) => {
      if (!value) return "60,000-80,000"
      return value.replace(/₹/g, "").replace(/ /g, "").replace(/–/g, "-")
    }

    const payload = {
      usage: formData.usage?.toLowerCase() || "gaming",
      preferred_brands: formData.brands && formData.brands.length > 0 ? formData.brands : ["NVIDIA GPU"],
      speed: formData.speed ? (formData.speed.charAt(0).toUpperCase() + formData.speed.slice(1)) : "Medium",
      storage_capacity: mapStorage(formData.storageCapacity),
      graphics_power: mapGraphics(formData.graphicsPower),
      quiet_cooling: formData.quietCooling || "medium",
      budget: mapBudget(formData.budget),
    }

    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';


      const res = await fetch(`${backendUrl}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error(`Request failed: ${res.status}`)

      const data = await res.json()
      console.log("API RAW RESPONSE:", data); // Debugging log

      const recs = Array.isArray(data) ? data : (data.recommendations || [])
      console.log("PROCESSED RECS:", recs); // Debugging log

      setRecommendations(recs)

      // Send email notification in background
      fetch(`${backendUrl}/recommendation-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formData: { ...formData, ...payload },
          recommendations: recs
        }),
      }).catch(err => console.error("Failed to send recommendation email", err));

    } catch (err: any) {
      console.error(err)
      setRecommendationsError(err.message || "Failed to fetch recommendations")
    } finally {
      setLoadingRecommendations(false)
    }
  }

  return (
    <div
      className="min-h-screen bg-[#050505] text-white relative overflow-hidden"
      style={{
        "--primary": "oklch(0.623 0.2 260)", // Vivid Blue
        "--foreground": "oklch(1 0 0)", // White
      } as React.CSSProperties}
    >
      <MobileSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {/* Animated background grid */}
      <div className="absolute inset-0 max-h-screen opacity-20 pointer-events-none">

        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(37, 99, 235, 0.2) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(37, 99, 235, 0.2) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
            animation: "grid-flow 20s linear infinite",
          }}
        />
      </div>

      {/* Glowing orbs */}
      <div
        className="absolute top-20 left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] animate-pulse"
        style={{ animation: "glow-pulse 4s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-20 right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px]"
        style={{ animation: "glow-pulse 6s ease-in-out infinite, float 8s ease-in-out infinite" }}
      />

      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        {/* Sidebar */}
        <ComponentGuide />

        {/* Main Content */}
        <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:pt-8 lg:px-12 lg:pb-12 relative">

          <button
            className="lg:hidden absolute left-4 top-4 p-2 rounded-md bg-sidebar-accent border border-sidebar-border z-40"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu className="w-6 h-6" />
          </button>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`mx-auto transition-all duration-500 ${recommendations && recommendations.length > 0 ? "max-w-7xl" : "max-w-4xl"}`}
          >
            {/* Header */}
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-3 mb-6"
              >
                <div className="p-3 bg-blue-600/20 rounded-xl border border-blue-600/50 backdrop-blur-sm">
                  <Monitor className="w-8 h-8 text-blue-500" />
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-blue-500">
                  {isLaptop ? "Laptop" : "PC"} Recommendation System
                </h1>
              </motion.div>
              <p className="text-gray-400 text-lg">
                Get personalized {isLaptop ? "laptop" : "PC build"} recommendations powered by advanced AI
              </p>
            </div>

            <div className="mb-8 max-w-2xl mx-auto w-full aspect-video sm:aspect-[16/9] overflow-hidden rounded-xl">
              <ModelViewer
                modelPath={isLaptop ? "/model/macbook_laptop.glb" : "/model/laptop.glb"}
                scale={isLaptop ? [2.5, 2.5, 2.5] : [1, 1, 1]}
              />
            </div>


            {/* Progress Steps */}
            <div className="mb-12">
              <div className="flex items-center justify-between max-w-2xl mx-auto">
                {steps.map((step, index) => {
                  const Icon = step.icon
                  const isActive = index === currentStep
                  const isCompleted = index < currentStep

                  return (
                    <div key={step.id} className="flex items-center flex-1">
                      <motion.div
                        initial={false}
                        animate={{
                          scale: isActive ? 1.1 : 1,
                        }}
                        className="flex flex-col items-center"
                      >
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isActive
                            ? "bg-primary border-primary shadow-lg shadow-primary/50"
                            : isCompleted
                              ? "bg-primary/50 border-primary/50"
                              : "bg-secondary border-border"
                            }`}
                        >
                          <Icon
                            className={`w-6 h-6 ${isActive || isCompleted ? "text-primary-foreground" : "text-muted-foreground"}`}
                          />
                        </div>
                        <span
                          className={`mt-2 text-sm font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}
                        >
                          {step.title}
                        </span>
                      </motion.div>
                      {index < steps.length - 1 && (
                        <div className="flex-1 h-0.5 mx-4 bg-border relative overflow-hidden">
                          <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: isCompleted ? "100%" : "0%" }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-y-0 left-0 bg-primary"
                          />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Form Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.4 }}

                className="live-border bg-black/40 rounded-2xl p-4 sm:p-6 lg:p-8 backdrop-blur-xl shadow-2xl max-w-full overflow-x-hidden"

              >
                {currentStep === 0 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-primary/20 rounded-lg">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold">Your Details</h2>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name" className="text-sm font-medium mb-2 block">
                          Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="name"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(e) => updateFormData("name", e.target.value)}
                          className={`bg-secondary/50 border-border focus:border-primary transition-all ${errors.name ? "border-destructive" : ""}`}
                        />
                        {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-sm font-medium mb-2 block">
                          Email <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={(e) => updateFormData("email", e.target.value)}
                          className={`bg-secondary/50 border-border focus:border-primary transition-all ${errors.email ? "border-destructive" : ""}`}
                        />
                        {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                      </div>

                      <div>
                        <Label htmlFor="phone" className="text-sm font-medium mb-2 block">
                          Phone Number <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          value={formData.phone}
                          onChange={(e) => updateFormData("phone", e.target.value)}
                          className={`bg-secondary/50 border-border focus:border-primary transition-all ${errors.phone ? "border-destructive" : ""}`}
                        />
                        {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-primary/20 rounded-lg">
                        <Settings className="w-6 h-6 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold">{isLaptop ? "Laptop" : "PC"} Requirements</h2>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <Label className="text-sm font-medium mb-3 block">
                          What do you need the {isLaptop ? "laptop" : "PC"} for? <span className="text-destructive">*</span>
                        </Label>
                        <RadioGroup value={formData.usage} onValueChange={(value: string) => updateFormData("usage", value)}>
                          {[
                            "Gaming",
                            "Video Editing / Rendering",
                            "Office / Productivity",
                            "Programming / Development",
                            "Graphic Design / Animation",
                            "3D Modeling / CAD",
                            "Other",
                          ].map((option) => (
                            <motion.div
                              key={option}
                              whileHover={{ x: 4 }}
                              className="flex items-center space-x-3 p-3 rounded-lg bg-secondary/30 border border-border hover:border-primary transition-all"
                            >
                              <RadioGroupItem value={option} id={option} className="border-primary text-primary" />
                              <Label htmlFor={option} className="flex-1 cursor-pointer">
                                {option}
                              </Label>
                            </motion.div>
                          ))}
                        </RadioGroup>
                        {errors.usage && <p className="text-destructive text-xs mt-1">{errors.usage}</p>}
                      </div>

                      <div>
                        <Label htmlFor="requirements" className="text-sm font-medium mb-2 block">
                          Describe your requirements or expected performance <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                          id="requirements"
                          placeholder="Example: 4K gaming, Blender, video editing in 1080p..."
                          value={formData.requirements}
                          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateFormData("requirements", e.target.value)}
                          className={`bg-secondary/50 border-border focus:border-primary transition-all min-h-[120px] ${errors.requirements ? "border-destructive" : ""}`}
                        />
                        {errors.requirements && <p className="text-destructive text-xs mt-1">{errors.requirements}</p>}
                      </div>

                      <div>
                        <Label className="text-sm font-medium mb-3 block">{isLaptop ? "Preferred Screen Size" : "Preferred Cabinet Type"}</Label>
                        <RadioGroup
                          value={formData.cabinetType}
                          onValueChange={(value: string) => updateFormData("cabinetType", value)}
                        >
                          {(isLaptop
                            ? ["13-14 inch", "15-16 inch", "17+ inch", "No preference"]
                            : ["Compact (Mini Tower)", "Mid Tower", "Full Tower", "No preference"]
                          ).map((option) => (
                            <motion.div
                              key={option}
                              whileHover={{ x: 4 }}
                              className="flex items-center space-x-3 p-3 rounded-lg bg-secondary/30 border border-border hover:border-primary transition-all"
                            >
                              <RadioGroupItem value={option} id={option} className="border-primary text-primary" />
                              <Label htmlFor={option} className="flex-1 cursor-pointer">
                                {option}
                              </Label>
                            </motion.div>
                          ))}
                        </RadioGroup>
                        {errors.cabinetType && <p className="text-destructive text-xs mt-1">{errors.cabinetType}</p>}
                      </div>

                      <div>
                        <Label className="text-sm font-medium mb-3 block">Preferred Brands / Components</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            "Intel CPU",
                            "AMD CPU",
                            "NVIDIA GPU",
                            "AMD GPU",
                          ].map((option) => (
                            <label key={option} className="flex items-center space-x-3 p-2 rounded-lg bg-secondary/30 border border-border hover:border-primary cursor-pointer">
                              <input
                                type="checkbox"
                                checked={formData.brands.includes(option)}
                                onChange={() => toggleBrand(option)}
                                className="form-checkbox h-4 w-4 text-primary"
                              />
                              <span className="text-sm">{option}</span>
                            </label>
                          ))}
                        </div>
                        {errors.brands && <p className="text-destructive text-xs mt-1">{errors.brands as any}</p>}
                      </div>

                      <div>
                        <Label className="text-sm font-medium mb-3 block">
                          RGB / Aesthetic Preference <span className="text-destructive">*</span>
                        </Label>
                        <RadioGroup
                          value={formData.rgbPreference}
                          onValueChange={(value: string) => updateFormData("rgbPreference", value)}
                        >
                          {["Yes, I want RGB lighting", "No, I prefer a clean professional look"].map((option) => (
                            <motion.div
                              key={option}
                              whileHover={{ x: 4 }}
                              className="flex items-center space-x-3 p-3 rounded-lg bg-secondary/30 border border-border hover:border-primary transition-all"
                            >
                              <RadioGroupItem value={option} id={option} className="border-primary text-primary" />
                              <Label htmlFor={option} className="flex-1 cursor-pointer">
                                {option}
                              </Label>
                            </motion.div>
                          ))}
                        </RadioGroup>
                        {errors.rgbPreference && <p className="text-destructive text-xs mt-1">{errors.rgbPreference}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-primary/20 rounded-lg">
                        <Database className="w-6 h-6 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold">Storage & Performance Priorities</h2>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="speed" className="text-sm font-medium mb-2 block">
                          Speed (SSD, RAM)
                        </Label>
                        <Select value={formData.speed} onValueChange={(value: string) => updateFormData("speed", value)}>
                          <SelectTrigger className={`bg-secondary/50 border-border focus:border-primary ${errors.speed ? "border-destructive" : ""}`}>
                            <SelectValue placeholder="Select speed priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.speed && <p className="text-destructive text-xs mt-1">{errors.speed}</p>}
                      </div>

                      <div>
                        <Label htmlFor="storageCapacity" className="text-sm font-medium mb-2 block">
                          Storage Capacity
                        </Label>
                        <Select
                          value={formData.storageCapacity}
                          onValueChange={(value: string) => updateFormData("storageCapacity", value)}
                        >
                          <SelectTrigger className={`bg-secondary/50 border-border focus:border-primary ${errors.storageCapacity ? "border-destructive" : ""}`}>
                            <SelectValue placeholder="Select storage capacity" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low (256GB - 512GB)</SelectItem>
                            <SelectItem value="medium">Medium (1TB - 2TB)</SelectItem>
                            <SelectItem value="high">High (4TB+)</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.storageCapacity && <p className="text-destructive text-xs mt-1">{errors.storageCapacity}</p>}
                      </div>

                      <div>
                        <Label htmlFor="graphicsPower" className="text-sm font-medium mb-2 block">
                          Graphics Power
                        </Label>
                        <Select
                          value={formData.graphicsPower}
                          onValueChange={(value: string) => updateFormData("graphicsPower", value)}
                        >
                          <SelectTrigger className={`bg-secondary/50 border-border focus:border-primary ${errors.graphicsPower ? "border-destructive" : ""}`}>
                            <SelectValue placeholder="Select graphics power" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low (Integrated)</SelectItem>
                            <SelectItem value="medium">Medium (Entry GPU)</SelectItem>
                            <SelectItem value="high">High (Gaming GPU)</SelectItem>
                            <SelectItem value="ultra">Ultra (Enthusiast GPU)</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.graphicsPower && <p className="text-destructive text-xs mt-1">{errors.graphicsPower}</p>}
                      </div>

                      <div>
                        <Label htmlFor="quietCooling" className="text-sm font-medium mb-2 block">
                          Quiet Cooling
                        </Label>
                        <Select
                          value={formData.quietCooling}
                          onValueChange={(value: string) => updateFormData("quietCooling", value)}
                        >
                          <SelectTrigger className={`bg-secondary/50 border-border focus:border-primary ${errors.quietCooling ? "border-destructive" : ""}`}>
                            <SelectValue placeholder="Select cooling priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.quietCooling && <p className="text-destructive text-xs mt-1">{errors.quietCooling}</p>}
                      </div>

                      <div>
                        <Label className="text-sm font-medium mb-3 block">
                          Approximate Budget Range (₹) <span className="text-destructive">*</span>
                        </Label>
                        <RadioGroup value={formData.budget} onValueChange={(value: string) => updateFormData("budget", value)}>
                          {[
                            "₹40,000 – ₹60,000",
                            "₹60,000 – ₹80,000",
                            "₹80,000 – ₹1,00,000",
                            "₹1,00,000 – ₹1,50,000",
                            "Above ₹1,50,000",
                          ].map((option) => (
                            <motion.div
                              key={option}
                              whileHover={{ x: 4 }}
                              className="flex items-center space-x-3 p-3 rounded-lg bg-secondary/30 border border-border hover:border-primary transition-all"
                            >
                              <RadioGroupItem value={option} id={option} className="border-primary text-primary" />
                              <Label htmlFor={option} className="flex-1 cursor-pointer">
                                {option}
                              </Label>
                            </motion.div>
                          ))}
                        </RadioGroup>
                        {errors.budget && <p className="text-destructive text-xs mt-1">{errors.budget}</p>}
                      </div>

                      <div>
                        <Label htmlFor="additionalNotes" className="text-sm font-medium mb-2 block">
                          Additional Notes (optional)
                        </Label>
                        <Textarea
                          id="additionalNotes"
                          placeholder="Any additional preferences or requirements..."
                          value={formData.additionalNotes}
                          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateFormData("additionalNotes", e.target.value)}
                          className="bg-secondary/50 border-border focus:border-primary transition-all min-h-[100px]"
                        />
                      </div>

                      <div className="flex items-center space-x-3 p-4 rounded-lg bg-secondary/30 border border-border">
                        <Checkbox
                          id="terms"
                          checked={formData.agreedToTerms}
                          onCheckedChange={(checked: boolean) => updateFormData("agreedToTerms", checked)}
                          className="border-primary data-[state=checked]:bg-primary"
                        />
                        <Label htmlFor="terms" className="text-sm cursor-pointer">
                          I agree to the terms and conditions
                        </Label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-border">
                  <Button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    variant="outline"
                    className="border-primary/50 hover:bg-primary/10 bg-transparent"
                  >
                    Previous
                  </Button>

                  {currentStep < steps.length - 1 ? (
                    <Button
                      onClick={nextStep}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/30"
                    >
                      Next Step
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      disabled={!formData.agreedToTerms}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/30"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Get {isLaptop ? "Laptop" : "PC"} Recommendations
                    </Button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Recommendations Output */}
            {loadingRecommendations && (
              <div className="mt-8 max-w-4xl mx-auto text-center">Generating recommendations...</div>
            )}

            {recommendationsError && (
              <div className="mt-8 max-w-4xl mx-auto text-center text-destructive">{recommendationsError}</div>
            )}


          </motion.div>
        </main>
      </div >

      {recommendations && recommendations.length > 0 && (
        <section className="relative z-10 w-full px-4 py-16 bg-black/40 backdrop-blur-md border-t border-white/10">
          <div className="max-w-[90%] mx-auto">
            <h3 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              Your Personalized Recommendations
            </h3>
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {recommendations.map((r, i) => (
                <div key={i} className="p-8 bg-secondary/20 border border-white/10 rounded-2xl hover:border-blue-500/50 hover:bg-secondary/30 transition-all duration-300 flex flex-col h-full shadow-lg shadow-black/50">
                  <div className="mb-6 pb-4 border-b border-white/5">
                    <h4 className="font-bold text-2xl text-blue-400 mb-2 min-h-[4rem] flex items-end leading-tight">{r.build_name}</h4>
                    <p className="text-3xl font-bold text-white">₹{r.estimated_price}</p>
                  </div>

                  <div className="space-y-3 mb-8">
                    {[
                      { label: "CPU", value: r.cpu },
                      { label: "GPU", value: r.gpu },
                      { label: "RAM", value: r.ram },
                      { label: "Storage", value: r.storage },
                      { label: "Motherboard", value: r.motherboard },
                      { label: "PSU", value: r.psu },
                      { label: "Cabinet", value: r.cabinet },
                    ].map((spec, idx) => (
                      spec.value && (
                        <div key={idx} className="flex text-sm border-b border-white/5 pb-2 last:border-0 hover:bg-white/5 transition-colors p-2 rounded">
                          <span className="text-gray-400 w-32 flex-shrink-0 font-medium">{spec.label}:</span>
                          <span className="text-gray-100 font-medium">{spec.value}</span>
                        </div>
                      )
                    ))}
                  </div>

                  <div className="bg-blue-900/10 p-5 rounded-xl border border-blue-500/20 flex-grow flex flex-col justify-center min-h-[140px]">
                    <p className="text-base text-gray-300 italic leading-relaxed text-center">
                      "{r.why_this_build}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div >
  )
}
