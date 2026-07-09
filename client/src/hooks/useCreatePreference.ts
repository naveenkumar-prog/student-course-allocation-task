import { useMutation } from "@tanstack/react-query";
import { createPreferences } from "../services/preference.service";

export const useCreatePreference = () => {

  return useMutation({

    mutationFn: ({
  studentId,
  data,
}: {
  studentId: number;
  data: any;
}) => createPreferences(studentId, data)

});

}