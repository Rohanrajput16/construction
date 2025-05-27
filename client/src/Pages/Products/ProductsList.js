import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SideMenu from "../../Components/SideMenu";
import { Button, Row, InputGroup, Col, Form } from "react-bootstrap";
import moment from "moment";
import {
  getProducts,
} from "../../reducers/commonReducer";
import UpdateProduct from "./UpdateProduct";
import { home } from "../../const";

const ProductsList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState();
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!localStorage.getItem("x-auth-token")) {
      navigate(home);
    }
  }, [navigate]);

  useEffect(() => {
    let timeOut = setTimeout(() => {
      dispatch(
        getProducts({
          search: search,
          categories,
        })
      );
    }, 800);
    return () => clearTimeout(timeOut);
  }, [search, categories, dispatch]);

  const { getProductsData, getCategoriesData } = useSelector(
    (state) => state.commonReducer
  );

  return (
    <>
      <SideMenu />
      <div className="mt-extra content container-fluid">
        <h5>Product List</h5>
        <Row className="mb-2">
          <Col className="estimatecategory">
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

            <Form.Select
              aria-label="Default select example"
              className="ml-3"
              onChange={(e) => {
                dispatch(getProducts({ categories: e.target.value === "" ? null : [e.target.value] }));
                setCategories(e.target.value);
              }}
            >
              <option value="">Select Category</option>
              {!!getCategoriesData?.list &&
                getCategoriesData?.list?.map((data, index) => {
                  return (
                    <option key={index} value={data?.id}>
                      {data?.name} ({data?.codeNo})
                    </option>
                  );
                })}
            </Form.Select>
          </Col>

          <Col md={5}></Col>

          <Col md={2} className="d-flex justify-content-between estimate">
            <Link to="/add-product">
              <Button className="" variant="danger">Add Product</Button>
            </Link>
          </Col>
        </Row>

        {!!getProductsData && getProductsData.length === 0 ? (
          <p className="text-center">
            <b>No record found 😔.</b>
          </p>
        ) : (
          <table className="table mt-4 table-scrolling">
            <thead className="normalplace">
              <tr>
                <th className="over-col-size">Sr. No.</th>
                <th className="over-col-size">Name</th>
                <th className="over-col-size">Description</th>
                <th className="over-col-size">Date</th>
                <th className="over-col-size">Size</th>
                <th className="over-col-size">Price</th>
                <th className="over-col-size">Status</th>
                <th className="over-col-size">Action</th>
              </tr>
            </thead>
            <tbody>
              {!!getProductsData &&
                getProductsData.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}.</td>
                      <td>
                        {data?.name}
                        {data?.alias && (
                          <>
                            <br />
                            <b>({data?.alias})</b>
                          </>
                        )}
                      </td>
                      <td>{data?.description}</td>
                      <td>{moment(data?.createdAt).format("DD/MM/YYYY")}</td>
                      <td>{data?.size}</td>
                      <td>{data?.price}</td>
                      <td>
                        <b>
                          {data?.status === true ? (
                            <span className="text-success">Active</span>
                          ) : (
                            <span className="text-danger">Inactive</span>
                          )}
                        </b>
                      </td>
                      <td>
                        <UpdateProduct
                          pstatus={data?.status}
                          pname={data?.updationName}
                          pweight={data?.weight}
                          pdescription={data?.description}
                          psize={data?.size}
                          pquantity={data?.amountInOneCubicMeter}
                          pprice={data?.price}
                          pcategories={data?.categories}
                          id={data?.id}
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}

        {!!getProductsData && getProductsData.length === 0 ? null : (
          <Row>
            <Button
              onClick={() => {
                setPage(page + 1);
                dispatch(
                  getProducts({
                    search: search,
                    page: page + 1,
                  })
                );
              }}
            >
              Load More
            </Button>
          </Row>
        )}
      </div>
    </>
  );
};

export default ProductsList;

