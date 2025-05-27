import React, { useEffect } from "react";
import Footer from "../../Sub/Footer";
import CommonHeader from "../../Sub/CommonHeader";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
import BrandsLogo from "../../Sub/BrandsLogo";
import { Formik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminLogin } from "../../../reducers/commonReducer";
import {
  dashboard,
  forgotPass,
  login,
  signup,
  userDashboard,
} from "../../../const";

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

const UserLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("passwordChanges");
  }, []);
  return (
    <>
      <CommonHeader />
      <div className="container-fluid">
        <div className="page-main p-5 mbl-pedding-10">
          <div className="section__head d-md-flex justify-content-between mb-40">
            <div className="section__title">
              <h1>Login or create an account😊😊</h1>
            </div>
          </div>
          <Row className="coloum-reverse-mbl">
            <Col md={6} className="mt-2">
              <div className="border-y mb-4">
                <h2 className="mb-0">NEW CUSTOMERS</h2>
              </div>
              <p>
                By creating an account with our store, you will be able to move
                through the checkout process faster, store multiple shipping
                addresses, view and track your orders in your account and more.
              </p>
              <Link to={signup}>
                <Button className="bg-thememain">
                  <i className="bi bi-person-circle"></i> Create an Account
                </Button>
              </Link>
            </Col>
            <Col md={6} className="mt-2">
              <div className="border-y mb-4">
                <h2 className="mb-0">Login</h2>
              </div>
              <Formik
                validationSchema={schema}
                onSubmit={async (values, { resetForm }) => {
                  dispatch(adminLogin(values));
                  resetForm({ values: "" });
                  setTimeout(() => {
                    localStorage.getItem("x-auth-token") &&
                    localStorage.getItem("slug") == "admin"
                      ? navigate("/home")
                      : localStorage.getItem("x-auth-token") &&
                        localStorage.getItem("slug") == "customer"
                      ? navigate("/home")
                      : navigate(login);
                  }, 1000);
                }}
                initialValues={{
                  username: "",
                  password: "",
                }}
              >
                {({ handleSubmit, handleChange, touched, values, errors }) => (
                  <Form className="container" onSubmit={handleSubmit}>
                    <Row className="mb-3">
                      <Col md={12} sm={12}>
                        <Form.Group controlId="validationFormik01">
                          <Form.Label>Email/Phone</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Email/Phone"
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                            isInvalid={!!errors.username}
                            className={
                              errors.username && touched.username && "errors"
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.username}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md={12} sm={12}>
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
                    </Row>
                    <Button
                      variant="success"
                      className="bg-thememain"
                      type="submit"
                    >
                      <i className="bi bi-unlock-fill"></i> Login
                    </Button>
                    <p className="mt-3">
                      <b>
                        <Link to={forgotPass}>
                          <span>Forgot Password?</span>
                        </Link>
                      </b>
                    </p>
                  </Form>
                )}
              </Formik>
            </Col>
          </Row>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserLogin;
