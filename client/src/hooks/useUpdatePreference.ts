import { useMutation } from "@tanstack/react-query";
import { updatePreferences } from "../services/preference.service";

export const useUpdatePreference = () => {
  return useMutation({
    mutationFn: ({
      studentId,
      data,
    }: {
      studentId: number;
      data: any;
    }) => updatePreferences(studentId, data),
  });
};