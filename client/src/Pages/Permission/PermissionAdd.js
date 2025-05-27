import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch} from 'react-redux';
import { addPermission, addSetting, getPermissions, getSettings} from '../../reducers/commonReducer';


const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  status: yup.boolean().required(),
});

function PermissionAdd(props) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add New Permission
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{"Add Setting"}</Modal.Title>
        </Modal.Header>
        <Formik
          validationSchema={schema}
          onSubmit={async (values) => {
            await dispatch(
              addPermission(values));
            dispatch(getPermissions())
          }}
          initialValues={{
            name: '',
            description: '',
            status : ''
          }}
        >
          {({ handleSubmit, handleChange, values, errors, setFieldValue }) => (
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

export default PermissionAdd;