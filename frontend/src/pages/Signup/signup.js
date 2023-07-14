import { Link } from "react-router-dom";
import { useReducer, useState } from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { ValidationEmail } from "../../utils/Validation";
import { useSelector } from "react-redux";
import { signup } from "../../api/signup";

const initialStateDialog = {
  stateDialogEmail: true,
  stateDialogPassword: true,
  stateDialogUsername: true,
};

const dialogReducer = (state, action) => {
  switch (action.type) {
    case "SET_STATUS_DIALOG":
      return {
        stateDialogEmail: action.payload.stateDialogEmail,
        stateDialogPassword: action.payload.stateDialogPassword,
        stateDialogUsername: action.payload.stateDialogUsername,
      };
  }
};

export default function Signup() {
  const [stateDialog, setStateDialog] = useReducer(
    dialogReducer,
    initialStateDialog
  );

  const [message, setMessage] = useState("");
  const role = useSelector((state) => state.auth.role);

  const [stateConfirmPassword, setStateConfirmPassword] = useState(true);
  const [stateRequiredPassword, setStateRequiredPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    role: role,
  });

  const handleSignUpInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const signIn = async (e) => {
    e.preventDefault();
    setMessage("");

    setStateRequiredPassword(true);

    formData.confirm_password !== formData.password
      ? setStateConfirmPassword(false)
      : setStateConfirmPassword(true);

    setStateDialog({
      type: "SET_STATUS_DIALOG",
      payload: {
        stateDialogEmail: !ValidationEmail(formData.email) ? false : true,
        stateDialogUsername: !formData.username ? false : true,
        stateDialogPassword: formData.password.length < 6 ? false : true,
      },
    });

    if (
      ValidationEmail(formData.email) &&
      formData.password !== "" &&
      stateConfirmPassword
    ) {
      const { email, password, username, role } = formData;
      await signup({
        email,
        password,
        username,
        role,
      })
        .then((res) => console.log(res))
        .catch((err) => setMessage(err.response.data.message));
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
      <div className="w-full sm:max-w-md p-5 mx-auto">
        <h2 className="mb-12 text-center text-5xl font-extrabold">Sign up</h2>
        <form>
          <div className={!stateDialog.stateDialogUsername ? "mb-2" : "mb-4"}>
            <label className="block mb-1" htmlFor="username">
              Your nickname ?
            </label>
            <input
              id="username"
              type="text"
              name="username"
              className={`py-2 px-3 border focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full ${
                !stateDialog.stateDialogUsername
                  ? "border-red-300"
                  : "border-gray-300"
              }`}
              onChange={(e) => handleSignUpInputChange(e)}
            />
          </div>
          <div
            className={`alert-box-inner alert-container mb-4 flex font-semibold text-red-600 ${
              !stateDialog.stateDialogUsername ? "block" : "hidden"
            } `}
          >
            <PriorityHighIcon className="icon-alert"></PriorityHighIcon>
            <div className="alert-content text-xs ml-2">
              <p>Enter your nickname</p>
            </div>
          </div>
          <div className={!stateDialog.stateDialogEmail ? "mb-2" : "mb-4"}>
            <label className="block mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className={`py-2 px-3 border focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full ${
                !stateDialog.stateDialogEmail
                  ? "border-red-300"
                  : "border-gray-300"
              }`}
              onChange={(e) => handleSignUpInputChange(e)}
            />
          </div>
          <div
            className={`alert-box-inner alert-container mb-4 flex font-semibold text-red-600 ${
              !stateDialog.stateDialogEmail ? "block" : "hidden"
            }`}
          >
            <PriorityHighIcon className="icon-alert"></PriorityHighIcon>
            <div className="alert-content text-xs ml-2">
              <p>Enter your email</p>
            </div>
          </div>
          <div className={!stateDialog.stateDialogPassword ? "mb-2" : "mb-4"}>
            <label className="block mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className={`py-2 px-3 border focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full ${
                !stateDialog.stateDialogPassword
                  ? "border-red-300"
                  : "border-gray-300"
              }`}
              onChange={(e) => handleSignUpInputChange(e)}
            />
          </div>
          <div
            className={`alert-box-inner alert-container mb-4 flex font-semibold ${
              !stateRequiredPassword ? "block" : "hidden"
            }`}
          >
            <ErrorOutlineIcon className="icon-alert flex items-center"></ErrorOutlineIcon>
            <div className="alert-content text-xs ml-2">
              <p>Passwords must be at least 6 characters.</p>
            </div>
          </div>
          <div
            className={`alert-box-inner alert-container mb-4 flex font-semibold text-red-600 ${
              !stateDialog.stateDialogPassword ? "block" : "hidden"
            } `}
          >
            <PriorityHighIcon className="icon-alert"></PriorityHighIcon>
            <div className="alert-content text-xs ml-2">
              <p>Minimum 6 characters required</p>
            </div>
          </div>
          <div className={!stateConfirmPassword ? "mb-2" : "mb-4"}>
            <label className="block mb-1" htmlFor="password_confirm">
              Confirm Password
            </label>
            <input
              id="password_confirm"
              type="password"
              name="confirm_password"
              className={`py-2 px-3 border focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full ${
                !stateConfirmPassword ? "border-red-300" : "border-gray-300"
              }`}
              onChange={(e) => handleSignUpInputChange(e)}
            />
          </div>
          <div
            className={`alert-box-inner alert-container mb-4 flex font-semibold text-red-600 ${
              stateConfirmPassword ? "hidden" : "block"
            } `}
          >
            <PriorityHighIcon className="icon-alert"></PriorityHighIcon>
            <div className="alert-content text-xs ml-2">
              <p>Passwords must match</p>
            </div>
          </div>
          <div
            className={`alert-box-inner alert-container mb-4 flex font-semibold text-red-600 ${
              message !== "" ? "block" : "hidden"
            }`}
          >
            <PriorityHighIcon className="icon-alert"></PriorityHighIcon>
            <div className="alert-content text-xs ml-2">
              <p>{message}</p>
            </div>
          </div>
          <div className="text-xs mb-4">
            By continuing, you agree to Fashion-Revive’s{" "}
            <strong>Terms of Service</strong> and confirm that you have read
            Fashion-Revive’s <strong> Privacy Policy.</strong>
          </div>
          <div className="mt-6">
            <button
              onClick={(e) => signIn(e)}
              className="w-full inline-flex items-center justify-center px-4 py-2 bg-green-sheen hover:bg-emerald border border-transparent rounded-md font-semibold capitalize text-white focus:outline-none disabled:opacity-25 transition"
            >
              Sign In
            </button>
          </div>
          <div className="mt-4">
            Already have account?{" "}
            <Link
              to="/login"
              className="text-dark-pastel-red font-bold hover:underline"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
