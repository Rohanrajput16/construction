import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";


function UpdatePage({
  pageDesc,
  pageMetadesc,
  pageScheams,
  pageStatus,
  pageTag,
  pageMetatitle,
  pageid,
}) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [metaTitle, setMetaTitle] = useState(pageMetatitle);
  const [metaTags, setMetaTags] = useState(pageTag);
  const [metaDescription, setMetaDescription] = useState(pageMetadesc);
  const [metaSchema, setMetaSchema] = useState(pageScheams);
  const [description, setDescription] = useState(pageDesc);
  const [status, setStatus] = useState(pageStatus);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <i className="bi bi-pencil-square"></i>
      </Button>

      <Modal show={show} size="lg" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{"Update Page"}</Modal.Title>
        </Modal.Header>
        <Container className="mt-2">
          <Row className="mb-4">
            <Col md={6}>
              <InputGroup size="sm">
                <InputGroup.Text id="inputGroup-sizing-lg">
                  Meta Title
                </InputGroup.Text>
                <Form.Control
                  id="name"
                  aria-label="Large"
                  aria-describedby="inputGroup-sizing-sm"
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={6}>
              <InputGroup size="sm">
                <InputGroup.Text id="inputGroup-sizing-lg">
                  Meta Tags
                </InputGroup.Text>
                <Form.Control
                  id="slug"
                  aria-label="Large"
                  aria-describedby="inputGroup-sizing-sm"
                  type="text"
                  value={metaTags}
                  onChange={(e) => setMetaTags(e.target.value)}
                />
              </InputGroup>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col md={6}>
              <InputGroup size="sm">
                <InputGroup.Text id="inputGroup-sizing-lg">
                  Meta Description
                </InputGroup.Text>
                <Form.Control
                  id="setMetaDescription"
                  aria-label="Large"
                  aria-describedby="inputGroup-sizing-sm"
                  type="text"
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={6}>
              <InputGroup size="sm">
                <InputGroup.Text id="inputGroup-sizing-lg">
                  Meta Schema
                </InputGroup.Text>
                <Form.Control
                  id="slug"
                  aria-label="Large"
                  aria-describedby="inputGroup-sizing-sm"
                  type="text"
                  value={metaSchema}
                  onChange={(e) => setMetaSchema(e.target.value)}
                />
              </InputGroup>
            </Col>
          </Row>
          <CKEditor
            editor={ClassicEditor}
            data={description}
            onReady={(editor) => {
              console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setDescription(data);
              console.log({ event, editor, data });
            }}
            onBlur={(event, editor) => {
              console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              console.log("Focus.", editor);
            }}
          />
          <Row className="mb-4 mt-4">
            <Col md={12}>
              <InputGroup size="sm">
                <InputGroup.Text id="inputGroup-sizing-lg">
                  Status
                </InputGroup.Text>
                <Form.Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option>Select Status</option>
                  <option value={true}>True</option>
                  <option value={false}>False</option>
                </Form.Select>
              </InputGroup>
            </Col>
          </Row>
        </Container>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={async () => {
              await dispatch(
              ({
                  metaTitle,
                  metaTags,
                  metaDescription,
                  metaSchema,
                  description,
                  status,
                  id: pageid,
                })
              );
              handleClose();
              // await dispatch(getPages());
            }}
            type="submit"
          >
            Submit
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdatePage;
