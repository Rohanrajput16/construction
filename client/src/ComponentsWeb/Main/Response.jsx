import React, { useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";
import CommonHeader from "../Sub/CommonHeader";
import Footer from "../Sub/Footer";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getCartlist,
  getSetting,
} from "../../reducers/commonReducer";
import { checkout } from "../../const";

const Response = () => {
  let params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSetting())
  },[])
  const { getSettingData } = useSelector(
    (state) => state.commonReducer
  );
  const reorderApi = async (values) => {
    const apiResponse = await dispatch(({
          orderid:values
        }))
      await dispatch(getCartlist())
    if (apiResponse?.payload?.status) {
      setTimeout(() => {
      navigate(checkout) 
      },1000)
    }
  };
  return (
    <>
      <CommonHeader />
      <Container>
        {params?.status == 0 && <Row className="text-center pt-5 pb-5 text-info">
          <h1>{getSettingData?.setting?.paymentpending}</h1>
          <Link>
            <Button variant="secondary" onClick={() => reorderApi(params?.orderId)}>Re-Order</Button>
            </Link>
        </Row>}
        {params?.status == 1 && <Row className="text-center pt-5 pb-5 text-danger">
          <h1>{getSettingData?.setting?.paymentfailed}</h1>
          <Link>
            <Button variant="secondary" onClick={() => reorderApi(params?.orderId)}>Re-Order</Button>
            </Link>
        </Row>}
        {params?.status == 2 && <Row className="text-center pt-5 pb-5 text-success">
          <h1>{getSettingData?.setting?.paymentsuccessful}</h1>
          <Link to={`/order?orderid=${params?.orderId}`}>
            <Button variant="secondary">Manage Your Order</Button>
          </Link>
        </Row>}
        {/* { params?.orderId && params?.status > -1 ? (params?.status == 2 ? <Row className="text-center pt-5 pb-5 text-success">
          <h1>Your payment has been proccessed. Thank you...</h1>
          <Link to={`/order?orderid=${params?.orderId}`}>
            <Button variant="secondary">Manage Your Order</Button>
          </Link>
        </Row> : ((params?.status == 1) ? <Row className="text-center pt-5 pb-5 text-danger">
          <h1>Your payment has been failed. If your payment has been duducted please wait 24 hours for refund.</h1>
          <Link to={`/order?orderid=${params?.orderId}`}>
            <Button variant="secondary">Your order</Button>
          </Link>
        </Row> : <Row className="text-center pt-5 pb-5 text-danger">
          <h1>Your have not received any payment yet. If your payment has been duducted please wait for 2 hours for payment proccess.</h1>
          <Link to={`/order?orderid=${params?.orderId}`}>
            <Button variant="secondary">Manage Your Order</Button>
          </Link>
        </Row>))
          
        : '' } */}
      </Container>
      <Footer />
    </>
  );
};

export default Response;
