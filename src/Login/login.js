import { FaGoogle, FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";

export default function Login() {
  return (
    <div className="relative">
      <div className="flex justify-center items-center h-screen w-screen">
        <div className="w-[30rem] h-4/5 bg-gray-200 rounded-lg">
          <h1 className="text-3xl font-bold text-center mt-10">Log in</h1>
          <p className="ml-10 mt-5 font-bold">Email or username</p>
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
          <div className="ml-10 bg-gray-100 w-[25rem] p-2 flex items-center mb-1 rounded-lg">
            <MdLockOutline className="text-gray-400 m-2" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="bg-gray-100 outline-none text-sm flex-1"
            />
          </div>
          <div id="error_login" className="ml-10 err_text_signup"></div>
          <button className="ml-10 text-[#79B695]">Forgot Password?</button>
          <br />
          <button className="text-white mt-6 ml-10 border-2 bg-[#8CB596] rounded-xl px-44 py-2 inline-block font-semibold hover:bg-[#55928B]">
            Log in
          </button>
          <p className="mt-5 text-center">
            Don't have an account?
            <button className="mt-2 font-bold text-red-500">Sign up</button>
          </p>
          <div className="mt-6 mb-8 mx-auto border-t-2 w-96 border-black py-0"></div>

          <div className="ml-10 bg-[#C2451D] w-[25rem] p-2 flex items-center mb-1 rounded-lg">
            <FaGoogle className="text-white m-2" />
            <button className="text-white ml-24">Log in with Google</button>
          </div>
        </div>
      </div>
    </div>
  );
}
