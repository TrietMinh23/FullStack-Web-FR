import { useState } from "react";
import { Link } from "react-router-dom";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { ValidationEmail } from "../../utils/Validation";

export default function ForgotPassword() {
  const [stateDialogEmail, setStateDialogEmail] = useState(false);
  const [emailInput, setEmailInput] = useState("");

  const resetEmail = (e) => {
    e.preventDefault();
    !ValidationEmail(emailInput)
      ? setStateDialogEmail(true)
      : setStateDialogEmail(false);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex items-center">
      <div className="sm:max-w-sm mx-auto max-sm:px-2">
        <div className="logo-banner flex justify-center">
          <div className="w-20 h-20">
            <img src="./logo-banner.png" alt="logo" />
          </div>
        </div>
        <h5 className="text-center font-semibold mb-2 text-gray-900">
          Reset your password
        </h5>
        <p className="text-center text-gray-500 mb-12 text-sm">
          Enter your email and we'll send you a link to reset your password.
        </p>
        <div className={!stateDialogEmail ? "mb-4" : "mb-2"}>
          <label
            htmlFor="email"
            className="mb-1 text-gray-900 text-sm font-semibold leading-6"
          >
            Email address
          </label>
          <input
            type="text"
            id="email"
            name="email"
            className="w-full py-2 px-3 border border-gray-300 rounded-md mt-2"
            onChange={(e) => setEmailInput(e.target.value)}
          ></input>
        </div>
        <div
          className={`alert-box-inner alert-container mb-4 flex font-semibold text-red-600 ${
            !stateDialogEmail ? "hidden" : "block"
          }`}
        >
          <PriorityHighIcon className="icon-alert"></PriorityHighIcon>
          <div className="alert-content text-xs ml-2">
            <p>Enter your email</p>
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={(e) => resetEmail(e)}
            className="text-center w-full hover:bg-emerald bg-green-sheen px-4 py-2 rounded-md font-semibold text-white mt-2"
          >
            Reset your password
          </button>
        </div>
        <div className="flex justify-center mt-6">
          <p className="mr-1">Don’t have an account? </p>
          <Link
            to="/signup"
            className="text-dark-pastel-red font-bold hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
