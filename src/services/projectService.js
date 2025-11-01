import { supabaseWrapper } from "../lib/supabaseWrapper";

const table = "projects";

export const projectService = {
  async getAll() {
    return await (await supabaseWrapper.from(table)).select("*");
  },

  async getById(id) {
    return await (await supabaseWrapper.from(table)).select("*", q => q.eq("id", id));
  },

  async create(project) {
    return await (await supabaseWrapper.from(table)).insert(project);
  },

  async update(id, data) {
    return await (await supabaseWrapper.from(table)).update(data, q => q.eq("id", id));
  },

  async remove(id) {
    return await (await supabaseWrapper.from(table)).remove(q => q.eq("id", id));
  },
};
