import React from "react";
import { useEffect, useState } from "react";
import Tracker from "../components/Tracker";
import TableAS from "../components/Table/TableAS";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { getSellerPerformanceStats } from "../../../api/seller";

export default function Allsellers() {
  const [sellerData, setSellerData] = useState([]);
  const [totalPositive, setTotalPositive] = useState(0);
  const [totalNegative, setTotalNegative] = useState(0);

  const staticTable = [
    {
      icon: <ThumbUpAltIcon />,
      id: 1,
      title: "Positive",
      text: "positive review",
      today: "10",
      all: totalPositive,
      color: "#bbf7d0",
      textColor:"text-green-600",
    },
    {
      icon: <ThumbDownAltIcon />,
      id: 2,
      title: "Negative",
      text: "negative review",
      today: "10",
      all: totalNegative,
      color: "#fecaca",
      textColor:"text-red-600",
    },
  ];

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await getSellerPerformanceStats();
        setSellerData(response.data.Sellers);
        setTotalPositive(response.data.totalPositive);
        setTotalNegative(response.data.totalNegative);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchSellers();
  }, []);

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
        <div className="mt-8 w-full">
          <TableAS rows={sellerData} />
        </div>
      </div>
    </React.Fragment>
  );
}
