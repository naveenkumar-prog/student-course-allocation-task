import api from "../api/axios";

export const getStudents = async () => {
  const response = await api.get("/students");
  return response.data.data;
};

export const createStudent = async (data: any) => {
  const response = await api.post("/students", data);
  return response.data.data;
};

export const updateStudent = async (id: number, data: any) => {
  const response = await api.put(`/students/${id}`, data);
  return response.data.data;
};

export const deleteStudent = async (id: number) => {
  const response = await api.delete(`/students/${id}`);
  return response.data;
};