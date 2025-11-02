import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { motion } from "framer-motion";

const data = [
  { month: "Jan", completed: 3, ongoing: 2 },
  { month: "Feb", completed: 4, ongoing: 1 },
  { month: "Mar", completed: 2, ongoing: 3 },
  { month: "Apr", completed: 5, ongoing: 1 },
  { month: "May", completed: 6, ongoing: 2 },
  { month: "Jun", completed: 4, ongoing: 3 },
];

export default function ProjectsChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      className="bg-card text-text rounded-2xl p-6 shadow-sm border border-muted/10"
    >
      <h3 className="text-lg font-semibold mb-4">Projects Overview</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis dataKey="month" stroke="var(--color-muted)" />
          <YAxis stroke="var(--color-muted)" />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-bg)",
              border: "1px solid var(--color-border)",
            }}
          />
          <Bar dataKey="completed" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
          <Bar dataKey="ongoing" fill="var(--color-accent)" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
