import { supabaseWrapper } from "../lib/supabaseWrapper";

const table = "tasks";

export const taskService = {
  async getAllWithProject() {
    const { data, error } = await supabaseWrapper
      .from(table)
      .select(`
        *,
        project:project_id (
          title
        )
      `)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("SupabaseWrapper error:", error);
      throw error;
    }

    return data.map(task => ({
      ...task,
      project_name: task.project?.title || "Unknown"
    }));
  },


  async getById(id,userId) {
    const { data, error } = await supabaseWrapper
      .from(table)
      .select("*")
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (error) throw error;

    return data;
  },

  async create(task) {
    const { data, error } = await supabaseWrapper.from(table).insert(task);
    if (error) throw error;
    return data;
  },

  async update(id, data) {
    return await supabaseWrapper.from(table).update(id, data);
  },

  async remove(id) {
    const { error } = await supabaseWrapper.from(table).delete().eq("id", id);
    if (error) throw error;
    return true;
  },
};
