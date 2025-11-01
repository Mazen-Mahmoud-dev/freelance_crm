import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "../services/userService";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userService.create,
    onSuccess: () => queryClient.invalidateQueries(["users"]),
  });
}
