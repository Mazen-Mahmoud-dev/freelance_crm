import { supabase } from "./supabaseClient";
import { handleSupabaseError } from "./errorHandler";

export const supabaseWrapper = {
  async from(table) {
    const ref = supabase.from(table);
    return {
      async select(columns = "*", filterFn) {
        let query = ref.select(columns);
        if (filterFn) query = filterFn(query);
        const { data, error } = await query;
        if (error) throw handleSupabaseError(error);
        return data;
      },

      async insert(values) {
        const { data, error } = await ref.insert(values).select();
        if (error) throw handleSupabaseError(error);
        return data;
      },

      async update(values, matchFn) {
        let query = ref.update(values);
        if (matchFn) query = matchFn(query);
        const { data, error } = await query.select();
        if (error) throw handleSupabaseError(error);
        return data;
      },

      async remove(matchFn) {
        let query = ref.delete();
        if (matchFn) query = matchFn(query);
        const { error } = await query;
        if (error) throw handleSupabaseError(error);
        return true;
      },
    };
  },
};
