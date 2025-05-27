import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from 'react-redux';
import {  getPermissions,  getReviews,  updatePermission, updateReview } from '../../reducers/commonReducer';


const schema = yup.object().shape({
  product: yup.string().required(),
  user: yup.string().required(),
  title: yup.string().required(),
  rating: yup.string().required(),
  description: yup.string().required(),
  recommended: yup.boolean().required(),
  status: yup.string().required(),
});
function ReviewUpdate(props) {
  const dispatch = useDispatch();
  const {reviewProduct, reviewUser, reviewTitle, reviewRating, reviewDescription, reviewRecommended, reviewStatus, title, id} = props;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <i className="bi bi-pencil-square"></i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Formik
          validationSchema={schema}
          onSubmit={async (values) => {
            await dispatch(
              updateReview(values));
            dispatch(getReviews())
          }}
          initialValues={{
            product: reviewProduct,
            user: reviewUser,
            title : reviewTitle,
            rating: reviewRating,
            description: reviewDescription,
            recommended: reviewRecommended,
            status: reviewStatus,
            id: id
          }}
        >
          {({ handleSubmit, handleChange, setFieldValue, values, errors }) => (
            <Form className="container" onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md={6} sm={12}>
                  <Form.Group controlId="validationFormik01">
                    <Form.Label>Product</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Product"
                      name="product"
                      value={values.product}
                      onChange={handleChange}
                      isInvalid={!!errors.product}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.product}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6} sm={12}>
                <Form.Group controlId="validationFormik01">
                  <Form.Label>User</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="User"
                    name="user"
                    value={values.user}
                    onChange={handleChange}
                    isInvalid={!!errors.user}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.user}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6} sm={12}>
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
                <Col md={6} sm={12}>
                <Form.Group controlId="validationFormik01">
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Rating"
                    name="rating"
                    value={values.rating}
                    onChange={handleChange}
                    isInvalid={!!errors.rating}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.rating}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              </Row>
              <Row className="mb-3">
              <Col md={6} sm={12}>
                <Form.Group controlId="validationFormik01">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    as="select"
                    controlId="validationFormik03"
                    onChange={async (e) => {
                      setFieldValue("status", e.target.value);
                    }}
                    name="status"
                    className="form-control"
                    value={values.status}
                    isInvalid={!!errors.status}
                  >
                    <option value="">Select status</option>
                    <option value={"Approved"}>Approved</option>
                    <option value={"Waiting Approval"}>Waiting Approval</option>
                    <option value={"Rejected"}>Rejected</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.status}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
                <Col md={6} sm={12}>
                  <Form.Label>Recommended</Form.Label>
                  <Form.Control
                    as="select"
                    controlId="validationFormik03"
                    onChange={async (e) => {
                      setFieldValue("recommended", e.target.value);
                    }}
                    name="recommended"
                    className="form-control"
                    value={values.recommended}
                    isInvalid={!!errors.recommended}
                  >
                    <option value="">Select Recommended</option>
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                  </Form.Control>
                </Col>
              </Row>
              <Row className='mb-3'>
              <Col md={12} sm={12}>
                  <Form.Group controlId="validationFormik01">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Description"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      isInvalid={!!errors.description}
                      as="textarea" rows={3}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.description}
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

export default ReviewUpdate;