import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import SideMenu from "../Components/SideMenu";
import {dashboardreport } from "../reducers/commonReducer";


const StatCard = ({ title, value }) => (
  <Col md={4}>
    <div className="card text-black shadow border mb-3">
      <div className="card-body">
        <b>
          <p className="card-title fs-5">{title}</p>
        </b>
        <p className="fs-4">
          <h2>{value ?? 0}</h2>
        </p>
      </div>
    </div>
  </Col>
);

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dashboardreport());
  }, [dispatch]);
  

  const { dashboardreportData } = useSelector((state) => state.commonReducer);
console.log('dashboardRecordData',dashboardreportData);

  return (
    <>
      <SideMenu />
      <div className="mt-extra content container-fluid">
        <Row className="mb-3">
          <b>
            <h1>Dashboard</h1>
          </b>
          <div className="dashboard-bottom"></div>
        </Row>

     
        <Row>
          <StatCard
            title="Categories"
            value={dashboardreportData?.category}
          />
          <StatCard
            title="Products"
            value={dashboardreportData?.product}
          />
          <StatCard
            title="Projects"
            value={dashboardreportData?.project}
          />
        </Row>

        {/* Payments Stats */}
        {/* <Row>
          <StatCard
            title="Today Payments"
            value={dashboardRecordData?.countpayments?.today}
          />
          <StatCard
            title="This Week Payments"
            value={dashboardRecordData?.countpayments?.thisWeek}
          />
          <StatCard
            title="Total Payments"
            value={dashboardRecordData?.countpayments?.totals}
          />
        </Row> */}

        {/* Customers Stats */}
        {/* <Row>
          <StatCard
            title="Today Customers"
            value={dashboardRecordData?.countCustomers?.today}
          />
          <StatCard
            title="This Week Customers"
            value={dashboardRecordData?.countCustomers?.thisWeek}
          />
          <StatCard
            title="Total Customers"
            value={dashboardRecordData?.countCustomers?.totals}
          />
        </Row> */}

        {/* Completed Order Amount Stats */}
        {/* <Row>
          <StatCard
            title="Today Completed Order Amount"
            value={dashboardRecordData?.completedOrder?.today}
          />
          <StatCard
            title="This Week Completed Order Amount"
            value={dashboardRecordData?.completedOrder?.thisWeek}
          />
          <StatCard
            title="Total Completed Order Amount"
            value={dashboardRecordData?.completedOrder?.totals}
          />
        </Row> */}
      </div>
    </>
  );
};

export default Dashboard;

