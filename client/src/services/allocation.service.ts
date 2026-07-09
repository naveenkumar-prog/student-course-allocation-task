import api from "../api/axios";

export const processAllocation = async () => {
  console.log("Running allocation...");

  const response = await api.post("/allocation/process");

  console.log(response.data);

  return response.data;
};

export const getAllocations = async () => {
  const response = await api.get("/allocation");
  return response.data.data;
};