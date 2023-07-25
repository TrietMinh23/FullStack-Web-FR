import { useDispatch } from "react-redux";
import ClearIcon from "@mui/icons-material/Clear";
import {
  DELETE,
  INCREASEITEM,
  REMOVEFROMCART,
} from "../../../../utils/redux/productsSlice";
import { useState } from "react";
import React from "react";

export default function ItemItemTS({ shop, name, price, quantity, image, id }) {
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
    <React.Fragment>
      <div className="mb-2 text-right">
        <button onClick={deleteItem}>
          <ClearIcon />
        </button>
      </div>
      <div className="flex items-center text-sm">
        <div className="flex max-md:justify-between">
          <img
            src={image}
            alt="image"
            style={{ width: "20%", height: "20%" }}
          />
          <div className="ml-3 mt-2">
            <span className="flex items-center">{name}</span>
            <div className="flex justify-between mt-2 items-center">
              <div className="price text-sm font-medium text-black">
                ${price}
              </div>
              <div>
                <div className="v-counter">
                  <input
                    onClick={decreaseItem}
                    type="button"
                    className="minusBtn"
                    defaultValue="-"
                  />
                  <input
                    type="text"
                    size={25}
                    value={quantity}
                    className="count"
                    readOnly
                  />
                  <input
                    onClick={increaseItem}
                    type="button"
                    className="plusBtn"
                    defaultValue="+"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
