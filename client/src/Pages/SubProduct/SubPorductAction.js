import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  getAttributes,
  addAttribute,
  getCustomizeProducts,
} from "../../reducers/commonReducer";

const schema = yup.object().shape({
  name: yup.string().required(),
  slug: yup.string().required(),
  description: yup.string().required(),
  status: yup.boolean().required(),
  price: yup.string().required(),
  category: yup.string().required(),
  stock: yup.boolean().required(),
  alias: yup.string(),
});

function SubPorductAction(props) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const {
    title,
    popupTitle,
    api,
    uname,
    ucategory,
    uprice,
    udescription,
    ustatus,
    uid,
    uslug,
    stock,
    alias
  } = props;
  return (
    <>
      <Button className="bg-thememain" onClick={handleShow}>
        {title == "Sub Product" ? (
          <i className="bi bi-plus-lg"></i>
        ) : (
          <i className="bi bi-pen-fill"></i>
        )}{" "}
        {title}
      </Button>

      <Modal show={show} onHide={handleClose} size={"lg"}>
        <Modal.Header closeButton>
          <Modal.Title>{popupTitle}</Modal.Title>
        </Modal.Header>
        <Formik
          validationSchema={schema}
          onSubmit={async (values, { resetForm }) => {
            dispatch(api(values));
            resetForm({ values: "" });
            handleClose();
            setTimeout(() => {
              dispatch(getCustomizeProducts());
            }, 500);
          }}
          initialValues={{
            name: uname,
            slug: uslug,
            description: udescription,
            status: ustatus,
            price: uprice,
            category: ucategory,
            id: uid,
            stock,
            alias
          }}
        >
          {({ handleSubmit, handleChange, values, setFieldValue, errors }) => (
            <Form className="container" onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md={6} sm={12}>
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
                <Col md={6} sm={12}>
                  <Form.Group>
                    <Form.Label>Slug</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Slug"
                      name="slug"
                      value={
                        title == "Sub Product"
                          ? values.name?.length > 0
                            ? (values.slug = values.name
                                .toLowerCase()
                                .replace(/ /g, "-")
                                .replace(/[^\w-]+/g, ""))
                            : ""
                          : uslug
                      }
                      onChange={handleChange}
                      isInvalid={!!errors.slug}
                    />

                    <Form.Control.Feedback type="invalid">
                      {errors.slug}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={4} sm={12}>
                  <Form.Group>
                    <Form.Label>ALIAS</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Alias"
                      name="alias"
                      value={values.alias}
                      onChange={handleChange}
                      isInvalid={!!errors.alias}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.alias}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={4} sm={12}>
                  <Form.Label>Select Category</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={async (e) => {
                      setFieldValue("category", e.target.value);
                    }}
                    name="category"
                    className="form-control"
                    value={values.category}
                    isInvalid={!!errors.category}
                  >
                    <option value="">Select Category</option>
                    <option value={"Processor"}>Processor</option>
                    <option value={"Ram"}>Ram</option>
                    <option value={"Storage"}>Storage</option>
                    <option value={"Other"}>Other</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.category}
                  </Form.Control.Feedback>
                </Col>
                <Col md={4} sm={12}>
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={async (e) => {
                      setFieldValue("stock", /true/.test(e.target.value));
                    }}
                    name="stock"
                    className="form-control"
                    value={values.stock}
                    isInvalid={!!errors.stock}
                  >
                    <option value="">Select Stock</option>
                    <option value={true} className="text-success">InStock</option>
                    <option value={false} className="text-danger">OutOfStock</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.stock}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={12} sm={12}>
                  <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      as="textarea"
                      row={3}
                      placeholder="Description"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      isInvalid={!!errors.description}
                    />

                    <Form.Control.Feedback type="invalid">
                      {errors.description}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6} sm={12}>
                  <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Price"
                      name="price"
                      value={values.price}
                      onChange={handleChange}
                      isInvalid={!!errors.price}
                    />

                    <Form.Control.Feedback type="invalid">
                      {errors.price}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6} sm={12}>
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={async (e) => {
                      setFieldValue("status", /true/.test(e.target.value));
                    }}
                    name="status"
                    className="form-control"
                    value={values.status}
                    isInvalid={!!errors.status}
                  >
                    <option value="">Select Status</option>
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.status}
                  </Form.Control.Feedback>
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

export default SubPorductAction;
