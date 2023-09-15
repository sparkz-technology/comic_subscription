import { useQuery } from "@tanstack/react-query";
import { UserChart } from "../services/apiAdmin";

export const useUserChart = (type) => {
  const queryKey = ["userChart", type];
  const queryFn = () => UserChart(type);
  const refetchOnError = true;

  const { data, isLoading, error } = useQuery(queryKey, queryFn, {
    refetchOnError,
  });

  return { data, isLoading, error, type };
};
