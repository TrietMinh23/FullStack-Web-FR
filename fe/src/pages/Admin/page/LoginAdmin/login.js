import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import setCookie from "../../../../utils/setCookie";
import { login } from "../../../../api/login";

export default function LoginAdmin() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const [userData, setUserData] = useState({
    email: "",
    password: "",
    otp: "",
    role: "admin",
  });

  const handleLoginInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const loginAdmin = async (e) => {
    e.preventDefault();
    await login(userData)
      .then((res) => {
        setCookie("access_token", res.data.access_token, 1 * 24 * 60 * 60);
        setCookie("refresh_token", res.data.refresh_token, 3 * 24 * 60 * 60);
        axios
          .get("http://localhost:5000/users/user_info", {
            headers: {
              Authorization: `${res.data.access_token}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          })
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              for (let i in res.data) {
                localStorage.setItem(i, JSON.stringify(res.data[i]));
              }
              navigate("/admin");
              window.location.reload();
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err)
        setMessage(err.responses);
      });
  };

  return (
    <div className="container mx-auto p-4 bg-white h-screen flex items-center">
      <div className="w-full md:w-1/2 lg:w-1/3 mx-auto my-12">
        <h1 className="text-lg font-bold">Login</h1>
        <form className="flex flex-col mt-4">
          <input
            type="email"
            name="email"
            className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            placeholder="Email address"
            onChange={handleLoginInputChange}
          />
          <input
            type="password"
            name="password"
            className="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            placeholder="Password"
            onChange={handleLoginInputChange}
          />
          <input
            type="text"
            name="otp"
            className="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            placeholder="OTP"
            onChange={handleLoginInputChange}
          />
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
          <button
            onClick={loginAdmin}
            type="submit"
            className="mt-4 px-4 py-3  leading-6 text-base rounded-md border border-transparent text-white  bg-blue-500  hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center w-full justify-center  font-medium focus:outline-none"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
