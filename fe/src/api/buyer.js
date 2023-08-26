import { instance } from "./config";

export const getBuyerById = async (id) => {
  try {
    const respone = await instance.get(`/users/${id}`,{
      params: {
        id: id,
      },
    });
    return respone;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error get seller by id.");
  }
};

export const countBuyer = async () => {
  try {
    const respone = await instance.get("/users/buyers/count");
    return respone;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error count buyers.");
  }
};

export const getBuyerPerformanceStats = async (page, limit) => {
  try {
    const respone = await instance.get("/users/admin", {
      params: {
        page: page,
        limit: limit,
      },
    });
    return respone;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Error get buyer performance stats."
    );
  }
};

export const blockBuyer = async (id) => {
  try {
    const respone = await instance.put(`/users/block/${id}`);
    return respone;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error block seller.");
  }
};

export const unblockBuyer = async (id) => {
  try {
    const respone = await instance.put(`/users/unblock/${id}`);
    return respone;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error unblock seller.");
  }
};

export const updateBuyerById = async (id, data) => {
  try {
    const respone = await instance.put(`/users/${id}`, data);
    return respone;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Error update seller by id."
    );
  }
};