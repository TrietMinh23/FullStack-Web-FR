import { instance } from "./config";

export const login = async (data) => {
  return await instance.post("/v1/auth/login", data);
};
