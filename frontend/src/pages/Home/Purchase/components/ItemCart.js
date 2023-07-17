import DeleteIcon from "@mui/icons-material/Delete";

export default function ItemCart() {
  return (
    <tr className="bg-white">
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        <div className="flex">
          <img
            src="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
            alt="image"
            style={{ width: "10%" }}
          />
          <span className="ml-4 flex items-center">
            Kring New Fit office chair, mesh + PU, black
          </span>
        </div>
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
        $10.00
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
        7
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
        $200.00
      </td>
    </tr>
  );
}
