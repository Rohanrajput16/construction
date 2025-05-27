import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FieldArray, Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getShippings } from "../../reducers/commonReducer";

const schema = yup.object().shape({
  state: yup.string().required(),
  id: yup.string(),
});

function ShippingChargeAction({
  title,
  popUpTitle,
  id,
  ustate,
  ucost,
  api,
  stateHide,
}) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const { getAllStatesList } = useSelector((state) => state.commonReducer);
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
            await dispatch(getShippings());
            handleClose();
            resetForm();
          }}
          initialValues={{
            state: ustate,
            cost: ucost
              ? Object.entries(ucost).map(([key, value]) => ({
                  key: key,
                  value: value,
                }))
              : [{ key: "", value: "" }],
            id: id,
          }}
        >
          {({ handleSubmit, handleChange, values, errors }) => (
            <Form className="container" onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md={12} sm={12}>
                  <Form.Group>
                    <Form.Label>Select State</Form.Label>
                    <Form.Control
                      as="select"
                      onChange={handleChange}
                      className="form-control bg"
                      name={`state`}
                      value={values.state}
                      isInvalid={!!errors.state}
                      disabled={stateHide ? true : false}
                    >
                      <option value="">Select State</option>
                      {!!getAllStatesList?.list &&
                        getAllStatesList.list.map((data, index) => {
                          return (
                            <option value={data} key={index}>
                              {data}
                            </option>
                          );
                        })}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={12} sm={12}>
                  <Row>
                    <FieldArray name="cost">
                      {({ remove, push }) => (
                        <>
                          {!!values.cost &&
                            values.cost.map((data, index) => {
                              return (
                                <React.Fragment key={index}>
                                  <Col md={4} sm={12}>
                                    <Form.Label>Enter Kg</Form.Label>
                                    <Form.Control
                                      type="number"
                                      onChange={handleChange}
                                      value={data?.key}
                                      name={`cost.${index}.key`}
                                      className="form-control bg"
                                      isInvalid={!!errors.cost}
                                    />
                                  </Col>
                                  <Col md={4} sm={12}>
                                    <Form.Group>
                                      <Form.Label>Cost Per Kg</Form.Label>
                                      <Form.Control
                                        type="number"
                                        onChange={handleChange}
                                        value={data?.value}
                                        name={`cost.${index}.value`}
                                        className="form-control bg"
                                        isInvalid={!!errors.cost}
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col md={2} sm={12} className="mt-4">
                                    <Button
                                      variant="danger"
                                      onClick={() => remove(index)}
                                    >
                                      <i className="bi bi-trash3-fill"></i>
                                    </Button>
                                  </Col>
                                  <Col md={2} sm={12} className="mt-4">
                                    <Button
                                      variant="success"
                                      onClick={() =>
                                        push({ key: "", value: "" })
                                      }
                                    >
                                      <i className="bi bi-plus-lg"></i>
                                    </Button>
                                  </Col>
                                </React.Fragment>
                              );
                            })}
                        </>
                      )}
                    </FieldArray>
                  </Row>
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

export default ShippingChargeAction;
