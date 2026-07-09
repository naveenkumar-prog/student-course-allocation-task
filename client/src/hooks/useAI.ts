import { useMutation } from "@tanstack/react-query";
import { askAI } from "../services/ai.service";

export const useAI = () => {
  return useMutation({
    mutationFn: askAI,
  });
};