import api from "../api/axios";

export const getCourseStats = async () => {
  const response = await api.get("/dashboard/course-stats");
  return response.data.data;
};