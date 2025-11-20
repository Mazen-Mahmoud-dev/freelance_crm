import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { taskService } from "../services/taskService";

export function useTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: () => taskService.getAllWithProject(),
  });
}

export function useTask(id) {
  return useQuery({
    queryKey: ["task", id],
    queryFn: () => taskService.getById(id),
    enabled: !!id,
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: taskService.create,
    onSuccess: (_, newTask) => {
      queryClient.invalidateQueries(["tasks", newTask.project_id]);
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => taskService.update(id, data),
    onSuccess: (_, { id, project_id }) => {
      queryClient.invalidateQueries(["tasks", project_id]);
      queryClient.invalidateQueries(["task", id]);
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, project_id }) => taskService.remove(id),
    onSuccess: (_, { project_id }) => {
      queryClient.invalidateQueries(["tasks", project_id]);
    },
  });
}
