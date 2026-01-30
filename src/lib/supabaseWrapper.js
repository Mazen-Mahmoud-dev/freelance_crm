import { supabase } from "./supabaseClient";
import { handleSupabaseError } from "./errorHandler";

export const supabaseWrapper = {
  from(table) {
    const ref = supabase.from(table);
    return {
      select(columns = "*") {
        return ref.select(columns);
      },
      insert: async (values) => {
        const { data, error } = await ref.insert(values).select();
        if (error) throw handleSupabaseError(error);
        return data;
      },
      update: async (id, values) => {
        const { data, error } = await ref.update(values).eq("id", id).select("*");
        if (error) throw handleSupabaseError(error);
        return data[0]; // single row
      },
      delete: () => {
        return {

          eq: async (col, val) => {
            const { error } = await ref.delete().eq(col, val);
            if (error) throw handleSupabaseError(error);
            return true;
          }
        };
      },
    };
  },
};
