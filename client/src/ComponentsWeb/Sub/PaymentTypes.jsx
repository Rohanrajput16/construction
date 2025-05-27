import React, { useState } from "react";
import { Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { orderCreate } from "../../reducers/orderDetailsReducer";
import { useNavigate } from "react-router-dom";
import payfullamount from "../../images/payfullamount.png";
const PaymentTypes = ({ totalAmount, couponCode, pickup, cod }) => {
  const dispatch = useDispatch();
  let width = window.innerWidth;
  const navigate = useNavigate();
  const [selectPaymentTab, setSelectPaymentTab] = useState();
  const [payby, setPayby] = useState();
  const { getSettingData } = useSelector((state) => state.commonReducer);

  const createOrder = async () => {
    const apiResponse = await dispatch(orderCreate({
      couponcode: couponCode,
      pickup,
      cod,
      payby,
    }));
    if (
      apiResponse?.payload?.status === 0 &&
      localStorage.getItem("x-auth-token") ) {
      return setTimeout(() => {
        navigate('/shop');
      }, 1000);
    }
    return null;
  };

  return (
    <>
        {/* <Col md={4} sm={6} xs={6} className="mt-2">
          <label
            className={`userAddress-lable ${
              payby === "paymentgateway" && `selectedBox`
            }`}
            onClick={() => setSelectPaymentTab(3)}
          >
            <div className={`user-new-address ${width >= 468 ? 'pt-5 pb-5' : ''}`}>
              <label className="userAddress-lable">
                <input
                  type="radio"
                  name="paymentoption"
                  onChange={() => setPayby("paymentgateway")}
                  hidden
                />
                <img className="credit-img" src={credit} />
              </label>
            </div>
          </label>
          </Col> */}
      {/* <Row> */}
        {selectPaymentTab === 3 && (
          <h6 className={width >= 468 && "mt-4"}>
            <b></b>
            Total Amount = Order Amount{" "}
            <b>
              {cod
                ? Math.round((getSettingData?.setting?.codamount * totalAmount) / 100)
                : totalAmount}{" "}
              Rs.
            </b>{" "}
            {((+getSettingData?.setting?.codamount * +totalAmount) / 100) *
              (getSettingData?.setting?.online_payment
                ? +getSettingData?.setting?.online_payment
                : 0) !==
              0 && (
              <>
                + Online Charges{" "}
                <b>
                  {cod
                    ?  Math.round((((+getSettingData?.setting?.codamount * +totalAmount) /
                        100) *
                        (getSettingData?.setting?.online_payment
                          ? +getSettingData?.setting?.online_payment
                          : 0)) /
                      100)
                    : Math.round(((getSettingData?.setting?.online_payment
                        ? +getSettingData?.setting?.online_payment
                        : 0) *
                        +totalAmount) /
                      100)}{" "}
                  Rs.
                </b>
              </>
            )}
          </h6>
        )}
          {/* <div className={width <= 468 && "text-center"}> */}
            <div
              className={`user-new-address pt-2 pb-2 ${width >= 468 ? "" : 'w-100'}`}
              variant="success"
              onClick={async () => {
              await createOrder();
              }}
            >
              <div>
                <img className="w-100" src={payfullamount}/>
              </div>
              
              {/* Pay Now (Rs.{" "}
              {selectPaymentTab === 3
                ? cod
                  ? Math.round((
                      (getSettingData?.setting?.codamount * totalAmount) / 100 +
                      (((getSettingData?.setting?.codamount * totalAmount) /
                        100) *
                        (getSettingData?.setting?.online_payment
                          ? getSettingData?.setting?.online_payment
                          : 0)) /
                        100
                    ))
                  : Math.round(
                      ((getSettingData?.setting?.online_payment
                        ? getSettingData?.setting?.online_payment
                        : 0) *
                        totalAmount) /
                        100 +
                      totalAmount
                    )
                : cod
                ? Math.round((getSettingData?.setting?.codamount * totalAmount) / 100)
                : totalAmount
              } */}
              {/* ) */}
            </div>
          {/* </div> */}
        {/* )} */}
      {/* </Row> */}
    </>
  );
};

export default PaymentTypes;
