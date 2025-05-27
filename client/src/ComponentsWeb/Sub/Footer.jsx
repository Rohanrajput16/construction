// import React, { useEffect, useRef } from "react";
// import { Link, NavLink } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { about, home, contact, shop, servicecareCenter } from "../../const";
// import moment from "moment";
// import logo from "../../images/logo.png";

// const Footer = () => {
//   const dispatch = useDispatch();
//   const width = useRef(window.innerWidth);
//   useEffect(() => {
//     // dispatch(getPages());
//   }, []);
//   const { getSocialMediaSettingsData } = useSelector(
//     (state) => state.commonReducer
//   );
//   return (
//     <>
//       <footer>
//         {/* fixed nav start */}
//         <nav className="mobile-bottom-nav hide-lg-window">
//           <div className="mobile-bottom-nav__item">
//             <div className="mobile-bottom-nav__item-content">
//               <Link to={home}>
//                 <i className="bi bi-house-add-fill"></i>
//               </Link>
//             </div>
//           </div>
//           <div className="mobile-bottom-nav__item">
//             <div className="mobile-bottom-nav__item-content">
//               <Link to={shop}>
//                 <i className="bi bi-shop"></i>
//               </Link>
//             </div>
//           </div>
//           <div className="mobile-bottom-nav__item">
//             <div className="mobile-bottom-nav__item-content">
//               <a href={`tel:+91${getSocialMediaSettingsData?.phone}`}>
//                 <i className="bi bi-telephone-fill"></i>
//               </a>
//             </div>
//           </div>

//           <div className="mobile-bottom-nav__item">
//             <div className="mobile-bottom-nav__item-content">
//               <a
//                 href={`https://api.whatsapp.com/send?phone=+91${getSocialMediaSettingsData?.whatsapp}&text=Hi. I am intrested in Your Services..&source=&data=&app_absent=`}
//               >
//                 <i className="bi bi-whatsapp"></i>
//               </a>
//             </div>
//           </div>
//         </nav>
//         {/* fixed nav end */}
//         <div className="footer__area">
//           <div className="footer__top black-bg pt-80 pb-40">
//             <div className="container">
//               <div className="row">
//                 <div className="col-xl-12 col-lg-12 col-md-12">
//                   <div className="row">
//                   <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
//                       <div className="footer__widget">
//                         <div className="footer__widget-title footer__widget-title-2">
//                           <img className="logo mb-3" src={logo}/>
//                         </div>
//                         <div className="footer__widget-content">
//                           <div className="footer__link footer__link-2">
//                             <ul>
//                               <li className="text-white f-14">
//                               At <b>Arinandana Trading</b>, we redefine style just for you. Shop the latest trends and elevate your wardrobe with our exclusive collections. Discover fashion that fits your life and wear confidence every day.
//                               </li>
                             
//                             </ul>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4 text-center">
//                       <div className="footer__widget">
//                         <div className="footer__widget-title footer__widget-title-2">
//                           <h4>Company Info</h4>
//                         </div>
//                         <div className="footer__widget-content">
//                           <div className="footer__link footer__link-2">
//                             <ul>
//                               <li>
//                                 <NavLink to={home}>Home</NavLink>
//                               </li>
//                               <li>
//                                 <NavLink to={shop}>Shop</NavLink>
//                               </li>
//                               <li>
//                                 <NavLink to={about}>About us</NavLink>
//                               </li>
//                               <li>
//                                 <NavLink to={contact}>Contact us</NavLink>
//                               </li>
//                             </ul>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4 text-center">
//                       <div className="footer__widget">
//                         <div className="footer__widget-title footer__widget-title-2">
//                           <h4>INFORMATION</h4>
//                         </div>
//                         <div className="footer__widget-content">
//                           <div className="footer__link footer__link-2">
//                             <ul>
//                               {/* {!!getPagesList &&
//                                 getPagesList.map((data, index) => { */}
//                                   return (
//                                     <li key={index}>
//                                       <Link
//                                         onClick={() => {
//                                           dispatch(
//                                             getSinglePage({ slug: data?.slug })
//                                           );
//                                         }}
//                                         to={`/${data?.slug}`}
//                                       >
//                                         {data?.name}
//                                       </Link>
//                                     </li>
//                                   );
//                                 })}
//                             </ul>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div>
//           </div>
//           <div className="footer__copyright black-bg ">
//             <div className="container">
//               <div className="footer__copyright-inner pt-2 pb-2">
//                 <div className="row align-items-center">
//                   <div className="col-xl-12 col-lg-12">
//                     <div className="footer__copyright-text">
//                       <p className="text-center text-white">
//                       © {moment().year()} Arinandana Trading. All Rights Reserved.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>
//       {/* <!-- footer area end --> */}
//     </>
//   );
// };

// export default Footer;
