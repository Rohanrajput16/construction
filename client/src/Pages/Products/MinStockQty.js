import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SideMenu from "../../Components/SideMenu";
import { Button, Row, InputGroup, Col, Form } from "react-bootstrap";
import moment from "moment";
import { CSVLink } from 'react-csv';
import {
  productsList,
  getAttributes,
  getTaxgsts,
  getWarrantyProccesses,
  getWarranty,
  getCustomizeEnabledProducts,
  resetProductList,
  uploadProducts,
  getCategories,
  productsListExport,
} from "../../reducers/commonReducer";
import UpdateProduct from "./UpdateProduct";

import ProductImageUpdate from "./ProductImageUpdate";
import { home } from "../../const";

const MinStockQty = () => { 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState();
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [productsFile, setProductsFile] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem("x-auth-token")) {
      navigate(home);
    }
    dispatch(productsListExport({
      minStock : true
    }));
    // dispatch(getCategoriesFrontEnd());
    dispatch(getAttributes());
    dispatch(getTaxgsts());
    dispatch(getWarrantyProccesses());
    // dispatch(getBrandsFrontend());
    dispatch(getWarranty());
    dispatch(getCustomizeEnabledProducts());
    dispatch(getCategories())
  }, []);
  useEffect(() => {
    let timeOut = setTimeout(() => {
      dispatch(resetProductList());
      dispatch(
        productsList({
          search: search,
          categories,
          minStock : true
        })
      );
    }, 800);
    return () => clearTimeout(timeOut);
  }, [search]);
  const { productsListData,getCategoriesData,productsListExportData, productsBlank } = useSelector(
    (state) => state.commonReducer
  );
  const header = [
    "Sr",
    "Name",
    "Slug",
    "Date",
    "Quantity",
    "Mrp",
    "QuantityAndPrice",
    "Weight",
    "Orderby",
    "Minqty",
    "Maxqty",
    "minStockQty",
    "ProductType",
    "Stock",
    "HotSelling",
    "Status",
  ];
  let body = [];
  !!productsListExportData && productsListExportData.map((data, index) => {
    const quantityAndPrice = !!data?.price ? Object.entries(data?.price)?.map(([key, value]) => `${key}:${value}`).join(',') + ',' : '';
    body.push({
      Sr: index + 1,
      Name: data.name,
      Slug: data.slug,
      Date: moment(data?.createdAt).format("DD/MM/YYYY"),
      Quantity: data?.quantity,
      Mrp: data?.mrp,
      QuantityAndPrice : quantityAndPrice,
      Weight: data?.weight,
      Orderby: data?.orderby,
      Minqty: data?.minqty,
      Maxqty: data?.maxqty,
      minStockQty: data?.minStockQty,
      ProductType: data?.productType,
      Stock: data?.instock ? "Active" : "Inactive",
      HotSelling: data?.hotSelling ? "Active" : "Inactive",
      Status: data?.status ? "Active" : "Inactive",
    });
  });
  return (
    <>
      <SideMenu />
      <div className="mt-extra content container-fluid">
      <Row className="mb-2">
          <Col md={5}>
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
          <Col md={5}></Col>
          <Col md={2} className="float-right">
            <Button className="float-right" variant="danger" onClick={() => window.location.reload()}>Clear</Button>
          </Col>
        </Row>
        <Row className="mb-1">
          <Col md={3}>
            <Form.Select
                aria-label="Default select example"
                onChange={(e) => {
                  dispatch(resetProductList());
                  dispatch(productsList(
                    {categories:e.target.value === "" ? null : [e.target.value],
                    minStock : true
                  }))
                  setCategories(e.target.value)
                  dispatch(productsListExport({categories:e.target.value === "" ? null : [e.target.value]}))
                }}
              >
                <option value="">Select Category</option>
                {!!getCategoriesData?.list && getCategoriesData?.list?.map((data, index)=>{
                  return(
                    <option key={index} value={data?.id}>{data?.name}</option>
                  )
                })}
              </Form.Select>
          </Col>
          <Col md={4}></Col>
          <Col md={4} className="d-flex">
          <Form.Control
              type="file"
              placeholder="Upload CSV"
              onChange={(e) => setProductsFile(e.target.files[0])}/><Button
              variant="success"
              className="float-right w-50"
              onClick={() => {dispatch(uploadProducts({
                "products" : productsFile
              }))
              setTimeout(() => {
                dispatch(resetProductList());
                dispatch(productsList({
                  minStock : true
                }));
              }, 800)}}
            >
              <i className="bi bi-cloud-arrow-up-fill"></i> CSV
            </Button>
          </Col>
          <Col md={1}>
          <CSVLink data={body} headers={header} filename={'Pcdeals Hardware Products.csv'}>
            <Button>Export</Button>
          </CSVLink>
          </Col>
        </Row>
        <table className="table mt-4 table-scrolling ">
          <thead className="normalplace">
            <tr>
              <th className="over-col-size">Sr</th>
              <th className="over-col-size">Name</th>
              <th className="over-col-size">Qty</th>
              <th className="over-col-size">MinStockQty</th>
              <th className="over-col-size">Action</th>
            </tr>
          </thead>
          <tbody>
            {!!productsListData &&
              productsListData.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}.</td>
                    <td>
                      {" "}
                      <Link to={`/product/${data?.slug}`}>{data?.name}</Link>
                    </td>
                    <td>{data?.quantity}</td>
                    <td className="text-danger">
                      <b>{data?.minStockQty}</b>
                    </td>
                    <td>
                      <UpdateProduct
                        pinstock={data?.instock}
                        pstatus={data?.status}
                        pname={data?.name}
                        pslug={data?.slug}
                        psku={data?.sku}
                        pweight={data?.weight}
                        pdescription={data?.description}
                        pmrp={data?.mrp}
                        psale={data?.sale}
                        pminqty={data?.minqty}
                        pmaxqty={data?.maxqty}
                        pquantity={data?.quantity}
                        pprice={data?.price}
                        pcategories={data?.categories}
                        psubCategories={data?.subcategories}
                        pbrand={data?.brand}
                        ptax_class={data?.tax_class}
                        pattributes={data?.attributes}
                        pmetaTitle={data?.metaTitle}
                        pmetaTags={data?.metaTags}
                        pmetaSchema={data?.metaSchema}
                        pmetaDescription={data?.metaDescription}
                        pbackordering={data?.backordering}
                        pproductType={data?.productType}
                        pproductOptions={data?.productOptions}
                        warrantyProcedure={data?.warranty_procedure}
                        pwarranty={data?.warranty}
                        id={data?.id}
                        photSelling={data?.hotSelling}
                        porderby={data?.orderby}
                        categoriesSearchList={categories}
                        minStockQty={data?.minStockQty}
                        minStock = {true}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {!!productsBlank && productsBlank.length > 0 ? (
          <Row>
            <Button
              onClick={() => {
                setPage(page + 1);
                dispatch(
                  productsList({
                    search: search,
                    page: page + 1,
                    minStock : true
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

export default MinStockQty;
