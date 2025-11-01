import { supabaseWrapper } from "../lib/supabaseWrapper";

const table = "companies";

export const companyService = {
  async getAll() {
    return await (await supabaseWrapper.from(table)).select("*");
  },

  async getById(id) {
    return await (await supabaseWrapper.from(table)).select("*", q => q.eq("id", id));
  },

  async create(company) {
    return await (await supabaseWrapper.from(table)).insert(company);
  },

  async update(id, data) {
    return await (await supabaseWrapper.from(table)).update(data, q => q.eq("id", id));
  },

  async remove(id) {
    return await (await supabaseWrapper.from(table)).remove(q => q.eq("id", id));
  },
};
