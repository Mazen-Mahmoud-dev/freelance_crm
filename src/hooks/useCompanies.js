import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { companyService } from "../services/companyService";

export function useCompanies() {
  return useQuery({
    queryKey: ["companies"],
    queryFn: companyService.getAll,
  });
}

export function useCreateCompany() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: companyService.create,
    onSuccess: () => queryClient.invalidateQueries(["companies"]),
  });
}
