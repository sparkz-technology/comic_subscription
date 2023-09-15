import { useMutation } from "@tanstack/react-query"; // Make sure to import useQueryClient

import { toast } from "react-hot-toast";
import { Download } from "../services/apiAdmin";

export default function useUpload() {
  const mutationFn = () => Download();
  const { mutate, isLoading, error } = useMutation({
    mutationFn,
    onSuccess: () => {
      toast.success("Comic downloaded initiated.");
    },
    onError: () => {
      toast.error("An error occurred. Please try again.");
    },
  });

  return { mutate, isDownloading: isLoading, isDownloadError: error };
}
