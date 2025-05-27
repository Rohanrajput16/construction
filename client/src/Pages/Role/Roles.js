import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideMenu from "../../Components/SideMenu";
import { Button } from "react-bootstrap";
import { deleteRole, getRoles } from "../../reducers/commonReducer";
import RoleAdd from "./RoleAdd";
import { home } from "../../const";

const Roles = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoles());
    if (!localStorage.getItem("x-auth-token")) {
      navigate(home);
    }
  }, []);

  const { getRolesData } = useSelector((state) => state.commonReducer);
  return (
    <>
      <SideMenu />
      <div className="mt-extra content container-fluid">
        <RoleAdd />
        <table className="table table-scrolling ">
          <thead className="normalplace">
            <tr>
              <th className="over-col-size">Sr</th>
              <th className="over-col-size">ID</th>
              <th className="over-col-size">Name</th>
              <th className="over-col-size">Slug</th>
              <th className="over-col-size">Action</th>
            </tr>
          </thead>
          <tbody>
            {!!getRolesData?.list &&
              getRolesData?.list.map((data, index) => {
                return (
                  <React.Fragment key={index}>
                    <tr key={data?.id}>
                      <td>{index + 1}.</td>
                      <td>{data?.id}</td>
                      <td>{data?.name}</td>
                      <td>
                        <b>{data?.status === true ? "True" : "False"}</b>
                      </td>
                      <td>
                        <Button
                          className="m-1"
                          variant="danger"
                          onClick={async () => {
                            await dispatch(deleteRole(data?.id));
                            dispatch(getRoles());
                          }}
                        >
                          <i className="bi bi-trash"></i>
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

export default Roles;
