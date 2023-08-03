import React from "react";
import Tracker from "../components/Tracker";
import TableReport from "../components/Table/TableReport";
import CancelIcon from "@mui/icons-material/Cancel";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PhonelinkIcon from '@mui/icons-material/Phonelink';
import PhonelinkOffIcon from '@mui/icons-material/PhonelinkOff';
import BlockIcon from '@mui/icons-material/Block';
import { rows } from "../data/dataReport";

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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-6 xl:grid-cols-5 2xl:gap-7.5">
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
        <div className="mt-8 w-full">
          <TableReport rows = {rows}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
