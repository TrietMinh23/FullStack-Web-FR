import { instance } from "../config";

export const getReview = async (path,page, limit, searchQuery) => {
  return await instance.get(`review/${path}`, {
    params: {
      page:  page,
      limit: limit,
      searchQuery: searchQuery,
    },
  })
};
 
