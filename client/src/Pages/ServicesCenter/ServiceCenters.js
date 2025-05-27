import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideMenu from "../../Components/SideMenu";
import { Button } from "react-bootstrap";
import {
  addServicesCenter,
  deleteServicesCenter,
  getServicesCenter,
  updateServicesCenter,
} from "../../reducers/commonReducer";
import ServiceCenterAction from "./ServiceCenterAction";

import { home } from "../../const";

const ServiceCenters = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getServicesCenter());
    if (!localStorage.getItem("x-auth-token")) {
      navigate(home);
    }
    // dispatch(getBrandsFrontend());
  }, []);
  const { getServicesCenterData } = useSelector((state) => state.commonReducer);
  return (
    <>
      <SideMenu />
      <div className="mt-extra content container-fluid">
        <div className="m-3">
          <ServiceCenterAction
            buttonTitle="Add Service Center"
            title="Add ServiceCenter"
            api={addServicesCenter}
          />
        </div>

        <table className="table table-scrolling">
          <thead className="normalplace">
            <tr>
              <th className="over-col-size">Sr.</th>
              <th className="over-col-size">Name</th>
              <th className="over-col-size">Brand</th>
              <th className="over-col-size">Address</th>
              <th className="over-col-size">Description</th>
              <th className="over-col-size">Status</th>
              <th className="over-col-size">Action</th>
            </tr>
          </thead>
          <tbody>
            {!!getServicesCenterData?.list &&
              getServicesCenterData?.list.map((data, index) => {
                return (
                  <React.Fragment key={index}>
                    <tr key={data?._id}>
                      <td>{index + 1}.</td>
                      <td>{data?.title}</td>
                      <td>{data?.brand?.name}</td>
                      <td>{`${data?.address_line1}, ${data?.address_line2}, ${data?.city} - ${data?.zipcode}, ${data?.state}`}</td>
                      <td>{data?.description}</td>
                      <td>{data?.status === true ? "Active" : "Inactive"}</td>
                      <td>
                        <Button
                          className="m-1"
                          variant="danger"
                          onClick={async () => {
                            await dispatch(deleteServicesCenter(data?.id));
                            dispatch(getServicesCenter());
                          }}
                        >
                          <i className="bi bi-trash"></i>
                        </Button>
                        <ServiceCenterAction
                          title="Update Service Center"
                          buttonTitle={<i className="bi bi-pencil-square"></i>}
                          adrsline1={data?.address_line1}
                          adrsline2={data?.address_line2}
                          sbrand={data?.brand?.id}
                          scity={data?.city}
                          sState={data?.state}
                          sStatus={data?.status}
                          sTitle={data?.title}
                          sZipCode={data?.zipcode}
                          sdescription={data?.description}
                          id={data?.id}
                          api={updateServicesCenter}
                        />
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ServiceCenters;
