import Card from "./card";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import CancelIcon from "@mui/icons-material/Cancel";
import formatNumberWithCommas from "../../../../utils/formatNumberWithCommas";

export default function Statistic({orderStatus, orderStatusTotalAmounts}) {
  console.log("orderStatus",orderStatus);
  console.log("orderStatusTotalAmounts", Number(orderStatusTotalAmounts));
  const staticTable = [
    {
      icon: <AutorenewIcon fontSize="large" />,
      id: 1,
      text: `Total Money ${formatNumberWithCommas(Number(orderStatusTotalAmounts["Processing"]) || 0)}`,
      number: orderStatus["Processing"] || 0,
      color: "orange",
      title: "Processing",
    },
    {
      icon: <LocalShippingIcon fontSize="large" />,
      id: 2,
      text: `Total Money ${formatNumberWithCommas(Number(orderStatusTotalAmounts["Dispatched"]) || 0)}`,
      number: orderStatus["Dispatched"] || 0,
      color: "blue",
      title: "Dispatched",
    },
    {
      icon: <AssignmentTurnedInIcon fontSize="large" />,
      id: 3,
      text: `Total Money ${formatNumberWithCommas(Number(orderStatusTotalAmounts["Delivered"]) || 0)}`,
      number: orderStatus["Delivered"] || 0,      
      color: "green",
      title: "Delivered",
    },
    {
      icon: <CancelIcon fontSize="large" />,
      id: 4,
      text: `Total Money ${formatNumberWithCommas(Number(orderStatusTotalAmounts["Cancelled"]) || 0)}`,
      number: orderStatus["Cancelled"] || 0,
      color: "tomato",
      title: "Cancelled",
    },
  ];

  return (
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
  );
}
