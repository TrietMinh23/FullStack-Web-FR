import { instance } from "../config";

export const postReport = async (data) => {
  return await instance.post("/report/send", data);
};
