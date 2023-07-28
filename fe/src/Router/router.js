import Admin from "../pages/Admin/Admin";
import FinancialManagement from "../pages/Admin/page/financialmanagement";
import Usemanagement from "../pages/Admin/page/usemanagement";
import Allbuyer from "../pages/Admin/page/allbuyer";
import Allitems from "../pages/Admin/page/allitems";
import Allsellers from "../pages/Admin/page/allsellers";
import Report from "../pages/Admin/page/report";

import { Route, Routes } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import Loading from "../components/ui/Loading";

const Login = lazy(() => import("../pages/Login/login"));
const Signup = lazy(() => import("../pages/Signup/signup"));
const ForgotPassword = lazy(() =>
  import("../pages/ForgotPassword/forgotpassword")
);
const ChooseType = lazy(() => import("../pages/ChooseType/choosetype"));
const NotFound = lazy(() => import("../pages/NotFound/404"));
const Purchase = lazy(() => import("../pages/Home/Purchase/Purchase"));
const ShoppingItemDetail = lazy(() =>
  import("../pages/Home/components/ShoppingItemDetail")
);
const ShoppingCart = lazy(() =>
  import("../pages/Home/ShoppingCart/ShoppingCart")
);
const Profile = lazy(() => import("../pages/Home/PersonalProfile/Profile"));
const Notification = lazy(() =>
  import("../pages/Home/Notification/notification")
);
const HomeSeller = lazy(() => import("../pages/Seller/Home/home"));
const AllItems = lazy(() => import("../pages/Seller/AllItems/allItem"));
const NewItem = lazy(() => import("../pages/Seller/NewItem/newItem"));
const Review = lazy(() => import("../pages/Seller/Review/review"));
const LayoutSeller = lazy(() => import("../pages/Seller/Home/LayoutSeller"));
const Home = lazy(() => import("../pages/Home/home"));
const LayoutHomePage = lazy(() => import("../pages/Home/LayoutHomePage"));



export default function Router() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<LayoutHomePage />}>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="products/:slug" element={<ShoppingItemDetail />}></Route>
          {!localStorage.getItem("currentUser") ? (
            <React.Fragment>
              <Route path="shoppingcart" element={<ShoppingCart />} />
              <Route path="purchase" element={<Purchase />} />
              <Route path="profile" element={<Profile />} />
            </React.Fragment>
          ) : null}
        </Route>

        {!localStorage.getItem("currentUser") ? (
          <React.Fragment>
            <Route path="/notification" element={<Notification />}></Route>
          </React.Fragment>
        ) : null}

        <Route path="*" element={<NotFound />}></Route>

        {!localStorage.getItem("currentUser") ? (
          <React.Fragment>
            <Route path="/seller" element={<LayoutSeller />}>
              <Route path="/seller" element={<HomeSeller />}></Route>
              <Route path="all-item" element={<AllItems />}></Route>
              <Route path="add-new-item" element={<NewItem />}></Route>
              <Route path="review" element={<Review />}></Route>
            </Route>
          </React.Fragment>
        ) : null}

        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route
          path="/forgotpassword"
          element={<ForgotPassword></ForgotPassword>}
        ></Route>
        <Route path="/type" element={<ChooseType />}></Route>
        <Route path="/admin" element={<Admin/>}>
          <Route exact path="financialmanagement" element={<FinancialManagement/>}></Route>
          <Route path="usemanagement" element={<Usemanagement/>}>
            <Route path="allbuyer" element={<Allbuyer/>}></Route>
            <Route path="allitems" element={<Allitems/>}></Route>
            <Route path="allsellers" element={<Allsellers/>}></Route>
            <Route path="report" element={<Report/>}></Route>
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}
