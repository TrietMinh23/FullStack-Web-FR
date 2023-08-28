import { useDispatch } from "react-redux";
import ClearIcon from "@mui/icons-material/Clear";
import { DELETE } from "../../../../utils/redux/productsSlice";
import React from "react";
import { instance } from "../../../../api/config";
import axios from "axios";

export default function ItemItemTS({ shop, name, price, image, id }) {
  const dispatch = useDispatch();

  const deleteItem = () => {
    dispatch(
      DELETE({
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
            alt="something"
            style={{ width: "20%", height: "20%" }}
          />
          <div className="ml-3 mt-2">
            <span className="flex items-center">{name}</span>
            <div className="flex justify-between mt-2 items-center">
              <div className="price text-sm font-medium text-black">
                ${price}
              </div>
              <div>x1</div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
