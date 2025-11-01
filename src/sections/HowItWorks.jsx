import { motion } from "framer-motion";
import { UserPlus, FolderPlus, BarChart3 } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: UserPlus,
      title: "Create your account",
      description:
        "Sign up in seconds and set up your freelance profile with ease. No complicated setup — just start working smarter.",
    },
    {
      icon: FolderPlus,
      title: "Add clients & projects",
      description:
        "Organize your clients, track projects, and keep deadlines in one central place designed for freelancers.",
    },
    {
      icon: BarChart3,
      title: "Track progress & insights",
      description:
        "Visualize your workflow, monitor performance, and gain insights with a clean, modern dashboard.",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section className="bg-bg text-text py-24 px-6 md:px-12 lg:px-24">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
          How Freelance CRM Works
        </h2>
        <p className="text-muted text-lg">
          Streamline your freelance journey in just three simple steps.
        </p>
      </div>

      {/* Steps */}
      <div className="grid gap-8 md:grid-cols-3">
        {steps.map(({ icon: Icon, title, description }, i) => (
          <motion.div
            key={i}
            className="
              relative group bg-[var(--color-main-background)] dark:bg-[var(--color-bg)]
              border border-[var(--color-muted)]/30 rounded-2xl p-8
              text-center shadow-sm transition-all duration-300
              hover:scale-[1.03] hover:-rotate-1 hover:border-primary
              hover:shadow-md
            "
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={i}
          >
            {/* Step Number */}
            <div
              className="
                absolute top-4 right-4
                px-3 py-1 text-sm font-medium
                bg-primary/10 text-primary
                rounded-full border border-primary/20
                backdrop-blur-sm
              "
            >
              {i + 1}
            </div>

            {/* Icon */}
            <div
              className="
                w-14 h-14 mx-auto mb-6 flex items-center justify-center
                rounded-xl bg-primary/10 text-primary transition-transform duration-300
                group-hover:scale-110
              "
            >
              <Icon className="w-7 h-7" />
            </div>

            {/* Title + Description */}
            <h3 className="text-xl font-semibold mb-3">{title}</h3>
            <p className="text-muted leading-relaxed">{description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
