import { useMutation, useQueryClient } from "@tanstack/react-query"; // Make sure to import useQueryClient

import { ComicDelete } from "../services/apiAdmin";
import { toast } from "react-hot-toast";

export default function useComicDelete() {
  const mutationFn = ComicDelete;
  const queryClient = useQueryClient(); // Get the queryClient instance

  const { mutate, isLoading, error } = useMutation({
    mutationFn,
    onSuccess: () => {
      toast.success("Comic deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["ComicUploadDetails"] });
    },
  });

  return { mutate, isDeleting: isLoading, deleteError: error };
}
