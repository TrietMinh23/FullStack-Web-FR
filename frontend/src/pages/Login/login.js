import { Link } from "react-router-dom";
import { useReducer, useState } from "react";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { ValidationEmail } from "../../utils/Validation";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import { login } from "../../api/login";
import { useSelector } from "react-redux";
import LoadingIcon from "../../components/ui/LoadingIcon";

const initialStateDialog = {
  stateDialogEmail: true,
  stateDialogPassword: true,
};

const dialogReducer = (state, action) => {
  switch (action.type) {
    case "SET_STATUS_DIALOG":
      return {
        stateDialogEmail: action.payload.stateDialogEmail,
        stateDialogPassword: action.payload.stateDialogPassword,
      };
  }
};

export default function Login() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const role = useSelector((state) => state.auth.role);

  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [stateDialog, setStateDialog] = useReducer(
    dialogReducer,
    initialStateDialog
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: role,
  });

  const handleLoginInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const signInWithGoolge = () => {
    signInWithGoogle();
  };

  const Login = async (e) => {
    e.preventDefault();
    setMessage("");

    setStateDialog({
      type: "SET_STATUS_DIALOG",
      payload: {
        stateDialogEmail: !ValidationEmail(formData.email) ? false : true,
        stateDialogPassword: formData.password === "" ? false : true,
      },
    });

    if (ValidationEmail(formData.email) && formData.password !== "") {
      setLoading(true);
      await login(formData)
        .then((res) => {
          if (res.data.data) setLoading(false);
        })
        .catch((err) => {
          setMessage(err.response.data.message);
          setLoading(false);
        });
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
      <div className="w-full sm:max-w-md p-5 mx-auto">
        <h2 className="mb-12 text-center text-5xl font-extrabold">Welcome.</h2>
        <form>
          <div className={!stateDialog.stateDialogEmail ? "mb-2" : "mb-4"}>
            <label className="block mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="abc123@gmail.com"
              onChange={(e) => handleLoginInputChange(e)}
              className={`py-2 px-3 border focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full ${
                !stateDialog.stateDialogEmail
                  ? "border-red-300"
                  : "border-gray-300"
              }`}
              required
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
              placeholder="***********"
              onChange={(e) => handleLoginInputChange(e)}
              className={`py-2 px-3 border focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full ${
                !stateDialog.stateDialogPassword
                  ? "border-red-300"
                  : "border-gray-300"
              }`}
              required
            />
          </div>
          <div
            className={`alert-box-inner alert-container mb-4 flex font-semibold text-red-600 ${
              !stateDialog.stateDialogPassword ? "block" : "hidden"
            }`}
          >
            <PriorityHighIcon className="icon-alert"></PriorityHighIcon>
            <div className="alert-content text-xs ml-2">
              <p>Enter your password</p>
            </div>
          </div>
          <div
            className={`alert-box-inner alert-container mb-4 flex font-semibold text-red-600 ${
              message != "" ? "block" : "hidden"
            }`}
          >
            <PriorityHighIcon className="icon-alert"></PriorityHighIcon>
            <div className="alert-content text-xs ml-2">
              <p>{message}</p>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                type="checkbox"
                className="border border-gray-300 text-red-600 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
              />
              <label
                htmlFor="remember_me"
                className="ml-2 block text-sm leading-5 text-gray-900"
              >
                {" "}
                Remember me{" "}
              </label>
            </div>
            <Link to="/forgotpassword" className="text-sm hover:underline">
              {" "}
              Forgot your password?{" "}
            </Link>
          </div>
          <div className="mt-6">
            <button
              disabled={isLoading}
              onClick={(e) => Login(e)}
              className="w-full inline-flex items-center justify-center px-4 py-2 bg-green-sheen hover:bg-emerald border border-transparent rounded-md font-semibold capitalize text-white focus:outline-none disabled:opacity-25 transition"
            >
              {isLoading ? <LoadingIcon /> : "Sign In"}
            </button>
          </div>
          <div className="mt-4">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-dark-pastel-red font-bold hover:underline"
            >
              Sign up
            </Link>
          </div>
          <div className="flex items-center py-4">
            <div className="flex-grow h-px bg-gray-400"></div>

            <span className="flex-shrink text-sm text-gray-500 px-4 italic font-light uppercase">
              or
            </span>

            <div className="flex-grow h-px bg-gray-400"></div>
          </div>
          <div className="mt-6">
            <button
              onClick={signInWithGoolge}
              type="button"
              className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
            >
              <div className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  className="w-6 h-6"
                  viewBox="0 0 48 48"
                >
                  <defs>
                    <path
                      id="a"
                      d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                    />
                  </defs>
                  <clipPath id="b">
                    <use xlinkHref="#a" overflow="visible" />
                  </clipPath>
                  <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
                  <path
                    clipPath="url(#b)"
                    fill="#EA4335"
                    d="M0 11l17 13 7-6.1L48 14V0H0z"
                  />
                  <path
                    clipPath="url(#b)"
                    fill="#34A853"
                    d="M0 37l30-23 7.9 1L48 0v48H0z"
                  />
                  <path
                    clipPath="url(#b)"
                    fill="#4285F4"
                    d="M48 48L17 24l-4-3 35-10z"
                  />
                </svg>
                <span className="ml-4">Log in with Google</span>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
