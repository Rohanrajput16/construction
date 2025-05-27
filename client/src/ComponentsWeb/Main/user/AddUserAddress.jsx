import React from "react";
import CommonHeader from "../../Sub/CommonHeader";
import { Form, Row, Col, Button } from "react-bootstrap";
import BrandsLogo from "../../Sub/BrandsLogo";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../Sub/Footer";
import { Link, useNavigate } from "react-router-dom";
import { connection, userDashboard } from "../../../const";

const schema = yup.object().shape({
  gst: yup
    .string()
    .matches(
      /^[0-9]{2}[a-zA-Z0-9]{13}$/,
      "GST must be exactly 15 alphanumeric characters"
    ),
  addressline1: yup.string().required(),
  addressline2: yup.string(),
  city: yup.string().required(),
  zipcode: yup
    .string()
    .required()
    .max(6, "Enter valid PIN Code.")
    .min(6, "Enter your 6 digit PIN code."),
  state: yup.string().required(),
});

const AddUserAddress = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  return (
    <>
      <CommonHeader />
      <div className="container-fluid">
        <div className="page-main p-5 mbl-pedding-10">
          <div className="section__head d-md-flex justify-content-between mb-40">
            <div className="section__title">
              <h1>Add Address🏠🏠</h1>
            </div>
          </div>
          <Row className="align-item-center">
            <Col md={6} className="text-center hideMb">
              <Link to={connection}>
                <p className="main-icons">🔗</p>
                <h3>
                  Can you connect with <b>Pcdeals?</b>
                </h3>
              </Link>
            </Col>

            <Col md={6} className="box-shadows mbl-pedding-10 p-5">
              <div className="border-y mb-4">
                <h2 className="mb-0">Fill Your Address</h2>
              </div>
              <Formik
                enableReinitialize={true}
                validationSchema={schema}
                onSubmit={async (values, { resetForm }) => {
                  // await dispatch(userAddress(values));
                  localStorage.removeItem("signUpstatus");
                  resetForm({ values: "" });
                  // (await ((!!userAddressStatus && userAddressStatus === "1") ||
                  //   localStorage.getItem("userAddress") == "1")) &&
                  //   setTimeout(() => {
                  //     navigate(userDashboard);
                  //   }, 2000);
                }}
                initialValues={{
                  gst: "",
                  addressline1: "",
                  addressline2: "",
                  // city: !!zipcodeCityStateData?.City
                  //   ? zipcodeCityStateData?.City
                  //   : "",
                  // zipcode: !!zipcodeCityStateData?.Pincode
                  //   ? zipcodeCityStateData?.Pincode
                  //   : "",
                  // state: !!zipcodeCityStateData?.State
                  //   ? zipcodeCityStateData?.State
                  //   : "",
                }}
              >
                {({
                  handleSubmit,
                  handleChange,
                  setFieldValue,
                  touched,
                  values,
                  errors,
                }) => (
                  <Form className="container" onSubmit={handleSubmit}>
                    {/* <Row className="mb-3">
                      <Col md={6} sm={12}>
                        <Form.Group controlId="validationFormik01">
                          <Form.Label>PIN Code</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="PIN Code"
                            name="zipcode"
                            value={values.zipcode}
                            onChange={async (e) => {
                              setFieldValue("zipcode", e.target.value);
                              e.target.value?.length === 6 &&
                                dispatch(
                                  zipcodeCityState({
                                    zipcode: e.target.value,
                                  })
                                );
                            }}
                            isInvalid={!!errors.zipcode}
                            className={
                              errors.zipcode && touched.zipcode && "errors"
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.zipcode}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6} sm={12}>
                        <Form.Group controlId="validationFormik01">
                          <Form.Label>City</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="City"
                            name="city"
                            value={values.city}
                            onChange={handleChange}
                            isInvalid={!!errors.city}
                            className={errors.city && touched.city && "errors"}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.city}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md={6} sm={12}>
                        <Form.Group controlId="validationFormik01">
                          <Form.Label>State</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="State"
                            name="state"
                            value={values.state}
                            onChange={handleChange}
                            isInvalid={!!errors.state}
                            className={
                              errors.state && touched.state && "errors"
                            }
                            disabled
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.state}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6} sm={12}>
                        <Form.Group>
                          <Form.Label>GST No.</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter GST No."
                            name="gst"
                            value={values.gst}
                            onChange={handleChange}
                            isInvalid={!!errors.gst}
                            className={errors.gst && touched.gst && "errors"}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.gst}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md={6} sm={12}>
                        <Form.Group controlId="validationFormik01">
                          <Form.Label>Addressline 1 </Form.Label>
                          <Form.Control
                            type="text"
                            as="textarea"
                            row={3}
                            placeholder="Addressline 1 "
                            name="addressline1"
                            value={values.addressline1}
                            onChange={handleChange}
                            isInvalid={!!errors.addressline1}
                            className={
                              errors.addressline1 &&
                              touched.addressline1 &&
                              "errors"
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.addressline1}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6} sm={12}>
                        <Form.Group controlId="validationFormik01">
                          <Form.Label>Addressline 2</Form.Label>
                          <Form.Control
                            type="text"
                            as="textarea"
                            row={3}
                            placeholder="Addressline 2"
                            name="addressline2"
                            value={values.addressline2}
                            onChange={handleChange}
                            isInvalid={!!errors.addressline2}
                            className={
                              errors.addressline2 &&
                              touched.addressline2 &&
                              "errors"
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.addressline2}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button
                      variant="success"
                      className="bg-thememain"
                      type="submit"
                    >
                      <i className="bi bi-houses"></i> Add Address
                    </Button> */}
                  </Form>
                )}
              </Formik>
            </Col>
          </Row>
          {/* <BrandsLogo /> */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddUserAddress;
