import { FaRegEnvelope } from "react-icons/fa";

export default function ForgotPassword() {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="w-[30rem] h-1/2 bg-gray-200 rounded-lg">
        <h1 className="text-3xl font-bold text-center mt-8">Reset password</h1>
        <p className="ml-10 mt-8 font-bold">Enter your email</p>
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
        <button
          data-modal-target="popup-modal"
          data-modal-toggle="popup-modal"
          className="text-white text-center mt-5 ml-10 border-2 bg-[#8CB596] rounded-xl w-[25rem] p-2 inline-block font-semibold hover:bg-[#55928B]"
        >
          Send code
        </button>
        <p className="mt-5 text-center">
          Don't have an account?
          <button className="mt-2 font-bold text-red-500">Sign up</button>
        </p>
      </div>
    </div>
  );
}
