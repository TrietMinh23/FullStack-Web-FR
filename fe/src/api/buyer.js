import { instance } from "./config";

export const countBuyer = async () => {
  try {
    const respone = await instance.get("/users/buyers/count");
    return respone;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error count buyers.");
  }
};
