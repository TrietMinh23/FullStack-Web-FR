import React from "react";
import TableReview from "../components/TableReview";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import Card from "../../Home/PersonalProfile/components/card";
import { rows } from "../data/dataTable";

const staticTable = [
  {
    icon: <ThumbUpAltIcon />,
    id: 1,
    text: "",
    number: "10",
    interaction: "53",
    color: "blue",
    title: "Positive Review",
  },
  {
    icon: <ThumbDownAltIcon />,
    id: 2,
    text: "",
    number: "10",
    interaction: "53",
    color: "orange",
    title: "Negative Review",
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
        <TableReview rows={rows}/>
      </div>
    </div>
  );
}
