export default function ItemItemCart({ image, name, price }) {
  return (
    <tr className="bg-white">
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        <div className="flex">
          <img src={image} alt="something" style={{ width: "10%" }} />
          <p className="ml-4 flex items-center truncate">{name}</p>
        </div>
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
        {price}₫
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
        1
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
        {price}₫
      </td>
    </tr>
  );
}
