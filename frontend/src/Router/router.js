import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/home";
import Login from "../pages/Login/login";
import Signup from "../pages/Signup/signup";
import ForgotPassword from "../pages/ForgotPassword/forgotpassword";
import ChooseType from "../pages/ChooseType/choosetype";
import NotFound from "../pages/NotFound/404";
import Purchase from "../pages/Home/Purchase/Purchase";
import ShoppingItemDetail from "../pages/Home/components/ShoppingItemDetail";
import ShoppingCart from "../pages/Home/ShoppingCart/ShoppingCart";

export default function Router() {
  return (
    <Routes>
      <Route exact path="/" element={<Home></Home>}></Route>
      <Route path="/products/:slug" element={<ShoppingItemDetail />}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/signup" element={<Signup></Signup>}></Route>
      <Route
        path="/forgotpassword"
        element={<ForgotPassword></ForgotPassword>}
      ></Route>
      <Route
        path="/shoppingcart"
        element={<ShoppingCart></ShoppingCart>}
      ></Route>
      <Route path="/purchase" element={<Purchase></Purchase>}></Route>
      <Route path="/type" element={<ChooseType />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}
