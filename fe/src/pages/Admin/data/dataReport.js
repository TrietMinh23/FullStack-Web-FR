
import React,{useState, useEffect} from 'react'
import { getReport } from "../../../api/Report/getReport";

const fetchData = async () => {
  try {
    const response = await getReport();
    console.log("this is test",response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const data = await fetchData();

