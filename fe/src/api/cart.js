import { instance } from "./config";

export const getCart = async (id) => {
  try {
    const respone = await instance.get(`/carts/${id}`);
    return respone;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Error get products by seller id."
    );
  }
};
