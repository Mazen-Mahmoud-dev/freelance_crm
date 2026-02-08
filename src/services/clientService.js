import { supabaseWrapper } from "../lib/supabaseWrapper";

const table = "clients";

export const clientService = {
  async getAll(userId) {
    const { data, error } = await supabaseWrapper
      .from(table)
      .select("*")
      .eq("user_id", userId);

    if (error) throw error;

    return data;
  },

  async getById(userId, id) {
    const { data, error } = await supabaseWrapper
      .from(table)
      .select("*")
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (error) throw error;

    return data;
  },

  async create(client) {
    return await supabaseWrapper.from(table).insert(client);
  },

  async update(id, data) {
    return await supabaseWrapper
      .from(table)
      .update(data)
      .eq("id", id);
  },

  async remove(id) {
    await supabaseWrapper
      .from(table)
      .delete()
      .eq("id", id);
    return true;
  },

  async getActiveProjectCount() {
    const { data, error } = await supabaseWrapper
    .from("active_projects_count")
    .select("*");
    if(error) throw error;
    const counts = data.reduce((acc, row) => {
      acc[row.client_id] = row.active_count;
      return acc;
    }, {});
    
    return counts

  },

};
