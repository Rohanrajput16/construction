import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideMenu from "../../Components/SideMenu";
import { Button } from "react-bootstrap";
import { deleteSetting, getSettings } from "../../reducers/commonReducer";
import SettingUpdate from "./SettingUpdate";
import SettingAdd from "./SettingAdd";
import { home } from "../../const";

const Setting = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSettings());
    if (!localStorage.getItem("x-auth-token")) {
      navigate(home);
    }
  }, []);

  const { getSettingsData } = useSelector((state) => state.commonReducer);
  return (
    <>
      <SideMenu />
      <div className="mt-extra content container-fluid">
        <div className="m-3">
          <SettingAdd />
        </div>

        <table className="table table-scrolling ">
          <thead className="normalplace">
            <tr>
              <th className="over-col-size">Sr</th>
              <th className="over-col-size">Name</th>
              <th className="over-col-size">Orderby</th>
              <th className="over-col-size">Value</th>
              <th className="over-col-size">HelpText</th>
              <th className="over-col-size">Filter</th>
              <th className="over-col-size">Key</th>
              <th className="over-col-size">Status</th>
              <th className="over-col-size">Action</th>
            </tr>
          </thead>
          <tbody>
            {!!getSettingsData?.list &&
              getSettingsData?.list.map((data, index) => {
                return (
                  <React.Fragment key={index}>
                    <tr key={data?._id}>
                      <td>{index + 1}.</td>
                      <td>{data?.name}</td>
                      <td>{data?.orderby}</td>
                      <td>{data?.value}</td>
                      <td>{data?.halptext}</td>
                      <td>{data?.filter}</td>
                      <td>{data?.key}</td>
                      <td
                        className={
                          data?.status === true ? "text-success" : "text-danger"
                        }
                      >
                        <b>{data?.status === true ? "Enable" : "Disable"}</b>
                      </td>
                      <td>
                        {/* <Button
                          className="m-1"
                          variant="danger"
                          onClick={async () => {
                            await dispatch(deleteSetting(data?.id));
                            dispatch(getSettings());
                          }}
                        >
                          <i className="bi bi-trash"></i>
                        </Button> */}
                        <SettingUpdate
                          title="Update Settings"
                          settingName={data?.name}
                          settingOrderby={data?.orderby}
                          settingValue={data?.value}
                          settingHalptext={data?.halptext}
                          id={data?.id}
                          settingFilter={data?.filter}
                          settingKey={data?.key}
                          status={data?.status}
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

export default Setting;
