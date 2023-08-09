import React from "react";
import ChartOne from "../components/ChartOne";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Card from "../../Home/PersonalProfile/components/card";

const staticTable = [
  {
    icon: <MonetizationOnIcon fontSize="large" />,
    id: 1,
    text: "Daily Sales $53",
    number: "126560",
    interaction: "53",
    color: "blue",
    title: "Total Sales",
  },
  {
    icon: <MonetizationOnIcon fontSize="large" />,
    id: 2,
    text: "Daily Refund $53",
    number: "100000",
    interaction: "53",
    color: "orange",
    title: "Refund",
  },
];

export default function Review() {
  return (
    <div>
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {staticTable.map((item) => (
          <Card
            icon={item.icon}
            text={item.text}
            number={item.number}
            money={item.money}
            color={item.color}
            title={item.title}
            key={item.id}
          />
        ))}
      </div>
      <div className="w-full">
        <ChartOne />
      </div>
    </div>
  );
}
