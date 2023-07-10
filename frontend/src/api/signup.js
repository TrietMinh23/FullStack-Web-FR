import { instance } from "./config";

export const signup = async (data) => {
  return await instance.post("/v1/auth/signup", data);
};
