import { fakeapi, instance } from "./config";

export const productsFake = async () => await fakeapi.get();

export const products = async (page) => {
  return await instance.get(`/products`, {
    params: {
      page: page,
    },
  });
};

export const createProduct = async (productData) => {
  try {
    const response = await instance.post('/products/', productData, { headers: {'Content-Type': 'multipart/form-data'}});
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error creating product.");
  }
};