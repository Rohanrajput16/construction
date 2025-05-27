import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getAttributes, updateAttribute } from '../../reducers/commonReducer';

function AttributeUpdate(props) {
  const dispatch = useDispatch();
  const {distributorUpdateMsg} = useSelector((state) => state.commonReducer);
  const {userStatus, attributName, attributslug, attributdes, title, id} = props;
  const [show, setShow] = useState(false);
  const [name, setName] = useState(attributName);
  const [slug, setSlug] = useState(attributslug);
  const [des, setDes] = useState(attributdes);
  const [status, setStatus] = useState(userStatus);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const updateUser = async() => {
    await dispatch(
        updateAttribute({
            name, slug, description : des, status, id
        })
    )
    dispatch(
      getAttributes()
    )
    setShow(false)
  }
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <i className="bi bi-pencil-square"></i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Form.Group className="p-3">
            <Form.Label>Name</Form.Label>
            <Form.Control value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        <Form.Group className="p-3">
            <Form.Label>Slug</Form.Label>
            <Form.Control value={slug} onChange={(e) => setSlug(e.target.value)} />
        </Form.Group>
        <Form.Group className="p-3">
            <Form.Label>Description</Form.Label>
            <Form.Control value={des} onChange={(e) => setDes(e.target.value)} />
        </Form.Group>
        <Form.Group className="p-3">
            <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>Select Status</option>
            <option value={true}>True</option>
            <option value={false}>False</option>
            </Form.Select>
        </Form.Group>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateUser}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AttributeUpdate;