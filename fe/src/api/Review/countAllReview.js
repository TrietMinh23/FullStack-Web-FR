import { instance } from "../config";

export const todayCountReview = async (data) => {
  return await instance.get("/review/count");
};
