import api from "../api/axios";

export const createPreferences = async (
  studentId: number,
  data: any
) => {
  const response = await api.post(
    `/students/${studentId}/preferences`,
    data
  );

  return response.data.data;
};

export const getPreferences = async (
  studentId: number
) => {
  const response = await api.get(
    `/students/${studentId}/preferences`
  );

  return response.data.data;
};

export const updatePreferences = async (
  studentId: number,
  data: any
) => {
  const response = await api.put(
    `/students/${studentId}/preferences`,
    data
  );

  return response.data.data;
};