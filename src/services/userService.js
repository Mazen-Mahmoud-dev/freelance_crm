import { supabaseWrapper } from "../lib/supabaseWrapper";

const table = "users";

export const userService = {
  async getAll() {
    return await (await supabaseWrapper.from(table)).select("*");
  },

  async getById(id) {
    return await (await supabaseWrapper.from(table)).select("*", q => q.eq("id", id));
  },

  async create(user) {
    return await (await supabaseWrapper.from(table)).insert(user);
  },

  async update(id, data) {
    return await (await supabaseWrapper.from(table)).update(data, q => q.eq("id", id));
  },

  async remove(id) {
    return await (await supabaseWrapper.from(table)).remove(q => q.eq("id", id));
  },
};
