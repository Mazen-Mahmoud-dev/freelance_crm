// src/sections/PricingSection.jsx
import { motion } from "framer-motion";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started — manage a few clients easily.",
    features: [
      "Up to 3 clients",
      "Basic project tracking",
      "Email support",
    ],
    highlight: false,
  },
  {
    name: "Pro",
    price: "$9/mo",
    description: "For serious freelancers who want to scale efficiently.",
    features: [
      "Unlimited clients & projects",
      "Advanced analytics dashboard",
      "Priority support",
    ],
    highlight: true,
  },
  {
    name: "Team",
    price: "$19/mo",
    description: "For small teams or partners working together.",
    features: [
      "Everything in Pro",
      "Team collaboration tools",
      "Shared dashboards",
    ],
    highlight: false,
  },
];

export default function PricingSection() {
  return (
    <section className="bg-bg text-text py-24 px-6 md:px-10" id="pricing">
      <div className="max-w-6xl mx-auto text-center">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Simple, Transparent Pricing 💳
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-muted max-w-2xl mx-auto mb-12"
        >
          Choose the plan that fits your freelance workflow — upgrade anytime.
        </motion.p>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
              className={`
                p-8 rounded-2xl border transition-all duration-300
                ${plan.highlight
                  ? "border-primary bg-primary/5 shadow-lg scale-105"
                  : "border-[var(--color-muted)]/20 bg-[var(--color-main-background)]"}
                hover:-translate-y-2 hover:shadow-md
              `}
            >
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <p className="text-4xl font-bold text-primary mb-4">
                {plan.price}
              </p>
              <p className="text-muted mb-6">{plan.description}</p>

              <ul className="text-left mb-6 space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="text-primary">✔</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`
                  w-full py-3 rounded-md font-semibold transition
                  ${plan.highlight
                    ? "bg-primary text-white hover:opacity-90"
                    : "border border-[var(--color-muted)] hover:border-primary hover:text-primary"}
                `}
              >
                {plan.highlight ? "Get Started" : "Try for Free"}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
