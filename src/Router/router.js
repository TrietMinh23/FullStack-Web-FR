import { Route, Routes } from "react-router-dom";
import Home from "../Home/home";
import Login from "../Login/login";
import Signup from "../Signup/signup";
import ForgotPassword from "../ForgotPassword/forgotpassword";
import ChooseType from "../ChooseType/choosetype";

export default function Router() {
  return (
    <Routes>
      <Route exact path="/" element={<Home></Home>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/signup" element={<Signup></Signup>}></Route>
      <Route
        path="/forgotpassword"
        element={<ForgotPassword></ForgotPassword>}
      ></Route>
      <Route path="/type" element={<ChooseType />}></Route>
    </Routes>
  );
}
