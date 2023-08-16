
import React,{useState, useEffect} from 'react'
import { getReport } from "../../../api/Report/getReport";

const fetchData = async () => {
  try {
    const response = await getReport();
    console.log(response);
    console.log("this is");
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Exporting the data directly fetched from the API
export const data = await fetchData();

