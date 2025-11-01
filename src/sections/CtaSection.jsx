import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="bg-primary/10 dark:bg-primary/20 py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Start managing your clients smarter — it’s free!
        </h2>
        <p className="text-muted mb-8 text-lg">
          Freelance CRM helps you stay organized, save time, and grow your business.
        </p>
        <button className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition">
          Get Started for Free
        </button>
      </motion.div>
    </section>
  );
}
