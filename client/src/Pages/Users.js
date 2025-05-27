import React, { useEffect, useState } from "react";
import { Button, Row, Form, InputGroup, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CSVLink } from 'react-csv';
import SideMenu from "../Components/SideMenu";
import {
  editProfileByAdmin,
  getUsers,
  getUsersExport,
  resetUsersList,
  uploadUsers,
} from "../reducers/commonReducer";
import UpdateUserProfile from "../ComponentsWeb/Main/user/UpdateUserProfile";
import moment from "moment";
import ExportData from "../helpers/ExportData";
import PcDealsConnectionByAdmin from "../ComponentsWeb/Main/user/PcDealsConnectionByAdmin";

const Users = () => {
  const [search, setSearch] = useState();
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const [userStatus, setUserStatus] = useState();
  const [usersFile, setUsersFile] = useState();

  useEffect(() => {
    dispatch(resetUsersList());
    dispatch(getUsersExport())
    let timeOut = setTimeout(() => {
      dispatch(
        getUsers({
          search: search,
        })
      );
    }, 800);
    return () => clearTimeout(timeOut);
  }, [search]);
  const { getUsersData, usersBlank, getUsersExportList } = useSelector(
    (state) => state.commonReducer
  );
  const header = [
    "CustomerId",
    "PcDealsID",
    "Name",
    "CompanyName",
    "Mobile",
    "AlternateNo",
    "Email",
    "GST",
    "City",
    "State",
    "PINCode",
    "Address",
    "RegistrationDate"
  ];
  let body = [];
  !!getUsersExportList && getUsersExportList?.map((data, index) => {
    body.push({
      CustomerId: data?.customerId,
      PcDealsID: data?.pcdealUserId,
      Name: data?.firstName + " " + data?.lastName,
      CompanyName: data?.companyName,
      Mobile: data?.phone,
      AlternateNo: data?.secondPhone,
      Email: data?.email,
      GST: data?.address?.gst,
      City: data?.address?.city,
      State: data?.address?.state,
      PINCode: data?.address?.zipcode,
      Address: data?.address?.addressline1 + ", " + data?.address?.addressline2,
      RegistrationDate: moment(data?.createdAt).format("DD/MM/YYYY"),
    });
  });
  return (
    <>
      <SideMenu />
      <div className="mt-extra content container-fluid">
        <Row className="mb-1">
          <Col md={4}>
            <InputGroup>
              <InputGroup.Text id="inputGroup-sizing-default">
                <i className="bi bi-search"></i>
              </InputGroup.Text>
              <Form.Control
                aria-label="Default"
                placeholder="Search anything..."
                aria-describedby="inputGroup-sizing-default"
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col md={3}>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => {
                dispatch(resetUsersList());
                setUserStatus(/true/.test(e.target.value));
                dispatch(
                  getUsers({
                    updatedUser: /true/.test(e.target.value),
                  })
                );
                dispatch(getUsersExport({
                  updatedUser:userStatus
                }))
              }}
            >
              <option>User Updated Alert</option>
              <option value={false}>Verified</option>
              <option value={true}>Pending</option>
            </Form.Select>
          </Col>
          <Col md={4} className="d-flex">
          <Form.Control
              type="file"
              placeholder="Upload CSV"
              onChange={(e) => setUsersFile(e.target.files[0])}/> <Button
              variant="success"
              className="float-right w-50"
              onClick={() => {dispatch(uploadUsers({
                "users" : usersFile
              }))
              setTimeout(() => {
                dispatch(resetUsersList());
                dispatch(getUsers());
              }, 800)}}
            >
              <i className="bi bi-cloud-arrow-up-fill"></i> CSV
            </Button>
          </Col>
          <Col md={1}>
            <CSVLink data={body} headers={header} filename={'Pcdeals Hardware Users.csv'}>
              <Button>Export</Button>
            </CSVLink>
          </Col>
        </Row>
        <table className="table mt-4 w-100">
          <thead>
            <tr>
              <th>Customer Id</th>
              <th>PcDeals ID</th>
              <th>Personal Info</th>
              <th>Order Address</th>
              {/* <th>Status</th> */}
              <th>UserOrders</th>
            </tr>
          </thead>
          <tbody>
            {!!getUsersData &&
              getUsersData?.map((data, index) => {
                return (
                  <React.Fragment key={index}>
                    <tr key={data?.id}>
                      <td>{data?.customerId}</td>
                      <td>
                      {
                        data?.pcdealUserId ? <>
                        {/* <span className="text-warning"><b>{data?.pcdealUserId}</b></span> */}
                        <PcDealsConnectionByAdmin uid={data?.id} title={"Update"} pcdealsid={data?.pcdealUserId}/>
                        </>
                         : 
                        <PcDealsConnectionByAdmin uid={data?.id} title={"Connect"}/>
                      }
                      </td>
                      <td>
                        <p className="mb-0">
                          <b>Name: </b>
                          <b
                            className={`${data?.spacialuser && `text-success`}`}
                          >
                            {data?.firstName + " " + data?.lastName}
                          </b>
                        </p>
                        <p className="mb-0">
                          <b>Company Name: </b>
                          {data?.companyName}
                        </p>
                        <p className="mb-0">
                          <b>Email: </b>
                          {data?.email}
                        </p>
                        <p className="mb-0">
                          <b>Mobile: </b>
                          {data?.phone}
                        </p>
                        <p className="mb-0">
                          <b>AlternatePhone: </b>
                          {data?.secondPhone}
                        </p>
                        <p className="mb-0">
                          <b>GST No: </b>
                          {data?.address?.gst}
                        </p>
                        <p className="mb-0">
                          <b>Status: {data?.status === true ? (
                            <span className="text-success">Active</span>
                          ) : (
                            <span className="text-danger">Inactive</span>
                          )}</b>
                        </p>
                        {!!data?.wallet && (
                          <p className="mb-0">
                            <b>Credit amount: </b>
                            {data?.wallet}Rs.
                          </p>
                        )}
                      </td>
                      <td>
                        <p className="mb-0">
                          <b>Name: </b>
                          {data?.firstName +
                            " " +
                            data?.lastName}
                        </p>
                        <p className="mb-0">
                          <b>Address: </b>
                          {`${data?.address?.addressline1 ? data.address.addressline1 : ''} ${data?.address?.addressline2 ? data.address.addressline2 : ""}`}
                        </p>
                        <p className="mb-0">
                          <b>PIN Code: </b>
                          {data?.address?.zipcode}
                        </p>
                        <p className="mb-0">
                          <b>City: </b>
                          {data?.address?.city}
                        </p>
                        <p className="mb-0">
                          <b>State: </b>
                          {data?.address?.state}
                        </p>
                      </td>
                      <td>
                        <Link to={`/orders/${data?.id}`}>
                          <Button variant="success">Orders</Button>
                        </Link>
                        {userStatus && (
                          <Button
                            variant="warning"
                            onClick={async () => {
                              await dispatch(
                                editProfileByAdmin({
                                  id: data?.id,
                                  updatedUser: false,
                                })
                              );
                              await dispatch(
                                getUsers({
                                  updatedUser: userStatus,
                                })
                              );
                            }}
                          >
                            Verified
                          </Button>
                        )}

                        <UpdateUserProfile
                          title={"Update User Details"}
                          getUserProfileList={data}
                          apiFunction={editProfileByAdmin}
                          listApi={getUsers}
                        />
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
          </tbody>
        </table>
        {!!usersBlank && usersBlank.length > 0 ? (
          <Row>
            <Button
              onClick={() => {
                setPage(page + 1);
                dispatch(
                  getUsers({
                    search: search,
                    page: page + 1,
                    updatedUser: userStatus,
                  })
                );
              }}
            >
              Load More
            </Button>
          </Row>
        ) : (
          <p className="text-center">
            <b>No record found 😔.</b>
          </p>
        )}
      </div>
    </>
  );
};

export default Users;
