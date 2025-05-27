import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import AddUserReview from "./AddUserReview";
import NoRecordFound from "../../Sub/NoRecordFound";
import { Link, useNavigate } from "react-router-dom";
import { getCartlist } from "../../../reducers/commonReducer";
import { checkout } from "../../../const";

const UserOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  useEffect(() => {
    // dispatch(resetAdminOrderList());
    // dispatch(userOrders());
  }, []);


  const reorderApi = async (values) => {
    const apiResponse = await dispatch(({
          orderid:values
        }))
      await dispatch(getCartlist())
    if (apiResponse?.payload?.status) {
      setTimeout(() => {
      navigate(checkout) 
      },1000)
    }
  };
  return (
        <div className="container-fluid">
          <Row className="">
            <Container className="r-main-tbl">
              <div className="section__head d-md-flex justify-content-between mb-40">
                <div className="section__title">
                  <h2>
                    <b>My Orders😊😊</b>
                  </h2>
                </div>
              </div>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="ordersearch">
                    <Form.Control type="search" placeholder="Enter Serial Number..." 
                    onChange={(e) => {
                        // dispatch(resetAdminOrderList());
                        dispatch(({
                          search : e.target.value
                        }));
                    }}/>
                  </Form.Group>
                </Col>
              </Row>
              <div className="auto-scrolling-tbl">
                <table>
                  <thead className="visible@l">
                    <tr className="order-tbl">
                      <th>Sr No.</th>
                      <th>Date</th>
                      <th>Order ID</th>
                      <th>ORDER VALUE</th>
                      <th>Status</th>
                      <th>View Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {!!userOrdersList &&
                      userOrdersList.map((orders, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <strong className="hidden@l">Sr No.:</strong>{" "}
                              {index + 1}.
                            </td>
                            <td>
                              <strong className="hidden@l">Date:</strong>{" "}
                              {moment(orders?.createdAt).format("DD/MM/YYYY")}
                            </td>
                            <td>
                              <strong className="hidden@l">Order ID:</strong>{" "}
                              {orders?.orderid}
                            </td>
                            <td>
                              <strong className="hidden@l">ORDER VALUE:</strong>{" "}
                              {orders?.totalPaybleAmount}/-
                            </td>
                            <td
                              className={
                                (orders?.status === 0 && "text-secondary") ||
                                (orders?.status === 2 && "text-primary") ||
                                (orders?.status === 1 && "text-danger") ||
                                (orders?.status === 3 && "text-warning") ||
                                (orders?.status === 4 && "text-success")
                              }
                            >
                              <strong className="hidden@l">Status:</strong>{" "}
                              <b>
                                {(orders?.status === 0 && "Pending") ||
                                  (orders?.status === 2 && "Processing") ||
                                  (orders?.status === 1 && "Cancel") ||
                                  (orders?.status === 3 && "Shipping") ||
                                  (orders?.status === 4 && "Completed") ||
                                  (orders?.status === 5 && "Partially Delivered")}
                              </b>
                            </td>
                            <td>
                              <strong className="hidden@l">
                                View Details:
                              </strong>{" "}
                              <Link
                                target="_blank"
                                to={`/order?orderid=${orders?.id}`}
                              >
                                <Button className="m-1 bg-thememain btn-mbl-text">
                                  <i className="bi bi-eye-fill"></i>
                                </Button>
                              </Link>
                              {!!localStorage.getItem("x-auth-token") &&
                                orders?.status === 4 && (
                                  <AddUserReview items={orders?.items} />
                                )}<br/>
                                 <Button variant="success" className="px-1 py-1" onClick={() => reorderApi(orders?.id)}>Re-Order</Button>
                            </td>
                          </tr>
                        );
                      })} */}
                  </tbody>
                </table>
                {/* {!!userOrdersBlank && userOrdersBlank.length > 0 ? (
                  <Row>
                    <Button
                      onClick={() => {
                        setPage(page + 1);
                        dispatch(
                          userOrders({
                            page: page + 1,
                          })
                        );
                      }}
                    >
                      Load More
                    </Button>
                  </Row>
                ) : (
                  <p className="text-center">
                    <b>No record found 😔.</b>
                  </p>
                )} */}
              </div>
            </Container>
          </Row>
        </div>
  );
};

export default UserOrders;
