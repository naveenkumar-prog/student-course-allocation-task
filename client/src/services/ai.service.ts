import api from "../api/axios";

export const askAI = async (question: string) => {
  const response = await api.post("/ai/chat", {
    question,
  });

  return response.data.data;
};