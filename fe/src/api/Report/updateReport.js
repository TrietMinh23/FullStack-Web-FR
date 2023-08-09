import { instance } from "../config";

export const updateReport = async (data) => {
  return await instance.post("/report/update", data);
};
