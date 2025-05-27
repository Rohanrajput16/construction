import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideMenu from "../../Components/SideMenu";
import { Button } from "react-bootstrap";
import AttributeUpdate from "./AttributeUpdate";
import { deleteAttribute, getAttributes } from "../../reducers/commonReducer";
import AttributeAdd from "./AttributeAdd";
import { home } from "../../const";

const Attribute = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAttributes());
    if (!localStorage.getItem("x-auth-token")) {
      navigate(home);
    }
  }, []);

  const { distributorList, getAttributesData } = useSelector(
    (state) => state.commonReducer
  );
  return (
    <>
      <SideMenu />
      <div className="mt-extra content container-fluid">
        <div className="mt-1 mb-2">
          {" "}
          <AttributeAdd />{" "}
        </div>
        <table className="table table-scrolling ">
          <thead className="normalplace">
            <tr>
              <th className="over-col-size">Sr</th>
              <th className="over-col-size">Name</th>
              <th className="over-col-size">Slug</th>
              <th className="over-col-size">Description</th>
              <th className="over-col-size">Status</th>
              <th className="over-col-size">Action</th>
            </tr>
          </thead>
          <tbody>
            {!!getAttributesData?.list &&
              getAttributesData?.list.map((data, index) => {
                return (
                  <React.Fragment key={index}>
                    <tr key={data?._id}>
                      <td>{index + 1}.</td>
                      <td>{data?.name}</td>
                      <td>{data?.slug}</td>
                      <td>{data?.description}</td>
                      <td>
                        <b>{data?.status === true ? "True" : "False"}</b>
                      </td>
                      <td>
                        <AttributeUpdate
                          title="Update Attribute"
                          attributName={data?.name}
                          attributslug={data?.slug}
                          attributdes={data?.description}
                          userStatus={data?.status}
                          id={data?.id}
                        />
                        <Button
                          className="m-1"
                          variant="danger"
                          onClick={() => {
                            dispatch(deleteAttribute(data?.id));
                            setTimeout(() => {
                              dispatch(getAttributes());
                            }, 500);
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

export default Attribute;
