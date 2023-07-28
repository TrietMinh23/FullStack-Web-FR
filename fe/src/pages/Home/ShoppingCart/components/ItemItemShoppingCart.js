import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import {
  INCREASEITEM,
  REMOVEFROMCART,
  DELETE,
} from "../../../../utils/redux/productsSlice";
import { useState } from "react";

export default function ItemItemShoppingCart({
  name,
  image,
  price,
  quantity,
  shop,
  id,
}) {
  const dispatch = useDispatch();
  const [currentProducts, setCurrentProducts] = useState(quantity);

  const deleteItem = () => {
    dispatch(
      DELETE({
        id: id,
        shop: shop,
      })
    );
  };

  const decreaseItem = () => {
    setCurrentProducts(currentProducts - 1);
    dispatch(
      REMOVEFROMCART({
        id: id,
        shop: shop,
      })
    );
  };

  const increaseItem = () => {
    setCurrentProducts(currentProducts + 1);
    dispatch(
      INCREASEITEM({
        id: id,
        shop: shop,
      })
    );
  };

  return (
    <tr className="bg-white">
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        <div className="flex">
          <img src={image} alt="something" style={{ width: "15%" }} />
          <span className="ml-4 flex items-center whitespace-break-spaces">
            {name}
          </span>
        </div>
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
        ${price}
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
        <div className="v-counter">
          <input
            type="button"
            className="minusBtn"
            defaultValue="-"
            onClick={() => decreaseItem()}
          />
          <input
            type="text"
            size="25"
            value={currentProducts}
            className="count"
            readOnly
          />{" "}
          <input
            type="button"
            className="plusBtn"
            defaultValue="+"
            onClick={() => increaseItem()}
          />
        </div>
      </td>
      <td className="total-price p-3 text-sm text-gray-700 whitespace-nowrap text-center">
        ${price * quantity}
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
