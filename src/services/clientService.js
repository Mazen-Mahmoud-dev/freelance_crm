import { supabase } from "../lib/supabaseClient";
import { supabaseWrapper } from "../lib/supabaseWrapper";

const table = "clients";

export const clientService = {
  async getAll() {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;

    return await (
      await supabaseWrapper.from(table)
    ).select("*", (query) => query.eq("user_id", user.id));
  },
  async getById(id) {
    return await (await supabaseWrapper.from(table)).select("*", (q) =>
      q.eq("id", id)
    );
  },
  async create(client) {
    return await (await supabaseWrapper.from(table)).insert(client);
  },
  async update(id, data) {
    return await (await supabaseWrapper.from(table)).update(data, (q) =>
      q.eq("id", id)
    );
  },
  async remove(id) {
    return await (await supabaseWrapper.from(table)).remove((q) =>
      q.eq("id", id)
    );
  },
};