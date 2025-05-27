import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getServicesCenter } from "../../reducers/commonReducer";
import CommonHeader from "../Sub/CommonHeader";
import Footer from "../Sub/Footer";

const ServiceCareCenters = ({ onlineChanges, totalAmount }) => {
  const queryParameters = new URLSearchParams(window.location.search);
  const brand = queryParameters.get("brand");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getServicesCenter({
        brand: brand,
      })
    );
  }, []);
  const { getServicesCenterData } = useSelector((state) => state.commonReducer);
  return (
    <>
      <CommonHeader />
      <div className="container-fluid">
        <Row className="mt-3">
          <Container>
            <h2>Service Centers</h2>
            <hr />
          </Container>
        </Row>
        <Row>
          {!!getServicesCenterData?.list &&
          getServicesCenterData?.list.length > 0 ? (
            getServicesCenterData?.list.map((data, index) => (
              <Col md={4} className="mt-2 mb-2" key={index}>
                <label className="userAddress-lable">
                  <Container>
                    <div className="row service-centers">
                      <h4>
                        <b>{data?.title}</b>
                      </h4>
                      <h5>
                        <b>Brand:</b> {data?.brand?.name}
                      </h5>
                      <h6>{`${data?.address_line1} ${data?.address_line2}, ${data?.city} - ${data?.zipcode}, ${data?.state}`}</h6>
                    </div>
                  </Container>
                </label>
              </Col>
            ))
          ) : (
            <Container>
              <h3 className="text-danger text-center mt-5 mb-5">
                No Service Center Found.
              </h3>
            </Container>
          )}
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default ServiceCareCenters;
