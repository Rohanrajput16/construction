import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {  getTaxgsts, getTrackers } from "../../reducers/commonReducer";

const schema = yup.object().shape({
  name: yup.string().required(),
  url: yup.string().required(),
  id: yup.string(),
});

function TrackersAction({
  title,
  popUpTitle,
  id,
  uname,
  uurl,
  api,
}) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  return (
    <>
      <Button className="bg-thememain" onClick={handleShow}>
        {title}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{popUpTitle}</Modal.Title>
        </Modal.Header>
        <Formik
          validationSchema={schema}
          onSubmit={async (values, { resetForm }) => {
            await dispatch(api(values));
            resetForm({ values: "" });
            setTimeout(() => {
              dispatch(getTrackers());
            }, 500);
            handleClose();
            resetForm();
          }}
          initialValues={{
            name: uname,
            url: uurl,
            id: id,
          }}
        >
          {({ handleSubmit, handleChange, values, errors }) => (
            <Form className="container" onSubmit={handleSubmit}>
              <Row className="mb-3">
              <Col md={12} sm={12}>
                  <Form.Group>
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
              </Row>
              <Row className="mb-3">
              <Col md={12} sm={12}>
                  <Form.Group>
                    <Form.Label>Url</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Url"
                      name="url"
                      value={values.url}
                      onChange={handleChange}
                      isInvalid={!!errors.url}
                    />

                    <Form.Control.Feedback type="invalid">
                      {errors.url}
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

export default TrackersAction;
