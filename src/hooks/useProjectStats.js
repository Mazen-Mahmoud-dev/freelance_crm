import { useTasks } from "./useTasks";

export function useProjectStats(projectId) {
  const { data: tasks = [] } = useTasks(projectId);

  const completed = tasks.filter(t => t.status === "Completed").length;

  const progress = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0;

  return {
    tasksCount: tasks.length,
    completed,
    progress
  };
}