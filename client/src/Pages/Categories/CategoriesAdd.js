import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import Select from 'react-select';
import { addCategorie, getCategory } from "../../reducers/commonReducer";

const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  // image: yup.mixed().required(),
  codeNo: yup.number(),
  calculateEstimation: yup.string().required(),
  status: yup.string().required(),
  orderby: yup.string(),
});

function CategoriesAdd(props) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [selectedEstimation, setSelectedEstimation] = useState([]);

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

  const handleChangeest = (selectedOptions, setFieldValue) => {
    const selectedNames = selectedOptions ? selectedOptions.map(option => option.label) :[];
    
    setSelectedEstimation(selectedNames);
    
    setFieldValue('excludedTerm', selectedNames);
    
  
  
    dispatch({
    
      payload: {
        excludedTerm: selectedNames, 
      },
    });
  };

  return (
    <>
    <div className="d-flex justify-content-between">
      <h5>Category List</h5>
      <Button variant="primary" className="float-left" onClick={handleShow}>
        Add Category
      </Button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Formik
          validationSchema={schema}
          onSubmit={async (values, { resetForm }) => {
      
            const payload = {
              ...values,
              excludedTerm: values.excludedTerm, 
            };
            dispatch(addCategorie(payload));
            resetForm({ values: "" });
            dispatch(getCategory());
            handleClose();
          }}
          initialValues={{
            name: "",
            description: "",
            codeNo: " ",
            // area: "",
            calculateEstimation: " ",
            status: "true",
            image: "",
            orderby: "",
            excludedTerm: [], 
          }}
        >
          {({ handleSubmit, handleChange, values, setFieldValue, errors }) => (
            <Form className="container" onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md={12} sm={12}>
                  <Form.Group>
                    <Form.Label htmlFor="name">Name</Form.Label>
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
                    <Form.Label htmlFor="description">Description</Form.Label>
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
                <Col md={6} sm={12}>
                  <Form.Group>
                    <Form.Label htmlFor="codeNo">Code No</Form.Label>
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
                {/* <Col md={4} sm={12}>
                  <Form.Group>
                    <Form.Label htmlFor="area">Area</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Area"
                      name="area"
                      value={values.area}
                      onChange={handleChange}
                      isInvalid={!!errors.area}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.area}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col> */}
                <Col md={6} sm={12}>
                  <Form.Label htmlFor="calculateEstimation">Calculation Type</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={async (e) => {
                      setFieldValue("calculateEstimation", e.target.value);
                    }}
                    name="calculateEstimation"
                    className="form-control"
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
                <Col md={12} sm={12}>
                  <Form.Label>Exclude from Estimation</Form.Label>
                  <Select
                    closeMenuOnSelect={false} // Allows multiple selections
                    isMulti
                    onChange={(selectedOptions) => handleChangeest(selectedOptions, setFieldValue)}
                    options={options}
                    value={options.filter(option => selectedEstimation.includes(option.label))} // Set selected options
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                {/* <Col md={6} sm={12}>
                  <Form.Group>
                    <Form.Label htmlFor="myfile">Image</Form.Label>
                    <Form.Control
                      id="myfile"
                      type="file"
                      name="image"
                      onChange={(event) => {
                        const resumeFile = event.target.files[0];
                        setFieldValue("image", resumeFile);
                      }}
                      isInvalid={!!errors.image}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.image}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col> */}
                <Col md={12} sm={12}>
                  <Form.Label htmlFor="status">Status</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={async (e) => {
                      setFieldValue("status", e.target.value);
                    }}
                    name="status"
                    className="form-control"
                    value={values.status}
                    isInvalid={!!errors.status}
                  >
                    <option value="">Select Status</option>
                    <option value={true}>Active</option>
                    <option value={false}>Inactive</option>
                  </Form.Control>
                </Col>
                {/* <Col md={4} sm={12}>
                  <Form.Group controlId="validationFormik01">
                    <Form.Label>OrderBY</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="orderby"
                      name="orderby"
                      value={values.orderby}
                      onChange={handleChange}
                      isInvalid={!!errors.orderby}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.orderby}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col> */}
              </Row>
              <Modal.Footer>
                <Button variant="success" type="submit" onClick={getCategory}>
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

export default CategoriesAdd;








{/* <Col md={12} sm={12}>
                        <Form.Label> Exclude from Estimation </Form.Label>
                        <Select
                          closeMenuOnSelect={false}
                  =
                          isMulti
                          onChange={(selectedOptions) => {
                            setFieldValue(
                              `estimation`,
                              selectedOptions?.map((data) => data?.value)
                            );
                            dispatch(
                            ({
                                parent: selectedOptions?.map(
                                  (data) => data?.value
                                ),
                              })
                            );
                          }}
                          options={
                            {estimation.map((estimation) => (
                              return {
                                value: data?.id,
                                label: data?.name,
                              };
                            }
                          }
                          defaultValue={
                            {estimation.map((estimation) => (
                              if (values.esti.indexOf(data?.id) != -1) {
                                return {
                                  value: data?.id,
                                  label: data?.name,
                                };
                              }
                            })
                          }
                        />
                      </Col> */}