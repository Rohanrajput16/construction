import React, { useEffect, useRef, useState } from "react";
import Footer from "../Sub/Footer";
import {  home } from "../../const";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button} from "react-bootstrap";
import sumBy from "lodash/sumBy";
import { useNavigate } from "react-router-dom";
import {
  getCheckoutDeatils,
  getOrderRewardSlab,
  getSetting,
} from "../../reducers/commonReducer";
import Header from "../Sub/Header";
import ItemTable from "./ItemTable";


const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hiddenFormRef = useRef(null);
  const [payLater, setPayLater] = useState(false);
  const { getCartlistData, applyCouponData, getSettingData } = useSelector(
    (state) => state.commonReducer
  );
  let totalAmount;
  useEffect(() => {
    dispatch(getCheckoutDeatils());
    dispatch(getSetting());
  }, []);
  useEffect(() => {
    !!getCartlistData?.list &&
      getCartlistData?.list.length <= 0 &&
      navigate(home);
  }, [getCartlistData]);



  let cartDetails = sumBy(
    !!getCartlistData?.list && getCartlistData?.list,
    function (o) {
      return o.quantity;
    }
  );
  totalAmount = sumBy(
    !!getCartlistData?.list && getCartlistData?.list,
    function (o) {
      if (o.customize.length) {
        let customizePrice = o?.customize.reduce(
          (total, item) => total + item.price,
          0
        );
        return (
          ((o.proudct?.sale ? o.proudct?.sale : o.proudct?.mrp) +
            customizePrice) *
          o?.quantity
        );
      } else {
        let discountPercent = 0;
        // Find the discount price based on the quantity
        for (const q in o?.proudct?.price) {
          if (o?.quantity >= parseInt(q)) {
            discountPercent = o?.proudct?.price[q];
          }
        }
        return (
          (discountPercent
            ? discountPercent
            : o.proudct?.sale
            ? o.proudct?.sale
            : o.proudct?.mrp) * o?.quantity
        );
      }
    }
  );

  //open pcdeals site
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

  const apiResp = async () => {
    const apiResponse = await dispatch(
      // orderCreate({
      //   spacialuser: payLater,
      //   pickup: false,
      //   cod: false,
      //   payby: false,
      // })
    );
    if (apiResponse.payload.status === 1) {
      // Fill the form with response data
        hiddenFormRef.current.action = apiResponse.payload.url;
        hiddenFormRef.current.amount.value = apiResponse.payload.amount;
        hiddenFormRef.current.name.value = apiResponse.payload.name;
        hiddenFormRef.current.orderid.value = apiResponse.payload.orderid;
        hiddenFormRef.current.phone.value = apiResponse.payload.phone;
        // Set hidden form fields if any
        hiddenFormRef.current.submit();
    }
  };
  useEffect(() => {
    dispatch(getOrderRewardSlab({
      amount : totalAmount
    }))
  }, [totalAmount]);
  return (
    <>
     <form ref={hiddenFormRef} method="POST" style={{ display: 'none' }}>
        <input type="hidden" name="amount" />
        <input type="hidden" name="name" />
        <input type="hidden" name="orderid" />
        <input type="hidden" name="phone" />
      </form>
      <Header />
      <div className="container pb-5">
        <main>
          <div className="py-3 text-center"></div>
          <div className="row g-5">
            <div className="col-md-12 col-lg-12 order-md-last">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <b>
                  {" "}
                  <span className="your-cart">Your cart</span>{" "}
                </b>

                <span className="badge your-cart card-bg border rounded-pill">
                  {cartDetails}
                </span>
              </h4>
              <ItemTable cartDetails={cartDetails} totalAmount={totalAmount} />
              <Row>
                    <Col md={12}>
                    <Button className="mt-5 py-2 bg-thememain w-100" onClick={apiResp}>
                        Place Order
                    </Button>
                    </Col>
              </Row>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
