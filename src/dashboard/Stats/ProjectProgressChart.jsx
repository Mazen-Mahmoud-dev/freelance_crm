import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from "recharts";

export default function ProjectProgressChart({ data }) {
  const COLORS = ["#10B981", "#FBBF24", "#9CA3AF"]; // Completed, In Progress, Pending

  return (
    <div className="p-4 bg-bg border border-muted rounded-xl shadow-sm">
      <h3 className="text-text font-semibold mb-4">Project Status Overview</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={60}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
