// import React, { useEffect, useState } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addCart, getCartlist } from "../../reducers/commonReducer";

// import { dynamicPriceRange, login } from "../../const";
// import { Col } from "react-bootstrap";
// import dummy from "../../images/dummy.jpeg";
// import { productRating } from "../../const";
// import darkheart from "../../images/darkheart.png";
// import lightheart from "../../images/lightheart.png";

// const OnSaleProducts = ({ productsDetails, title }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   useEffect(() => {
//     dispatch(
//       getCountProduct({
//         counter: 8,
//       })
//     );
//   }, []);

//   const { productRatingData } = useSelector((state) => state.commonReducer);
//   let processerPrice;
//   let ramPrice;
//   let storagePrice;
//   return (
//     <>
//       {!!productsDetails?.list && productsDetails?.list?.length > 0 && (
//         <section className="onsell__area pt-15 pb-40">
//           <div className="row">
//             <div className="col-xl-12">
//               <div className="section__head d-flex justify-content-between">
//                 <div className="section__title">
//                   <h3>
//                     <span>{title}</span>
//                   </h3>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="row">
//             {productsDetails?.list.map((data, index) => {
//                 const processer = data?.productOptions?.processer?.find(option => option.stock === true);
//                 const ram = data?.productOptions?.ram?.find(option => option.stock === true);
//                 const storage = data?.productOptions?.storage?.find(option => option.stock === true);
            
//                 if (processer) processerPrice = processer.price;
//                 if (ram) ramPrice = ram.price;
//                 if (storage) storagePrice = storage.price;
//               return (
//                 <Col md={3} sm={6} xs={6} className="p-0" key={index}>
//                   <div className="product-grid card">
//                     <div className="product-image">
//                       <div className="card-img-actions ">
//                         <Link
//                           to={`/product/${data?.slug}`}
//                           className="text-default mb-2"
//                           data-abc="true"
//                           title={data?.name}
//                         >
//                           <img
//                             src={
//                               data?.images
//                                 ? `/${data?.images[data?.defaultImage]}`
//                                 : dummy
//                             }
//                             className="mbl-img-size custom-card-img img-fluid product-small-img"
//                             alt={data?.name}
//                           />
//                         </Link>
//                       </div>
//                       {!!data?.sale && (
//                         <span className="product-discount-label">
//                           -
//                           {(
//                             (100 * (data?.mrp - data?.sale)) /
//                             data?.mrp
//                           ).toFixed(2)}
//                           %
//                         </span>
//                       )}
//                       <ul className="product-links">
//                         <li>
//                           <NavLink to={`/product/${data?.slug}`}>
//                             <i className="bi bi-search"></i>
//                           </NavLink>
//                         </li>
//                         <li
//                           onClick={async () => {
//                             localStorage.getItem("x-auth-token") &&
//                               (await dispatch(
//                                 userProductLikedData[data?.id]
//                                   ? userAddWishList({
//                                       productId: data?.id,
//                                       status: false,
//                                     })
//                                   : userAddWishList({
//                                       productId: data?.id,
//                                       status: true,
//                                     })
//                               ));
//                             localStorage.getItem("x-auth-token") &&
//                               (await dispatch(userProductLikedList()));
//                           }}
//                         >
//                           {!!userProductLikedData && (
//                             <NavLink to="" className={"heartImg"}>
//                               {userProductLikedData[data?.id] === true ? (
//                                 <img src={darkheart} />
//                               ) : (
//                                 <img src={lightheart} />
//                               )}
//                             </NavLink>
//                           )}
//                         </li>
//                       </ul>
//                     </div>
//                     <div className="product-content">
//                       {/* <button
//                         className="add-to-cart"
//                         onClick={() => navigate(`/product/${data?.slug}`)}
//                       >
//                         Add to Cart
//                       </button> */}
//                       <Link
//                         to={`/product/${data?.slug}`}
//                         className="text-default mb-2"
//                         data-abc="true"
//                         title={data?.name}
//                       >
//                         <div className="card-body text-center">
//                           <div className="mb-mbl-0 product-name-box">
//                             <b className="product-name">
//                               {data?.name.substring(0, 45) + ".."}
//                             </b>
//                           </div>
//                           <p className="mb-0">
//                             <span className="fw-bold">
//                               Price Inclusive of GST
//                             </span>
//                           </p>
//                           <hr />
//                           <h3 className="mb-0 font-weight-semibold product__price">
//                           {!!data?.price && Object.keys(data?.price)?.length > 0 && `Rs. ${dynamicPriceRange(data?.price)} - `}{data?.productType === "customize"
//                                     ? `Rs. ${
//                                         data?.sale +
//                                         processerPrice +
//                                         ramPrice +
//                                         storagePrice
//                                       }`
//                                   : `Rs. ${data?.sale}`}
//                           </h3>
//                           <div className="rating">
//                             {!!productRatingData &&
//                               productRatingData[data.id] &&
//                               productRating(productRatingData[data.id])}
//                           </div>
//                         </div>
//                       </Link>
//                       <p className="reward-offer mb-2 w-100">
//                           {data?.rewardStatus && <>  <b><span>
//                             <i className="bi bi-gift-fill"></i> Earn {data?.reward} Reward Points </span></b></>
//                           }
//                         </p>
//                     </div>
//                   </div>
//                 </Col>
//               );
//             })}
//           </div>
//         </section>
//       )}
//     </>
//   );
// };

// export default OnSaleProducts;
