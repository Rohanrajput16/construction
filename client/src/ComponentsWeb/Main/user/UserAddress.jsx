import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import UpdateAddress from "./UpdateAddress";

const UserAddress = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getUserAddress());
  }, []);

  return (
    <>
      {/* <CommonHeader /> */}
      <div className="container-fluid">
        <Row className="">
          <Container>
            <div className="section__head d-md-flex justify-content-between mb-40">
              <div className="section__title">
                <h2>
                  <b>My Address</b>
                </h2>
              </div>
            </div>
          </Container>
        </Row>
        {/* {!!getUserAddressList && (
          <Row>
            <Col md={5} className="mt-2 mb-2">
              <label className="userAddress-lable">
                <Container>
                  <div className="row userAddress">
                    <div>
                      <p className="mb-0">
                        <strong>
                          {getUserAddressList?.firstName +
                            " " +
                            getUserAddressList?.lastName}
                        </strong>
                        <UpdateAddress
                          title={"Update Address"}
                          getUserAddressList={getUserAddressList}
                        />
                      </p>
                      <address className="mb-0">
                        <b>
                          {getUserAddressList?.addressline1 +
                            " " +
                            getUserAddressList?.addressline2}
                          <br />{" "}
                          {getUserAddressList?.city +
                            "-" +
                            getUserAddressList?.zipcode +
                            "," +
                            getUserAddressList?.state}
                        </b>
                      </address>
                      <p className="mb-0">
                        <strong>Phone: </strong>
                        {getUserAddressList?.phone}
                      </p>
                      <p className="mb-0">
                        <strong>Email: </strong>
                        {getUserAddressList?.email}
                      </p>
                      <p className="mb-0">
                        <strong>GST No: </strong>
                        {getUserAddressList?.gst}
                      </p>
                    </div>
                  </div>
                </Container>
              </label>
            </Col>
          </Row>
        )} */}
      </div>
    </>
  );
};

export default UserAddress;
