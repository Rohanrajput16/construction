import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideMenu from "../../Components/SideMenu";
import {
  addShipping,
  addTracker,
  deleteShipping,
  deleteTracker,
  getAllStates,
  getShippings,
  getTrackers,
  updateShipping,
  updateTracker,
} from "../../reducers/commonReducer";
import TaxClassesAction from "./TrackersAction";
import { Button, Col, Row } from "react-bootstrap";
import { home } from "../../const";

const TrackersList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("x-auth-token")) {
      navigate(home);
    }
    dispatch(getTrackers());
  }, []);

  const { getTrackersData } = useSelector((state) => state.commonReducer);
  return (
    <>
      <SideMenu />
      <div className="mt-extra content container-fluid">
        <TaxClassesAction
          title={"Add Tracker"}
          popUpTitle="Add New Tracker"
          api={addTracker}
        />
        <table className="table mt-2">
          <thead className="normalplace">
            <tr>
              <th className="over-col-size">Sr.</th>
              <th className="over-col-size">Name</th>
              <th className="over-col-size">Url</th>
              <th className="over-col-size">Action</th>
            </tr>
          </thead>
          <tbody>
            {!!getTrackersData?.list &&
              getTrackersData?.list.map((data, index) => {
                return (
                  <React.Fragment key={index}>
                    <tr key={data?._id}>
                      <td>{index + 1}.</td>
                      <td>{data?.name}</td>
                      <td>
                       {data?.url}
                      </td>
                      <td>
                        <TaxClassesAction
                          title={<i className="bi bi-pencil-square"></i>}
                          popUpTitle="Update Tracker"
                          api={updateTracker}
                          id={data?.id}
                          uname={data?.name}
                          uurl={data?.url}
                          stateHide={true}
                        />
                        <Button
                          variant="danger"
                          className="mx-1"
                          onClick={async () => {
                            await dispatch(deleteTracker(data?.id));
                            await dispatch(getTrackers());
                          }}
                        >
                          <i className="bi bi-trash3-fill"></i>
                        </Button>
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

export default TrackersList;
