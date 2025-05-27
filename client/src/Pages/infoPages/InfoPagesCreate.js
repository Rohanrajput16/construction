import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import UploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter";
import { Button, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useDispatch } from "react-redux";


const InfoPagesCreate = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState();
  const [slug, setSlug] = useState();
  const [metaTitle, setMetaTitle] = useState();
  const [metaTags, setMetaTags] = useState();
  const [metaDescription, setMetaDescription] = useState();
  const [metaSchema, setMetaSchema] = useState();
  const [description, setDescription] = useState();
  useEffect(() => {
    !!name && setSlug(name.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
  }, [name]);
  return (
    <>
      <Row className="mb-4">
        <Col md={6}>
          <InputGroup size="sm">
            <InputGroup.Text id="inputGroup-sizing-lg">Name</InputGroup.Text>
            <Form.Control
              id="name"
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={6}>
          <InputGroup size="sm">
            <InputGroup.Text id="inputGroup-sizing-lg">Slug</InputGroup.Text>
            <Form.Control
              id="slug"
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              type="text"
              value={slug}
            />
          </InputGroup>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={6}>
          <InputGroup size="sm">
            <InputGroup.Text id="inputGroup-sizing-lg">
              Meta Title
            </InputGroup.Text>
            <Form.Control
              id="metaTitle"
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
              id="metaTags"
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
              id="metaDescription"
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
              id="metaSchema"
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
        // config={{
        //   ckfinder: {
        //     // Upload the images to the server using the CKFinder QuickUpload command.
        //     uploadUrl: "/api/editor",
        //     // dispatch(ckEditorImages({
        //     //   // image:
        //     // })),
        //   },
        // }}
        data={""}
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
      <Button
        variant="success"
        className="mt-3"
        // onClick={() => {
        //   dispatch(
        //     addNewPage({
        //       name,
        //       description,
        //       slug,
        //       meta_title: metaTitle,
        //       meta_tags: metaTags,
        //       meta_description: metaDescription,
        //       meta_schema: metaSchema,
        //     })
        //   );
        // }}
      >
        Submit
      </Button>
    </>
  );
};

export default InfoPagesCreate;
