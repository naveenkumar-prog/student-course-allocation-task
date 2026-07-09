import { useMutation, useQueryClient } from "@tanstack/react-query";
import { processAllocation } from "../services/allocation.service";

export const useProcessAllocation = () => {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: processAllocation,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allocations"],
      });
    },

  });

};