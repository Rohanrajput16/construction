import React, { useState } from "react";
import { Row, Col, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import printer from "../../../images/printer.png";

function UserOrderDetail(props) {
  const {
    title,
    btnTxt,
    items,
    billingAddress,
    totalquantity,
    totalsaleprice,
  } = props;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button className="m-1 bg-thememain btn-mbl-text" onClick={handleShow}>
        {btnTxt ? btnTxt : "View Details"}
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        size={"lg"}
        // fullscreen={true}
        className="w-100"
      >
        <div className="container-fluid orders-details-printing">
          <Modal.Header closeButton className="print-hide">
            <Modal.Title>
              {title}{" "}
              {/* <img
                className="w-auto"
                onClick={() => window.print()}
                src={printer}
              /> */}
            </Modal.Title>
          </Modal.Header>
          <Row>
            {!!billingAddress && (
              <Col md={6}>
                <label className="userAddress-lable">
                  <div className="container">
                    <div className="row userAddress">
                      <h5>
                        <strong>Billing/Shipping Address</strong>
                      </h5>
                      <div>
                        <p className="mb-0">
                          <strong>
                            {billingAddress?.firstName +
                              " " +
                              billingAddress?.lastName}
                          </strong>
                        </p>
                        <address className="mb-0">
                          <b>
                            {billingAddress?.addressline1 +
                              ", " +
                              billingAddress?.addressline2 +
                              ", " +
                              billingAddress?.city +
                              "-" +
                              billingAddress?.zipcode +
                              ", " +
                              billingAddress?.state}
                          </b>
                        </address>
                        <p className="mb-0">
                          <strong>Phone: </strong>
                          {billingAddress?.phone}
                        </p>
                        <p className="mb-0">
                          <strong>Email: </strong>
                          {billingAddress?.email}
                        </p>
                        <p className="mb-0">
                          <strong>GST No: </strong>
                          {billingAddress?.gst}
                        </p>
                      </div>
                    </div>
                  </div>
                </label>
              </Col>
            )}
            {/* {!!shippingAddress && (
            <Col md={6}>
              <label className="userAddress-lable">
                <div className="container">
                  <div className="row userAddress">
                    <h5>
                      <strong>Shipping Address</strong>
                    </h5>
                    <div>
                      <p className="mb-0">
                        <strong>
                          {shippingAddress?.firstName +
                            " " +
                            shippingAddress?.lastName}
                        </strong>
                      </p>
                      <address className="mb-0">
                        <b>
                          {shippingAddress?.addressline1 +
                            ", " +
                            shippingAddress?.addressline2 +
                            ", " +
                            shippingAddress?.city +
                            "-" +
                            shippingAddress?.zipcode +
                            ", " +
                            shippingAddress?.state}
                        </b>
                      </address>
                      <p className="mb-0">
                        <strong>Phone: </strong>
                        {shippingAddress?.phone}
                      </p>
                      <p className="mb-0">
                        <strong>Email: </strong>
                        {shippingAddress?.email}
                      </p>
                      <p className="mb-0">
                        <strong>GST No: </strong>
                        {shippingAddress?.gst}
                      </p>
                    </div>
                  </div>
                </div>
              </label>
            </Col>
          )} */}
          </Row>
          {!!items && (
            <Row className="mt-4">
              <Col>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Sr No.</th>
                      {/* <th></th> */}
                      <th>ProductName</th>
                      <th>Quantity</th>
                      {/* <th>Price</th> */}
                      <th>Price</th>
                      {/* <th>TaxName</th>
                    <th>Taxpercentage</th>
                    <th>PriceWithTax</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {!!items &&
                      items.map((orders, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            {/* <td>
                              <img
                                className="w-100px"
                                src={orders?.productId?.images?.[0]}
                              />
                            </td> */}
                            <td>{orders?.productId?.name}</td>
                            <td>{orders?.quantity}</td>
                            {/* <td>{orders?.mrp}</td> */}
                            <td>{orders?.sale}</td>
                            {/* <td>{orders?.tax_name}</td>
                          <td>{orders?.taxpercentage} %</td>
                          <td>{orders?.pricewithtax}</td> */}
                          </tr>
                        );
                      })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="2">
                        <b>{"Total"}</b>
                      </td>
                      <td>
                        <b>{totalquantity}</b>
                      </td>
                      {/* <td>
                      <b>{totalmrpprice}</b>
                    </td> */}
                      <td>
                        <b>{totalsaleprice}</b>
                      </td>
                      {/* <td></td>
                    <td>
                      <b>{totalTaxAmount.toFixed(2)}</b>
                    </td>
                    <td>
                      <b>{totalPaybleAmount}</b>
                    </td> */}
                    </tr>
                  </tfoot>
                </Table>
              </Col>
            </Row>
          )}
        </div>
        <Button className="bg-thememain print-hide" onClick={handleClose}>
          Close
        </Button>
      </Modal>
    </>
  );
}

export default UserOrderDetail;
