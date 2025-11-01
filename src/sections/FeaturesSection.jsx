import { motion } from "framer-motion";
import { Users, Folder, CheckSquare, BarChart3, CalendarDays, Settings } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Smart Client Management",
    description: "Keep all your clients organized and easily accessible from one place.",
  },
  {
    icon: Folder,
    title: "Project Tracking",
    description: "Track project progress, deadlines, and deliverables efficiently.",
  },
  {
    icon: CheckSquare,
    title: "Task Automation",
    description: "Automate repetitive tasks and focus on what really matters. coming soon!",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Get detailed insights about performance and team productivity.",
  },
  {
    icon: CalendarDays,
    title: "Scheduling & Reminders",
    description: "Manage meetings and deadlines with built-in calendar tools.",
  },
  {
    icon: Settings,
    title: "Customizable Workflows",
    description: "Easily adapt workflows to fit your freelance process.",
  },
];

export default function FeaturesSection() {
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
    <section
      id="features"
      className="w-full py-24 bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Powerful Features</h2>
        <p className="text-[var(--color-muted)] max-w-2xl mx-auto mb-12">
          Everything you need to manage your freelance business — in one clean, intuitive dashboard.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={i}
              className="
                group rounded-2xl border border-[var(--color-muted)]/30 
                p-8 transition-all duration-300 ease-out 
                hover:scale-[1.05] hover:-rotate-1 hover:border-[var(--color-primary)] hover:shadow-lg 
                bg-[var(--color-main-background)]
              "
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={i}
            >
              <div
                className="
                  w-12 h-12 flex items-center justify-center mx-auto mb-4 rounded-xl 
                  bg-[var(--color-primary)]/10 text-[var(--color-primary)] 
                  transition-transform duration-300 group-hover:rotate-3
                "
              >
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-[var(--color-muted)] text-sm leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
