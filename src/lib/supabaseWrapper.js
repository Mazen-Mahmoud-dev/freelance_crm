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
      update: (values) => {
        return {
          eq: async (col, val) => {
            const { data, error } = await ref.update(values).eq(col, val).select();
            if (error) throw handleSupabaseError(error);
            return data;
          }
        };
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
