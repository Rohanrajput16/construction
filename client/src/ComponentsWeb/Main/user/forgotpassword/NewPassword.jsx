import React, { useEffect } from "react";
import Footer from "../../../Sub/Footer";
import CommonHeader from "../../../Sub/CommonHeader";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
import BrandsLogo from "../../../Sub/BrandsLogo";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { passwordChanges } from "../../../../reducers/commonReducer";
import { login } from "../../../../const";

const schema = yup.object().shape({
  newPassword: yup.string().required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], 'Must match "password" field value')
    .required(),
  email: yup.string().required(),
});

const NewPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("verifyOTP");
  }, []);
  return (
    <>
      <CommonHeader />
      <div className="container-fluid">
        <div className="page-main p-5 mbl-pedding-10">
          <div className="section__head d-md-flex justify-content-between mb-40">
            <div className="section__title">
              <h1>Create New Password</h1>
            </div>
          </div>
          <Row>
            <Col md={4} className="m-auto">
              <Formik
                validationSchema={schema}
                onSubmit={async (values, { resetForm }) => {
                  dispatch(passwordChanges(values));
                  resetForm({ values: "" });
                  setTimeout(() => {
                    localStorage.getItem("passwordChanges") === "1" &&
                      navigate(login);
                  }, 1000);
                }}
                initialValues={{
                  email: localStorage.getItem("userEmail"),
                  newPassword: "",
                  confirmPassword: "",
                }}
              >
                {({ handleSubmit, handleChange, touched, values, errors }) => (
                  <Form className="container" onSubmit={handleSubmit}>
                    <Row className="mb-3">
                      <Col md={12} sm={12}>
                        <Form.Group controlId="validationFormik01">
                          <Form.Label>Enter New Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="New Password"
                            name="newPassword"
                            value={values.newPassword}
                            onChange={handleChange}
                            isInvalid={!!errors.newPassword}
                            className={
                              errors.newPassword &&
                              touched.newPassword &&
                              "errors"
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.newPassword}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md={12} sm={12}>
                        <Form.Group controlId="validationFormik01">
                          <Form.Label>Confirm Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            isInvalid={!!errors.confirmPassword}
                            className={
                              errors.confirmPassword &&
                              touched.confirmPassword &&
                              "errors"
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.confirmPassword}
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
                          Submit
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

export default NewPassword;
