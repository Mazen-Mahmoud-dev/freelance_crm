import { useMemo } from "react";

export function useFilteredTasks(tasks, filter, sortBy) {
  return useMemo(() => {
    let filtered = [...(tasks || [])];

    if (filter === "pending") {
      filtered = filtered.filter(t => t.status === "Pending");
    }

    if (filter === "in_progress") {
      filtered = filtered.filter(t => t.status === "In Progress");
    }

    if (filter === "completed") {
      filtered = filtered.filter(t => t.status === "Completed");
    }

    if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    if (sortBy === "oldest") {
      filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    }

    if (sortBy === "az") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;

  }, [tasks, filter, sortBy]);
}