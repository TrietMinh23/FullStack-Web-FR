export default function TableItem() {
  return (
    <tr className="bg-white">
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        <a
          href="#"
          className="font-bold text-blue-500 hover:underline truncate w-80 block"
        >
          Kring New Fit office chair, mesh + PU, black Kring New Fit office
          chair, mesh + PU, black Kring New Fit office chair, mesh + PU, black
        </a>
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        $200.000.000.00
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
          Delivered
        </span>
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        16/10/2021
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        16/10/2021
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        <button className="bg-red-500 py-2 px-4 text-white font-semibold rounded-md hover:bg-white border-2 border-transparent  hover:border-2 hover:border-red-500 hover:text-red-500">
          Cancel order
        </button>
      </td>
    </tr>
  );
}
