import { instance } from "./config";

export const getByCategoryRelative = async () => {
  try {
    const response = await instance.get("/pcategories");
    return response;
  } catch (err) {
    throw new Error(err.response?.data?.error || "Error get category");
  }
};

export const getByCategory = async (category, page) => {
  try {
    const response = await instance.get("/products/list/search", {
      params: {
        category: category,
        page: page,
      },
    });
    return response;
  } catch (err) {
    throw new Error(err.response?.data?.error || "Error get category");
  }
};
