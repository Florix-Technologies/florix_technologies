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

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    console.log("Form submitted:", formData)
    setRecommendations(null)
    setRecommendationsError(null)
    setLoadingRecommendations(true)

    // Map frontend form values to backend expected payload
    const mapBudgetToNumber = (budgetStr: string) => {
      if (!budgetStr) return 80000
      const nums = budgetStr.replace(/[^0-9–\-]/g, "").split(/–|-/).map((s) => Number(s)).filter(Boolean)
      if (nums.length === 0) return 80000
      if (nums.length === 1) return nums[0]
      return Math.round((nums[0] + nums[1]) / 2)
    }

    const payload = {
      usage: formData.usage || "",
      // simple heuristic: gaming => gpu high, else cpu high
      cpu_priority: formData.usage === "Gaming" ? "medium" : "high",
      gpu_priority: formData.usage === "Gaming" ? "high" : "medium",
      storage_priority: formData.storageCapacity || "medium",
      budget: mapBudgetToNumber(formData.budget || ""),
      brands: formData.brands || [],
    }

    try {
      const res = await fetch("http://localhost:8000/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error(`Request failed: ${res.status}`)

      const data = await res.json()
      setRecommendations(data.recommendations || [])
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
            className="max-w-4xl mx-auto"
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
                          className="bg-secondary/50 border-border focus:border-primary transition-all"
                        />
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
                          className="bg-secondary/50 border-border focus:border-primary transition-all"
                        />
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
                          className="bg-secondary/50 border-border focus:border-primary transition-all"
                        />
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
                          className="bg-secondary/50 border-border focus:border-primary transition-all min-h-[120px]"
                        />
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
                          <SelectTrigger className="bg-secondary/50 border-border focus:border-primary">
                            <SelectValue placeholder="Select speed priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="storageCapacity" className="text-sm font-medium mb-2 block">
                          Storage Capacity
                        </Label>
                        <Select
                          value={formData.storageCapacity}
                          onValueChange={(value: string) => updateFormData("storageCapacity", value)}
                        >
                          <SelectTrigger className="bg-secondary/50 border-border focus:border-primary">
                            <SelectValue placeholder="Select storage capacity" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low (256GB - 512GB)</SelectItem>
                            <SelectItem value="medium">Medium (1TB - 2TB)</SelectItem>
                            <SelectItem value="high">High (4TB+)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="graphicsPower" className="text-sm font-medium mb-2 block">
                          Graphics Power
                        </Label>
                        <Select
                          value={formData.graphicsPower}
                          onValueChange={(value: string) => updateFormData("graphicsPower", value)}
                        >
                          <SelectTrigger className="bg-secondary/50 border-border focus:border-primary">
                            <SelectValue placeholder="Select graphics power" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low (Integrated)</SelectItem>
                            <SelectItem value="medium">Medium (Entry GPU)</SelectItem>
                            <SelectItem value="high">High (Gaming GPU)</SelectItem>
                            <SelectItem value="ultra">Ultra (Enthusiast GPU)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="quietCooling" className="text-sm font-medium mb-2 block">
                          Quiet Cooling
                        </Label>
                        <Select
                          value={formData.quietCooling}
                          onValueChange={(value: string) => updateFormData("quietCooling", value)}
                        >
                          <SelectTrigger className="bg-secondary/50 border-border focus:border-primary">
                            <SelectValue placeholder="Select cooling priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
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

            {recommendations && recommendations.length > 0 && (
              <div className="mt-8 max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold mb-4">Recommendations</h3>
                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3">
                  {recommendations.map((r, i) => (
                    <div key={i} className="p-4 bg-secondary/30 border border-border rounded-lg">
                      <h4 className="font-semibold">{r.name}</h4>
                      <p className="text-sm text-muted-foreground">₹{r.total_price}</p>
                      <p className="mt-2 text-sm">{r.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  )
}
