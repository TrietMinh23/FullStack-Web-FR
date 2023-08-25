import React,{ useState,useEffect } from "react";
import Tracker from "../components/Tracker";
import TableReport from "../components/Table/TableReport";
import CancelIcon from "@mui/icons-material/Cancel";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import {data} from "../data/dataReport";

const staticTable = [
  {
    icon: <ReceiptLongIcon/>,
    id: 4,
    title: "Done",
    text: "done report",
    today: "10",
    all: data.totalPending,
    color: "#bbf7d0",
    textColor:"text-green-600",
  },
  {
    icon: <CancelIcon/>,
    id: 5,
    title: "Pending",
    text: "pending report",
    today: "10",
    all: data.totalDone,
    color: "#fef08a",
    textColor:"text-yellow-800",
  },
];

export default function Report() {

  return (
    <React.Fragment>
      <div>
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
          {staticTable.map((item) => (
            <Tracker
              icon={item.icon}
              text={item.text}
              today={item.today}
              all={item.all}
              color={item.color}
              textColor={item.textColor}
              title={item.title}
              key={item.id}
            />
          ))}
        </div>
        <div className="w-full">
          <TableReport 
            rows = {data.report}
          />
        </div>
       
      </div>
    </React.Fragment>
  );
}
