import { instance } from "./config";

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
