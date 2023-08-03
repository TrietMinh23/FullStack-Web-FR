import React from "react";
import Statistic from "./Statistics";
import TableItem from "./TableItem";
import {rows} from "../data/orderData";
export default function All() {
  return (
    <div className="xl:ml-64 ml-0 p-4 mt-[-100vh]" id="info">
      <Statistic />
      <TableItem rows = {rows}/>
    </div>
  );
}
