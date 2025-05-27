import React, { useEffect } from "react";
import Features from "../Sub/Features";
import Footer from "../Sub/Footer";
import OnSaleProducts from "../Sub/OnSaleProducts";
import WebSlider from "../Sub/WebSlider";
import { useDispatch, useSelector } from "react-redux";
import {
  getHomePageSetting,
  getProductRating,
} from "../../reducers/commonReducer";
import Header from "../Sub/Header";
import Categories from "../Sub/Categories";
import { userProductLikedList } from "../../reducers/orderDetailsReducer";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHomePageSetting());
    dispatch(getProductRating());
    localStorage.getItem("x-auth-token") && dispatch(userProductLikedList());
  }, []);
  const { getHomePageSettingList } = useSelector(
    (state) => state.commonReducer
  );
  const { getCountProductData } = useSelector((state) => state.frontEndReducer);
  return (
    <>
      <Header />
      {!!getHomePageSettingList?.home?.show_main_slider && (
        <div className="container-fluid mt-3 mbl-margin-0">
          <WebSlider />
        </div>
      )}
      {!!getHomePageSettingList?.home?.showwebfeatures && (
        <Features mobileHide={"mbl-hide"} />
      )}
      {!!getHomePageSettingList?.home?.showlatestproduct && (
        <div className="container">
          <OnSaleProducts
            productsDetails={getCountProductData}
            title={"Products"}
          />
        </div>
      )}
      <Footer />
    </>
  );
};

export default Home;
