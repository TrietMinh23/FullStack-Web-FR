import Table from "../components/Table";
import React from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import CancelIcon from "@mui/icons-material/Cancel";
import Card from "../../Home/PersonalProfile/components/card";

const staticTable = [
  {
    icon: <LocalShippingIcon />,
    id: 1,
    text: "Total Money",
    number: "10",
    money: "$53",
    color: "blue",
    title: "Shipping",
  },
  {
    icon: <CurrencyExchangeIcon />,
    id: 2,
    text: "Total Money",
    number: "10",
    money: "$53",
    color: "orange",
    title: "Expense",
  },
  {
    icon: <AssignmentTurnedInIcon />,
    id: 3,
    text: "Total Money",
    number: "10",
    money: "$53",
    color: "green",
    title: "Complete",
  },
  {
    icon: <CancelIcon />,
    id: 4,
    text: "Total Money",
    number: "10",
    money: "$53",
    color: "tomato",
    title: "Cancel",
  },
];

export default function AllItems() {
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
        <Table />
      </div>
    </div>
  );
}
