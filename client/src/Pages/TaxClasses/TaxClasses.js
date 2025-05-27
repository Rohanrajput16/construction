import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideMenu from "../../Components/SideMenu";
import {
  addTaxgst,
  getTaxgsts,
  updateTaxgst,
} from "../../reducers/commonReducer";
import TaxClassesAction from "./TaxClassesAction";
import { home } from "../../const";

const TaxClasses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTaxgsts());
    if (!localStorage.getItem("x-auth-token")) {
      navigate(home);
    }
  }, []);

  const { getTaxgstsData } = useSelector((state) => state.commonReducer);
  return (
    <>
      <SideMenu />
      <div className="mt-extra content container-fluid">
        <TaxClassesAction
          title={"Add New Tax Class"}
          popUpTitle="Add Tax Class"
          api={addTaxgst}
        />
        <table className="table mt-2">
          <thead className="normalplace">
            <tr>
              <th className="over-col-size">Sr.</th>
              <th className="over-col-size">Name</th>
              <th className="over-col-size">Tax(%)</th>
              <th className="over-col-size">Status</th>
              <th className="over-col-size">Action</th>
            </tr>
          </thead>
          <tbody>
            {!!getTaxgstsData?.list &&
              getTaxgstsData?.list.map((data, index) => {
                return (
                  <React.Fragment key={index}>
                    <tr key={data?._id}>
                      <td>{index + 1}.</td>
                      <td>{data?.name}</td>
                      <td>{`${data?.percentage}%`}</td>
                      <td>
                        <b>{data?.status === true ? "Active" : "Inactive"}</b>
                      </td>
                      <td>
                        <TaxClassesAction
                          title={<i className="bi bi-pencil-square"></i>}
                          popUpTitle="Update Tax Class"
                          api={updateTaxgst}
                          id={data?.id}
                          taxName={data?.name}
                          taxStatus={data?.status}
                          taxpercentage={data?.percentage}
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

export default TaxClasses;
