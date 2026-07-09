import { useQuery } from "@tanstack/react-query";
import { getAllocations } from "../services/allocation.service";


export const useAllocations = () => {
  return useQuery({
    queryKey: ["allocations"],
    queryFn: getAllocations,
  });
};