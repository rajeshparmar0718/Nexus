import { useEffect, useState } from "react";

import { fetchUserRole } from "@/utils/supabase/fetchUserRole";
import { useSupabase } from "@/context/SupabaseAuthProvider";

export const useFetchUserRole = () => {
  const { user }: any = useSupabase();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserRole = async () => {
      if (user) {
        const role = await fetchUserRole(user.id);
        setRole(role);
      }
      setLoading(false);
    };

    getUserRole();
  }, [user]);

  return { role, loading };
};
