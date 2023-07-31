import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { DELETE } from "../../../../utils/redux/productsSlice";

export default function ItemItemShoppingCart({
  name,
  image,
  price,
  quantity,
  shop,
  id,
}) {
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
        1
      </td>
      <td className="total-price p-3 text-sm text-gray-700 whitespace-nowrap text-center">
        ${price}
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
