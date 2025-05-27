import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideMenu from "../../Components/SideMenu";
import { Button } from "react-bootstrap";
import { deletePermission, getPermissions } from "../../reducers/commonReducer";
import PermissionUpdate from "./PermissionUpdate";
import PermissionAdd from "./PermissionAdd";
import { home } from "../../const";

const Permissions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPermissions());
    if (!localStorage.getItem("x-auth-token")) {
      navigate(home);
    }
  }, []);

  const { getPermissionsData } = useSelector((state) => state.commonReducer);
  return (
    <>
      <SideMenu />
      <div className="mt-extra content container-fluid">
        <PermissionAdd />
        <table className="table table-scrolling ">
          <thead className="normalplace">
            <tr>
              <th className="over-col-size">Sr</th>
              <th className="over-col-size">Name</th>
              <th className="over-col-size">Description</th>
              <th className="over-col-size">Status</th>
              <th className="over-col-size">Action</th>
            </tr>
          </thead>
          <tbody>
            {!!getPermissionsData?.list &&
              getPermissionsData?.list.map((data, index) => {
                return (
                  <React.Fragment key={index}>
                    <tr key={data?._id}>
                      <td>{index + 1}.</td>
                      <td>{data?.name}</td>
                      <td>{data?.description}</td>
                      <td>{data?.status === true ? "True" : "False"}</td>
                      <td>
                        <Button
                          className="m-1"
                          variant="danger"
                          onClick={async () => {
                            await dispatch(deletePermission(data?.id));
                            dispatch(getPermissions());
                          }}
                        >
                          <i className="bi bi-trash"></i>
                        </Button>
                        <PermissionUpdate
                          title="Update Permission"
                          permissionName={data?.name}
                          permissionDesc={data?.description}
                          permissionStatus={data?.status}
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

export default Permissions;
