import { useQuery } from "@tanstack/react-query";
import { ComicUploadDetails } from "../services/apiAdmin";

export const useComicUploadDetails = () => {
  const queryKey = ["ComicUploadDetails"];
  const queryFn = () => ComicUploadDetails();
  const refetchOnError = true;

  const { data, isLoading, error } = useQuery(queryKey, queryFn, {
    refetchOnError,
  });

  return { data, isLoading, error };
};
