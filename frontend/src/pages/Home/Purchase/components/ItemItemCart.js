export default function ItemItemCart({ image, name, quantity, price }) {
  return (
    <tr className="bg-white">
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        <div className="flex">
          <img src={image} alt="image" style={{ width: "10%" }} />
          <p className="ml-4 flex items-center truncate">{name}</p>
        </div>
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
        ${price}
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
        {quantity}
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
        ${quantity * price}
      </td>
    </tr>
  );
}
