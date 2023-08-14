import { instance } from "./config";

export const signup = async (data) => {
  if (data.role === "buyer") {
    const response = await instance.post("/users/register", data);
    return response;
  } else {
    const response = await instance.post("/sellers/register", data);
    return response;
  }
};
