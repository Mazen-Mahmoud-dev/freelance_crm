// src/dashboard/DashboardPage.jsx
import { useState, useEffect } from "react";
import AppLayout from "../layouts/AppLayout";
import DashboardStats from "./Stats/DashboardStats";
import ProjectList from "./Projects/ProjectList";
import RecentActivityList from "./Activities/RecentActivityList";
import ProjectProgressChart from "./Stats/ProjectProgressChart";
import StatCardSkeleton from "../components/skeletons/StatCardSkeleton";
import ProjectCardSkeleton from "../components/skeletons/ProjectCardSkeleton";
import ActivityItemSkeleton from "../components/skeletons/ActivityItemSkeleton";
import ChartSkeleton from "../components/skeletons/ChartSkeleton";
import { Plus } from "lucide-react";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  // Mock data
  const stats = [
    { id: 1, title: "Projects", value: 12 },
    { id: 2, title: "Clients", value: 8 },
    { id: 3, title: "Invoices", value: 5 },
    { id: 4, title: "Pending Tasks", value: 3 },
  ];

  const projects = [
    { id: 1, title: "Website Redesign", status: "In Progress", dueDate: "Nov 15" },
    { id: 2, title: "Mobile App MVP", status: "Pending", dueDate: "Nov 20" },
    { id: 3, title: "Landing Page", status: "Completed", dueDate: "Oct 30" },
  ];

  const recentActivities = [
    { id: 1, user: "Alice", action: "added a new project", time: "2h ago" },
    { id: 2, user: "Bob", action: "completed a task", time: "5h ago" },
    { id: 3, user: "Charlie", action: "sent an invoice", time: "1d ago" },
  ];

  const chartData = [
    { name: "Completed", value: 5 },
    { name: "In Progress", value: 4 },
    { name: "Pending", value: 3 },
  ];

  // Simulate API loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="p-section space-y-8 mt-12 p-8 bg-primary/10 rounded-md mx-2">
        <div className="flex justify-between">
          <div className="flex gap-4 flex-col">
            <h2 className="text-text text-3xl font-bold">Dashboard</h2>
            <p className="text-muted">Plan,manage, and accomplish your tasks with ease</p>
          </div>
          <div>
            <button className="bg-primary text-white p-4 flex gap-4 rounded-md"><Plus /> Add Project</button>
          </div>
        </div>
        {/* Stats Section */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {stats.map((s) => <StatCardSkeleton key={s.id} />)}
          </div>
        ) : (
          <DashboardStats />
        )}

        {/* Projects Section */}
        <section>
          <h2 className="text-lg font-semibold text-primary mb-4">Projects</h2>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {projects.map((p) => <ProjectCardSkeleton key={p.id} />)}
            </div>
          ) : (
            <ProjectList projects={projects} />
          )}
        </section>

        {/* Recent Activity Section */}
        <section>
          <h2 className="text-lg font-semibold text-text mb-4">Recent Activity</h2>
          {loading ? (
            <div className="space-y-3">
              {recentActivities.map((a) => <ActivityItemSkeleton key={a.id} />)}
            </div>
          ) : (
            <RecentActivityList activities={recentActivities} />
          )}
        </section>

        {/* Chart Section */}
        <section>
          {loading ? <ChartSkeleton /> : <ProjectProgressChart data={chartData} />}
        </section>
      </div>
    </>
  );
}
