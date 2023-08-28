import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  ADDTOPURCHASE,
  DELETE,
  REMOVEFROMPURCHASE,
} from "../../../../utils/redux/productsSlice";
import { instance } from "../../../../api/config";
import { useState } from "react";

export default function ItemItemShoppingCart({
  name,
  image,
  price,
  shop,
  id,
  condition,
  brand,
}) {
  const dispatch = useDispatch();

  const list = useSelector((state) => state.product.shoppingCart);
  console.log("LIST: ", list);

  const deleteItem = async () => {
    const list = JSON.parse(localStorage.getItem("cart"));
    list.products.forEach((item) => console.log(item._id, id));
    const index = list.products.findIndex((item) => item._id === id);

    dispatch(
      DELETE({
        id: id,
        shop: shop,
      })
    );

    await instance
      .post(`http://localhost:5000/carts/list_remove`, {
        productId: id,
        cartId: JSON.parse(localStorage.getItem("cart"))._id,
      })
      .then((response) => console.log("BÂNNÂN", response))
      .catch((err) => console.log(err));

    list.products.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(list));
  };

  const addToPurchase = (data) => {
    dispatch(
      ADDTOPURCHASE({
        data,
      })
    );
  };

  const removeFromPurchase = (data) => {
    dispatch(
      REMOVEFROMPURCHASE({
        data,
      })
    );
  };

  const handleCheck = (e) => {
    const data = {
      name,
      image,
      price,
      shop,
      id,
      condition,
      brand,
    };
    if (e.target.checked) addToPurchase(data);
    else {
      const selectAll = document.querySelector("#select-all");
      if (selectAll.checked) selectAll.checked = false;
      removeFromPurchase(data);
    }
  };

  return (
    <tr className="bg-white item">
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        <div className="flex items-center">
          <input
            type="checkbox"
            className={`checkbox ${shop} mr-3`}
            onChange={handleCheck}
          ></input>
          <img src={image} alt="something" style={{ width: "15%" }} />
          <span className="name-item ml-4 flex items-center whitespace-break-spaces">
            {name}
          </span>
        </div>
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
        {brand}
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
        {condition}
      </td>
      <td className="total-price p-3 text-sm text-gray-700 whitespace-nowrap text-center">
        {price}₫
      </td>
      <td className="p-3 text-sm text-white whitespace-nowrap text-center">
        <button
          onClick={deleteItem}
          className="font-bold bg-red-500 hover:bg-red-600 py-2 px-4 rounded inline-flex items-center"
        >
          <DeleteIcon />
          <span>Delete</span>
        </button>
      </td>
    </tr>
  );
}
