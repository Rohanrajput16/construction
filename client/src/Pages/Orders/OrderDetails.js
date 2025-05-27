// import React, { useEffect } from "react";
// import { Row, Col, Table, Container } from "react-bootstrap";
// import printer from "../../images/printer.png";
// import { useDispatch, useSelector } from "react-redux";

// import moment from "moment";
// import SerialNumberAction from "./SerialNumberAction";

// function OrderDetails(props) {
//   const dispatch = useDispatch();
//   const queryParameters = new URLSearchParams(window.location.search);
//   const orderId = queryParameters.get("orderid");
//   useEffect(() => {
//     orderId && dispatch(singleOrder({ id: orderId }));
//   }, []);
  
//   return (
//     <>
//       <Container>
//         <Row className="print-hide">
//           <Col>
//             <h2>Order Details</h2>
//           </Col>
//           <Col>
//             <img
//               className="w-auto f-right"
//               onClick={() => window.print()}
//               src={printer}
//             />
//           </Col>
//         </Row>
//         <hr className="print-hide" />
//         <Row>
//           {!!singleOrderData?.billingAddress && (
//             <>
//             <Col md={6}>
//               <label className="cursor-auto">
//                 <div className="userAddress">
//                   <h5>
//                     <strong>Billing/Shipping Address</strong>
//                   </h5>
//                   <div>
//                     <p className="mb-0">
//                     Company Name:{" "}
//                       <strong>
//                         {singleOrderData?.user?.companyName}
//                       </strong>
//                     </p>
//                     <p className="mb-0">
//                     Contact Person Name:{" "}
//                       <strong>
//                       {singleOrderData?.user?.firstName +
//                           " " +
//                           singleOrderData?.user?.lastName}
//                       </strong>
//                     </p>
//                     <p className="mb-0">
//                     Address:  <b>{singleOrderData?.user?.address?.addressline1 +
//                           ", " +
//                           singleOrderData?.user?.address?.addressline2 +
//                           ", " +
//                           singleOrderData?.user?.address?.city +
//                           "-" +
//                           singleOrderData?.user?.address?.zipcode +
//                           ", " +
//                           singleOrderData?.user?.address?.state}
//                       </b>
//                     </p>
//                     <p className="mb-0">
//                       <strong>Phone: </strong>
//                       {singleOrderData?.user?.phone}
//                     </p>
//                     <p className="mb-0">
//                       <strong>Alternate Phone no: </strong>
//                       {singleOrderData?.user?.secondPhone}
//                     </p>
//                     <div className="d-none print-enable">
//                       <h5 className="mt-3">
//                         <strong>From</strong>
//                       </h5>
//                       <h6 className="mb-0">
//                       <b>
//                       Shree Hira Computer & Communication<br/> Hisar - 125001<br/>
//                       9728622667,
//                       7056649000
//                       </b>
//                       </h6>
//                     </div>
//                   </div>
//                 </div>
//               </label>
//             </Col>
//             <Col md={6} className="mt-4">
//                 <div className="userAddress">
//                   <div className="float-end">
//                     <p className="mb-0 print-hide">
//                       <strong>Customer Id: </strong>
//                       <b> {singleOrderData?.user?.customerId}</b>
//                     </p>
//                     {
//                       singleOrderData?.user?.pcdealUserId && <p className="mb-0 print-hide">
//                       <strong>PcDeals ID: </strong>
//                       <b> {singleOrderData?.user?.pcdealUserId}</b>
//                     </p>
//                     }
//                     <p className="mb-0 print-hide">
//                       <strong>OrderID: </strong>
//                       <b> {singleOrderData?.orderid}</b>
//                     </p>
//                     <p className="mb-0 print-hide">
//                       <strong>Email: </strong>
//                       <b> {singleOrderData?.user?.email}</b>
//                     </p>
//                     <p className="mb-0 print-hide">
//                       <strong>GST No: </strong>
//                       {singleOrderData?.user?.address?.gst}
//                     </p>
//                     <p className="mb-0 print-hide">
//                       <strong>Payment Transfer ID: </strong>
//                       <b> {singleOrderData?.paymentId?.paymentTransaction}</b>
//                     </p>
//                     <p className="mb-0 print-hide">
//                       <strong>Tracking URL: </strong>
//                       <b> {singleOrderData?.trackingid?.url}</b> | <strong>Tracking ID: </strong>
//                       <b> {singleOrderData?.trackingNumber}</b> | <strong>Courier Company: </strong>
//                       <b> {singleOrderData?.trackingid?.name}</b>
//                     </p>
//                   </div>
//                 </div>
//             </Col>
//             </>
//           )}
//         </Row>
//           {!!singleOrderData?.items && (
//             <Row className="mt-4">
//               <Col>
//                 <Table striped bordered hover>
//                   <thead>
//                     <tr>
//                       <th>SrNo.</th>
//                       <th></th>
//                       <th>ProductName</th>
//                       <th>Quantity</th>
//                       <th>Price</th>
//                       <th>Total Price</th>
//                       <th>Serial Number</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {!!singleOrderData?.items &&
//                       singleOrderData?.items.map((orders, index) => {
//                         return (
//                           <tr key={index}>
//                             <td>{index + 1}</td>
//                             <td>
//                               <img
//                                 className="w-100px"
//                                 src={orders?.productId?.images[0]}
//                               />
//                             </td>
//                             <td>
//                               {
//                                 (localStorage.getItem("slug") === "customer") ?
//                                 <>
//                                 <b>{orders?.productId?.name}</b>
//                                 <ul className="list-style-dot px-4">
//                                   {orders?.customProductDetails?.length > 0 ? orders?.customProductDetails?.map((data , itemindex) => (
//                                     <li key={itemindex}>{data?.name}</li>
//                                   )) : orders?.customProduct?.map((data , itemindex) => (
//                                     <li key={itemindex}>{data?.name}</li>
//                                   ))}
//                                 </ul></> : <div>
//                                 {(orders?.customProductDetails?.length > 0 ? orders?.customProductDetails?.length : orders?.customProduct?.length) ? 
//                                 <>
//                                   <tr>
//                                     <th>Name</th>
//                                     <th>Price</th>
//                                   </tr>
//                                   <tr>
//                                     <th>{orders?.productId?.name} {orders?.productId?.alias && <>({orders?.productId?.alias})</>}</th>
//                                     <th>{orders?.sale}/-</th>
//                                   </tr>
//                                 </>
//                                 : <b>{orders?.productId?.name} {orders?.productId?.alias && <>({orders?.productId?.alias})</>}</b>}
                                
//                                 {orders?.customProductDetails?.length > 0 ? orders?.customProductDetails?.map((data , itemindex) => (
//                                     <tr key={itemindex}>
//                                       <td>{data?.name} {data?.id?.alias && <b>({data?.id?.alias})</b>}</td>
//                                       <td>{data?.price}/-</td>
//                                     </tr>
//                                 )) : orders?.customProduct?.map((data , itemindex) => (
//                                   <tr key={itemindex}>
//                                     <td>{data?.name} {data?.alias && <b>({data?.alias})</b>}</td>
//                                     <td>{data?.price}/-</td>
//                                   </tr>
//                               ))}
//                               </div>
//                               }
//                             </td>
//                             <td>{orders?.quantity}</td>
//                             <td>
//                               {orders?.priceOfCustomize > 0
//                                 ? orders?.priceOfCustomize
//                                 : orders?.sale
//                                 ? orders?.sale
//                                 : orders?.mrp}
//                             </td>
//                             <td>
//                               {orders?.quantity *
//                                 (orders?.priceOfCustomize > 0
//                                   ? orders?.priceOfCustomize
//                                   : orders?.sale
//                                   ? orders?.sale
//                                   : orders?.mrp)}
//                             </td>
//                             <td>
//                             {(localStorage.getItem("slug") === "admin" || localStorage.getItem("slug") === "superadmin") && <SerialNumberAction
//                                 orderId={orderId}
//                                 productId={orders?.productId?.id}
//                                 orderid={singleOrderData?.id}
//                                 serialNumbers={singleOrderData?.serialNumber?.filter(serialNo => serialNo?.productId === orders?.productId?.id)?.[0]?.number || []}
//                               />}
//                               <ul className="list-style-dot px-4">
//                                 {singleOrderData?.serialNumber?.map((serialNo, srIndex) => (
//                                   <div key={srIndex}>
//                                     {serialNo?.productId === orders?.productId?.id && (
//                                       <React.Fragment key={srIndex}>
//                                         {serialNo?.number?.map((numbers, noIndex) => (
//                                           <li key={noIndex}>{numbers}</li>
//                                         ))}
//                                       </React.Fragment>
//                                     )}
//                                   </div>
//                                 ))}
//                               </ul>
//                             </td>
//                           </tr>
//                         );
//                       })}
//                   </tbody>
//                   {/* <tfoot> */}
//                   <tr>
//                     <td colSpan="3">
//                       <b>Total Quantity</b>
//                     </td>
//                     <td>
//                       <b>{singleOrderData?.totalquantity}</b>
//                     </td>
//                   </tr>
//                   {!!singleOrderData?.codCharges && (
//                     <tr>
//                       <td colSpan="5">
//                         <b>COD Charges</b>
//                       </td>
//                       <td>
//                         <b>{singleOrderData?.codCharges.toFixed(0)}</b>
//                       </td>
//                     </tr>
//                   )}
//                   {!!singleOrderData?.shippingCost && (
//                     <tr>
//                       <td colSpan="5">
//                         <b>Shipping Charges</b>
//                       </td>
//                       <td>
//                         <b>{singleOrderData?.shippingCost}</b>
//                       </td>
//                     </tr>
//                   )}
//                   {!!singleOrderData?.coupon &&
//                     singleOrderData?.couponDiscountAmount && (
//                       <tr>
//                         <td colSpan="5">
//                           <b>{singleOrderData?.coupon}Coupon</b>
//                         </td>
//                         <td>
//                           <b>{singleOrderData?.couponDiscountAmount}</b>
//                         </td>
//                       </tr>
//                     )}
//                   {!!singleOrderData?.userBalanceCharges > 0 && (
//                     <tr>
//                       <td colSpan="5">
//                         <b>Buy Now Pay Later Charges</b>
//                       </td>
//                       <td>
//                         <b>
//                           {(+singleOrderData?.userBalanceCharges).toFixed(0)}
//                         </b>
//                       </td>
//                     </tr>
//                   )}
//                   {!!singleOrderData?.userBalanceCharges > 0 && (
//                     <tr>
//                       <td colSpan="5">
//                         <b>Buy Now Pay Later</b>
//                       </td>
//                       <td>
//                         <b>{singleOrderData?.payment.toFixed(0)}</b>
//                       </td>
//                     </tr>
//                   )}
//                    {!!singleOrderData?.totalPaybleAmount && (
//                     <tr>
//                       <td colSpan="5">
//                         <b>Order Total</b>
//                       </td>
//                       <td>
//                         <b>
//                           {singleOrderData?.userBalanceCharges > 0
//                             ? singleOrderData?.payment.toFixed(0)
//                             : singleOrderData?.totalPaybleAmount.toFixed(0)}
//                         </b>
//                       </td>
//                     </tr>
//                   )}
//                   {!!singleOrderData?.codCharges > 0 && (
//                     <tr>
//                       <td colSpan="5">
//                         <b>Advance Paid</b>
//                       </td>
//                       <td>
//                         <b>{singleOrderData?.payment.toFixed(0)}</b>
//                       </td>
//                     </tr>
//                   )}
//                   {!!singleOrderData?.codCharges > 0 && (
//                     <tr>
//                       <td colSpan="5">
//                         <b>Amount Payable at Delivery</b>
//                       </td>
//                       <td>
//                         <b>
//                           {(
//                             singleOrderData?.totalPaybleAmount -
//                             singleOrderData?.payment
//                           ).toFixed(0)}
//                         </b>
//                       </td>
//                     </tr>
//                   )}
//                   {/* </tfoot> */}
//                 </Table>
//               </Col>
//             </Row>
//           )}
//           {
//             (localStorage.getItem("slug") == "admin" || localStorage.getItem("slug") == "superadmin") &&   <Row className="mt-5 print-hide">
//             <Table bordered hover>
//                 <thead>
//                   <tr>
//                     <th>Status</th>
//                     <th>Date</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {
//                     !!singleOrderData?.statusTime && singleOrderData?.statusTime?.map((data, index) => {
//                       return(
//                         <tr key={index}>
//                           <td>{data?.status === 0 && <span className="text-primary"><b>Pending</b></span> || data?.status === 1 && <span className="text-danger"><b>Cancel</b></span> || data?.status === 2 && <span className="text-info"><b>Processing</b></span> ||
//                           data?.status === 3 && <span className="text-warning"><b>Shipping</b></span> || data?.status === 4 && <span className="text-success"><b>Completed</b></span> || data?.status === 5 && <span className="text-dark"><b>Partially Delivered</b></span>}</td>
//                           <td>{!!data?.time && moment(data?.time).format('MMMM Do YYYY, h:mm:ss a')}</td>
//                         </tr>
//                       )
//                     })
//                   }
//                 </tbody>
//             </Table>
//             </Row>
//           }
      
//       </Container>
//     </>
//   );
// }

// export default OrderDetails;

import React from 'react'

const OrderDetails = () => {
  return (
    <div>
      bghgjhj
    </div>
  )
}

export default OrderDetails

