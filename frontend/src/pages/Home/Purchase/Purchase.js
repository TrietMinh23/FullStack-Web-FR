import FmdGoodIcon from "@mui/icons-material/FmdGood";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ItemCart from "./components/ItemCart";
import TableItemResponsive from "./components/TableItemResponsive";

export default function Purchase() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="infomation-customer bg-white px-3 pb-2">
        <div className="flex justify-between">
          <div className="title text-red-500 font-bold py-2 ml-2">
            <FmdGoodIcon />
            <span>Delivery Address</span>
          </div>
          <div className="flex items-center">
            <button className="text-blue-400 font-bold max-lg:w-full lg:py-0 py-3 px-3">
              Change
            </button>
          </div>
        </div>
        <div className="flex lg:flex-row flex-col">
          <div className="bg-light-silver p-2 max-lg:mb-2 grow">
            <label
              className="block text-gray-700 text-sm font-bold mb-1"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="bg-transparent appearance-none w-full leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="lg:ml-4 bg-light-silver p-2 grow-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-1"
              htmlFor="address"
            >
              Address
            </label>
            <input
              className="bg-transparent appearance-none w-full leading-tight focus:outline-none focus:shadow-outline"
              id="address"
              type="text"
              placeholder="Address"
            />
          </div>
        </div>
      </div>
      <div className="products-item pb-2 mt-6">
        <div className="bg-white text-red-600 px-3 py-3 flex items-center">
          <div className="border-r border-red-600 pr-3 flex items-center text-2xl">
            <ShoppingBagIcon />
            <span className="font-semibold">Fashion Revive</span>
          </div>
          <div className="ml-3">
            <h1 className="">Product Ordered</h1>
          </div>
        </div>
        <div className="products">
          <div>
            <div className="overflow-auto mt-3 shadow hidden md:block">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">
                      Details
                    </th>
                    <th className="w-24 p-3 text-sm font-semibold tracking-wide text-center">
                      Price
                    </th>
                    <th className="w-24 p-3 text-sm font-semibold tracking-wide text-center">
                      Quantities
                    </th>
                    <th className="w-32 p-3 text-sm font-semibold tracking-wide text-center">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <ItemCart />
                  <ItemCart />
                  <ItemCart />
                  <ItemCart />
                  <ItemCart />
                </tbody>
              </table>
            </div>
            <div className="shipping">
              <h1>Shipping Option</h1>
              <select
                id="countries"
                className="text-sm rounded-lg block w-full p-2.5"
              >
                <option selected>Choose a country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option>
              </select>
              <div className="time-recieve">
                Nhận hàng vào 18 Th07 - 19 Th07
              </div>
              <div className="btn-change">
                <button className="uppercase">change</button>
              </div>
              <div className="total">123.000.000</div>
            </div>
            <TableItemResponsive />
          </div>
        </div>
      </div>
    </div>
  );
}
