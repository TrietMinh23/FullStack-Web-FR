import { useSelector } from "react-redux";

export default function ModalTemp() {
  const payments = useSelector((state) => state.purchase.payments);
  const shipPrice = useSelector((state) => state.purchase.shipPrice);
  const productPrice = useSelector((state) => state.purchase.productPrice)
  return (
    <div>
      <div className={`${payments === "Cash" ? "block" : "hidden"}`}>
        <h1 className="bg-white px-6 py-4 flex items-center">
          Cash on Delivery
        </h1>
        <hr />
        <div className="bg-white px-6 py-4 items-center justify-end flex">
          <table>
            <tr>
              <th className="text-left">Merchandise Subtotal:</th>
              <td className="text-right pl-4 py-2">₫{productPrice}</td>
            </tr>
            <tr>
              <th className="text-left">Shipping Total:</th>
              <td className="text-right pl-4 py-2">₫{shipPrice}</td>
            </tr>
            <tr>
              <th className="text-left">Total Payment:</th>
              <td className="text-right pl-4 py-2 text-3xl font-semibold text-red-500">
                ₫{productPrice + shipPrice}
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div className={`${payments === "VNPAY" ? "block" : "hidden"}`}>
        <h1 className="bg-white px-6 py-4 flex items-center">
          Payment via VNPAY transaction portal
        </h1>
        <hr />
        <div className="bg-white px-6 py-4 items-center justify-end flex">
          <table>
            <tr>
              <th className="text-left">Merchandise Subtotal:</th>
              <td className="text-right pl-4 py-2">₫{productPrice}</td>
            </tr>
            <tr>
              <th className="text-left">Shipping Total:</th>
              <td className="text-right pl-4 py-2">₫{shipPrice}</td>
            </tr>
            <tr>
              <th className="text-left">Total Payment:</th>
              <td className="text-right pl-4 py-2 text-3xl font-semibold text-red-500">
                ₫{productPrice + shipPrice}
              </td>
            </tr>
          </table>
        </div>
      </div>
      <hr />
      <div className="bg-white px-6 py-4 flex items-center">
        <p className="text-gray-500 text-xs">By clicking "Place Order", you are agreeing to <span className="text-blue-500">Fashion-Revive's General Transaction Terms</span></p>
        <div className="grow flex justify-center">
        <button className="ml-2 bg-dark-jungle-green text-white p-2 rounded-sm md:w-1/2 w-32">Place Order</button>
        </div>
        
      </div>
    </div>
  );
}
