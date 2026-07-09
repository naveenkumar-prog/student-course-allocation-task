import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCourse } from "../services/course.service";

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: any;
    }) => updateCourse(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["courses"],
      });
    },
  });
};