import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section
      className="
        flex flex-col md:flex-row items-center justify-between
        px-6 md:px-16 py-16 md:py-24
        bg-bg text-text
        transition-all duration-300
      "
    >
      {/* Left Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-xl space-y-6"
      >
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Manage your freelance work with{" "}
          <span className="text-primary">Freelance CRM</span>
        </h1>

        <p className="text-muted text-lg md:text-xl">
          All your clients, projects, and invoices — organized in one place.
          Simple. Fast. Effective.
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          <button
            onClick={() => navigate("/signup")}
            className="
              px-6 py-3 rounded-lg bg-primary text-white font-medium
              flex items-center gap-2
              hover:bg-primary/90 transition-all
            "
          >
            Get Started Free <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => navigate("/demo")}
            className="
              px-6 py-3 rounded-lg border border-[var(--color-muted)]/30
              text-text font-medium flex items-center gap-2
              hover:bg-primary/5 transition-all
            "
          >
            Watch Demo <Play className="w-4 h-4 text-primary" />
          </button>
        </div>
      </motion.div>

      {/* Right Illustration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-10 md:mt-0"
      >
        <img
          src="/assets/hero-illustration.svg"
          alt="Freelance CRM Illustration"
          className="w-[90%] md:w-[480px] mx-auto drop-shadow-xl"
        />
      </motion.div>
    </section>
  );
}
