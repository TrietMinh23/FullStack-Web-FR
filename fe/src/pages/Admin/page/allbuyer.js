import React, { useEffect, useState } from "react";
import Tracker from "../components/Tracker";
import TableAB from "../components/Table/TableAB";
import CancelIcon from "@mui/icons-material/Cancel";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PhonelinkIcon from "@mui/icons-material/Phonelink";
import PhonelinkOffIcon from "@mui/icons-material/PhonelinkOff";
import BlockIcon from "@mui/icons-material/Block";
import { instance } from "../../../api/config";
import { rows } from "../data/dataAllBuyers";
import { getBuyerPerformanceStats } from "../../../api/buyer";

const staticTable = [
  {
    icon: <ReceiptLongIcon />,
    id: 1,
    title: "Purchase",
    text: "purchase orders",
    today: "10",
    all: "53",
    color: "blue",
  },
  {
    icon: <CancelIcon />,
    id: 2,
    title: "Canceled",
    text: "canceled orders",
    today: "10",
    all: "53",
    color: "orange",
  },
];

export default function Allbuyer() {
  const [buyerData, setBuyerData] = useState([]);

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
          <TableAB rows={buyerData} />
        </div>
      </div>
    </React.Fragment>
  );
}
