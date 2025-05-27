import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Formik } from "formik";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import {
  getServicesCenter,
} from "../../reducers/commonReducer";


const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  address_line1: yup.string().required(),
  address_line2: yup.string(),
  city: yup.string().required(),
  state: yup.string().required(),
  zipcode: yup.string().min(6).max(6).required(),
  brand: yup.string().required(),
  status: yup.string().required(),
});

function ServiceCenterAdd(props) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { getBrandsFrontendData } = useSelector(
    (state) => state.frontEndReducer
  );
  const { zipcodeCityStateData } = useSelector(
    (state) => state.orderDetailReducer
  );
  const {adrsline1, adrsline2, api, buttonTitle, sbrand, scity, sState, sStatus, sTitle, sZipCode, sdescription, title, id} = props;

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {buttonTitle}
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Formik
          validationSchema={schema}
          onSubmit={async (values) => {
            await dispatch(api(values));
            dispatch(getServicesCenter());
            handleClose();
          }}
          initialValues={{
            title: sTitle,
            description: sdescription,
            address_line1:adrsline1,
            address_line2: adrsline2,
            city: scity,
            state: sState,
            zipcode: sZipCode, 
            brand: sbrand,
            status: sStatus ? sStatus : true,
            id:id
          }}
        >
          {({ handleSubmit, handleChange, values, errors, setFieldValue }) => (
            <Form className="container" onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md={6} sm={12}>
                  <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Title"
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      isInvalid={!!errors.title}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.title}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6} sm={12}>
                  <Form.Group>
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                      as="select"
                      onChange={handleChange}
                      name="brand"
                      className="form-control bg"
                      value={values.brand}
                      isInvalid={!!errors.brand}
                    >
                      <option>Select Brand</option>
                      {!!getBrandsFrontendData?.list &&
                        getBrandsFrontendData?.list.map((data, index) => {
                          return (
                            <option value={data?.id} key={index}>
                              {data?.name}
                            </option>
                          );
                        })}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.brand}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6} sm={12}>
                  <Form.Group>
                    <Form.Label>Address Line 1</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Address"
                      name="address_line1"
                      value={values.address_line1}
                      onChange={handleChange}
                      isInvalid={!!errors.address_line1}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.address_line1}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6} sm={12}>
                  <Form.Group>
                    <Form.Label>Address Line 2</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Address Line2"
                      name="address_line2"
                      value={values.address_line2}
                      onChange={handleChange}
                      isInvalid={!!errors.address_line2}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6} sm={12}>
                  <Form.Group>
                    <Form.Label>ZipCode</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="ZipCode"
                      name="zipcode"
                      // onChange={async (e) => {
                      //   setFieldValue("zipcode", e.target.value);
                      //   e.target.value.length > 5 &&
                      //     dispatch(
                      //       zipcodeCityState({ zipcode: e.target.value })
                      //     );
                      // }}
                      value={values.zipcode}
                      isInvalid={!!errors.zipcode}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.zipcode}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6} sm={12}>
                  <Form.Label> Status </Form.Label>
                  <Form.Control
                    as="select"
                    onChange={handleChange}
                    name="status"
                    className="form-control bg"
                    value={values.status}
                    isInvalid={!!errors.status}
                    defaultValue={true}
                  >
                    <option value={true} selected>
                      Active
                    </option>
                    <option value={false}>Inactive</option>
                  </Form.Control>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6} sm={12}>
                  <Form.Group>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="City"
                      name="city"
                      value={values.city}
                      isInvalid={!!errors.city}
                      // onChange={async (e) => {
                      //   setFieldValue("city", zipcodeCityStateData?.City);
                      // }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.city}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6} sm={12}>
                  <Form.Group>
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="State"
                      name="state"
                      value={values.state}
                      isInvalid={!!errors.state}
                      onChange={async (e) => {
                        setFieldValue("state", zipcodeCityStateData?.State);
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.state}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={12} sm={12}>
                  <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Description"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      isInvalid={!!errors.description}
                      as="textarea"
                      rows={3}
                    />
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
      </Modal>
    </>
  );
}

export default ServiceCenterAdd;
