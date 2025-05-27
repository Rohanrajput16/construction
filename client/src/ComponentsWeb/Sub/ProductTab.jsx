import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "react-bootstrap/Tabs";
import ProductReview from "./ProductReview";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { servicecareCenter } from "../../const";

const ProductTab = (props) => {
  const dispatch = useDispatch();
  const [key, setKey] = useState("Details");
  const { productDesc, warrantyprocess, brandId, warrantyyears } = props;
  const { getSingleProductData } = useSelector((state) => state.commonReducer);
  const setTabs = (k) => {
    setKey(k);
    key == "Details" &&
      dispatch(
        // getProductReviews({
        //   product: getSingleProductData?.product?.id,
        // })
      );
  };
  const formattedContent = !!warrantyprocess && warrantyprocess?.replace(/\n/g, '<br />');
  return (
    <>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={setTabs}
        className="mb-3"
      >
        <Tab
          eventKey="Details"
          title="Details"
          dangerouslySetInnerHTML={{ __html: productDesc }}
        ></Tab>
        <Tab eventKey="Warrantyprocess" title="Warranty Process">
          <h4>{warrantyyears}</h4>
          <h6 dangerouslySetInnerHTML={{ __html: formattedContent }} />
          <Link to={`${servicecareCenter}?brand=${brandId}`}>
            <Button className="bg-thememain btn btn-success">
              <i className="bi bi-house-add-fill"></i> Service Center
            </Button>
          </Link>
        </Tab>
        {/* <Tab eventKey="Reviews" title="Reviews">
          <ProductReview />
        </Tab> */}
      </Tabs>
    </>
  );
};

export default ProductTab;
