import React from 'react'
import Tracker from "../components/Tracker";
import Table from "../../Seller/components/Table";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import CancelIcon from "@mui/icons-material/Cancel";
import Card from "../../Home/PersonalProfile/components/card";

const staticTable = [
  {
    icon: <LocalShippingIcon />,
    id: 1,
    text: "This month",
    number: "10",
    money: "53",
    color: "blue",
    title: "Positive Reviews",
  },
  {
    icon: <AssignmentTurnedInIcon />,
    id: 2,
    text: "This month",
    number: "10",
    money: "53",
    color: "orange",
    title: "Negative Reviews",
  },
  {
    icon: <CurrencyExchangeIcon />,
    id: 3,
    text: "This month",
    number: "10",
    money: "53",
    color: "green",
    title: "Total income",
  },
];


export default function Allsellers () {
  return (
    <React.Fragment>
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
        <div className="mt:inline-block hidden mt-9	">
          <Table />
        </div>
      </div>
      <div className="inline-block w-full">
        <Table />
      </div>
    </React.Fragment>
  )
}

