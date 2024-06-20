import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useFetchUserRole } from "@/app/api/auth/useFetchUserRole";

const RoleGuard = ({
  children,
  allowedRoles,
}: {
  children: ReactNode;
  allowedRoles: string[];
}) => {
  const { role, loading } = useFetchUserRole();
  const router = useRouter();

  if (loading) return <div>Loading...</div>;

  if (!role || !allowedRoles.includes(role)) {
    router.push("/auth/signin");
    return null;
  }

  return <>{children}</>;
};

export default RoleGuard;
