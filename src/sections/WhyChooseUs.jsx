import { ShieldCheck, Sparkles, Zap, LifeBuoy } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: ShieldCheck,
    title: "Privacy-first",
    desc: "Your client data is securely stored — you own it, not us.",
  },
  {
    icon: Sparkles,
    title: "Built for freelancers",
    desc: "Designed for solo professionals, not complex agency tools.",
  },
  {
    icon: Zap,
    title: "Simple but powerful",
    desc: "Get everything you need to manage your work — no clutter.",
  },
  {
    icon: LifeBuoy,
    title: "24/7 Support",
    desc: "We’re always here to help you stay focused on your business.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-bg text-text py-24 px-6 md:px-10">
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Why Choose <span className="text-primary">Freelance CRM</span>?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-muted max-w-2xl mx-auto mb-12"
        >
          We built Freelance CRM for real freelancers — to simplify work, save
          time, and bring clarity to your business.
        </motion.p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, desc }, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="
                p-6 rounded-2xl border border-[var(--color-muted)]/20
                bg-[var(--color-main-background)]
                shadow-sm hover:shadow-md hover:scale-[1.03]
                transition-all duration-300
                text-left
                hover:border-primary/40
              "
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-muted text-sm">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
