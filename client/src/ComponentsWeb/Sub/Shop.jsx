// import React, { useEffect, useState } from "react";
// import Footer from "./Footer";
// import Form from "react-bootstrap/Form";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import Accordion from "react-bootstrap/Accordion";
// import CommonHeader from "./CommonHeader";
// import {
//   getProducts,
//   getProductRating,
// } from "../../reducers/commonReducer";

// import { Col, Row } from "react-bootstrap";

// import dummy from "../../images/dummy.jpeg";
// import commingsoon from '../../images/commingson.jpg'

// import { dynamicPriceRange, productRating, shop } from "../../const";
// import darkheart from "../../images/darkheart.png";
// import lightheart from "../../images/lightheart.png";

// const Shop = () => { 
//   const timeoutIdRef = React.useRef();
//   const navigate = useNavigate();
//   const queryParameters = new URLSearchParams(window.location.search);
//   const productId = queryParameters.get("ref_");
//   const brandId = queryParameters.get("brdanRef_");
//   const dispatch = useDispatch();
//   const [subcategories, setSubcategories] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(100000);
//   // const [processerPrice, setProcesserPrice] = useState();
//   let width = window.innerWidth;
//   useEffect(() => {
//     dispatch(getCategoriesFrontEnd());
//     dispatch(getProductRating());
//     dispatch(getBrandsFrontend());
//     localStorage.getItem("x-auth-token") && dispatch(userProductLikedList());
//     dispatch(
//       getProducts({
//         categories: productId ? [productId] : "",
//         brand: brandId ? brandId : "",
//       })
//     );
//   }, []);

//   const { productRatingData, getProductsData } = useSelector(
//     (state) => state.commonReducer
//   );
//   const { userProductLikedData } = useSelector(
//     (state) => state.orderDetailReducer
//   );
//   const {
//     getCatsFrontEndData,
//     childCategoriesFrontEndData,
//     getBrandsFrontendData,
//   } = useSelector((state) => state.frontEndReducer);
//   const handleCheckboxChange = (subCat, event) => {
//     let selectCat =
//       subCat === false ? [...categories, event.target.id] : [...categories];
//     let selectSubCat =
//       subCat === true
//         ? [...subcategories, event.target.id]
//         : [...subcategories];
//     if (categories.includes(event.target.id)) {
//       selectCat = selectCat.filter((cat) => cat !== event.target.id);
//     }
//     if (subcategories.includes(event.target.id)) {
//       selectSubCat = selectSubCat.filter((cat) => cat !== event.target.id);
//     }
//     dispatch(
//       getProducts({
//         categories: selectCat,
//         subcategories: selectSubCat,
//         brands,
//         minprice: +minPrice,
//         maxprice: +maxPrice,
//       })
//     );
//     subCat === false &&
//       dispatch(
//         getChildCategoriesFrontEnd({
//           parent: selectCat,
//         })
//       );
//     setCategories(selectCat);
//     setSubcategories(selectSubCat);
//   };
//   const handleCheckboxChangeBrands = (event) => {
//     let selectBrand = [...brands, event.target.value];
//     if (brands.includes(event.target.value)) {
//       selectBrand = selectBrand.filter((brand) => brand !== event.target.value);
//     }
//     dispatch(
//       getProducts({
//         categories,
//         subcategories,
//         brands: selectBrand,
//         minprice: +minPrice,
//         maxprice: +maxPrice,
//       })
//     );
//     setBrands(selectBrand);
//   };
//   let processerPrice;
//   let storagePrice;
//   let ramPrice
//   return (
//     <>
//       <CommonHeader />
//       <div className="container-fluid mt-3 mb-3">
//         <div className="row">
//           <div className="col-md-12">
//             <div className="row">
//               {!!getProductsData?.list && getProductsData?.list.length <= 0 ? (
//                 <div className={width > 468 ? "" : "notfountmbl"}>
//                   <img src={commingsoon} />
//                 </div>
//               ) : (
//                 !!getProductsData?.list &&
//                 getProductsData.list.map((data, index) => {
//                   const processer = data?.productOptions?.processer?.find(option => option.stock === true);
//                   const ram = data?.productOptions?.ram?.find(option => option.stock === true);
//                   const storage = data?.productOptions?.storage?.find(option => option.stock === true);
              
//                   if (processer) processerPrice = processer.price;
//                   if (ram) ramPrice = ram.price;
//                   if (storage) storagePrice = storage.price;
                
//                   return (
//                     <div className="col-md-3 col-sm-6 col-6" key={index}>
//                       <div className="product-grid mx-0 card">
//                         <div className="product-image">
//                           <Link to={`/product/${data?.slug}`}>
//                             <div className="card-img-actions ">
//                               <img
//                                 src={
//                                   data?.images
//                                     ? `/${data?.images[data?.defaultImage]}`
//                                     : dummy
//                                 }
//                                 className="custom-card-img img-fluid mbl-img-size"
//                                 alt=""
//                               />
//                             </div>
//                           </Link>
//                           {!!data?.sale && (
//                             <span className="product-discount-label">
//                               -
//                               {(
//                                 (100 * (data?.mrp - data?.sale)) /
//                                 data?.mrp
//                               ).toFixed(2)}
//                               %
//                             </span>
//                           )}
//                           <ul className="product-links">
//                             <li>
//                               <NavLink to={`/product/${data?.slug}`}>
//                                 <i className="bi bi-search"></i>
//                               </NavLink>
//                             </li>
//                             <li
//                               onClick={async () => {
//                                 localStorage.getItem("x-auth-token") &&
//                                   (await dispatch(
//                                     userProductLikedData[data?.id]
//                                       ? userAddWishList({
//                                           productId: data?.id,
//                                           status: false,
//                                         })
//                                       : userAddWishList({
//                                           productId: data?.id,
//                                           status: true,
//                                         })
//                                   ));
//                                 localStorage.getItem("x-auth-token") &&
//                                   (await dispatch(
//                                     getProducts({
//                                       categories: productId ? [productId] : "",
//                                       brand: brandId ? brandId : "",
//                                     })
//                                   ));
//                                 localStorage.getItem("x-auth-token") &&
//                                   (await dispatch(userProductLikedList()));
//                               }}
//                             >
//                               {!!userProductLikedData && (
//                                 <NavLink to="" className={"heartImg"}>
//                                   {userProductLikedData[data?.id] === true ? (
//                                     <img src={darkheart} />
//                                   ) : (
//                                     <img src={lightheart} />
//                                   )}
//                                 </NavLink>
//                               )}
//                             </li>
//                           </ul>
//                         </div>
//                         <div className="product-content position-relative">
//                           <button
//                             onClick={() => navigate(`/product/${data?.slug}`)}
//                             className="add-to-cart"
//                           >
//                             Add to Cart
//                           </button>

//                           <Link to={`/product/${data?.slug}`}>
//                             <div className="card-body text-center">
//                               <div className="product-name-box">
//                                 <p
//                                   className="product-fullname mb-0"
//                                   dangerouslySetInnerHTML={{
//                                     __html: data?.name.substring(0, 45) + "...",
//                                   }}
//                                 ></p>
//                               </div>
//                               <h3 className="mb-0 font-weight-semibold product__price">
//                               {!!data?.price && Object.keys(data?.price)?.length > 0 && `Rs. ${dynamicPriceRange(data?.price)} -`}{data?.productType === "customize"
//                                     ? `Rs. ${
//                                         data?.sale +
//                                         processerPrice +
//                                         ramPrice +
//                                         storagePrice
//                                       }`
//                                   : `Rs. ${data?.sale}`}
//                               </h3>
//                               <div className="rating">
//                                 {!!productRatingData &&
//                                   productRatingData[data.id] &&
//                                   productRating(productRatingData[data.id])}
//                               </div>
//                             </div>
//                           </Link>
//                           <p className="reward-offer mb-2 w-100">
//                           {data?.rewardStatus && <>  <b><span>
//                             <i className="bi bi-gift-fill"></i> Earn {data?.reward} Reward Points </span></b></>
//                           }
//                         </p>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default Shop;
