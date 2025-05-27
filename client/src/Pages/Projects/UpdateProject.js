import React, { useState } from 'react';
import { Button, Modal, Form, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { updateProject,getProjects} from "../../reducers/commonReducer";


const schema = yup.object().shape({
  name: yup.string().required("Project name is required"),
  description: yup.string().optional(),
});

const UpdateProject = ({ pname, pdescription, id }) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleClose = () => {
    setShow(false);
    setError(null); // Reset error on close
  };

  const handleShow = () => setShow(true);

  const submit = async (values) => {
    setLoading(true);
    setError(null); // Reset error before update

    const payload = {
      id,
      name: values.name,
      description: values.description,
    };

    try {
      await dispatch(updateProject(payload));
      dispatch(getProjects());
      handleClose();
    } catch (err) {
      setError("Failed to update project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <i className="bi bi-pencil-square"></i>
      </Button>

      <Modal className="modal-xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{"Update Project"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Formik
            enableReinitialize
            validationSchema={schema}
            initialValues={{
              id,
              name: pname || "",
              description: pdescription || "",
            }}
            onSubmit={submit}
          >
            {({
              handleSubmit,
              handleChange,
              values,
              errors,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Project Name</Form.Label>
                      <Form.Control
                        type="text"
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

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Description"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mt-2">
                  <Col md={12} className="text-left">
                    <Button variant="success" type="submit" disabled={loading}>
                      {loading ? <Spinner animation="border" size="sm" /> : "Update Project"}
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UpdateProject;
