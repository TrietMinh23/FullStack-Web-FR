import MallIcon from "../../../../assets/MallIcon";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ItemItemTableResponsive from "./ItemItemTableResponsive";

export default function ItemTableResponsive({ shop }) {
  return (
    <div className="bg-white p-4 shadow">
      <div className="px-2 pb-2 mb-2 flex justify-between border-b-2">
        <div className="shop cursor-pointer hover:underline">
          <MallIcon />
          <span className="ml-2">{shop?.name}</span>
          <ArrowForwardIosIcon style={{ fontSize: "12px" }} />
        </div>
      </div>
      {shop?.item.map((item, i) => (
        <ItemItemTableResponsive
          name={item.title}
          key={i}
          price={item.price}
          quantity={item.quantity}
          image={item.image}
        />
      ))}
    </div>
  );
}
