import { instance } from "./config";

export const report = async (data) => {
  return await instance.post("/report/send", data);
};
