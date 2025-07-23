import { getMembersInWorkspaceQueryFn } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/context/auth-provider";

const useGetWorkspaceMembers = (workspaceId: string) => {
  const {isLoggedIn} = useAuthContext();
  const query = useQuery({
    queryKey: ["members", workspaceId],
    queryFn: () => getMembersInWorkspaceQueryFn(workspaceId),
    staleTime: Infinity,
    enabled:isLoggedIn
  });
  return query;
};

export default useGetWorkspaceMembers;
