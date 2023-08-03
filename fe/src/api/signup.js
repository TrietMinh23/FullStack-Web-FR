import { instance } from "./config";

export const signup = async (data) => {
  return await instance.post("/users/register", data);
};
