import React from "react";
import "./app.css";
import GoToTop from "./Components/GotoTop";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import { ToastContainer } from "react-toastify";
import NotFoundPage from "./Components/NotFoundPage";
import Dashboard from "./Pages/Dashboard";
import Attribute from "./Pages/Attribute/Attribute";
import Roles from "./Pages/Role/Roles";
import Users from "./Pages/Users";
import Categories from "./Pages/Categories/Categories";
// import Banners from "./Pages/Banners/Banners";
import Brands from "./Pages/Brands/Brands";
import Coupons from "./Pages/Coupons/Coupons";
import Setting from "./Pages/Setting/Setting";
import Permissions from "./Pages/Permission/Permissions";
import ProductsDetails from "./ComponentsWeb/Sub/ProductsDetails";
// import Home from "./ComponentsWeb/Main/Home";
import Reviews from "./Pages/Review/Reviews";
import CheckoutPage from "./ComponentsWeb/Sub/CheckoutPage";
import About from "./ComponentsWeb/Main/About";
import Contact from "./ComponentsWeb/Main/Contact";
// import Shop from "./ComponentsWeb/Sub/Shop";
import Checkout from "./ComponentsWeb/Main/Checkout";
import Response from "./ComponentsWeb/Main/Response";
import UserLogin from "./ComponentsWeb/Main/user/UserLogin";
import UserSignup from "./ComponentsWeb/Main/user/UserSignup";
import AddProduct from "./Pages/Products/AddProduct";
import AddUserAddress from "./ComponentsWeb/Main/user/AddUserAddress";
import UserPanel from "./ComponentsWeb/Main/user/UserPanel";
import OrdersList from "./Pages/Orders/OrdersList";
// import SocialMediaSetting from "./Pages/SocialMediaSetting";
import ProductsList from "./Pages/Products/ProductsList";
// import EmailTemplates from "./Pages/EmailTemplates/EmailTemplates";
import Pages from "./Pages/infoPages/Pages";
import DynamicPages from "./Components/DynamicPages";
import UpdateProduct from "./Pages/Products/UpdateProduct";
import Warrantys from "./Pages/Warranty/Warrantys";
import ServiceCenters from "./Pages/ServicesCenter/ServiceCenters";
import ServiceCareCenters from "./ComponentsWeb/Main/ServiceCareCenters";
import TaxClasses from "./Pages/TaxClasses/TaxClasses";
import ForgotPassword from "./ComponentsWeb/Main/user/forgotpassword/ForgotPassword";
import VerifyOtp from "./ComponentsWeb/Main/user/forgotpassword/VerifyOtp";
import NewPassword from "./ComponentsWeb/Main/user/forgotpassword/NewPassword";
import ShippingChargesList from "./Pages/ShippingCharges/ShippingChargesList";
import ConnectPcDeals from "./ComponentsWeb/Main/user/ConnectPcDeals";
import UserOrderReper from "./Pages/Orders/UserOrderReper";
import SubPorducts from "./Pages/SubProduct/SubPorducts";
import TrackersList from "./Pages/Trackers/TrackersList";
import PcdealsConnectionResp from "./ComponentsWeb/Main/PcdealsConnectionResp";
import PayNowBuyLaterResp from "./ComponentsWeb/Main/PayNowBuyLaterResp";
import UsersCartList from "./Pages/UsersCart/UsersCartList";
// import Main from "./Main";
import OffersList from "./Pages/Offers/OffersList";
import MinStockQty from "./Pages/Products/MinStockQty";
import RewardSlabList from "./Pages/RewardSlab/RewardSlabList";

import AddProject from "./Pages/Projects/AddProject";
import CostestimationCopy from "./Pages/Projects/CostestimationCopy";
// import Projectlist from "./Pages/Projects/ProjectList";

import CostEstimationList from "./Pages/Projects/CostEstimationList";

import ProjectList from "./Pages/Projects/ProjectList";

// import Updateestimation from "./Pages/Projects/Updateestimation";
import Viewestimation from "./Pages/Projects/Viewestimation";
import AuthRoute from "./Components/AuthRoutes";

function App() {
  return (
    <>
      <Routes>
        {/* web routes start*/}
        <Route path="/" element={<AuthRoute requiresAuth={false} />}>
          <Route index element={<LoginPage />} />
        </Route>
        <Route element={<AuthRoute requiresAuth={true} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addProject" element={<AddProject />} />
          <Route path="/projectlist" element={<ProjectList />} />
          <Route path={`/costestimation1`} element={<CostestimationCopy />} />
          <Route
            path={`/costestimationlist`}
            element={<CostEstimationList />}
          />
          <Route path={`/viewestimation`} element={<Viewestimation />} />
        </Route>

        <Route path="/response/:orderId/:status" element={<Response />} />
        <Route
          path="/pay-now-buy-later-resp/:buynowpaylater"
          element={<PayNowBuyLaterResp />}
        />
        <Route path="/pcdeals-connection" element={<PcdealsConnectionResp />} />
        <Route path="/servicecare-center" element={<ServiceCareCenters />} />
        <Route path="/product/:slug" element={<ProductsDetails />} />
        {/* <Route path="/shop/:slug" element={<Shop />} /> */}
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout-new" element={<CheckoutPage />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/shop" element={<Shop />} /> */}
        <Route path="/" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/add-user-address" element={<AddUserAddress />} />
        <Route path="/user-dashboard" element={<UserPanel />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/connect" element={<ConnectPcDeals />} />
        <Route path="/:slug" element={<DynamicPages />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/create-new-password" element={<NewPassword />} />
        {/* web routes end*/}
        <Route path="/admin-login" element={<LoginPage />} />
        {/* <Route path="/social-media-setting" element={<SocialMediaSetting />} /> */}
        <Route path="/tax-classes" element={<TaxClasses />} />
        <Route path="/shipping-charges" element={<ShippingChargesList />} />
        <Route path="/offers" element={<OffersList />} />
        <Route path="/trackers" element={<TrackersList />} />
        <Route path="/reward-slab" element={<RewardSlabList />} />
        <Route path="/attributes" element={<Attribute />} />
        <Route path="/roles" element={<Roles />} />
        <Route
          path="/users"
          element={
            localStorage.getItem("username") === "subadmin@gmail.com" ? (
              <NotFoundPage />
            ) : (
              <Users />
            )
          }
        />
        <Route path="/user-cart" element={<UsersCartList />} />
        <Route path="/orders" element={<OrdersList />} />
        <Route path="/order" element={<UserOrderReper />} />
        <Route path="/orders/:userId" element={<OrdersList />} />
        <Route path="/categories" element={<Categories />} />
        {/* <Route path="/banners" element={<Banners />} /> */}
        <Route path="/brands" element={<Brands />} />
        <Route path="/coupons" element={<Coupons />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/permissions" element={<Permissions />} />
        <Route path="/warranty" element={<Warrantys />} />
        <Route path="/service-center" element={<ServiceCenters />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/product-list" element={<ProductsList />} />
        <Route path="/min-stock-list" element={<MinStockQty />} />
        <Route path="/sub-products" element={<SubPorducts />} />
        <Route path="/product-edit/:slug" element={<UpdateProduct />} />
        <Route path="/pages" element={<Pages />} />
        {/* <Route path="/email-templates" element={<EmailTemplates />} /> */}
        {/* <Route path="/projectlist" element={<ProjectList/>} /> */}

        {/* <Route path={`/updateestimation`} element={<Updateestimation/>} /> */}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        newestOnTop={false}
        closeOnClick
        theme="colored"
      />
      <GoToTop />
    </>
  );
}
export default App;
