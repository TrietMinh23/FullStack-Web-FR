import { instance } from "./config";

export const getSellerById = async (id) => {
  try {
    const respone = await instance.get(`/sellers/${id}`);
    return respone;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error get seller by id.");
  }
};

export const updateSellerById = async (id, data) => {
  try {
    const respone = await instance.put(`/sellers/${id}`, data);
    return respone;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Error update seller by id."
    );
  }
};

export const countSellers = async () => {
  try {
    const respone = await instance.get("/sellers/count");
    return respone;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error count sellers.");
  }
};

export const getSellerPerformanceStats = async (page, limit) => {
  try {
    const respone = await instance.get("/sellers/admin", {
      params: {
        page: page,
        limit: limit,
      },
    });
    return respone;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Error get seller performance stats."
    );
  }
};

export const blockSeller = async (id) => {
  try {
    const respone = await instance.put(`/users/block/${id}`);
    return respone;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error block seller.");
  }
};

export const unblockSeller = async (id) => {
  try {
    const respone = await instance.put(`/users/unblock/${id}`);
    return respone;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error unblock seller.");
  }
};
