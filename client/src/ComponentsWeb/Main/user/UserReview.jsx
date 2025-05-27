// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import moment from "moment";
// import { Link } from "react-router-dom";
// import NoRecordFound from "../../Sub/NoRecordFound";

// const UserReview = () => {
//   const dispatch = useDispatch();
//   useEffect(() => {
//     // dispatch(userReviews());
//   }, []);
//   const productRating = (star, times) => {
//     var repeatedString = "";
//     while (times > 0) {
//       repeatedString += star;
//       times--;
//     }
//     return repeatedString;
//   };
//   return (
//     <>
//       {/* {userReviewsList.length > 0 ? (
//         userReviewsList.map((data, index) => { */}
//           return (
//             <div className="row" key={index}>
//               <div className="mt-2 col-md-12">
//                 <div className="border-y mb-1">
//                   <h5 className="mb-0">{data?.name}</h5>
//                   <strong>
//                     {moment(data?.createdAt).format("DD/MM/YYYY")}
//                   </strong>
//                   <br />
//                   {<strong>{productRating(data?.rating)}</strong>}
//                 </div>
//                 <strong>{data?.title}</strong>
//                 <p>{data?.description}</p>
//                 <p>
//                   <span className="review-status">
//                     <Link to={`/product/${data?.product?.slug}`}>
//                       View Product
//                     </Link>
//                   </span>{" "}
//                   <span className="review-status">{data?.status}</span>
//                 </p>
//               </div>
//             </div>
//           );
//         })
//       ) : (
//         <NoRecordFound />
//       )}
//     </>
//   );
// };

// export default UserReview;
