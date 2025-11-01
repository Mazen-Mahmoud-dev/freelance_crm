import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Ahmed Mostafa",
    role: "Web Developer",
    feedback:
      "Freelance CRM saved me hours every week! Managing clients and invoices has never been easier.",
  },
  {
    name: "Sara Ali",
    role: "Graphic Designer",
    feedback:
      "I love how simple and clean the dashboard is. Everything I need is right there!",
  },
  {
    name: "Omar Khaled",
    role: "Freelance Marketer",
    feedback:
      "Finally a CRM that understands freelancers. I can track my projects effortlessly.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-bg text-text py-24 px-6 md:px-10">
      <div className="max-w-6xl mx-auto text-center">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4 "
        >
          Loved by Freelancers Everywhere 🌍
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-muted max-w-2xl mx-auto mb-12"
        >
          Here’s what real freelancers say about using Freelance CRM.
        </motion.p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map(({ name, role, feedback }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="
                p-6 rounded-2xl border border-[var(--color-muted)]/20
                bg-[var(--color-main-background)]
                shadow-sm hover:shadow-md
                transition-all duration-300
                hover:-translate-y-2 hover:border-primary/40
                text-left
              "
            >
              <p className="text-sm text-muted mb-6 leading-relaxed">
                “{feedback}”
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                  {name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold">{name}</h4>
                  <p className="text-xs text-muted">{role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
