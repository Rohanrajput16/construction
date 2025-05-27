import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import {
  getCustomizeProducts, getUsers, pcDealsConnectAdmin, resetUsersList,
} from "../../../reducers/commonReducer";

const schema = yup.object().shape({
pcdealUserId: yup.string().required(),
  id: yup.string().required()
});

function PcDealsConnectionByAdmin(props) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const {uid, title, pcdealsid} = props;
  return (
    <>
    {
      pcdealsid ? <b onClick={handleShow} className="text-warning">{pcdealsid}</b> :<Button className="bg-thememain" onClick={handleShow}>
      {title} PcDeals
     </Button>
    }
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{`${title} User With PcDeals`}</Modal.Title>
        </Modal.Header>
        <Formik
          validationSchema={schema}
          onSubmit={async (values, { resetForm }) => {
            const result = await dispatch(pcDealsConnectAdmin(values));
            if(result?.payload?.status){
                resetForm({ values: "" });
                handleClose();
                dispatch(resetUsersList());
                dispatch(getUsers())
            }
          }}
          initialValues={{
            pcdealUserId: pcdealsid,
            id:uid
          }}
        >
          {({ handleSubmit, handleChange, values, errors }) => (
            <Form className="container" onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md={12} sm={12}>
                  <Form.Group>
                    <Form.Label>PcDeal UserId</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="PcDeal UserId"
                      name="pcdealUserId"
                      value={values.pcdealUserId}
                      onChange={handleChange}
                      isInvalid={!!errors.pcdealUserId}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.pcdealUserId}
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

export default PcDealsConnectionByAdmin;
