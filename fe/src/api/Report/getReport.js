import { instance } from "../config";

export const getReport = async () => {
  return await instance.get(`/report`);
};
 
