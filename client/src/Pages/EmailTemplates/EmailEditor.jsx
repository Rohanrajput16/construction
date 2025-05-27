import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Button, Col, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useDispatch, useSelector } from "react-redux";


const EmailEditor = ({ desc, emailSub, tabid }) => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState(desc);
  const [emailSubject, setEmailSubject] = useState(emailSub);
  return (
    <>
      <Row className="mb-4">
        <Col>
        <h3 className="mb-0"><b>Subject:</b> {emailSub}</h3>
          <InputGroup size="lg">
            <InputGroup.Text id="inputGroup-sizing-lg">Subject</InputGroup.Text>
            <Form.Control
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              placeholder="Updated your subject."
              type="text" value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>
      <CKEditor
        editor={ClassicEditor}
        data={!!desc && desc}
        onReady={(editor) => {
          // console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setDescription(data)
          // console.log({ event, editor, data });
        }}
        onBlur={(event, editor) => {
          // console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          // console.log("Focus.", editor);
        }}
      />
      <Button variant="success" className="mt-3" onClick={() => {
        dispatch(({
          description,
          id:tabid,
          subject:emailSubject
        }))
      }}>Submit</Button>
    </>
  );
};

export default EmailEditor;
