import { instance } from "../config";

export const getReview = async (path,page) => {
  return await instance.get(`review/${path}`, {
    params: {
      page:  page,
    },
  })
};
 
