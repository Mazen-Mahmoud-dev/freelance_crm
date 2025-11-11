// src/lib/storageService.js
import { supabase } from "./supabaseClient";

/**
 * Upload a single file to a bucket and return its public URL.
 * Uses browser crypto.randomUUID() to avoid name collisions.
 * Assumes bucket is public. For private use signed URLs instead.
 */
export async function uploadFile(bucket = "project-files", file, opts = {}) {
  if (!file) throw new Error("No file provided");

  const ext = file.name.split(".").pop();
  const filename = `${crypto.randomUUID()}.${ext}`;
  const path = `${opts.folder ? opts.folder + "/" : ""}${filename}`;

  // optional: validate file type / size
  if (opts.maxSize && file.size > opts.maxSize) {
    throw new Error(`File too large. Max ${opts.maxSize} bytes allowed.`);
  }
  if (opts.allowedTypes && !opts.allowedTypes.includes(file.type)) {
    throw new Error("File type not allowed.");
  }
  console.log(bucket,file);
  
  const { data, error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(path, file, { cacheControl: "3600", upsert: false });

  if (uploadError) throw uploadError;

  // get public URL (for public bucket)
  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(path);
  return urlData.publicUrl;
}

/**
 * Upload multiple files and return array of public URLs.
 * files: FileList or array of File
 */
export async function uploadMultiple(bucket = "project-files", files = [], opts = {}) {
  if (!files || files.length === 0) return [];

  const arr = Array.from(files);
  const results = [];

  for (const file of arr) {
    const url = await uploadFile(bucket, file, opts);
    results.push(url);
  }

  return results;
}
