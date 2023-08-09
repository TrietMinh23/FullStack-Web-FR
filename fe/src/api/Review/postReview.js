import { instance } from "../config";

export const postReview = async (data) => {
  return await instance.post("/review/send", data);
};
