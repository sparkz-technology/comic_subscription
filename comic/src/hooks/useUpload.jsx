import { useMutation, useQueryClient } from "@tanstack/react-query"; // Make sure to import useQueryClient

import { UploadComicBook } from "../services/apiAdmin";
import { toast } from "react-hot-toast";

export default function useUpload(...args) {
  const [uploadedFile, setUploadPercentage, onCloseModal] = args;
  const mutationFn = () => UploadComicBook(uploadedFile, setUploadPercentage); // Make sure to import useQueryClient
  const queryClient = useQueryClient(); // Get the queryClient instance

  const { mutate, isLoading, error } = useMutation({
    mutationFn,
    onSuccess: () => {
      toast.success("Comic deleted successfully");
      onCloseModal();
      queryClient.invalidateQueries({ queryKey: ["ComicUploadDetails"] });
    },
    onError: () => {
      onCloseModal();
      toast.error("An error occurred. Please try again.");
    },
  });

  return { mutate, isDeleting: isLoading, deleteError: error };
}
