import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";

const schema = yup.object().shape({
  product: yup.string().required(),
  title: yup.string(),
  rating: yup.string().required(),
  description: yup.string(),
});

const AddUserReview = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  useEffect(() => {}, []);

  return (
    <>
      <Button
        className="m-1 btn-mbl-text"
        variant="warning"
        onClick={handleShow}
      >
        Post Review
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Col md={12} className="box-shadows mbl-pedding-10 p-5">
          <div className="border-y mb-4">
            <h2 className="mb-0">Write a review..</h2>
          </div>
          <Formik
            validationSchema={schema}
            onSubmit={async (values, { resetForm }) => {
              // dispatch(addUserProductReview(values));
              resetForm({ values: "" });
            }}
            initialValues={{
              product: "",
              title: "",
              rating: "",
              description: "",
            }}
          >
            {({
              handleSubmit,
              handleChange,
              touched,
              setFieldValue,
              values,
              errors,
            }) => (
              <Form className="container" onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col md={12} sm={12}>
                    <Form.Label>Select Product</Form.Label>
                    <Form.Control
                      as="select"
                      onChange={async (e) => {
                        setFieldValue("product", e.target.value);
                      }}
                      name="product"
                      className="form-control"
                      value={values.product}
                      isInvalid={!!errors.product}
                    >
                      {!!props.items &&
                        props.items.map((orders, index) => {
                          return (
                            <React.Fragment key={index}>
                              <option value="">Select Product</option>
                              <option value={orders?.productId?.id}>
                                {orders?.productId?.name}
                              </option>
                            </React.Fragment>
                          );
                        })}
                    </Form.Control>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={6} sm={12}>
                    <Form.Group controlId="validationFormik01">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="title"
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                        isInvalid={!!errors.title}
                        className={errors.title && touched.title && "errors"}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.title}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6} sm={12}>
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      as="select"
                      onChange={async (e) => {
                        setFieldValue("rating", e.target.value);
                      }}
                      name="rating"
                      className="form-control"
                      value={values.rating}
                      isInvalid={!!errors.rating}
                    >
                      <option value="">Select Rating</option>
                      <option value={1}>⭐</option>
                      <option value={2}>⭐⭐</option>
                      <option value={3}>⭐⭐⭐</option>
                      <option value={4}>⭐⭐⭐⭐</option>
                      <option value={5}>⭐⭐⭐⭐⭐</option>
                    </Form.Control>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={12} sm={12}>
                    <Form.Group controlId="validationFormik03">
                      <Form.Label>Enter your comment.</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="description"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        isInvalid={!!errors.description}
                        className={errors.description && "errors"}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.description}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Modal.Footer>
                  <Button
                    variant="success"
                    className="bg-thememain"
                    type="submit"
                  >
                    Post Your Review <i className="bi bi-pen"></i>
                  </Button>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </Col>
      </Modal>
    </>
  );
};

export default AddUserReview;
