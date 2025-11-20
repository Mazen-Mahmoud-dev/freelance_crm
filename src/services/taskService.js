import { supabaseWrapper } from "../lib/supabaseWrapper";

const table = "tasks";

export const taskService = {
  async getAllWithProject() {
    const { data, error } = await supabaseWrapper
      .from("tasks")
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


  async getById(id) {
    const { data, error } = await supabaseWrapper
      .from(table)
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return data;
  },

  async create(task) {
    const { data, error } = await supabaseWrapper.from(table).insert(task).select();
    if (error) throw error;
    return data[0];
  },

  async update(id, data) {
    const { data: updated, error } = await supabaseWrapper
      .from(table)
      .update(data)
      .eq("id", id)
      .select();
    if (error) throw error;
    return updated[0];
  },

  async remove(id) {
    const { error } = await supabaseWrapper.from(table).delete().eq("id", id);
    if (error) throw error;
    return true;
  },
};
