import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch} from 'react-redux';
import {addWarranty, getWarranty} from '../../reducers/commonReducer';


const schema = yup.object().shape({
  title: yup.string().required(),
  details: yup.string().required(),
});

function WarrantyAdd(props) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Warranty
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{"Add Warranty"}</Modal.Title>
        </Modal.Header>
        <Formik
          validationSchema={schema}
          onSubmit={async (values) => {
            await dispatch(
              addWarranty(values));
            dispatch(getWarranty())
            handleClose()
          }}
          initialValues={{
            title: '',
            details: '',
          }}
        >
          {({ handleSubmit, handleChange, values, errors, setFieldValue }) => (
            <Form className="container" onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={12} sm={12}>
                <Form.Group controlId="validationFormik01">
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
              <Col md={12} sm={12} className="mt-2">
                <Form.Group controlId="validationFormik02">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Details"
                    name="details"
                    value={values.details}
                    onChange={handleChange}
                    isInvalid={!!errors.details}
                    as="textarea"
                    rows={3}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.details}
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

export default WarrantyAdd;