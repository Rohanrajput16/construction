import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideMenu from "../../Components/SideMenu";
import { Button } from "react-bootstrap";
import { deleteWarranty, getWarranty } from "../../reducers/commonReducer";
import PermissionAdd from "./WarrantyAdd";
import WarrantyUpdate from "./WarrantyUpdate";
import { home } from "../../const";

const Warrantys = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWarranty());
    if (!localStorage.getItem("x-auth-token")) {
      navigate(home);
    }
  }, []);
  const { getWarrantyData } = useSelector((state) => state.commonReducer);
  return (
    <>
      <SideMenu />
      <div className="mt-extra content container-fluid">
        <div className="m-3">
          <PermissionAdd />
        </div>

        <table className="table table-scrolling">
          <thead className="normalplace">
            <tr>
              <th className="over-col-size">Sr</th>
              <th className="over-col-size">Title</th>
              <th className="over-col-size">Description</th>
              <th className="over-col-size">Action</th>
            </tr>
          </thead>
          <tbody>
            {!!getWarrantyData?.list &&
              getWarrantyData?.list.map((data, index) => {
                return (
                  <React.Fragment key={index}>
                    <tr key={data?._id}>
                      <td>{index + 1}.</td>
                      <td>{data?.title}</td>
                      <td>{data?.details}</td>
                      <td>
                        <Button
                          className="m-1"
                          variant="danger"
                          onClick={async () => {
                            await dispatch(deleteWarranty(data?.id));
                            dispatch(getWarranty());
                          }}
                        >
                          <i className="bi bi-trash"></i>
                        </Button>
                        <WarrantyUpdate
                          title="Update Warranty"
                          wrntyName={data?.title}
                          wrntyDesc={data?.details}
                          id={data?.id}
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

export default Warrantys;
