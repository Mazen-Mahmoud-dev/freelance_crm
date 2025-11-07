import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { projectService } from "../services/projectService";

export function useProjects(userId) {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => projectService.getAll(userId),
    enabled: !!userId,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: projectService.create,
    onSuccess: () => queryClient.invalidateQueries(["projects"]),
  });
}
