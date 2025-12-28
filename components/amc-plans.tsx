"use client"

import { motion } from "framer-motion"
import { Check, MessageSquare, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Basic",
    subtitle: "For Individuals",
    price: "Contact Us",
    features: ["2 Visits/Year", "Remote Support", "48hr Response"],
    popular: false,
    delay: 0,
  },
  {
    name: "Advanced",
    subtitle: "For Power Users",
    price: "Contact Us",
    features: ["4 Visits/Year", "Priority Support", "24hr Response", "Preventive Checks"],
    popular: true,
    delay: 0.1,
  },
  {
    name: "Premium",
    subtitle: "For Small Businesses",
    price: "Contact Us",
    features: ["8 Visits/Year", "On-site Priority", "12hr Response", "Hardware Cleaning"],
    popular: false,
    delay: 0.2,
  },
  {
    name: "Enterprise",
    subtitle: "For Corporations",
    price: "Custom",
    features: ["Unlimited Visits", "Dedicated Manager", "Instant Response", "Full IT Outsourcing"],
    popular: false,
    delay: 0.3,
  },
]

export function AMCPlans() {
  return (
    <section className="py-20 px-6 bg-[#050505] text-white overflow-hidden relative" id="plans">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Choose Your <span className="text-primary">Plan</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Flexible AMC packages designed to keep your technology running flawlessly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: plan.delay }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className={`relative flex flex-col p-6 rounded-2xl border ${plan.popular ? "border-primary bg-primary/5" : "border-gray-800 bg-[#0a0a0a]"
                } transition-all duration-300 group hover:shadow-[0_0_30px_rgba(var(--primary),0.15)] hover:border-primary/50`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full uppercase tracking-wider">
                  Popular
                </div>
              )}

              <div className="text-center mb-8 pt-4">
                <h3 className="text-2xl font-bold mb-1 group-hover:text-primary transition-colors">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-6">{plan.subtitle}</p>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2 tracking-tighter shadow-green-glow">
                  {plan.price}
                </div>
              </div>

              <div className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-gray-300">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    {feature}
                  </div>
                ))}
              </div>

              <Button
                className={`w-full py-6 rounded-xl font-bold text-base transition-all duration-300 ${plan.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(var(--primary),0.4)]"
                    : "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_15px_rgba(var(--primary),0.3)]"
                  }`}
                onClick={() =>
                  window.open(
                    `https://wa.me/919986639994?text=I%20am%20interested%20in%20the%20${plan.name}%20AMC%20Plan`
                  )
                }
              >
                Enquire Now
              </Button>

              {/* WhatsApp Floating Icon for Card */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -right-2 -bottom-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <div className="bg-primary p-2 rounded-full shadow-lg">
                  <MessageSquare className="w-4 h-4 text-primary-foreground" />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
