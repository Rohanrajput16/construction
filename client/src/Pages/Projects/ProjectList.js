import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Row, Col, Button, InputGroup, Form, Spinner } from 'react-bootstrap';
import { getProjects, deleteProject } from '../../reducers/commonReducer';
import SideMenu from '../../Components/SideMenu';
import UpdateProject from './UpdateProject';

const ProjectList = () => {
  const dispatch = useDispatch();
  const { projectListData, loading } = useSelector((state) => state.commonReducer); // Ensure loading is in your Redux state
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const filteredProjects = projectListData?.filter(project =>
    project.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      await dispatch(deleteProject(id));
      dispatch(getProjects());
    }
  };

  return (
    <>
      <SideMenu />
      <div className="mt-extra content container-fluid">
        <h5>Project List</h5>

        {/* Search and Add Project Buttons */}
        <Row className="mb-3">
          <Col xs={12} md={5}>
            <InputGroup>
              <InputGroup.Text id="inputGroup-sizing-default">
                <i className="bi bi-search"></i>
              </InputGroup.Text>
              <Form.Control
                aria-label="Search"
                placeholder="Search anything..."
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col xs={12} md={2}></Col>
          <Col xs={6} md={12} className="">
            <Link to={`/addProject`}>
              <Button variant="danger" className="w-60 add-project float-right">Add Project</Button>
            </Link>
          </Col>
          {/* <Col xs={6} md={1}>
            <Button variant="danger" onClick={() => setSearch('')} className="w-100">Clear</Button>
          </Col> */}
        </Row>

        {/* Loading state */}
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : (
          <Table responsive="sm" className="table table-scrolling">
            <thead className="normalplace">
              <tr>
                <th className="col-0.5">Sr.No</th>
                <th className="col-3">Name</th>
                <th className="col-4">Description</th>
                <th className="col-2">Total Cost</th>
                <th className="col-2.5">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects && filteredProjects.length > 0 ? (
                filteredProjects.map((data, index) => (
                  <tr key={data.id || index}>
                    <td>{index + 1}.</td>
                    <td>{data.name}</td>
                    <td><b>{data.description}</b></td>
                    <td><b>{data?.totalCost.toFixed(2)}</b></td>
                    <td className="d-flex flex-column flex-sm-row justify-content-between gap-1">
                      <Link to={`/costestimationlist?id=${data?.id}`} className="mb-2 mb-sm-0">
                        <Button variant="danger" className="w-100">Estimation</Button>
                      </Link>
                      <Button
                        className=" w-100 w-sm-auto"
                        variant="danger"
                        onClick={() => handleDelete(data?.id)}  
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                      <UpdateProject
                        id={data.id}
                        pname={data.name}
                        pdescription={data.description}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    <b>No records found 😔.</b>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </div>
    </>
  );
};

export default ProjectList;





