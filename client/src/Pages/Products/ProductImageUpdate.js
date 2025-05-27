import React, { useState } from "react";
import { Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import AddProductImages from "./AddProductImages";
const schema = yup.object().shape({
  images: yup.mixed().required(),
});

function ProductImageUpdate(props) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <img
        onClick={handleShow}
        className="tbl-img cursor-pointer"
        src={`/${props?.images[props?.dimg]}`}
      />
      <Modal size="xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{"Update Product Images"}</Modal.Title>
        </Modal.Header>
        <Row className="p-4">
          <AddProductImages
            pImages={props?.images}
            pID={props?.productId}
            dfltImg={props?.dimg}
          />
        </Row>
      </Modal>
    </>
  );
}

export default ProductImageUpdate;
