import React from "react";
import { Container, Row } from "react-bootstrap";
import CommonHeader from "../Sub/CommonHeader";
import Footer from "../Sub/Footer";
import { useSelector } from "react-redux";

const PcdealsConnectionResp = () => {
    const { getUserProfileList } = useSelector(
        (state) => state.orderDetailReducer
      );
  return (
    <>
      <CommonHeader />
      <Container>
        {<Row className="text-center mt-5 mb-5 pt-5 pb-5 text-success">
          <h1>You are Connected with PC Deals India from {getUserProfileList?.pcdealUserEmail}</h1></Row>
        }
      </Container>
      <Footer />
    </>
  );
};

export default PcdealsConnectionResp;
