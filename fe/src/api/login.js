import { instance } from "./config";

export const login = async (data) => {
  return await instance.post("/users/login", data);
};

//Dat
export const forgotPassword = async (data) => {
  return await instance.post("/users/forgotpassword", data);
}

export const resetPassword = async (data) => {
  return await instance.put(`/users/reset-password/${data.id}`, data);
}