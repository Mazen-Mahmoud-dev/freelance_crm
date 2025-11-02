import StatCard from "../../components/StatCard";
import { Folder, Users, DollarSign, CheckCircle } from "lucide-react";

export default function DashboardStats() {
  // Mock data - لاحقاً ممكن تجي من API
  const stats = [
    { id: 1, title: "Projects", value: 12, icon: Folder },
    { id: 2, title: "Clients", value: 8, icon: Users },
    { id: 3, title: "Invoices", value: 5, icon: DollarSign },
    { id: 4, title: "Pending Tasks", value: 3, icon: CheckCircle },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-4 gap-5">
      {stats.map((stat) => (
        <StatCard
          key={stat.id}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
        />
      ))}
    </div>
  );
}
