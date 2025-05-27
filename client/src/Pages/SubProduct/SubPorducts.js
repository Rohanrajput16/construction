import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideMenu from "../../Components/SideMenu";
import { Button, Col, Row, Form } from "react-bootstrap";
import { CSVLink } from 'react-csv';
import {
  addCustomizeProduct,
  deleteCustomizeProduct,
  getCustomizeProducts,
  updateCustomizeProduct,
  uploadCustomizeProduct,
} from "../../reducers/commonReducer";
import SubPorductAction from "./SubPorductAction";
import moment from "moment";
import { home } from "../../const";

const SubPorducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const [productsFile, setProductsFile] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("x-auth-token")) {
      navigate(home);
    }
    dispatch(getCustomizeProducts());
  }, []);

  const { getCustomizeProductsList } = useSelector(
    (state) => state.commonReducer
  );
  const header = [
    "Sr",
    "Date",
    "Name",
    "Alias",
    "Slug",
    "Categories",
    "Price",
    "Description",
    "Status",
    "Stock",
  ];
const body = [];
!!getCustomizeProductsList?.list && getCustomizeProductsList?.list?.forEach((data, index) => {
    body.push({
      Sr: index + 1,
      Date: moment(data?.createdAt).format("DD/MM/YYYY"),
      Name: data?.name,
      Alias : data?.alias,
      Slug: data?.slug,
      Categories: data?.category,
      Price: data?.price,
      Description: data?.description,
      Status: data?.status === true ? "Active" : "Inactive",
      Stock: data?.stock === true ? "InStock" : "OutOfStock"
      }
    )
}
)
  return (
    <>
      <SideMenu />
      <div className="mt-extra content container-fluid">
        <Row className="mt-1 mb-2">
          <Col md={3}>
              <Form.Select
                onChange={(e) => {
                  dispatch(
                    getCustomizeProducts({
                      category:e.target.value === "all" ? false : e.target.value
                    })
                  );
                }}
                aria-label="Default select example"
              >
                <option value={"all"}>Select Category</option>
                <option value={"Ram"}>Ram</option>
                <option value={"Processor"}>Processor</option>
                <option value={"Storage"}>Storage</option>
                <option value={"Other"}>Other</option>
              </Form.Select>
            </Col>
            <Col md={4}>
              <SubPorductAction
              title="Sub Product"
              popupTitle={"Add Sub Products"}
              api={addCustomizeProduct}
            />
            </Col>
            <Col md={3} className="d-flex">
            <Form.Control
                type="file"
                placeholder="Upload CSV"
                onChange={(e) => setProductsFile(e.target.files[0])}/><Button
                variant="success"
                className="float-right w-50"
                onClick={() => {dispatch(uploadCustomizeProduct({
                  "subproduct" : productsFile
                }))
                setTimeout(() => {
                  dispatch(getCustomizeProducts());
                }, 800)}}
              >
                <i className="bi bi-cloud-arrow-up-fill"></i> CSV
              </Button>
            </Col>
            <Col className="float-right">
              <CSVLink data={body} headers={header} filename={'Pcdeals Hardware SubProducts.csv'}>
                <Button>Export</Button>
              </CSVLink>
            </Col>
        </Row>
        <table className="table table-scrolling ">
          <thead className="normalplace">
            <tr>
              <th className="over-col-size">Sr</th>
              <th className="over-col-size">Name</th>
              <th className="over-col-size">Slug</th>
              <th className="over-col-size">Category</th>
              <th className="over-col-size">Price</th>
              <th className="over-col-size">Description</th>
              <th className="over-col-size">Status</th>
              <th className="over-col-size">Stock</th>
              <th className="over-col-size">Action</th>
            </tr>
          </thead>
          <tbody>
            {!!getCustomizeProductsList?.list &&
              getCustomizeProductsList?.list.map((data, index) => {
                return (
                  <React.Fragment key={index}>
                    <tr key={index}>
                      <td>{index + 1}.</td>
                      <td>{data?.name}
                      {data?.alias && <>
                      <br/><b>({data?.alias})</b></>}
                      </td>
                      <td>{data?.slug}</td>
                      <td>{data?.category}</td>
                      <td>{data?.price} Rs.</td>
                      <td>{data?.description}</td>
                      <td>
                        <b>{data?.status === true ? "True" : "False"}</b>
                      </td>
                      <td>
                        <b>{data?.stock === true ? <span className="text-success">InStock</span> : <span className="text-danger">OutOfStock</span>}</b>
                      </td>
                      <td>
                        <SubPorductAction
                          api={updateCustomizeProduct}
                          popupTitle={"Update Sub Products"}
                          uname={data?.name}
                          ucategory={data?.category}
                          uprice={data?.price}
                          udescription={data?.description}
                          ustatus={data?.status}
                          uid={data?.id}
                          uslug={data?.slug}
                          stock={data?.stock}
                          alias={data?.alias}
                        />
                        <Button
                          className="m-1"
                          variant="danger"
                          onClick={() => {
                            dispatch(deleteCustomizeProduct({ id: data?.id }));
                            setTimeout(() => {
                              dispatch(getCustomizeProducts());
                            }, 500);
                          }}
                        >
                          <i className="bi bi-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SubPorducts;
