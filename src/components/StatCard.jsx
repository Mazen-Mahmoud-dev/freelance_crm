import { motion } from "framer-motion";

export default function StatCard({ title, value, icon: Icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="flex items-center gap-4 p-4 bg-bg border border-primary rounded-xl shadow-sm transition-colors duration-300 hover:bg-primary/5"
    >
      {Icon && <Icon className="w-8 h-8 text-primary" />}
      <div>
        <p className="text-sm text-muted">{title}</p>
        <p className="text-xl font-bold text-text">{value}</p>
      </div>
    </motion.div>
  );
}