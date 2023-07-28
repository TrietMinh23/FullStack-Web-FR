import { fakeapi } from "./config";

export const products = async () => await fakeapi.get();
