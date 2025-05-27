// import React, { useEffect } from "react";
// import { Button, Col, Container, Row, Table } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";

// import CommonHeader from "../../Sub/CommonHeader";
// import NoRecordFound from "../../Sub/NoRecordFound";

// const UserWishList = () => {
//   const dispatch = useDispatch();
//   useEffect(() => {
//     // dispatch(userWishList());
//   }, []);
//   return (
//     <>
//       {/* {userWishListData.length > 0 ? ( */}
//         <div className="container-fluid">
//           <Row className="">
//             <Container>
//               <div className="section__head d-md-flex justify-content-between mb-40">
//                 <div className="section__title">
//                   <h2>
//                     <b>My WishList❤️❤️</b>
//                   </h2>
//                 </div>
//               </div>
//             </Container>
//             <Table striped bordered hover>
//               <thead>
//                 <tr>
//                   <th>Sr No.</th>
//                   <th>Product Image</th>
//                   <th>Product Name</th>
//                   <th>View Product</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {/* {!!userWishListData &&
//                   userWishListData.map((wishlist, index) => { */}
//                     return (
//                       <tr key={index}>
//                         <td>{index + 1}</td>
//                         <td>
//                           <img
//                             className="img-width-100"
//                             src={
//                               wishlist?.productId?.images &&
//                               wishlist?.productId?.images[
//                                 wishlist?.productId?.defaultImage
//                               ]
//                             }
//                           />
//                         </td>
//                         <td>
//                           <Link to={`/product/${wishlist?.productId?.slug}`}>
//                             {wishlist?.productId?.name}
//                           </Link>
//                         </td>
//                         <td>
//                           <Link to={`/product/${wishlist?.productId?.slug}`}>
//                             <Button variant="success">
//                               <i className="bi bi-eye-fill"></i>
//                             </Button>
//                           </Link>{" "}
//                           <Button
//                             variant="danger"
//                             onClick={async () => {
//                               await dispatch(
//                                 userWishListItemDelete({
//                                   id: wishlist?.id,
//                                 })
//                               );
//                               dispatch(userWishList());
//                             }}
//                           >
//                             <i className="bi bi-trash3-fill"></i>
//                           </Button>
//                         </td>
//                       </tr>
//                     );
//                   })}
//               </tbody>
//             </Table>
//           </Row>
//         </div>
//       ) : (
//         <NoRecordFound />
//       )}
//     </>
//   );
// };

// export default UserWishList;
