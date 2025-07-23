// src/hooks/api/use-auth.ts
import { useQuery }           from "@tanstack/react-query";
import { getCurrentUserQueryFn } from "@/lib/api";
import { useLocation }        from "react-router-dom";
import { AUTH_ROUTES }        from "@/routes/common/routePaths";

export default function useAuth() {
  const { pathname } = useLocation();

  // if the current path is one of your auth pages, skip the query
  const isAuthPage = Object.values(AUTH_ROUTES).includes(pathname);

  return useQuery({
    queryKey: ["authUser"],
    queryFn: getCurrentUserQueryFn,
    enabled: !isAuthPage,       // only run when NOT on "/", "/sign-up", etc
    staleTime: Infinity,        // never refetch behind your back
    refetchOnWindowFocus: false // “focus” won’t re-kick it either
  });
}
