import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editMyProfile, getMyProfile } from "../reducers/commonReducer";
import SideMenu from "../Components/SideMenu";
import { Row, Col, Button, Alert, Container } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import Form from "react-bootstrap/Form";

const schema = yup.object().shape({
    email: yup.string().email(),
    password: yup.string().required(),
    number: yup.string().min(10).max(10),
  });

  
const MyProfile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyProfile())
  },[])
  const { getMyProfileData, editMyProfileMsg } = useSelector((state) => state.commonReducer);
  return (
    <>
      <SideMenu />
      <div className="mt-extra content container-fluid">
        <Container className="my-profile-content">
          <Row>
            <Alert variant={"primary"}>
              <h2>My Profile</h2>
            </Alert>
          </Row>
          <Row>
            <Col md={3}>
              <p>
                <b>Name</b>
              </p>
            </Col>
            <Col md={6}>
              <p>{!!getMyProfileData && getMyProfileData?.dispatch || !!getMyProfileData && getMyProfileData?.name}</p>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <p>
                <b>UserName</b>
              </p>
            </Col>
            <Col md={6}>
              <p>{!!getMyProfileData && getMyProfileData?.userName}</p>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <p>
                <b>Mobile Number</b>
              </p>
            </Col>
            <Col md={6}>
              <p>{!!getMyProfileData && getMyProfileData?.number}</p>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <p>
                <b>Address</b>
              </p>
            </Col>
            <Col md={6}>
              <p>{getMyProfileData?.address?.town + ", " +  getMyProfileData?.address?.district + ", " +  getMyProfileData?.address?.state}</p>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <p>
                <b>Email</b>
              </p>
            </Col>
            <Col md={6}>
              <p>{!!getMyProfileData && getMyProfileData?.email}</p>
            </Col>
          </Row>
        </Container>
        <Container className="my-profile-content mt-5">
          <Row>
            <Alert variant={"primary"}>
              <h2>Update Profile</h2>
            </Alert>
          </Row>
          <Row>
          <Formik
              validationSchema={schema}
              onSubmit={async (values, { resetForm }) => {
                await dispatch(editMyProfile(values));
                resetForm({ values: "" });
              }}
              initialValues={{
                number: !!getMyProfileData && getMyProfileData?.number,
                email: !!getMyProfileData && getMyProfileData?.email,
                password: "",
              }}
            >
              {({
                handleSubmit,
                handleChange,
                setFieldValue,
                values,
                errors,
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Col md={12} sm={12}>
                      <Form.Group controlId="validationFormik01">
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Mobile Number"
                          name="number"
                          value={values.number}
                          onChange={handleChange}
                          isInvalid={!!errors.number}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.number}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={12} sm={12}>
                      <Form.Group controlId="validationFormik01">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
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
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  {/* <p>
                    <b>{editMyProfileMsg}</b>
                  </p> */}
                  <Button type="submit" className="mt-3">
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default MyProfile;
