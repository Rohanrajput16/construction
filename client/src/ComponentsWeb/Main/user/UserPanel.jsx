import React from "react";
import { Col, Container, Row, Tab, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connection, home, rewardSite, shop } from "../../../const";
import CommonHeader from "../../Sub/CommonHeader";
import UpdateAddress from "./UpdateAddress";
import UserAddress from "./UserAddress";
import UserOrders from "./UserOrders";
import UserProfile from "./UserProfile";
import UserReview from "./UserReview";
import UserWishList from "./UserWishList";

const UserPanel = () => {
  return (
    <>
      <CommonHeader />
      <div className="container-fluid">
        <Row className="mt-3">
          <Container>
            <div className="section__head d-md-flex justify-content-between mb-40">
              <div className="section__title">
                <h2>
                  <b>My Dashboard</b>
                </h2>
              </div>
            </div>
          </Container>
        </Row>
        <Row>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={2}>
                <Nav variant="pills" className="flex-column">
                  <Link to={home}>
                    <Nav.Item className="tab-btn">
                      <p className="font-18 mb-0">
                        <i className="bi bi-house-door-fill"></i> Home
                      </p>
                    </Nav.Item>
                  </Link>
                  <Link to={shop}>
                    <Nav.Item className="tab-btn">
                      <p className="font-18 mb-0">
                        <i className="bi bi-shop"></i> Shopping
                      </p>
                    </Nav.Item>
                  </Link>
                  <Nav.Item>
                    <Nav.Link className="tab-btn" eventKey="first">
                      <i className="bi bi-person-fill"></i> My Profile
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link className="tab-btn" eventKey="second">
                      <i className="bi bi-cart-check-fill"></i> My Orders
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={10}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <UserProfile />
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <UserOrders />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Row>
      </div>
    </>
  );
};

export default UserPanel;
