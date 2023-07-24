import React from "react";
import Statistic from "./Statistics";
import TableOrder from "./TableOrder";

export default function All() {
  return (
    <div className="xl:ml-64 ml-0 p-4 mt-[-100vh]" id="info">
      <Statistic />
      <TableOrder />
    </div>
  );
}
