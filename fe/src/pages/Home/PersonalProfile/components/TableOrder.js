import TableItem from "./TableItem";
import TableResponsive from "./TableResponsive";
import SearchIcon from "@mui/icons-material/Search";

export default function TableOrder() {
  return (
    <div>
      <div className="above flex mb-2 items-center">
        <h1 className="text-xl mr-3">Your orders</h1>
        <div className="relative w-2/5 text-gray-400 focus-within:text-gray-600">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon />
          </div>
          <input
            id="search"
            name="search"
            className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-lg leading-5 focus:outline-none sm:text-sm"
            placeholder="Search"
            type="search"
          />
        </div>
      </div>
      <div className="overflow-auto rounded-lg shadow hidden lg:block">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Order name
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Price
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Status
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Order date
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Receive date
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <TableItem />
            <TableItem />
            <TableItem />
            <TableItem />
            <TableItem />
            <TableItem />
            <TableItem />
            <TableItem />
            <TableItem />
            <TableItem />
            <TableItem />
            <TableItem />
            <TableItem />
            <TableItem />
            <TableItem />
            <TableItem />
          </tbody>
        </table>
      </div>
      <TableResponsive />
    </div>
  );
}
