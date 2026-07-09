import api from "../api/axios";

export const getReservations = async (courseId: number) => {
  const response = await api.get(`/courses/${courseId}/reservations`);
  return response.data.data;
};

export const updateReservations = async (
  courseId: number,
  data: any
) => {
  const response = await api.put(
    `/courses/${courseId}/reservations`,
    data
  );

  return response.data.data;
};