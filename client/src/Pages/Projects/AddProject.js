import React, { useState } from 'react';
import SideMenu from "../../Components/SideMenu";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { addProject, getProjects } from '../../reducers/commonReducer';
import { Link, useNavigate } from "react-router-dom";

const AddProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: '',
    slug: '',
    status: true,
    SoftDelete: '', 
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addProject(formValues));
      await dispatch(getProjects());
      navigate("/projectlist"); 
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  return (
    <>
      <SideMenu />
      <div className="mt-extra content container-fluid">
        <Link to={"/projectlist"}>
          <h5>
            <i className="bi bi-arrow-left"></i> Project List
          </h5>
        </Link>
        <Row className="mb-3 products-design">
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={12} sm={12}>
                <Form.Group>
                  <Form.Label>Project Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    className="form-control bg"
                    value={formValues.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={12} sm={12}>
                <Form.Group>
                  <Form.Label htmlFor="description">Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Description"
                    name="description"
                    value={formValues.description}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
              
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit">
              Add Project
            </Button>
          </Form>
        </Row>
      </div>
    </>
  );
};

export default AddProject;


