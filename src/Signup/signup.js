import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";

export default function Signup() {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="w-[30rem] pb-10 bg-gray-200 rounded-lg">
        <h1 className="text-3xl font-bold text-center mt-10">Sign up</h1>

        <p className="ml-10 mt-8 font-bold">Your nickname?</p>
        <div className="mt-2 flex flex-col items-center">
          <div className="bg-gray-100 w-[25rem] p-2 flex items-center mb-3 rounded-lg">
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="bg-gray-100 outline-none text-[#B0ACAC] flex-1 ml-2"
            />
          </div>
        </div>
        <div id="error_username" className="ml-10 err_text_signup"></div>

        <p className="ml-10 mt-5 font-bold">Email</p>
        <div className=" mt-2 flex flex-col items-center">
          <div className="bg-gray-100 w-[25rem] p-2 flex items-center mb-3 rounded-lg">
            <FaRegEnvelope className="text-gray-400 m-2" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="bg-gray-100 outline-none text-sm flex-1"
            />
          </div>
        </div>
        <div id="error_email" className="ml-10 err_text_signup mb-2"></div>
        <div className="ml-10 bg-gray-100 w-[25rem] p-2 flex items-center mb-3 rounded-lg">
          <MdLockOutline className="text-gray-400 m-2" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="bg-gray-100 outline-none text-sm flex-1"
          />
        </div>
        <div className="container_confirm_password ml-10 bg-gray-100 w-[25rem] p-2 flex items-center mb-3 rounded-lg">
          <MdLockOutline className="text-gray-400 m-2" />
          <input
            type="password"
            name="confirm_password"
            id="confirm_password"
            placeholder="Confirm password"
            className="bg-gray-100 outline-none text-sm flex-1"
          />
        </div>
        <div id="error_password" className="ml-10 err_text_signup"></div>
        <button className="text-white text-center mt-6 ml-10 border-2 bg-[#8CB596] rounded-xl w-[25rem] p-2 inline-block font-semibold hover:bg-[#55928B]">
          Register
        </button>
        <br />
        <small className="flex justify-between text-center ml-6 mr-6 mt-4 text-[#726969]">
          By continuing, you agree to Fashion-Revive's Terms of Service and
          confirm that you have read Fashion-Revive's Privacy Policy.
        </small>
      </div>
    </div>
  );
}
