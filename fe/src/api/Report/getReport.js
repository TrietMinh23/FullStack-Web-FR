import { instance } from "../config";

export const getReport = async (page, limit, searchQuery) => {
  return await instance.get(`/report`,{
    params: {
      page:  page,
      limit: limit,
      searchQuery: searchQuery,
    },
  });
};
 
