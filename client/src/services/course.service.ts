import api from "../api/axios";

export const getCourses = async () => {
  const response = await api.get("/courses");
  return response.data.data;
};

export const createCourse = async (data: any) => {
  const response = await api.post("/courses", data);
  return response.data.data;
};

export const updateCourse = async (id: number, data: any) => {
  const response = await api.put(`/courses/${id}`, data);
  return response.data.data;
};

export const deleteCourse = async (id: number) => {
  const response = await api.delete(`/courses/${id}`);
  return response.data;
};