import { fakeapi, instance } from "./config";

export const productsFake = async () => await fakeapi.get();

export const products = async (page) => {
  return await instance.get(`/products`, {
    params: {
      page: page,
    },
  });
};
