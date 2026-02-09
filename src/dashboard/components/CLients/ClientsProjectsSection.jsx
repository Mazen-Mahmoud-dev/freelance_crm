import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function ClientProjectsSection({ projects = [], loading }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [statusFilter, setStatusFilter] = useState("All");

  /* =========================
     Filtering
  ========================== */

  const filteredProjects = useMemo(() => {
    if (statusFilter === "All") return projects;
    return projects.filter((p) => p.status === statusFilter);
  }, [projects, statusFilter]);

  /* =========================
     Pagination Logic
  ========================== */

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProjects = filteredProjects.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const maxVisiblePages = 10;
  const startPage =
  Math.floor((currentPage - 1) / maxVisiblePages) * maxVisiblePages + 1;
  const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  /* =========================
     Helpers
  ========================== */

  const isOverdue = (project) => {
    if (!project.end_date) return false;
    return (
      new Date(project.end_date) < new Date() &&
      project.status !== "Completed"
    );
  };

  const statusStyles = {
    Active: "bg-green-500/10 text-green-600",
    Completed: "bg-blue-500/10 text-blue-600",
    OnHold: "bg-yellow-500/10 text-yellow-600",
  };

  return (
    <div className="bg-card border border-border rounded-2xl shadow-sm">

      {/* Header */}
      <div className="flex justify-between items-center px-6 py-5 border-b border-border flex-wrap gap-4">
        <h2 className="text-xl font-semibold text-foreground">
          Client Projects
        </h2>

        <div className="flex items-center gap-4 flex-wrap">

          {/* Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-background border border-border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>

          {/* Add Project */}
          <Link
            to="/dashboard/projects/add"
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm hover:opacity-90 transition"
          >
            <Plus size={16} />
            Add Project
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-[1000px] w-full text-left">
          <thead className="text-xs uppercase text-muted-foreground border-b border-border">
            <tr>
              <th className="px-6 py-4">Project</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Budget</th>
              <th className="px-6 py-4">Start</th>
              <th className="px-6 py-4">End</th>
              <th className="px-6 py-4">Progress</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {currentProjects.map((project) => {
              const overdue = isOverdue(project);

              return (
                <tr
                  key={project.id}
                  className={`transition ${
                    overdue ? "bg-red-500/5" : "hover:bg-primary/5"
                  }`}
                >
                  <td className="px-6 py-4 font-medium text-foreground">
                    {project.title}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        statusStyles[project.status]
                      }`}
                    >
                      {project.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-muted-foreground">
                    {project.budget}
                  </td>

                  <td className="px-6 py-4 text-muted-foreground">
                    {project.start_date}
                  </td>

                  <td
                    className={`px-6 py-4 ${
                      overdue
                        ? "text-red-600 font-medium"
                        : "text-muted-foreground"
                    }`}
                  >
                    {project.due_date || "—"}
                  </td>

                  {/* Progress */}
                  <td className="px-6 py-4 w-[200px]">
                    <div className="w-full bg-muted/30 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${project.progress || 0}%` }}
                      />
                    </div>
                    <p className="text-xs mt-1 text-muted-foreground">
                      {project.progress || 0}%
                    </p>
                  </td>
                </tr>
              );
            })}

            {!loading && currentProjects.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-10 text-center text-muted-foreground">
                  No projects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-between items-center px-6 py-4 border-t border-border flex-wrap gap-4">

          {/* Items Per Page */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Projects per page:</span>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="bg-background border border-border rounded-lg px-3 py-1 text-sm"
            >
              {[5, 8, 10, 15, 20].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          {/* Pages */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-1 text-sm disabled:opacity-40"
            >
              <ChevronLeft size={16} /> Prev
            </button>

            {Array.from({ length: endPage - startPage + 1 }).map((_, i) => {
              const pageNum = startPage + i;
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-3 py-1.5 rounded-md text-sm transition ${
                    currentPage === pageNum
                      ? "bg-primary text-white"
                      : "hover:bg-primary/10"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 text-sm disabled:opacity-40"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
