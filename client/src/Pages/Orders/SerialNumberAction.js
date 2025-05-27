import { useState } from 'react';
import {Button, Form, Row, Col} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from "react-redux";
import { OrderSerialNumbers } from '../../reducers/commonReducer';


function SerialNumberAction({productId, orderId, orderid, serialNumbers}) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [serialNumber, setSerialNumber] = useState(serialNumbers?.map((item) => item));
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const onSubmit = async() => {
    const apiResult = await dispatch(OrderSerialNumbers({
      number : serialNumber?.split(","),
      productId, orderid
    }))
    if(apiResult?.payload?.status){
      orderId && dispatch(({ id: orderId }));
      setShow(false)
    }
  };
  return (
    <>
      <Button variant="info" onClick={handleShow} className='print-hide float-right px-2 py-1'>
      <i className="bi bi-pen-fill"></i>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Serial Numbers</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col md={12}>
                    <Form.Group className="mb-3" controlId="SerialNumbers">
                        <Form.Label>Serial Numbers  (<span className='text-danger'>eg:- pc232,pc233*</span>)</Form.Label>
                        <Form.Control value={serialNumber} onChange={(e) => {
                          setSerialNumber(e?.target?.value)
                        }} placeholder='Enter Serial Numbers....' as="textarea" rows={3} />
                    </Form.Group>  
                </Col>
            </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={onSubmit}>
            Save
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SerialNumberAction;