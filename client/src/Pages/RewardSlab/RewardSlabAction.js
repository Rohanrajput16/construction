import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { getRewardSlab } from "../../reducers/commonReducer";

const schema = yup.object().shape({
  min: yup.number().required(),
  max: yup.number().required(),
  rate: yup.number().required(),
  status: yup.boolean().required(),
});

function RewardSlabAction({
  title,
  popUpTitle,
  id,
  min,
  max,
  rate,
  status,
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
              dispatch(getRewardSlab());
            }, 500);
            handleClose();
            resetForm();
          }}
          initialValues={{
            min,
            max,
            rate,
            status,
            id
          }}
        >
          {({ handleSubmit, handleChange, setFieldValue, values, errors }) => (
            <Form className="container" onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md={6} sm={6}>
                  <Form.Group>
                    <Form.Label>Min Amount</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Min amount"
                      name="min"
                      value={values.min}
                      onChange={handleChange}
                      isInvalid={!!errors.min}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.min}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6} sm={6}>
                  <Form.Group>
                    <Form.Label>Max Amount</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Max amount"
                      name="max"
                      value={values.max}
                      onChange={handleChange}
                      isInvalid={!!errors.max}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.max}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6} sm={6}>
                  <Form.Group>
                    <Form.Label>Reward</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Reward amount"
                      name="rate"
                      value={values.rate}
                      onChange={handleChange}
                      isInvalid={!!errors.rate}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.rate}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6} sm={12}>
                    <Form.Group>
                      <Form.Label>Status</Form.Label>
                      <Form.Control
                        as="select"
                        onChange={async (e) => {
                          setFieldValue("status",  (/true/).test(e.target.value));
                        }}
                        name="status"
                        className="form-control bg"
                        value={values.status}
                        isInvalid={!!errors.status}
                      >
                        <option value="">Select Status</option>
                        <option value={true}>Active</option>
                        <option value={false}>Inactive</option>
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                          {errors.status}
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

export default RewardSlabAction;
