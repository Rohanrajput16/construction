import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { getCategory, updateCategorie } from "../../reducers/commonReducer";
import Select from 'react-select';

const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  status: yup.string().required(),
  // orderby: yup.string(),
});

function CategoriesUpdate({
  userStatus,
  categorieName,
  calculateEstimation,
  codeNo,
  catorderby,
  categoriedes,
  title,
  parent,
  catImage,
  id,
  excludedTerm,
}) {
  const queryParameters = new URLSearchParams(window.location.search);
  const categId = queryParameters.get("catId");
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const estimationOptions = [
    { id: 1, name: 'Size (mm)' },
    { id: 2, name: 'No1' },
    { id: 3, name: 'No2' },
    { id: 4, name: 'No3' },
    { id: 5, name: 'Length' },
    { id: 6, name: 'Width' },
    { id: 7, name: 'Height' },
    { id: 8, name: 'Volume (Feet)' },
    { id: 9, name: 'Volume (Meter)' }, 
    { id: 10, name: 'Weight' },
    { id: 11, name: 'Rate' },
  ];

  const options = estimationOptions.map(item => ({
    value: item.id,
    label: item.name,
  }));

  const initialExcludedTerms = excludedTerm[0]?.split(',').map(term => term.trim()) || [];
  const [selectedEstimation, setSelectedEstimation] = useState(initialExcludedTerms);

  const handleChangeest = (selectedOptions, setFieldValue) => {
    const selectedNames = selectedOptions ? selectedOptions.map(option => option.label) : [];
    setSelectedEstimation(selectedNames);
    setFieldValue('excludedTerm', selectedNames);
  };

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
          onSubmit={async (values, { resetForm }) => {
            try {
              await dispatch(updateCategorie(values)); // Dispatching the update action with form values
              categId ? dispatch(getCategory({ parent: categId })) : dispatch(getCategory()); // Fetching categories based on the presence of a `categId`
              resetForm(); // Resetting the form to initial state
              handleClose(); // Closing the modal or form after successful submission
            } catch (error) {
              console.error("Failed to update category:", error); // Logging any error that occurs during the process
            }
          }}
          
          initialValues={{
            parent: parent || "",
            name: categorieName,
            calculateEstimation,
            codeNo,
            description: categoriedes,
            status: userStatus,
            image: catImage,
            orderby: catorderby,
            id,
            excludedTerm: initialExcludedTerms,
          }}
        >
          {({ handleSubmit, handleChange, values, setFieldValue, errors }) => (
            <Form className="container" onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md={12}>
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
              </Row>
              <Row className="mb-3">
                <Col md={12}>
                  <Form.Group controlId="validationFormik02">
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
              </Row>
              <Row className="mb-3">
                <Col md={12}>
                  <Form.Label>Exclude from Estimation</Form.Label>
                  <Select
                    closeMenuOnSelect={false}
                    isMulti
                    onChange={(selectedOptions) => handleChangeest(selectedOptions, setFieldValue)}
                    options={options}
                    value={options.filter(option => selectedEstimation.includes(option.label))}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Code No</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Code No"
                      name="codeNo"
                      value={values.codeNo}
                      onChange={handleChange}
                      isInvalid={!!errors.codeNo}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.codeNo}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Label>Calculation Type</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={e => setFieldValue("calculateEstimation", e.target.value)}
                    name="calculateEstimation"
                    value={values.calculateEstimation}
                    isInvalid={!!errors.calculateEstimation}
                  >
                    <option value="">Select type</option>
                    <option value={1}>Volume</option>
                    <option value={2}>Area</option>
                    <option value={0}>Length</option>
                  </Form.Control>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={e => setFieldValue("status", e.target.value)}
                    name="status"
                    value={values.status}
                    isInvalid={!!errors.status}
                  >
                    <option value="">Select Status</option>
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                  </Form.Control>
                </Col>
                
                <Col md={6}>
                  <Form.Group controlId="validationFormik03">
                    <Form.Label>Order BY</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Order BY"
                      name="orderby"
                      value={values.orderby  || ""}
                      onChange={handleChange}
                      isInvalid={!!errors.orderby}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.orderby}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Modal.Footer>
                <Button variant="success" type="submit" onClick={getCategory}>Submit</Button>
                <Button variant="danger" onClick={handleClose}>Close</Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
}

export default CategoriesUpdate;

