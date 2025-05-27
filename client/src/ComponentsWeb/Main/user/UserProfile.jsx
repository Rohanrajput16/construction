import React from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import UpdateUserProfile from "./UpdateUserProfile";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { getUserProfileList } = useSelector(
    (state) => state.orderDetailReducer
  );
  return (
    <>
      {/* <CommonHeader /> */}
      <div className="container-fluid">
        <div className="page-main mbl-pedding-10">
          <div className="section__head d-md-flex justify-content-between mb-40">
            <div className="section__title">
              <h1>My Profile😊😊</h1>
            </div>
          </div>
          {!!getUserProfileList && (
            <Row className="coloum-reverse-mbl">
              <Col md={6} className="mt-2">
                <div className="border-y mb-4">
                  <h2 className="mb-0">
                    {getUserProfileList?.firstName +
                      " " +
                      getUserProfileList?.lastName}
                    <UpdateUserProfile
                      title="Update Profile"
                      getUserProfileList={getUserProfileList}
                    />
                  </h2>
                </div>
                <p>
                  <strong>Company Name:</strong>{" "}
                  {getUserProfileList?.companyName}
                </p>
                <p>
                  <strong>Phone:</strong> {getUserProfileList?.phone}
                </p>
                <p>
                  <strong>Email:</strong> {getUserProfileList?.email}
                </p>
                <p>
                  <strong>Address:</strong>{" "}
                  {getUserProfileList?.address?.addressline1 +
                    ", " +
                    (!!getUserProfileList?.address?.addressline2
                      ? getUserProfileList?.address?.addressline2 + ","
                      : "") +
                    getUserProfileList?.address?.city +
                    "-" +
                    getUserProfileList?.address?.zipcode +
                    ", " +
                    getUserProfileList?.address?.state}
                </p>
              </Col>
            </Row>
          )}
          {/* <BrandsLogo /> */}
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default UserProfile;
