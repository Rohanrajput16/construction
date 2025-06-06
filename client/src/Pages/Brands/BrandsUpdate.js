import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from 'react-redux';
import { getBanners, getBrands, updateBanner, updateBrand } from '../../reducers/commonReducer';


const schema = yup.object().shape({
  name: yup.string().required(),
  slug: yup.string().required(),
  description: yup.string().required(),
  image: yup.mixed().required(),
  status: yup.string().required(),
});

function BrandsUpdate(props) {
  const dispatch = useDispatch();
  const {userStatus, brandName, brandslug, branddes, title, brandImage, id} = props;
  const [show, setShow] = useState(false);
  // const [name, setName] = useState(categorieName);
  // const [slug, setSlug] = useState(categorieslug);
  // const [des, setDes] = useState(categoriedes);
  // const [status, setStatus] = useState(userStatus);

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
          onSubmit={async (values, { resetForm }) => {
            await dispatch(updateBrand(values));
            dispatch(getBrands())
          }}
          initialValues={{
            name: brandName,
            slug: brandslug,
            description: branddes,
            status: userStatus,
            image: brandImage,
            id: id
          }}
        >
          {({ handleSubmit, handleChange, values, setFieldValue, errors }) => (
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
                    <Form.Label>Slug</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Slug"
                      name="slug"
                      value={values.slug}
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
              <Row className="mb-3">
                <Col md={6} sm={12}>
                  <Form.Group controlId="validationFormik04">
                    <Form.Label for="myfile">Image</Form.Label>
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

export default BrandsUpdate;