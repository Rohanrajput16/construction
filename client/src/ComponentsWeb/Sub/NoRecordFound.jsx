import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";

const NoRecordFound = () => {
  return (
    <>
      <Container>
        <Row className="text-center pt-5 pb-5 text-success">
          <h1 className="text-danger">Record not Found😔</h1>
        </Row>
      </Container>
    </>
  );
};

export default NoRecordFound;
