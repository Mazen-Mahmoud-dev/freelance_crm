export function handleSupabaseError(error) {
  console.error("Supabase Error:", error);

  const knownErrors = {
    "23505": "Duplicate entry. This item already exists.",
    "23503": "Foreign key constraint failed.",
    "PGRST116": "Item not found.",
  };

  const message = knownErrors[error.code] || error.message || "Unknown error occurred";
  return new Error(message);
}

export function handleAppError(error) {
  console.error("App Error:", error);
  return error instanceof Error ? error.message : "Unexpected error";
}
