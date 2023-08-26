import React from "react";
import Statistic from "../components/Statistics";
import TableItem from "../components/TableItem";
export default function AllOrders() {
  return (
    <div className="xl:ml-64 ml-0 p-4 mt-[-100vh]" id="info">
      <Statistic />
      <TableItem />
    </div>
  );
}
