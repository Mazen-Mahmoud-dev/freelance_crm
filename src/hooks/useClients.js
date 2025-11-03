// src/hooks/useClients.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { clientService } from "../services/clientService";
import { useAuth } from "../context/AuthContext";

// 🟢 Get all clients (based on logged-in user)
export function useClients() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["clients", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      return await clientService.getAll(user.id);
    },
    enabled: !!user?.id, // ⛔️ مايحملش قبل ما اليوزر يكون موجود
  });
}

// 🟢 Create client
export function useCreateClient() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (clientData) => {
      const data = { ...clientData, user_id: user.id };
      return await clientService.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["clients", user?.id]);
    },
  });
}

// 🟡 Update client
export function useUpdateClient() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ id, updates }) => {
      return await clientService.update(id, updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["clients", user?.id]);
    },
  });
}

// 🔴 Delete client
export function useDeleteClient() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (id) => {
      return await clientService.remove(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["clients", user?.id]);
    },
  });
}
export function useClient(clientId) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["client", user?.id, clientId],
    queryFn: async () => {
      if (!user?.id || !clientId) return null;
      return await clientService.getById(user.id, clientId);
    },
    enabled: !!user?.id && !!clientId,
  });
}