import { Link } from "react-router-dom";

export default function ButtonLogin() {
  return (
    <Link
      to="/type"
      className="px-6 py-2 rounded-md text-white font-semibold bg-green-sheen border-2 border-transparent hover:border-green-sheen hover:bg-white hover:text-green-sheen transition-all"
    >
      Login
    </Link>
  );
}
