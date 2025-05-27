import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string(),
  phone: yup.string().min(10).max(10).required(),
  gst: yup.string(),
  addressline1: yup.string().required(),
  addressline2: yup.string(),
  city: yup.string().required(),
  zipcode: yup.string().min(6).max(6).required(),
  state: yup.string().required(),
});

function UpdateAddress(props) {
  const dispatch = useDispatch();
  const { title, getUserAddressList } = props;
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const { zipcodeCityStateData } = useSelector((state) => state.orderDetailReducer);
  return (
    <>
      <span className="address-edit" onClick={handleShow}>
        <i className="bi bi-pen"></i>
      </span>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Formik
         enableReinitialize={true}
          validationSchema={schema}
          onSubmit={async (values, { resetForm }) => {
            // await dispatch(updateUserAddress(values));
            // await dispatch(getUserAddress());
            resetForm({ values: "" });
            handleClose();
          }}
          initialValues={{
            firstName: getUserAddressList?.firstName,
            lastName: getUserAddressList?.lastName,
            email: getUserAddressList?.email,
            phone: getUserAddressList?.phone,
            gst: getUserAddressList?.gst,
            addressline1: getUserAddressList?.addressline1,
            addressline2: getUserAddressList?.addressline2,
            city: zipcodeCityStateData?.City ? zipcodeCityStateData?.City : getUserAddressList?.city,
            zipcode: getUserAddressList?.zipcode,
            state: zipcodeCityStateData?.State ? zipcodeCityStateData?.State : getUserAddressList?.state,
          }}
        >
          {({ handleSubmit, handleChange, values, setFieldValue, errors }) => (
            <Form className="container" onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md={6} sm={12}>
                  <Form.Group controlId="validationFormik01">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="FirstName"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      isInvalid={!!errors.firstName}
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
                      type="text"
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
                <Col md={6} sm={12}>
                  <Form.Group controlId="validationFormik01">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Phone"
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      isInvalid={!!errors.phone}
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
                    <Form.Label>AddressLine1</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="AddressLine1"
                      name="addressline1"
                      value={values.addressline1}
                      onChange={handleChange}
                      isInvalid={!!errors.addressline1}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.addressline1}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6} sm={12}>
                  <Form.Group controlId="validationFormik01">
                    <Form.Label>AddressLine2</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="AddressLine2"
                      name="addressline2"
                      value={values.addressline2}
                      onChange={handleChange}
                      isInvalid={!!errors.addressline2}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.addressline2}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6} sm={12}>
                  <Form.Group controlId="validationFormik01">
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="zipcode"
                      name="zipcode"
                      value={values.zipcode}
                      onChange={async (e) => {
                        setFieldValue("zipcode", e.target.value);
                        e.target.value?.length === 6 &&
                          dispatch(
                           ({
                              zipcode: e.target.value,
                            })
                          );
                      }}
                      isInvalid={!!errors.zipcode}
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
                      // disabled = {localStorage.getItem("slug") == "admin" ? false : true}
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
                      disabled = {localStorage.getItem("slug") == "admin" ? false : true}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.state}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6} sm={12}>
                  <Form.Group controlId="validationFormik01">
                    <Form.Label>GST No</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Gst No"
                      name="gst"
                      value={values.gst}
                      onChange={handleChange}
                      isInvalid={!!errors.gst}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.gst}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Modal.Footer>
                <Button variant="success" type="submit">
                  Submit
                </Button>
                <Button variant="danger" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
        {/* <Form.Group className="p-3">
            <Form.Label>Name</Form.Label>
            <Form.Control value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        <Form.Group className="p-3">
            <Form.Label>Slug</Form.Label>
            <Form.Control value={slug} onChange={(e) => setSlug(e.target.value)} />
        </Form.Group>
        <Form.Group className="p-3">
            <Form.Label>Description</Form.Label>
            <Form.Control value={des} onChange={(e) => setDes(e.target.value)} />
        </Form.Group>
        <Form.Group className="p-3">
            <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>Select Status</option>
            <option value={true}>True</option>
            <option value={false}>False</option>
            </Form.Select>
        </Form.Group>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateUser}>
            Save
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}

export default UpdateAddress;
