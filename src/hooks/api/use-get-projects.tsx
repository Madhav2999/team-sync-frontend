import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getProjectsInWorkspaceQueryFn } from "@/lib/api";
import { AllProjectPayloadType } from "@/types/api.type";
import { useAuthContext } from "@/context/auth-provider";

const useGetProjectsInWorkspaceQuery = ({
  workspaceId,
  pageSize,
  pageNumber,
  skip = false,
}: AllProjectPayloadType) => {
  const {isLoggedIn} = useAuthContext();
  const query = useQuery({
    queryKey: ["allprojects", workspaceId, pageNumber, pageSize],
    queryFn: () =>
      getProjectsInWorkspaceQueryFn({
        workspaceId,
        pageSize,
        pageNumber,
      }),
    staleTime: Infinity,
    placeholderData: skip ? undefined : keepPreviousData,
    enabled:  !!workspaceId && !skip && isLoggedIn,
  });
  return query;
};

export default useGetProjectsInWorkspaceQuery;
