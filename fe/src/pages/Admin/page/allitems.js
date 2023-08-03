import React from "react";
import Tracker from "../components/Tracker";
import TableAI from "../components/Table/TableAI";
import BlockIcon from '@mui/icons-material/Block';
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import PhonelinkIcon from '@mui/icons-material/Phonelink';
import PhonelinkOffIcon from '@mui/icons-material/PhonelinkOff';
import { rows } from "../data/dataAllItems";

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
    icon: <BlockIcon />,
    id: 3,
    title: "OFF",
    text: "offline > 30 day",
    today: "10",
    all: "53",
    color: "red",
  },
  {
    icon: <ThumbUpAltIcon/>,
    id: 4,
    title: "Positive",
    text: "positive review",
    today: "10",
    all: "53",
    color: "blue",
  },
  {
    icon: <ThumbDownAltIcon/>,
    id: 5,
    title: "Negative",
    text: "negative review",
    today: "10",
    all: "53",
    color: "orange",
  },
];

export default function Allitems() {
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
          <TableAI rows = {rows}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
