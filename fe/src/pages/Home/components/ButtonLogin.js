import { Link } from "react-router-dom";

export default function ButtonLogin() {
  return (
    <Link
      to="/type"
      className="px-6 py-2 rounded-md text-white font-semibold bg-dark-jungle-green border-2 border-white hover:border-dark-jungle-green hover:bg-white hover:text-dark-jungle-green transition-all"
    >
      Login
    </Link>
  );
}
