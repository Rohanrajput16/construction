import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideMenu from "../../Components/SideMenu";
import { FieldArray, Formik } from "formik";
import * as yup from "yup";
import {addUpdateCustomizeOffers, addUpdateOffers, getCustomizeOffers, getOffers} from "../../reducers/commonReducer";
import { Button, Col, Container, Form,Row } from "react-bootstrap";
import { home } from "../../const";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const schema = yup.object().shape({
  // state: yup.string().required(),
  // id: yup.string(),
});

const OffersList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!localStorage.getItem("x-auth-token")) {
      navigate(home);
    }
    dispatch(getOffers())
    dispatch(getCustomizeOffers())
  }, []);

  const { getOffersData, getCustomizeOffersData } = useSelector((state) => state.commonReducer);
  return (
    <>
      <SideMenu />
      <div className="mt-extra content container-fluid">
      <Container>
      <h2 className="text-danger">CheckOut PageOffers</h2>
      <hr/>
      </Container>
      <Formik
          enableReinitialize={true}
          validationSchema={schema}
          onSubmit={async (values, { resetForm }) => {
            await dispatch(addUpdateOffers(values));
            await dispatch(getOffers());
          }}
          initialValues={{
            description: getOffersData?.description ? getOffersData?.description : '',
            offers: getOffersData?.offers
            ? getOffersData?.offers?.map((data) => {
              return({
                value : data?.value,
                color : data?.color,
                status : data?.status
              })
            })
            : [{ value: "", color: "", status: "" }],
          }}
        >
          {({ handleSubmit, handleChange, setFieldValue, values, errors }) => (
            <Form className="container" onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md={12} sm={12}>
                  <Row>
                    <FieldArray name="offers">
                      {({ remove, push }) => (
                        <>
                          {!!values.offers &&
                            values.offers.map((data, index) => {
                              return (
                                <React.Fragment key={index}>
                                  <Col md={6} sm={12}>
                                    <Form.Label>Add Offer</Form.Label>
                                    <Form.Control
                                      type="text"
                                      onChange={handleChange}
                                      value={data?.value}
                                      name={`offers.${index}.value`}
                                      className="form-control bg"
                                      isInvalid={!!errors.offers}
                                    />
                                  </Col>
                                  <Col md={2} sm={12}>
                                    <Form.Group>
                                      <Form.Label>Color Code</Form.Label>
                                      <Form.Control
                                        type="text"
                                        onChange={handleChange}
                                        value={data?.color}
                                        name={`offers.${index}.color`}
                                        className="form-control bg"
                                        isInvalid={!!errors.offers}
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col md={2} sm={2}>
                                    <Form.Group>
                                      <Form.Label>Select Status</Form.Label>
                                      <Form.Control
                                        as="select"
                                        onChange={handleChange}
                                        className="form-control bg"
                                        name={`offers.${index}.status`}
                                        value={data.status}
                                        isInvalid={!!errors.status}
                                      >
                                        <option value="">Select Status</option>
                                        <option value={true}>Active</option>
                                        <option value={false}>InActive</option>
                                      </Form.Control>
                                    </Form.Group>
                                  </Col>
                                  <Col md={1} sm={12} className="mt-4">
                                    <Button
                                      variant="danger"
                                      onClick={() => remove(index)}
                                    >
                                      <i className="bi bi-trash3-fill"></i>
                                    </Button>
                                  </Col>
                                  <Col md={1} sm={12} className="mt-4">
                                    <Button
                                      variant="success"
                                      onClick={() =>
                                        push({ value: "", color: "", status: "" })
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
              <Row className="mb-3">
                  <Col md={12} sm={12}>
                    <CKEditor
                      editor={ClassicEditor}
                      data={
                        getOffersData?.description
                          ? getOffersData?.description
                          : "Enter Your Product Description......"
                      }
                      onReady={(editor) => {
                        console.log("Editor is ready to use!", editor);
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setFieldValue("description", data);
                        console.log({ event, editor, data });
                      }}
                      onBlur={(event, editor) => {
                        console.log("Blur.", editor);
                      }}
                      onFocus={(event, editor) => {
                        console.log("Focus.", editor);
                      }}
                    />
                  </Col>
                </Row>
              <Row>
                <Button variant="success" type="submit">
                  Submit
                </Button>
              </Row>
            </Form>
          )}
        </Formik>
        {/* customize offer */}
      <Container className="mt-5">
      <h2 className="text-danger">Custom Product Offers(Product Page)</h2>
      <hr/>
      </Container>
      <Formik
          enableReinitialize={true}
          validationSchema={schema}
          onSubmit={async (values) => {
            await dispatch(addUpdateCustomizeOffers(values));
            await dispatch(getCustomizeOffers());
          }}
          initialValues={{
            description: getCustomizeOffersData?.description ? getCustomizeOffersData?.description : '',
            offers: getCustomizeOffersData?.offers
            ? getCustomizeOffersData?.offers?.map((data) => {
              return({
                value : data?.value,
                color : data?.color,
                status : data?.status
              })
            })
            : [{ value: "", color: "", status: "" }],
          }}
        >
          {({ handleSubmit, handleChange, setFieldValue, values, errors }) => (
            <Form className="container" onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md={12} sm={12}>
                  <Row>
                    <Col md={12} sm={12}>
                        <Form.Label>Heading</Form.Label>
                          <Form.Control
                            type="text"
                            onChange={handleChange}
                            value={values.description}
                            name={'description'}
                            className="form-control bg"
                            isInvalid={!!errors.description}
                          />
                      </Col>
                  </Row>
                  <Row>
                    <FieldArray name="offers">
                      {({ remove, push }) => (
                        <>
                          {!!values.offers &&
                            values.offers.map((data, index) => {
                              return (
                                <React.Fragment key={index}>
                                  <Col md={6} sm={12}>
                                    <Form.Label>Add Offer</Form.Label>
                                    <Form.Control
                                      type="text"
                                      onChange={handleChange}
                                      value={data?.value}
                                      name={`offers.${index}.value`}
                                      className="form-control bg"
                                      isInvalid={!!errors.offers}
                                    />
                                  </Col>
                                  <Col md={2} sm={12}>
                                    <Form.Group>
                                      <Form.Label>Color Code</Form.Label>
                                      <Form.Control
                                        type="text"
                                        onChange={handleChange}
                                        value={data?.color}
                                        name={`offers.${index}.color`}
                                        className="form-control bg"
                                        isInvalid={!!errors.offers}
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col md={2} sm={2}>
                                    <Form.Group>
                                      <Form.Label>Select Status</Form.Label>
                                      <Form.Control
                                        as="select"
                                        onChange={handleChange}
                                        className="form-control bg"
                                        name={`offers.${index}.status`}
                                        value={data.status}
                                        isInvalid={!!errors.status}
                                      >
                                        <option value="">Select Status</option>
                                        <option value={true}>Active</option>
                                        <option value={false}>InActive</option>
                                      </Form.Control>
                                    </Form.Group>
                                  </Col>
                                  <Col md={1} sm={12} className="mt-4">
                                    <Button
                                      variant="danger"
                                      onClick={() => remove(index)}
                                    >
                                      <i className="bi bi-trash3-fill"></i>
                                    </Button>
                                  </Col>
                                  <Col md={1} sm={12} className="mt-4">
                                    <Button
                                      variant="success"
                                      onClick={() =>
                                        push({ value: "", color: "", status: "" })
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
              <Row>
                <Button variant="success" type="submit">
                  Submit
                </Button>
              </Row>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default OffersList;
