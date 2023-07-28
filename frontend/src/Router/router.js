import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "../pages/Home/home";
import Login from "../pages/Login/login";
import Signup from "../pages/Signup/signup";
import ForgotPassword from "../pages/ForgotPassword/forgotpassword";
import ChooseType from "../pages/ChooseType/choosetype";
import NotFound from "../pages/NotFound/404";
import Purchase from "../pages/Home/Purchase/Purchase";
import ShoppingItemDetail from "../pages/Home/components/ShoppingItemDetail";
import ShoppingCart from "../pages/Home/ShoppingCart/ShoppingCart";
import React, { useEffect, useState } from "react";
import Profile from "../pages/Home/PersonalProfile/Profile";
import Notification from "../pages/Home/Notification/notification";
import HomeSeller from "../pages/Seller/Home/home";
import AllItems from "../pages/Seller/AllItems/allItem";
import NewItem from "../pages/Seller/NewItem/newItem";
import Review from "../pages/Seller/Review/review";
import LayoutHomePage from "../pages/Home/LayoutHomePage";
import LayoutSeller from "../pages/Seller/Home/LayoutSeller";
import Admin from "../pages/Admin/Admin";
import FinancialManagement from "../pages/Admin/page/financialmanagement";
import Usemanagement from "../pages/Admin/page/usemanagement";
import Allbuyer from "../pages/Admin/page/allbuyer";
import Allitems from "../pages/Admin/page/allitems";
import Allsellers from "../pages/Admin/page/allsellers";
import Report from "../pages/Admin/page/report";

export default function Router() {
  return (
    <Routes>
        <Route path="/" element={<LayoutHomePage />}>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="products/:slug" element={<ShoppingItemDetail />}></Route>
          <Route
            path="shoppingcart"
            element={<ShoppingCart></ShoppingCart>}
          ></Route>
          <Route path="/purchase" element={<Purchase></Purchase>}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Route>

        <Route path="/type" element={<ChooseType />}></Route>

        <Route path="*" element={<NotFound />}></Route>

        <Route path="/notification" element={<Notification />}></Route>

        <Route path="/seller" element={<LayoutSeller />}>
          <Route path="/seller" element={<HomeSeller />}></Route>
          <Route path="all-item" element={<AllItems />}></Route>
          <Route path="add-new-item" element={<NewItem />}></Route>
          <Route path="review" element={<Review />}></Route>
        </Route>
        <Route path="/admin" element={<Admin/>}>
          <Route exact path="financialmanagement" element={<FinancialManagement/>}></Route>
          <Route path="usemanagement" element={<Usemanagement/>}>
            <Route path="allbuyer" element={<Allbuyer/>}></Route>
            <Route path="allitems" element={<Allitems/>}></Route>
            <Route path="allsellers" element={<Allsellers/>}></Route>
            <Route path="report" element={<Report/>}></Route>
          </Route>
        </Route>

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
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/notification" element={<Notification />}></Route>

        
    </Routes>
    
  );
}
