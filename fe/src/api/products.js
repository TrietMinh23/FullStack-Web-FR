import { fakeapi, instance } from "./config";

export const productsFake = async () => await fakeapi.get();

export const products = async () => await instance.get("/products");
