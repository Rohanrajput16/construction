// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useParams } from "react-router-dom";

// import SideMenu from "../../Components/SideMenu";
// import moment from "moment";
// import OrderUpdate from "./OrderUpdate";
// import OrderDetails from "./OrderDetails";
// import { Button, Row, Form, InputGroup, Col } from "react-bootstrap";
// import { getTrackers } from "../../reducers/commonReducer";
// import ExportData from "../../helpers/ExportData";
// import ShippingDetails from "./ShippingDetails";

// const OrdersList = () => {
//   const [isHovered, setIsHovered] = useState(false);
//   const [search, setSearch] = useState();
//   const dispatch = useDispatch();
//   const [page, setPage] = useState(1);
//   const [orderStatus, setOrderStatus] = useState(null);
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const queryParameters = new URLSearchParams(window.location.search);
//   const orderId = queryParameters.get("orderid");
//   const { userId } = useParams();

//   useEffect(() => {
//     dispatch(resetAdminOrderList());
//     let timeOut = setTimeout(() => {
//       dispatch(
//         adminOrders({
//           search: search,
//           userId
//         })
//       );
//       dispatch(adminOrdersExport())
//     }, 800);
//     return () => clearTimeout(timeOut);
//   }, [search]);
//   useEffect(() => {
//     dispatch(getTrackers())
//   },[])

//   const { adminOrdersData, adminOrdersBlank, adminOrdersExportList } = useSelector(
//     (state) => state.orderDetailReducer
//   );
//   const header = [
//     "Sr",
//     "Date",
//     "CustomerName",
//     "Phone",
//     "CompanyName",
//     "OrderID",
//     "OrderValue",
//     "State",
//     "City",
//     "OrderStatus",
//     "ProductName",
//   ];
// const body = [];
// !!adminOrdersExportList && adminOrdersExportList?.forEach((data, index) => {
//     body.push({
//       Sr: index + 1,
//       Date: moment(data?.createdAt).format("DD/MM/YYYY"),
//       CustomerName: (data?.shippingAddress?.firstName ? data?.shippingAddress?.firstName : data?.user?.firstName) + " " + (data?.shippingAddress?.lastName ? data?.shippingAddress?.lastName : data?.user?.lastName),
//       Phone: (data?.shippingAddress?.phone ? data?.shippingAddress?.phone : data?.user?.phone),
//       CompanyName: (data?.shippingAddress?.companyName ? data?.shippingAddress?.companyName : data?.user?.companyName),
//       OrderID: data?.orderid,
//       OrderValue: data?.totalPaybleAmount,
//       State: (data?.shippingAddress?.state ? data?.shippingAddress?.state : data?.user?.state),
//       City: (data?.shippingAddress?.city ? data?.shippingAddress?.city : data?.user?.city),
//       OrderStatus: data?.status === 0 && "Pending" || 
//       data?.status === 1 && "Cancel" ||
//       data?.status === 2 && "Processing" ||
//       data?.status === 3 && "Shipping" ||
//       data?.status === 4 && "Completed" ||
//       data?.status === 5 && "Partially Delivered",
//       ProductName: data?.items?.map(item => `${item?.productId?.name} Qty:(${item?.quantity})`).join(', ')
//       }
//     )
// }
// )

//   return (
//     <>
//       <SideMenu />
//       {orderId ? (
//         <div className="mt-extra content container-fluid main-print-conatiner">
//           <OrderDetails />
//         </div>
//       ) : (
//         <div className="mt-extra content container-fluid">
//           <Row className="mb-1">
//             <Col md={4} className="mt-4">
//               <InputGroup>
//                 <InputGroup.Text id="inputGroup-sizing-default">
//                   <i className="bi bi-search"></i>
//                 </InputGroup.Text>
//                 <Form.Control
//                   placeholder="Search anything..."
//                   aria-label="Default"
//                   aria-describedby="inputGroup-sizing-default"
//                   onChange={(e) => setSearch(e.target.value)}
//                 />
//               </InputGroup>
//             </Col>
//             <Col md={2}>
//             <Form.Group>
//               <Form.Label>Start Date</Form.Label>
//                 <Form.Control
//                   type="date"
//                   placeholder="Start Date"
//                   name="startDate"
//                   onChange={(e) => {
//                     dispatch(resetAdminOrderList());
//                     dispatch(adminOrders({
//                       userId,
//                       endDate,
//                       startDate:e.target.value,
//                       search,page
//                     }))
//                     dispatch(adminOrdersExport({
//                       userId,
//                       endDate,
//                       startDate:e.target.value,
//                     }))
//                     setStartDate(e.target.value)
//                   }}
//                   />
//                 </Form.Group>
//           </Col>
//           <Col md={2}>
//             <Form.Group>
//               <Form.Label>End Date</Form.Label>
//                 <Form.Control
//                   type="date"
//                   placeholder="End Date"
//                   name="endtDate"
//                   onChange={(e) => {
//                     dispatch(resetAdminOrderList());
//                     dispatch(adminOrders({
//                       search: search,
//                       userId,
//                       endDate : e.target.value,
//                       startDate,search,page
//                     }))
//                     dispatch(adminOrdersExport({
//                       userId,
//                       endDate:e.target.value,
//                       startDate,
//                     }))
//                     setEndDate(e.target.value)
//                   }}
//                   />
//                 </Form.Group>
//           </Col>
//             <Col md={2} className="mt-4">
//               <Form.Select
//                 onChange={(e) => {
//                   dispatch(resetAdminOrderList());
//                   setOrderStatus(+e.target.value);
//                   dispatch(
//                     adminOrders({
//                       status:
//                         e.target.value === "all" ? "all" : +e.target.value,
//                       page,
//                       startDate,
//                       endDate
//                     })
//                   );
//                   dispatch(adminOrdersExport({
//                     status:
//                         e.target.value === "all" ? "all" : +e.target.value,
//                     endDate,
//                     startDate,
//                   }))
//                 }}
//                 aria-label="Default select example"
//               >
//                 <option value={"all"}>Select Status</option>
//                 <option value={"all"} className="text-dark">
//                   <b>All</b>
//                 </option>
//                 <option value={0} className="text-primary">
//                   <b>Pending</b>
//                 </option>
//                 <option value={2} className="text-warning">
//                   <b>Processing</b>
//                 </option>
//                 <option value={3} className="text-info">
//                   <b>Shipping</b>
//                 </option>
//                 <option value={4} className="text-success">
//                   <b>Completed</b>
//                 </option>
//                 <option value={1} className="text-danger">
//                   <b>Cancel</b>
//                 </option>
//                 <option value={5} className="text-success">
//                   <b>Partially Delivered</b>
//                 </option>
//               </Form.Select>
//             </Col>
//             <Col md={1} className="mt-4">
//             <Button variant="danger" onClick={() => window.location.reload()}>Clear</Button>
//             </Col>
//             <Col md={1} className="mt-4">
//               <ExportData title="Export" tableName={"Pcdeals Hardware Orders"} header={header} body={body} />
//             </Col>
//           </Row>
//           <table className="table w-100">
//             <thead>
//               <tr>
//                 <th>OrderId</th>
//                 <th>Name</th>
//                 <th>Address</th>
//                 <th>OrderTotal</th>
//                 <th>OrderMode</th>
//                 <th>Date</th>
//                 <th>Status</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {!!adminOrdersData &&
//                 adminOrdersData.map((orders, index) => {
//                   return (
//                     <tr key={index}>
//                       <td>{orders?.orderid}</td>
//                       <td>{orders?.user?.companyName}<br/>
//                       <i className="bi bi-telephone-fill"></i> {orders?.user?.phone}<br/>
//                       <p className="mb-0"><b>Customer Id:</b> {orders?.user?.customerId}</p>
//                       <p className="mb-0"><b>PC Deals Id:</b> {orders?.user?.pcdealUserId}</p>
//                       </td>
//                       <td>{`${orders?.user?.address?.city}-${orders?.user?.address?.zipcode}, ${orders?.user?.address?.state}`}</td>
//                       <td><b>{
//                         orders?.codCharges ? <><span className="text-info">Total:{orders?.totalPaybleAmount}/-</span><br/><span className="text-success">Advance:{orders?.payment}/-</span><br/>
//                         <span className="text-danger">Pending:{orders?.totalPaybleAmount - orders?.payment}/-</span></> : <><span className="text-success">{orders?.totalPaybleAmount}/-</span></>
//                         }</b>
//                         </td>
//                       <td>{(orders?.codCharges && <span className="text-warning"><b>COD</b></span>) || 
//                           ((!orders?.codCharges && !orders?.userBalanceCharges) && <span className="text-success"><b>Prepaid</b></span>) ||
//                           orders?.userBalanceCharges && <span className="text-primary"><b>Buy Now pay later</b></span>}</td>
//                       <td>{moment(orders?.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
//                       <td
//                         className={
//                           (orders?.status === 0 && "text-primary") ||
//                           (orders?.status === 1 && "text-danger") ||
//                           (orders?.status === 2 && "text-warning") ||
//                           (orders?.status === 3 && "text-info") ||
//                           (orders?.status === 4 && "text-success")
//                         }
//                       >
//                         {orders?.status === 3 ? <ShippingDetails orderid={orders?.orderid} trackingNumber = {orders?.trackingNumber} trackingid={orders?.trackingid}/> : <b>
//                           {(orders?.status === 0 && "Pending") ||
//                             (orders?.status === 1 && "Cancel") ||
//                             (orders?.status === 2 && "Processing") ||
//                             (orders?.status === 3 && "Shipping") ||
//                             (orders?.status === 4 && "Completed") ||
//                             (orders?.status === 5 && "Partially Delivered")}
//                         </b>}
//                       </td>
//                       <td>
//                         <Link
//                           // target="_blank"
//                           to={`/orders?orderid=${orders?.id}`}
//                         >
//                           <Button className="m-1 bg-thememain btn-mbl-text">
//                             <i className="bi bi-eye-fill"></i>
//                           </Button>
//                         </Link>
//                        {/* {orders?.status !== 1 &&  */}
//                        <OrderUpdate
//                         title={"Update Order Status"}
//                         orderStatus={orders?.status}
//                         orderId={orders?.id}
//                       />
//                       {/* }  */}
//                       </td>
//                     </tr>
//                   );
//                 })}
//             </tbody>
//           </table>
//           {!!adminOrdersBlank && adminOrdersBlank.length > 0 ? (
//             <Row>
//               <Button
//                 onClick={() => {
//                   setPage(page + 1);
//                   dispatch(
//                     adminOrders({
//                       search: search,
//                       page: page + 1,
//                       status: orderStatus,
//                       startDate, endDate
//                     })
//                   );
//                 }}
//               >
//                 Load More
//               </Button>
//             </Row>
//           ) : (
//             <p className="text-center">
//               <b>No record found 😔.</b>
//             </p>
//           )}
//         </div>
//       )}
//     </>
//   );
// };

// export default OrdersList;

import React from 'react'

const OrdersList = () => {
  return (
    <div>
      gfjhjfklhjg
    </div>
  )
}

export default OrdersList

