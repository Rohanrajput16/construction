import React, { useEffect, useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { addCoupon, addSetting, getBanners, getBrands, getCategories, getCoupons, getSettings, updateBanner, updateBrand, updateCoupon } from '../../reducers/commonReducer';


const schema = yup.object().shape({
  name: yup.string().required(),
  orderby: yup.number().required(),
  value: yup.string().required(),
  halptext: yup.string().required(),
  filter: yup.string().required(),
  key : yup.string().required()
});

function SettingAdd(props) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Setting
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{"Add Setting"}</Modal.Title>
        </Modal.Header>
        <Formik
          validationSchema={schema}
          onSubmit={async (values) => {
            await dispatch(addSetting(values));
            dispatch(getSettings())
          }}
          initialValues={{
            name: '',
            orderby: '',
            value: '',
            halptext: '',
            filter: '',
            key: ''
          }}
        >
          {({ handleSubmit, handleChange, values, errors }) => (
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
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} sm={12}>
                <Form.Group controlId="validationFormik01">
                  <Form.Label>Orderby</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Orderby"
                    name="orderby"
                    value={values.orderby}
                    onChange={handleChange}
                    isInvalid={!!errors.orderby}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.orderby}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6} sm={12}>
                <Form.Group controlId="validationFormik01">
                  <Form.Label>Value</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Value"
                    name="value"
                    value={values.value}
                    onChange={handleChange}
                    isInvalid={!!errors.value}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.value}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} sm={12}>
                <Form.Group controlId="validationFormik01">
                  <Form.Label>Help Text</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Help Text"
                    name="halptext"
                    value={values.halptext}
                    onChange={handleChange}
                    isInvalid={!!errors.halptext}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.halptext}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6} sm={12}>
                <Form.Group controlId="validationFormik01">
                  <Form.Label>Filter</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Filter"
                    name="filter"
                    value={values.filter}
                    onChange={handleChange}
                    isInvalid={!!errors.filter}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.filter}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} sm={12}>
                <Form.Group controlId="validationFormik01">
                  <Form.Label>Key</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Key"
                    name="key"
                    value={values.key}
                    onChange={handleChange}
                    isInvalid={!!errors.key}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.key}
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
      </Modal>
    </>
  );
}

export default SettingAdd;