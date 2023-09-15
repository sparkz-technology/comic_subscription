import { useQuery } from "@tanstack/react-query";
import { UserLog } from "../services/apiAdmin";

export const useUserLog = () => {
  const queryKey = ["UserLog"];
  const queryFn = () => UserLog();
  const refetchOnError = true;

  const { data, isLoading, error } = useQuery(queryKey, queryFn, {
    refetchOnError,
  });

  return { data, isLoading, error };
};
