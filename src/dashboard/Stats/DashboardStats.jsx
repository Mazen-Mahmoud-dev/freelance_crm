import StatCard from "../../components/StatCard";
import { Folder, Users, DollarSign, CheckCircle } from "lucide-react";
import { useProjects } from "../../hooks/useProjects";
import { useClients } from "../../hooks/useClients";

export default function DashboardStats({userId}) {
  const { data: projects = [], isLoading: projectsLoading} = useProjects(userId);
  const { data: clients = [],isLoading:clientsLoading } = useClients();
  const projectsCount = projectsLoading ? "—" : projects.length
  const clientsCount = clientsLoading ? "-" : clients.length
  const stats = [
    { id: 1, title: "Projects", value: projectsCount, icon: Folder },
    { id: 2, title: "Clients", value: clientsCount, icon: Users },
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
