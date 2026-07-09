import { useMutation } from "@tanstack/react-query";
import { updateReservations } from "../services/reservation.service";

export const useUpdateReservation = () => {
  return useMutation({
    mutationFn: ({
      courseId,
      data,
    }: {
      courseId: number;
      data: any;
    }) => updateReservations(courseId, data),
  });
};