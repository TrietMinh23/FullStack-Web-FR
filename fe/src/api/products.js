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
    const response = await instance.post("/products/", productData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error creating product.");
  }
};

export const sellerProduct = async (id, page, limit) => {
  try {
    const respone = await instance.get(`/products/sellerId/${id}`, {
      params: {
        page: page,
        limit: limit,
      },
    });
    return respone;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Error get products by seller id."
    );
  }
};

export const getRelativeProduct = async (category, id) => {
  try {
    const response = await instance.get(`/products/list/search-relative`, {
      params: { category: category, id: id },
    });
    return response;
  } catch (err) {
    throw new Error(
      err.response?.data?.error || "Error get products by category"
    );
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await instance.delete(`/products/${productId}`);
    // Reload the page after successful deletion
    if (response.data.message === "Product deleted.") {
      window.location.reload(); // Reload the current page
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error deleting product.");
  }
};

export const ProductID = async (id) => {
  try {
    const respone = await instance.get(`/products/${id}`);
    return respone;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error get products by id.");
  }
};

export const updateProduct = async (productId, productData) => {
  try {
    const response = await instance.put(`/products/${productId}`, productData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error updating product.");
  }
};

// admin
export const getAllProducts = async (page, limit) => {
  try {
    const respone = await instance.get(`/products`, {
      params: {
        page: page,
        limit: limit,
      },
    });
    return respone;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error get all products.");
  }
};
