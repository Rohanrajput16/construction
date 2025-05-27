import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row } from "react-bootstrap";

const SubProductDetail = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {des, name, sku, salesprice, priceMrp} = props;
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        View
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <h5 className='sub-product-price'><b>Rs.</b> <span className='font-weight-bold-price discount-color'>{salesprice}</span> <span className='old'>Rs. {priceMrp}</span></h5>
            <h5 className='sub-product-price'><b>SKU:</b> {sku}</h5>
          </Row>
          <Row dangerouslySetInnerHTML={{__html: !!des && des}}></Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SubProductDetail;