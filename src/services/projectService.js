import { supabaseWrapper } from "../lib/supabaseWrapper";

const table = "projects";

export const projectService = {
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

  async create(project) {
    return await supabaseWrapper.from(table).insert(project);
  },

  async update(id, data) {
    return await supabaseWrapper.from(table).update(data).eq("id", id);
  },

  async remove(id) {
    await supabaseWrapper.from(table).delete().eq("id", id);
    return true;
  },
};
