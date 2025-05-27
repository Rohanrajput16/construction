import React, { Fragment, useState } from "react";
import { Col } from "react-bootstrap";
import SubProductDetail from "./SubProductDetail";

const SubProduct = (props) => {
  const{subProductData, selectProducts} = props
  return (
    <>
    {!!subProductData && Object.keys(subProductData).map((item, i) => (
        <Fragment key={i}>
          <h4><b>{item}</b></h4>
          {!!subProductData[item] && subProductData[item].map((data, index) => 
            <Col md={3} key={index}>
              <label className="subproduct-card">
                <input type="checkbox" value={data?.slug} onChange={selectProducts}/>
                <h5>{data?.name}</h5>
                <p className="sub-product-price">Rs. {data?.priceMrp} <span className='old'>Rs. {data?.priceMrp}</span></p>
                <SubProductDetail name={data?.name} des={data?.description} sku={data?.sku} priceMrp={data?.priceMrp} salesprice={data?.salesprice}/>
              </label>
            </Col>)}
        </Fragment>
      ))}
    </>
  );
};

export default SubProduct;
