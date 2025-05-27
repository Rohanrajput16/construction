import React, { useEffect, useState } from "react";
import Footer from "../Sub/Footer";
import webBanner from "../../images/webBanner.jpg";
import CommonHeader from "../Sub/CommonHeader";
import Banner from "../Sub/Banner";
import { Form, Row, Col, Button } from "react-bootstrap";
import BrandsLogo from "../Sub/BrandsLogo";
import { Formik } from "formik";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required(),
  gst: yup.string(),
  email: yup.string().email().required(),
  phone: yup.string().min(10).max(10).required(),
  password: yup.string().required(),
});

const Contact = () => {
  useEffect(() => {
  }, []);
  return (
    <>
      <CommonHeader />
      <div>
        <Banner bannerImg={webBanner} />
      </div>
      <div className="container-fluid">
        <div className="page-main p-5 mbl-pedding-10">
        <div className="section__head d-md-flex justify-content-between mb-40"><div className="section__title">
            <h1>Contact <span>Us</span></h1></div>
        </div>
          <Row className="align-item-center">
            <Col md={6} className="hideMb">
                <div>
                    <h3><b>Address</b></h3>
                    <p>ARINANDANA TRADING PRIVATE LIMITED<br/>
3RD FLOOR 7, GRANT LANE<br/>
KOLKATA<br/>
BOWBAZAR (KOLKATA) KOLKATA-700012<br/>
WEST BENGAL<br/>
TEL. NO.:6289526299<br/>
Email: arinandanatrading@gmail.com
</p>
                </div>
            </Col>
            <Col md={6} className="box-shadows mbl-pedding-10 p-5">
            <div className="border-y mb-4">
                <h2 className="mb-0">
                Get In Touch
                </h2>
              </div>
              <Formik
                validationSchema={schema}
                onSubmit={async (values, { resetForm }) => {
                //   dispatch(orderCreate(values));
                  resetForm({ values: "" });
                }}
                initialValues={{
                    name: "",
                    email: "",
                    phone: "",
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
                      <Col md={6} sm={12}>
                        <Form.Group controlId="validationFormik01">
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            isInvalid={!!errors.name}
                            className={errors.name && touched.name && "errors"}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.name}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
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
                            className={errors.email && touched.email && "errors"}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.email}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md={6} sm={12}>
                        <Form.Group controlId="validationFormik01">
                          <Form.Label>Phone</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Phone"
                            name="phone"
                            value={values.phone}
                            onChange={handleChange}
                            isInvalid={!!errors.phone}
                            className={errors.phone && touched.phone && "errors"}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.phone}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
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
                            className={errors.password && touched.password && "errors"}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.password}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button variant="success" className="bg-thememain" type="submit">
                    <i className="bi bi-person-circle"></i> Sign Up
                    </Button>
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

export default Contact;
