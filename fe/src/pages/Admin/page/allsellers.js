import React from "react";
import Tracker from "../components/Tracker";
import Table from "../components/Table";

const staticTable = [
  {
    icon: "",
    id: 1,
    text: "Negative Review",
    today: "10",
    all: "53",
    color: "blue",
  },
  {
    icon: "",
    id: 2,
    text: "Positive Review",
    today: "10",
    all: "53",
    color: "orange",
  },
  {
    icon: "",
    id: 3,
    text: "Income",
    today: "10",
    all: "53",
    color: "green",
  },
];

export default function Allsellers() {
  return (
    <React.Fragment>
      <div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          {staticTable.map((item) => (
            <Tracker
              icon={item.icon}
              text={item.text}
              today={item.today}
              all={item.all}
              color={item.color}
              title={item.text}
              key={item.id}
            />
          ))}
        </div>
        <div className="mt-8 w-full">
          <Table />
        </div>
      </div>
    </React.Fragment>
  );
}
