import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideMenu from "../../Components/SideMenu";
import {
  addRewardSlab,
  getRewardSlab,
  updateRewardSlab,
} from "../../reducers/commonReducer";
import { home } from "../../const";
import RewardSlabAction from "./RewardSlabAction";

const RewardSlabList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("x-auth-token")) {
      navigate(home);
    }
    dispatch(getRewardSlab());
  }, []);

  const { rewardSlabList } = useSelector((state) => state.commonReducer);
  return (
    <>
      <SideMenu />
      <div className="mt-extra content container-fluid">
        <RewardSlabAction
          title={"Add Reward"}
          popUpTitle="Add New Reward"
          api={addRewardSlab}
        />
        <table className="table mt-2">
          <thead className="normalplace">
            <tr>
              <th className="over-col-size">Sr.</th>
              <th className="over-col-size">Min Amount</th>
              <th className="over-col-size">Max Amount</th>
              <th className="over-col-size">Reward Amount</th>
              <th className="over-col-size">Status</th>
              <th className="over-col-size">Action</th>
            </tr>
          </thead>
          <tbody>
            {!!rewardSlabList &&
              rewardSlabList?.map((data, index) => {
                return (
                  <React.Fragment key={index}>
                    <tr key={data?._id}>
                      <td>{index + 1}.</td>
                      <td>{data?.min}</td>
                      <td>{data?.max}</td>
                      <td>{data?.rate}</td>
                      <td><b>{data?.status ? <span className="text-success">Active</span> : <span className="text-danger">Inactive</span>}</b></td>
                      <td>
                        <RewardSlabAction
                          title={<i className="bi bi-pencil-square"></i>}
                          popUpTitle = "Update Reward"
                          api = {updateRewardSlab}
                          id = {data?.id}
                          min = { data?.min}
                          max = {data?.max}
                          rate = {data?.rate}
                          status = {data?.status}
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

export default RewardSlabList;
