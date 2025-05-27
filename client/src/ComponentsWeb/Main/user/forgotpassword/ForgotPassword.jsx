import React from "react";
import Footer from "../../../Sub/Footer";
import CommonHeader from "../../../Sub/CommonHeader";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
import BrandsLogo from "../../../Sub/BrandsLogo";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { sendVerificationCode } from "../../../../reducers/commonReducer";
import { verifyOtp } from "../../../../const";

const schema = yup.object().shape({
  email: yup.string().required(),
});

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <CommonHeader />
      <div className="container-fluid">
        <div className="page-main p-5 mbl-pedding-10">
          <div className="section__head d-md-flex justify-content-between mb-40">
            <div className="section__title">
              <h1>Forgot Password</h1>
            </div>
          </div>
          <Row>
            <Col md={4} className="m-auto">
              <Formik
                validationSchema={schema}
                onSubmit={async (values, { resetForm }) => {
                  dispatch(sendVerificationCode(values));
                  localStorage.setItem("userEmail", values.email);
                  resetForm({ values: "" });
                  setTimeout(() => {
                    localStorage.getItem("sendVerificationCode") === "1" &&
                      navigate(verifyOtp);
                  }, 1000);
                }}
                initialValues={{
                  email: "",
                }}
              >
                {({ handleSubmit, handleChange, touched, values, errors }) => (
                  <Form className="container" onSubmit={handleSubmit}>
                    <Row className="mb-3">
                      <Col md={12} sm={12}>
                        <Form.Group>
                          <Form.Label>Enter Register Email or Phone</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Your Register Email Or Phone"
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
                        <Button
                          variant="success"
                          className="bg-thememain w-100"
                          type="submit"
                        >
                          Send Verification Code
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

export default ForgotPassword;
