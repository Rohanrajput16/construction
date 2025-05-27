import React, { useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";
import CommonHeader from "../Sub/CommonHeader";
import Footer from "../Sub/Footer";
import { Link, useParams } from "react-router-dom";
import { userDashboard } from "../../const";

const PayNowBuyLaterResp = () => {
  let params = useParams();
  return (
    <>
      <CommonHeader />
      <Container>
        {
          !!params?.buynowpaylater && params?.buynowpaylater === "1" ? <Row className="text-center mt-5 mb-5 pt-5 pb-5 text-success">
          <h1>Your Order is successfully done.</h1></Row> : <Row className="mt-5 mb-5 text-center pt-5 pb-5 text-danger">
          <h1>Your Order is Failed please try again.</h1></Row>
        }
      </Container>
      <Footer />
    </>
  );
};

export default PayNowBuyLaterResp;
