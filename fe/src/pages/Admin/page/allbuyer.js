import React, { useEffect, useState } from "react";
import Tracker from "../components/Tracker";
import TableAB from "../components/Table/TableAB";
import CancelIcon from "@mui/icons-material/Cancel";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { instance } from "../../../api/config";
import { rows } from "../data/dataAllBuyers";
import { getBuyerPerformanceStats } from "../../../api/buyer";

export default function Allbuyer() {
  const [buyerData, setBuyerData] = useState([]);

  const staticTable = [
    {
      icon: <ReceiptLongIcon />,
      id: 1,
      title: "Purchase",
      text: "purchase orders",
      today: "10",
      all: "53",
      color: "#bbf7d0",
      textColor:"text-green-600",
    },
    {
      icon: <CancelIcon />,
      id: 2,
      title: "Cancelled",
      text: "canceled orders",
      today: "10",
      all: "53",
      color: "#fecaca",
      textColor:"text-red-600",
    },
  ];

  useEffect(() => {
    const fetchBuyers = async () => {
      try {
        const response = await getBuyerPerformanceStats();
        setBuyerData(response.data.Buyers);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchBuyers();
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
          <TableAB rows={buyerData} />
        </div>
      </div>
    </React.Fragment>
  );
}
