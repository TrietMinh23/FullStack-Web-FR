import Tracker from "../components/Tracker";
import Table from "./component/Table";
import React from "react";

export default function AllItems() {
  return (
    <React.Fragment>
      <div>
        <div className="m-2 flex flex-rows flex-wrap gap-2">
          <Tracker
            text="Available"
            smallText="Total"
            total={12}
            daily={124323}
            color="bg-green-200"
          />
          <Tracker
            text="Sold"
            smallText="Total"
            total={3}
            daily={821230}
            color="bg-red-200"
          />
          <Tracker
            text="Shipping"
            smallText="Total"
            total={8}
            daily={821230}
            color="bg-blue-200"
          />
          <Tracker
            text="Refund"
            smallText="Total"
            total={10}
            daily={334230}
            color="bg-gray-200"
          />
        </div>
        <div className="mt:inline-block hidden">
          <Table />
        </div>
      </div>
      <div className="mt:hidden inline-block">
        <Table />
      </div>
    </React.Fragment>
  );
}
