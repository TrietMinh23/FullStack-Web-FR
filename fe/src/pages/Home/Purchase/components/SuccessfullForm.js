import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";
import setCookie from "../../../../utils/setCookie";
export default function Box() {
  return (
    <section className="py-24">
      <div className="container px-4 mx-auto">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block mx-auto mb-6">
            <CheckCircleIcon sx={{ fontSize: 50 }} className="text-emerald" />
          </span>
          <span className="block mb-1 text-sm font-bold text-indigo-500">
            SUCCESS
          </span>
          <h3 className="text-2xl font-black mb-5">
            Your order has been placed
          </h3>
          <p className="text-lg font-bold mb-12">
            Build a well-presented brand that everyone will love. Take care to
            develop resources continually and integrity them with previous
            projects.
          </p>
          <Link
            className="group relative inline-block h-12 w-full xs:w-60 bg-blueGray-900 rounded-md"
            to="/"
            onClick={() => {
              setCookie("vnp_params", "", 1);
            }}
          >
            <div className="absolute top-0 left-0 transform -translate-y-1 -translate-x-1 w-full h-full transition duration-300">
              <div className="flex h-full w-full items-center justify-center bg-green-sheen hover:bg-emerald border-2 border-black rounded-md">
                <span className="text-base font-black text-black">
                  Continue Shopping
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
