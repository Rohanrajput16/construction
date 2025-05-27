import React from "react";
import Categories from "./Categories";
import Header from "./Header";
import { useSelector } from "react-redux";

const CommonHeader = () => {
  const { getHomePageSettingList } = useSelector(
    (state) => state.commonReducer
  );
  return (
    <>
       <Header/>
       {/* {
        !!getHomePageSettingList?.home?.showcategoriesmenu && <Categories/>
       } */}
       {/* <Categories/> */}
    </>
  );
};

export default CommonHeader;
