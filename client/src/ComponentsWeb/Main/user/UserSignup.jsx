import React from "react";
import Footer from "../../Sub/Footer";
import CommonHeader from "../../Sub/CommonHeader";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BrandsLogo from "../../Sub/BrandsLogo";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addUserAddress } from "../../../const";

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().min(10).max(10).required("Whatsapp Number is required."),
  secondPhone: yup
    .string()
    .min(10)
    .max(10)
    .required("Alternate Phone is required."),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], 'Must match "password" field value')
    .required(),
  companyName: yup.string(),
});

const UserSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <CommonHeader />
      <div className="container-fluid">
        <div className="page-main p-5 mbl-pedding-10">
          <div className="section__head d-md-flex justify-content-between mb-40">
            <div className="section__title">
              <h1>Create an account😊😊</h1>
            </div>
          </div>
          <Row className="align-item-center">
            <Col md={6} className="text-center hideMb">
              <p className="main-icons">
                <i className="bi bi-rocket"></i>
              </p>
              <h3>Welcome</h3>
              <p>
                By creating an account with our store, <br />
                you will be able to move through the checkout
                <br /> process faster, store multiple shipping addresses
              </p>
            </Col>
            <Col md={6} className="box-shadows mbl-pedding-10 p-5">
              <div className="border-y mb-4">
                <h2 className="mb-0">New Registration</h2>
              </div>
              <Formik
                validationSchema={schema}
                onSubmit={async (values, { resetForm }) => {
                  // await dispatch(userSignUp(values));
                  // (await ((!!userSignUpStatus && userSignUpStatus === "1") ||
                  //   localStorage.getItem("signUpstatus") == "1")) &&
                    setTimeout(() => {
                      navigate(addUserAddress);
                    }, 2000);
                }}
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                  phone: "",
                  secondPhone: "",
                  password: "",
                  confirmPassword: "",
                  companyName: "",
                }}
              >
                {({ handleSubmit, handleChange, touched, values, errors }) => (
                  <Form className="container" onSubmit={handleSubmit}>
                    <Row className="mb-3">
                      <Col md={6} sm={12}>
                        <Form.Group controlId="validationFormik01">
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="FirstName"
                            name="firstName"
                            value={values.firstName}
                            onChange={handleChange}
                            isInvalid={!!errors.firstName}
                            className={
                              errors.firstName && touched.firstName && "errors"
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.firstName}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6} sm={12}>
                        <Form.Group controlId="validationFormik01">
                          <Form.Label>LastName</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="LastName"
                            name="lastName"
                            value={values.lastName}
                            onChange={handleChange}
                            isInvalid={!!errors.lastName}
                            className={
                              errors.lastName && touched.lastName && "errors"
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.lastName}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md={6} sm={12}>
                        <Form.Group controlId="validationFormik01">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Email"
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
                      <Col md={6} sm={12}>
                        <Form.Group controlId="validationFormik01">
                          <Form.Label>Whatsapp Number</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Whatsapp Number"
                            name="phone"
                            value={values.phone}
                            onChange={handleChange}
                            isInvalid={!!errors.phone}
                            className={
                              errors.phone && touched.phone && "errors"
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.phone}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md={6} sm={12}>
                        <Form.Group controlId="validationFormik01">
                          <Form.Label>Alternate Phone</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Alternate Phone"
                            name="secondPhone"
                            value={values.secondPhone}
                            onChange={handleChange}
                            isInvalid={!!errors.secondPhone}
                            className={
                              errors.secondPhone &&
                              touched.secondPhone &&
                              "errors"
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.secondPhone}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6} sm={12}>
                        <Form.Group controlId="validationFormik01">
                          <Form.Label>Company Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Company Name"
                            name="companyName"
                            value={values.companyName}
                            onChange={handleChange}
                            isInvalid={!!errors.companyName}
                            className={
                              errors.companyName &&
                              touched.companyName &&
                              "errors"
                            }
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md={6} sm={12}>
                        <Form.Group controlId="validationFormik01">
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            isInvalid={!!errors.password}
                            className={
                              errors.password && touched.password && "errors"
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.password}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6} sm={12}>
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
                    <Button
                      variant="success"
                      className="bg-thememain"
                      type="submit"
                    >
                      <i className="bi bi-person-circle"></i> Sign Up
                    </Button>
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

export default UserSignup;
