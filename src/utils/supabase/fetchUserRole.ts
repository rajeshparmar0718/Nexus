import { supabase } from "./supabaseClient";

export const fetchUserRole = async (userId: string) => {
  const { data, error }: any = await supabase
    .from("user_roles")
    .select("roles!inner(name)")
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error("Error fetching user role:", error.message);
    return null;
  }

  return data.roles?.name;
};
