// Import the `useSelector` hook from React Redux to access the state in a functional component
import { useSelector } from "react-redux";

// Component to display a single row in the payment details table
function PaymentDetailsRow({ label, amount }) {
  return (
    <tr>
      <th className="text-left">{label}:</th>
      <td className="text-right pl-4 py-2">₫{amount}</td>
    </tr>
  );
}

// Component to display payment details including product price and shipping price
function PaymentDetails({ productPrice, shipPrice }) {
  return (
    <div className="bg-white px-6 py-4 items-center justify-end flex">
      <table>
        <thead>
          {/* Display the merchandise subtotal */}
          <PaymentDetailsRow
            label="Merchandise Subtotal"
            amount={productPrice}
          />
          {/* Display the shipping total */}
          <PaymentDetailsRow label="Shipping Total" amount={shipPrice} />
          <tr>
            {/* Display the total payment */}
            <th className="text-left">Total Payment:</th>
            <td className="text-right pl-4 py-2 text-3xl font-semibold text-red-500">
              ₫{productPrice + shipPrice}
            </td>
          </tr>
        </thead>
      </table>
    </div>
  );
}

// CheckoutModal component that renders the payment method label and payment details
export default function CheckoutModal() {
  // Access the `payments`, `shippingPrice`, and `productPrice` from the Redux store
  const payments = useSelector((state) => state.purchase.payments);
  const shippingPrice = useSelector((state) => state.purchase.shipPrice);
  const productPrice = useSelector((state) => state.purchase.productPrice);

  // Determine the payment method label
  let paymentMethodLabel = "";
  if (payments === "Cash") {
    paymentMethodLabel = "Cash on Delivery";
  } else if (payments === "VNPAY") {
    paymentMethodLabel = "Payment via VNPAY transaction portal";
  }

  return (
    <div>
      {/* Display the payment method label if available */}
      {paymentMethodLabel && (
        <div>
          <h1 className="bg-white px-6 py-4 flex items-center">
            {paymentMethodLabel}
          </h1>
          <hr />
          {/* Display the payment details */}
          <PaymentDetails
            productPrice={productPrice}
            shipPrice={shippingPrice}
          />
        </div>
      )}
      <hr />
      {/* Display the transaction terms and the "Place Order" button */}
      <div className="bg-white px-6 py-4 flex items-center">
        <p className="text-gray-500 text-xs">
          By clicking "Place Order", you are agreeing to{" "}
          <span className="text-blue-500">
            Fashion-Revive's General Transaction Terms
          </span>
        </p>
        <div className="grow flex justify-center">
          <button className="ml-2 bg-dark-jungle-green text-white p-2 rounded-sm md:w-1/2 w-32">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
