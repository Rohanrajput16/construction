import React, { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addCoupon, getCoupons } from "../../reducers/commonReducer";

const schema = yup.object().shape({
  code: yup.string().required(),
  amount: yup.number().required(),
  description: yup.string().required(),
  validupto: yup.date().required(),
  categories: yup.array(),
  users: yup.array(),
  products: yup.array(),
  status: yup.boolean().required(),
  cartValue: yup.string(),
});

function CouponAdd(props) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { getCategoriesData, getUsersData, getProductsData } = useSelector(
    (state) => state.commonReducer
  );
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Coupon
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{"Add Coupon"}</Modal.Title>
        </Modal.Header>
        <Formik
          validationSchema={schema}
          onSubmit={async (values) => {
            await dispatch(addCoupon(values));
            dispatch(getCoupons());
          }}
          initialValues={{
            code: "",
            amount: "",
            description: "",
            status: true,
            validupto: "",
            categories: [],
            products: [],
            users: [],
            cartValue: "",
          }}
        >
          {({ handleSubmit, handleChange, values, errors }) => (
            <Form className="container" onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md={6} sm={12}>
                  <Form.Group controlId="validationFormik01">
                    <Form.Label>Code</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Code"
                      name="code"
                      value={values.code}
                      onChange={handleChange}
                      isInvalid={!!errors.code}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.code}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6} sm={12}>
                  <Form.Group controlId="validationFormik01">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Amount"
                      name="amount"
                      value={values.amount}
                      onChange={handleChange}
                      isInvalid={!!errors.amount}
                    />

                    <Form.Control.Feedback type="invalid">
                      {errors.amount}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6} sm={12}>
                  <Form.Group controlId="validationFormik01">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
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
                <Col md={6} sm={12}>
                  <Form.Group controlId="validationFormik01">
                    <Form.Label>Valid Upto</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Valid Upto"
                      name="validupto"
                      value={values.validupto}
                      onChange={handleChange}
                      isInvalid={!!errors.validupto}
                    />

                    <Form.Control.Feedback type="invalid">
                      {errors.validupto}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6} sm={12}>
                  <Form.Label>Categories</Form.Label>
                  <Form.Control
                    as="select"
                    multiple={true}
                    controlId="validationFormik03"
                    onChange={handleChange}
                    name="categories"
                    className="form-control"
                    value={values.categories}
                    isInvalid={!!errors.categories}
                  >
                    {!!getCategoriesData?.list &&
                      getCategoriesData?.list.map((value, index) => {
                        return (
                          <option value={value?.id} key={index}>
                            {value?.name}
                          </option>
                        );
                      })}
                  </Form.Control>
                </Col>
                <Col md={6} sm={12}>
                  <Form.Label>Users</Form.Label>
                  <Form.Control
                    as="select"
                    multiple={true}
                    controlId="validationFormik03"
                    onChange={handleChange}
                    name="users"
                    className="form-control"
                    value={values.users}
                    isInvalid={!!errors.users}
                  >
                    {!!getUsersData?.list &&
                      getUsersData?.list.map((value, index) => {
                        return (
                          <option value={value?.id} key={index}>
                            {value?.firstName + " " + value?.lastName}
                          </option>
                        );
                      })}
                  </Form.Control>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={12} sm={12}>
                  <Form.Label>Products</Form.Label>
                  <Form.Control
                    as="select"
                    multiple={true}
                    controlId="validationFormik03"
                    onChange={handleChange}
                    name="products"
                    className="form-control"
                    value={values.products}
                    isInvalid={!!errors.products}
                  >
                    {!!getProductsData?.list &&
                      getProductsData?.list.map((value, index) => {
                        return (
                          <option value={value?.id} key={index}>
                            {value?.name}
                          </option>
                        );
                      })}
                  </Form.Control>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6} sm={12}>
                  <Form.Group controlId="validationFormik01">
                    <Form.Label>Cart Value</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="cartValue"
                      name="cartValue"
                      value={values.cartValue}
                      onChange={handleChange}
                      isInvalid={!!errors.cartValue}
                    />

                    <Form.Control.Feedback type="invalid">
                      {errors.cartValue}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6} sm={12}>
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    as="select"
                    controlId="validationFormik03"
                    onChange={handleChange}
                    name="status"
                    className="form-control"
                    value={values.status}
                    isInvalid={!!errors.status}
                  >
                    <option value="">Select Status</option>
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                  </Form.Control>
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

export default CouponAdd;
