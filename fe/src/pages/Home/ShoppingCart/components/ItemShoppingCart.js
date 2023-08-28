import React, { useEffect } from "react";
import MallIcon from "../../../../assets/MallIcon";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ItemItemShoppingCart from "./ItemItemShoppingCart";
import {
  ADDTOPURCHASEBYSHOPALL,
  REMOVEFROMPURCHASEBYSHOPALL,
} from "../../../../utils/redux/productsSlice";
import { useDispatch } from "react-redux";

export default function ItemShoppingCart({ shop }) {
  const dispatch = useDispatch();

  const addToPurchaseAllShop = () => {
    dispatch(ADDTOPURCHASEBYSHOPALL({ item: shop.item, name: shop.name }));
  };

  const removeToPurchaseAllShop = () => {
    dispatch(REMOVEFROMPURCHASEBYSHOPALL({ name: shop.name }));
  };

  const selectAllProdutsShop = (e) => {
    const listCheckedBox = document.getElementsByClassName(shop.name);
    for (let index = 0; index < listCheckedBox.length; index++) {
      const element = listCheckedBox[index];
      element.checked = e.target.checked ? true : false;
    }

    if (e.target.checked) addToPurchaseAllShop();
    else {
      const selectAll = document.querySelector("#select-all");
      if (selectAll.checked) selectAll.checked = false;
      removeToPurchaseAllShop();
    }
  };

  return (
    <div id={shop.name} className="contents">
      <tr className="bg-white border-t-8 border-light-silver shop-title">
        <th colSpan="5" className="text-left border-y-[1px] border-light-grey">
          <div className="p-3 flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="checkbox mr-3"
              onChange={selectAllProdutsShop}
            ></input>
            <MallIcon />
            <span className="ml-1 shop-name">{shop.name}</span>
          </div>
        </th>
      </tr>
      {shop.item.map((item, i) => (
        <ItemItemShoppingCart
          name={item.title}
          price={item.price}
          image={item.image}
          brand={item.brandName}
          condition={item.condition ? item.condition : 100}
          key={i}
          shop={shop.name}
          id={item._id}
        />
      ))}
    </div>
  );
}
