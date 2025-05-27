import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from 'react-redux';
import {  getPermissions,  updatePermission } from '../../reducers/commonReducer';


const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  status: yup.boolean().required(),
});
function PermissionUpdate(props) {
  const dispatch = useDispatch();
  const {permissionName, permissionDesc, permissionStatus, title, id} = props;
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
            updatePermission(values));
            dispatch(getPermissions())
          }}
          initialValues={{
            name: permissionName,
            description: permissionDesc,
            status : permissionStatus,
            id: id
          }}
        >
          {({ handleSubmit, handleChange, setFieldValue, values, errors }) => (
            <Form className="container" onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md={6} sm={12}>
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
              </Row>
              <Row className='mb-3'>
              <Col md={6} sm={12}>
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

export default PermissionUpdate;