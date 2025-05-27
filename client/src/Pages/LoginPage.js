import React from "react";
import "../app.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import * as yup from "yup";
// import { Link } from "react-router-dom";
import { adminLogin } from "../reducers/commonReducer";
// import PCD from "../images/download.png";
import { dashboard, userDashboard } from "../const";

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { loginMsg } = useSelector((state) => state.commonReducer);

  return (
    <>
      <div className="login-page bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="bg-white shadow rounded">
                <div className="row">
                  <div className="col-md-7 pe-0">
                    <div className="form-left h-100 py-5 px-5">
                      <Formik
                        validationSchema={schema}
                        onSubmit={(values, {resetForm}) => {
                          dispatch(adminLogin(values));
                          resetForm({ values: "" });
                          setTimeout(() => {
                            localStorage.getItem("x-auth-token") && localStorage.getItem("slug") === "admin" ?
                            navigate(dashboard) : localStorage.getItem("x-auth-token") && localStorage.getItem("slug") === "customer" ?
                            navigate(userDashboard) : localStorage.getItem("x-auth-token") && localStorage.getItem("userRole") === 5 ?
                            navigate("/distributor-list") : localStorage.getItem("x-auth-token") && localStorage.getItem("userRole") === 2 ?
                            navigate("/complaints") : localStorage.getItem("x-auth-token") && localStorage.getItem("userRole") === 3 ?
                            navigate("/created-distributor") : localStorage.getItem("x-auth-token") && localStorage.getItem("userRole") === 7 ?
                            navigate("/salesman-wise-orders") : localStorage.getItem("x-auth-token") && localStorage.getItem("userRole") === 6 ?
                            navigate("/company-wise-orders") : localStorage.getItem("x-auth-token") && localStorage.getItem("userRole") === 9 ?
                            navigate("/salesman-wise-orders") : navigate('/') 
                          }, 1000);
                        }}
                        initialValues={{
                          username: "",
                          password: "",
                        }}
                      >
                        {({
                          handleSubmit,
                          handleChange,
                          handleBlur,
                          values,
                          touched,
                          isValid,
                          errors,
                        }) => (
                          <Form noValidate onSubmit={handleSubmit}>
                            <div className="col-12">
                              <Form.Group
                                as={Col}
                                md="12"
                                controlId="validationCustom03"
                              >
                                <Form.Label>UserName</Form.Label>
                                <div className="input-group">
                                  <div className="input-group-text">
                                    <i className="bi bi-person-fill"></i>
                                  </div>
                                  <Form.Control
                                    type="text"
                                    name="username"
                                    value={values.username}
                                    onChange={handleChange}
                                    isInvalid={!!errors.username}
                                    className="form-control"
                                    placeholder="UserName"
                                    required
                                  />
                                </div>
                                <Form.Control.Feedback type="invalid">
                                  {errors.username}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </div>

                            <div className="col-12">
                              <Form.Group
                                as={Col}
                                md="12"
                                controlId="validationCustom03"
                              >
                                <Form.Label>Password</Form.Label>
                                <div className="input-group">
                                  <div className="input-group-text">
                                    <i className="bi bi-lock-fill"></i>
                                  </div>
                                  <Form.Control
                                    type="password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    isInvalid={!!errors.password}
                                    className="form-control"
                                    placeholder="Password"
                                    required
                                  />
                                </div>
                                <Form.Control.Feedback type="invalid">
                                  {errors.password}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </div>
                            <div className="col-12">
                              <Button
                                type="submit"
                                className="bg-thememain login-btn px-4 float-end mt-4 mb-4"
                              >
                                Login
                              </Button>
                            </div>
                          </Form>
                        )}
                      </Formik>
                      {/* <p>
                        <b>{loginMsg}</b>
                      </p> */}
                    </div>
                    {/* <div className="row">
                      <div className="col-3">
                        <Link to="/career">
                          <Button
                            type="submit"
                            className="btn btn-primary px-4 float-start mt-4">
                            {" "}
                            Career
                          </Button>
                        </Link>
                      </div>
                      <div className="col-3">
                        <Link to="/user-complaint">
                          <Button
                            type="submit"
                            className="btn btn-primary px-4 float-start mt-4">
                            {" "}
                            Complaint 
                          </Button>
                        </Link>
                      </div>
                      <div className="col-3">
                        <Link to="/user-feedback">
                          <Button
                            type="submit"
                            className="btn btn-primary px-4 float-start mt-4">
                            {" "}
                            Feedback
                          </Button>
                        </Link>
                      </div>
                      <div className="col-3">
                        <Link to="/distributor">
                          <Button
                            type="submit"
                            className="btn btn-primary px-4 float-end mt-4">
                            Distributor
                          </Button>
                        </Link>
                      </div>
                    </div> */}
                  </div>
                  <div className="col-md-5 ps-0 d-none d-md-block">
                    <div className="bg-thememain form-right h-100 text-white text-center pt-5 pb-5 ">
                      {/* <img src={PCD}/> */}
                      {/* <i className="bi bi-lock"></i>
                      <h2 className="fs-1">Login Here</h2> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
