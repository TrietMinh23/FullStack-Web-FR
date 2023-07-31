import MallIcon from "../../../../assets/MallIcon";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ItemItemTS from "./ItemItemTS";

export default function ItemTS({ shop }) {
  return (
    <div className="bg-white p-4 pt-5 shadow relative">
      <div className="px-2 pb-2 mb-2 flex justify-between border-b-2">
        <div className="shop cursor-pointer hover:underline">
          <MallIcon />
          <span className="ml-2">{shop.name}</span>
          <ArrowForwardIosIcon style={{ fontSize: "12px" }} />
        </div>
      </div>
      {shop.item.map((item) => (
        <ItemItemTS
          name={item.name}
          price={item.price}
          image={item.image}
          key={item.id}
          id={item.id}
          shop={shop.name}
        />
      ))}
    </div>
  );
}
