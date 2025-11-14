import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { projectService } from "../services/projectService";
import { useAuth } from "../context/AuthContext";

export function useProjects(userId) {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => projectService.getAll(userId),
    enabled: !!userId,
  });
}
export function useProject(userId, id) {
  return useQuery({
    queryKey: ["project", userId, id],
    queryFn: () => projectService.getById(userId, id),
    enabled: !!userId && !!id,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: projectService.create,
    onSuccess: () => queryClient.invalidateQueries(["projects"]),
  });
}
export function useDeleteProject() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (id) => {
      return await projectService.remove(id,user?.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["projects", user?.id]);
    },
  });
}
