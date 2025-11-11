import React from "react";
import { useProjects } from "../../hooks/useProjects";
import Skeleton from "../skeletons/Skeleton"; // لو عندك component جاهز
import { motion } from "framer-motion";

const ProjectRow = ({ project }) => {
  return (
    <tr className="hover:bg-surface/50 transition">
      <td className="px-4 py-3">{project.title}</td>
      <td className="px-4 py-3 text-sm text-muted">{project.client_id || "-"}</td>
      <td className="px-4 py-3 text-sm">{project.status}</td>
      <td className="px-4 py-3 text-sm">{project.budget ? `$${project.budget}` : "-"}</td>
      <td className="px-4 py-3 text-sm">{project.due_date || "-"}</td>
      <td className="px-4 py-3">
        {/* placeholders for actions */}
        <div className="flex gap-2">
          <button className="px-2 py-1 rounded-md text-sm border">View</button>
          <button className="px-2 py-1 rounded-md text-sm border">Edit</button>
        </div>
      </td>
    </tr>
  );
};

export default function ProjectTable() {
  const { projects, loading, error, refetch } = useProjects();

  if (loading) {
    return (
      <div className="w-full">
        <Skeleton className="h-12 mb-2" />
        <Skeleton className="h-12 mb-2" />
        <Skeleton className="h-12" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded">
        An error occurred while fetching projects — please try again.
        <button className="ml-3 underline" onClick={refetch}>Retry</button>
      </div>
    );
  }


  if (!projects || projects.length === 0) {
    return (
      <div className="p-6 border rounded-md text-center">
        No projects to display right now.
        <div className="mt-4">
          <button className="btn-primary">Add New Project</button>
        </div>
      </div>
    );
  }


  return (
    <div className="overflow-x-auto bg-card rounded-md">
      <table className="min-w-full divide-y">
        <thead>
          <tr className="text-left">
            <th className="px-4 py-3">العنوان</th>
            <th className="px-4 py-3">العميل</th>
            <th className="px-4 py-3">الحالة</th>
            <th className="px-4 py-3">الميزانية</th>
            <th className="px-4 py-3">تاريخ الاستحقاق</th>
            <th className="px-4 py-3">إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <ProjectRow key={p.id} project={p} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
