import { Link } from "react-router-dom";

export default function ButtonSignUp() {
  return (
    <Link
      to="/signup"
      className="px-6 py-2 rounded-md text-green-sheen font-semibold bg-white border-2 border-green-sheen hover:border-transparent hover:bg-green-sheen hover:text-white transition-all"
    >
      Sign Up
    </Link>
  );
}
