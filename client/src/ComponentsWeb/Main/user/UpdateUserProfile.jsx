import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { resetUsersList } from "../../../reducers/commonReducer";

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(), 
  email: yup.string().required(),
  phone: yup.string().min(10).max(10).required(),
  secondPhone:yup.string().min(10).max(10).required(),
  gst: yup.string(),
  addressline1: yup.string().required(),
  addressline2: yup.string(),
  city: yup.string().required(),
  zipcode: yup.string().min(6).max(6).required(), 
  state: yup.string().required(),
  companyName: yup.string(),
  oldPassword: yup.string(),
  newPassword: yup.string().when("oldPassword", {
    is: (oldPassword) => oldPassword,
    then: yup.string().required("Please confirm your newPassword"),
  }),
  confirmPassword: yup.string().when(["newPassword", "oldPassword"], {
    is: (newPassword, oldPassword) => newPassword || oldPassword,
    then: yup
      .string()
      .required("Please confirm your password")
      .oneOf([yup.ref("newPassword")], "NewPasswords must match"),
  }),
});

function UpdateUserProfile(props) {
  const dispatch = useDispatch();
  const queryParameters = new URLSearchParams(window.location.search);
  const popupStatus = queryParameters.get("popup");
  const { title, getUserProfileList, apiFunction, listApi } = props;
  const [show, setShow] = useState(popupStatus ? popupStatus : false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const { zipcodeCityStateData } = useSelector(
    (state) => state.orderDetailReducer
  );
  const { fetchAddressData } = useSelector((state) => state.commonReducer);
  return (
    <>
      <span className="address-edit" onClick={handleShow}>
        <i className="bi bi-pen"></i>
      </span>
      <Modal show={show} size={"lg"} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Formik
          enableReinitialize={true}
          validationSchema={schema}
          onSubmit={async (values, { resetForm }) => {
            await dispatch(
              // apiFunction ? apiFunction(values) : userProfileUpdate(values)
            );
            await dispatch(resetUsersList());
            setTimeout(() => {
              // dispatch(listApi ? listApi() : getUserProfile());
            }, 500);
            resetForm({ values: "" });
            handleClose();
          }}
          initialValues={{
            id: getUserProfileList?.id,
            spacialuser: getUserProfileList?.spacialuser,
            wallet: getUserProfileList?.wallet,
            firstName: fetchAddressData?.firstname
              ? fetchAddressData?.firstname
              : getUserProfileList?.firstName,
            lastName: fetchAddressData?.lastname
              ? fetchAddressData?.lastname
              : getUserProfileList?.lastName,
            email: fetchAddressData?.email
            ? fetchAddressData?.email
            : getUserProfileList?.email,
            phone: fetchAddressData?.phone
              ? fetchAddressData?.phone
              : getUserProfileList?.phone,
            secondPhone:fetchAddressData?.secondPhone
            ? fetchAddressData?.secondPhone
            : getUserProfileList?.secondPhone,
            gst: fetchAddressData?.gstno
              ? fetchAddressData?.gstno
              : getUserProfileList?.address?.gst,
            addressline1: getUserProfileList?.address?.addressline1,
            addressline2: getUserProfileList?.address?.addressline2,
            city: fetchAddressData?.city
              ? fetchAddressData?.city
              : zipcodeCityStateData?.City
              ? zipcodeCityStateData?.City
              : getUserProfileList?.address?.city,
            zipcode: fetchAddressData?.PinCode
              ? fetchAddressData?.PinCode
              : zipcodeCityStateData?.Pincode
              ? zipcodeCityStateData?.Pincode
              : getUserProfileList?.address?.zipcode,
            state: fetchAddressData?.state
              ? fetchAddressData?.state
              : zipcodeCityStateData?.State
              ? zipcodeCityStateData?.State
              : getUserProfileList?.address?.state,
            companyName: fetchAddressData?.entry_company
              ? fetchAddressData?.entry_company
              : getUserProfileList?.companyName,
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
        >
          {({ handleSubmit, handleChange, values, setFieldValue, errors }) => (
            <Form className="container" onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md={6} sm={12}>
                  <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="FirstName"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      isInvalid={!!errors.firstName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.firstName}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6} sm={12}>
                  <Form.Group>
                    <Form.Label>LastName</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="LastName"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      isInvalid={!!errors.lastName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.lastName}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6} sm={6}>
                  <Form.Group>
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="companyName"
                      name="companyName"
                      value={values.companyName}
                      onChange={handleChange}
                      isInvalid={!!errors.companyName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.companyName}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6} sm={12}>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6} sm={12}>
                  <Form.Group>
                    <Form.Label>Alternate Phone</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Alternate phone"
                      name="secondPhone"
                      value={values.secondPhone}
                      onChange={handleChange}
                      isInvalid={!!errors.secondPhone}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.secondPhone}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6} sm={12}>
                  <Form.Group>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Phone"
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      isInvalid={!!errors.phone}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.phone}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6} sm={12}>
                  <Form.Group>
                    <Form.Label>AddressLine1</Form.Label>
                    <Form.Control
                      type="text"
                      as="textarea"
                      row={3}
                      placeholder="AddressLine1"
                      name="addressline1"
                      value={values.addressline1}
                      onChange={handleChange}
                      isInvalid={!!errors.addressline1}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.addressline1}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6} sm={12}>
                  <Form.Group>
                    <Form.Label>AddressLine2</Form.Label>
                    <Form.Control
                      type="text"
                      as="textarea"
                      row={3}
                      placeholder="AddressLine2"
                      name="addressline2"
                      value={values.addressline2}
                      onChange={handleChange}
                      isInvalid={!!errors.addressline2}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.addressline2}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6} sm={12}>
                  <Form.Group>
                    <Form.Label>PIN Code</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="PIN Code"
                      name="zipcode"
                      value={values.zipcode}
                      onChange={async (e) => {
                        setFieldValue("zipcode", e.target.value);
                        e.target.value?.length === 6 &&
                          dispatch(
                           ({
                              zipcode: e.target.value,
                            })
                          );
                      }}
                      isInvalid={!!errors.zipcode}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.zipcode}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6} sm={12}>
                  <Form.Group>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="City"
                      name="city"
                      value={values.city}
                      onChange={handleChange}
                      isInvalid={!!errors.city}
                      disabled = {localStorage.getItem("slug") == "admin" ? false : true}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.city}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6} sm={12}>
                  <Form.Group>
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="State"
                      name="state"
                      value={values.state}
                      onChange={handleChange}
                      isInvalid={!!errors.state}
                      disabled = {localStorage.getItem("slug") == "admin" ? false : true}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.state}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6} sm={12}>
                  <Form.Group>
                    <Form.Label>GST No</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Gst No"
                      name="gst"
                      value={values.gst}
                      onChange={handleChange}
                      isInvalid={!!errors.gst}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.gst}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              {localStorage.getItem("slug") === "admin" && (
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Label>Special User</Form.Label>
                    <Form.Control
                      as="select"
                      onChange={(e) => {
                        setFieldValue(
                          "spacialuser",
                          /true/.test(e.target.value)
                        );
                      }}
                      name="spacialuser"
                      className="form-control bg"
                      value={values.spacialuser}
                      isInvalid={!!errors.spacialuser}
                    >
                      <option value={false}>Inactive</option>
                      <option value={true}>Active</option>
                    </Form.Control>
                  </Col>
                  {values.spacialuser && (
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Credit Amount</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Amount"
                          name="wallet"
                          value={values.wallet}
                          onChange={handleChange}
                          isInvalid={!!errors.wallet}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.wallet}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  )}
                </Row>
              )}

              <Row className="mb-3">
                {localStorage.getItem("slug") !== "admin" && (
                  <Col md={4} sm={12}>
                    <Form.Group>
                      <Form.Label>Old Password</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="OldPassword"
                        name="oldPassword"
                        value={values.oldPassword}
                        onChange={handleChange}
                        isInvalid={!!errors.oldPassword}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.oldPassword}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                )}

                <Col md={4} sm={12}>
                  <Form.Group>
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="NewPassword"
                      name="newPassword"
                      value={values.newPassword}
                      onChange={handleChange}
                      isInvalid={!!errors.newPassword}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.newPassword}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={4} sm={12}>
                  <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="ConfirmPassword"
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      isInvalid={!!errors.confirmPassword}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmPassword}
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

export default UpdateUserProfile;
