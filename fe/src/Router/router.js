import { Route, Routes } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import Loading from "../components/ui/Loading";
import withAuth from "./withAuth";

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
const Admin = lazy(() => import("../pages/Admin/Admin"));
const FinancialManagement = lazy(() =>
  import("../pages/Admin/page/financialmanagement")
);
const Usemanagement = lazy(() => import("../pages/Admin/page/usemanagement"));
const Allbuyer = lazy(() => import("../pages/Admin/page/allbuyer"));
const Allitems = lazy(() => import("../pages/Admin/page/allitems"));
const Allsellers = lazy(() => import("../pages/Admin/page/allsellers"));
const Report = lazy(() => import("../pages/Admin/page/report"));
const ReportForm = lazy(() => import("../components/Report"));

const AppRouter = () => {
  withAuth(
    <React.Fragment>
      <Route path="/" element={<LayoutHomePage />}>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="products/:slug" element={<ShoppingItemDetail />}></Route>
        <Route path="purchase" element={<Purchase />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route path="/notification" element={<Notification />}></Route>

      <Route path="/seller" element={<LayoutSeller />}>
        <Route path="/seller" element={<HomeSeller />}></Route>
        <Route path="all-item" element={<AllItems />}></Route>
        <Route path="add-new-item" element={<NewItem />}></Route>
        <Route path="review" element={<Review />}></Route>
      </Route>

      <Route path="/report" element={<ReportForm />}></Route>
      <Route path="/admin" element={<Admin />}>
        <Route
          exact
          path="/admin/financialmanagement"
          element={<FinancialManagement />}
        />
        <Route path="usemanagement" element={<Usemanagement />}>
          <Route path="allbuyer" element={<Allbuyer />} />
          <Route path="allitems" element={<Allitems />} />
          <Route path="allsellers" element={<Allsellers />} />
          <Route path="report" element={<Report />} />
        </Route>
      </Route>
    </React.Fragment>
  );
};

function Router() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/type" element={<ChooseType />}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route
          path="/forgotpassword"
          element={<ForgotPassword></ForgotPassword>}
        ></Route>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/" element={<LayoutHomePage />}>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="products/:slug" element={<ShoppingItemDetail />}></Route>
          <Route path="shoppingcart" element={<ShoppingCart />} />
        </Route>
        <Route element={<AppRouter />} />
      </Routes>
    </Suspense>
  );
}

export default Router;
