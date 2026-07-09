import { useQuery } from "@tanstack/react-query";
import { getCourseStats } from "../services/dashboardChart.service";

export const useCourseStats = () => {
  return useQuery({
    queryKey: ["course-stats"],
    queryFn: getCourseStats,
  });
};