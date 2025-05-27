import React, { useState } from "react";
import Footer from "../../Sub/Footer";
import CommonHeader from "../../Sub/CommonHeader";
import { Link, useNavigate } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
import BrandsLogo from "../../Sub/BrandsLogo";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAddressFromPcdeals,
  pcdealsLogin,
  sendVerificationCode,
} from "../../../reducers/commonReducer";
import { userDashboard, verifyOtp } from "../../../const";


const schema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});

const ConnectPcDeals = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [connection, setConnection] = useState();

  const login = async (values) => {
    const apiResponse = await dispatch(pcdealsLogin(values));
    // dispatch(getUserProfile());
    if (apiResponse?.payload?.status === 1) {
      localStorage.setItem("pcdealsConnection", apiResponse?.payload?.status);
      setConnection(apiResponse?.payload?.status);
      setTimeout(() => {
        navigate(`/pcdeals-connection`) 
        },1000)
    }
  };
  const fetchAddress = async () => {
    const apiResponse = await dispatch(fetchAddressFromPcdeals());
    if (apiResponse?.payload?.status === 1) {
      setConnection(apiResponse?.payload?.status);
      setTimeout(() => {
        navigate(`${userDashboard}?popup=${true}`);
      }, 1000);
    }
  }; 
  const { getUserProfileList } = useSelector(
    (state) => state.orderDetailReducer
  );
  return (
    <>
      <CommonHeader />
      <div className="container-fluid">
        <div className="page-main p-5 mbl-pedding-10">
          {/* {localStorage.getItem("pcdealsConnection") ||
          connection ||
          localStorage.getItem("pcdealUserAddressid") ? (
            <>
              <h4 className="text-center text-success mb-3">
                <b>You are Connected with PC Deals India from {getUserProfileList?.pcdealUserEmail}</b>
              </h4> */}
              {/* <div className="text-center">
                <Link to={`${userDashboard}?popup=${true}`}>
                  <Button className="m-1 bg-thememain">
                    <i className="bi bi-house-add"></i> Add Address
                  </Button>
                </Link>
                <Button
                  className="m-1 bg-thememain"
                  onClick={() => fetchAddress()}
                >
                  <i className="bi bi-house-add"></i> Fetch Address from Pc
                  Deals
                </Button>
              </div> */}
            {/* </> */}
          {/* // ) : ( */}
            <>
              <div className="section__head d-md-flex justify-content-between mb-40">
                <div className="section__title">
                  <h1>Connect With PC Deals India</h1>
                </div>
              </div>
              <Row>
                <Col md={4} className="m-auto">
                  <Formik
                    validationSchema={schema}
                    onSubmit={async (values, { resetForm }) => {
                      dispatch(login(values));
                      resetForm({ values: "" });
                    }}
                    initialValues={{
                      email: "",
                      password: "",
                    }}
                  >
                    {({
                      handleSubmit,
                      handleChange,
                      touched,
                      values,
                      errors,
                    }) => (
                      <Form className="container" onSubmit={handleSubmit}>
                        <Row className="mb-3">
                          <Col md={12} sm={12}>
                            <Form.Group>
                              <Form.Label>
                                <b>Enter PC Deals India Account Email</b>
                              </Form.Label>
                              <Form.Control
                                type="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                isInvalid={!!errors.email}
                                className={
                                  errors.email && touched.email && "errors"
                                }
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.email}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col md={12} sm={12}>
                            <Form.Group>
                              <Form.Label>
                                <b>Enter PC Deals India Account Password</b>
                              </Form.Label>
                              <Form.Control
                                type="password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                isInvalid={!!errors.password}
                                className={
                                  errors.password &&
                                  touched.password &&
                                  "errors"
                                }
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.password}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col md={12} sm={12}>
                            <Button
                              variant="success"
                              className="bg-thememain w-100"
                              type="submit"
                            >
                              Connect PC Deals
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    )}
                  </Formik>
                </Col>
              </Row>
            </>
          {/*  )} */}
          <BrandsLogo />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ConnectPcDeals;
