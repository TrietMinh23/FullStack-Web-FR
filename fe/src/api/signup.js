import { instance } from "./config";

export const signup = async (data) => {
  return await instance.post("/users/register", data);
};

export const signUpSeller = async (data) => {
  return await instance.post("/sellers/register", data);
};
