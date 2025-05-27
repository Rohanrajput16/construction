import React, { useEffect } from "react";
import Footer from "../../../Sub/Footer";
import CommonHeader from "../../../Sub/CommonHeader";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
import BrandsLogo from "../../../Sub/BrandsLogo";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { verifyOTP } from "../../../../reducers/commonReducer";
import { newPassword } from "../../../../const";

const schema = yup.object().shape({
  email: yup.string().required(),
  otp: yup.string().required(),
});

const VerifyOtp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("sendVerificationCode");
  }, []);
  return (
    <>
      <CommonHeader />
      <div className="container-fluid">
        <div className="page-main p-5 mbl-pedding-10">
          <div className="section__head d-md-flex justify-content-between mb-40">
            <div className="section__title">
              <h1>Verify OTP</h1>
            </div>
          </div>
          <Row>
            <Col md={8} className="m-auto text-center">
              <p className="text-danger">
                <b>Note:</b> We have sent OTP to your registered mail id or Phone. Kindly
                enter OTP to proceed.
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="m-auto">
              <Formik
                validationSchema={schema}
                onSubmit={async (values, { resetForm }) => {
                  dispatch(verifyOTP(values));
                  resetForm({ values: "" });
                  setTimeout(() => {
                    localStorage.getItem("verifyOTP") === "1" &&
                      navigate(newPassword);
                  }, 1000);
                }}
                initialValues={{
                  email: localStorage.getItem("userEmail"),
                  otp: "",
                }}
              >
                {({ handleSubmit, handleChange, touched, values, errors }) => (
                  <Form className="container" onSubmit={handleSubmit}>
                    <Row className="mb-3">
                      <Col md={12} sm={12}>
                        <Form.Group controlId="validationFormik01">
                          <Form.Label>Enter OTP</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Please Enter OTP"
                            name="otp"
                            value={values.otp}
                            onChange={handleChange}
                            isInvalid={!!errors.otp}
                            className={errors.otp && touched.otp && "errors"}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.otp}
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
                          Verify OTP
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                )}
              </Formik>
            </Col>
          </Row>
          <BrandsLogo />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VerifyOtp;
