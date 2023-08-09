import React,{ useState,useEffect } from "react";
import Tracker from "../components/Tracker";
import TableReport from "../components/Table/TableReport";
import CancelIcon from "@mui/icons-material/Cancel";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PhonelinkIcon from '@mui/icons-material/Phonelink';
import PhonelinkOffIcon from '@mui/icons-material/PhonelinkOff';
import BlockIcon from '@mui/icons-material/Block';
import {data} from "../data/dataReport";

const staticTable = [
    {
    icon: <PhonelinkIcon/>,
    id: 1,
    title: "ONL",
    text: "online < 15 day",
    today: "10",
    all: "53",
    color: "green",
  },
  {
    icon: <PhonelinkOffIcon/>,
    id: 2,
    title: "OFF > 15",
    text: "offline > 15 day",
    today: "10",
    all: "53",
    color: "gray",
  },
  {
    icon: <BlockIcon/>,
    id: 3,
    title: "OFF",
    text: "offline > 30 day",
    today: "10",
    all: "53",
    color: "red",
  },
  {
    icon: <ReceiptLongIcon/>,
    id: 4,
    title: "Purchase",
    text: "purchase orders",
    today: "10",
    all: "53",
    color: "blue",
  },
  {
    icon: <CancelIcon/>,
    id: 5,
    title: "Canceled",
    text: "canceled orders",
    today: "10",
    all: "53",
    color: "orange",
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
              title={item.title}
              key={item.id}
            />
          ))}
        </div>
        <div className="w-full">
          <TableReport 
            rows = {data}
          />
        </div>
       
      </div>
    </React.Fragment>
  );
}
