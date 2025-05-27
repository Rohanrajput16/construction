import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideMenu from "../../Components/SideMenu";
import { Button } from "react-bootstrap";
import { deleteBanner, getBanners } from "../../reducers/commonReducer";
import BannersUpdate from "./BannersUpdate";
import BannersAdd from "./BannersAdd";
import { home } from "../../const";

const Banners = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBanners());
    if (!localStorage.getItem("x-auth-token")) {
      navigate(home);
    }
  }, []);

  const { getBannersData } = useSelector((state) => state.commonReducer);
  return (
    <>
      <SideMenu />
      <div className="mt-extra content container-fluid">
        <div className="m-2">
          <BannersAdd />
        </div>

        <table className="table table-scrolling ">
          <thead className="normalplace">
            <tr>
              <th className="over-col-size">Sr</th>
              <th className="over-col-size">Name</th>
              <th className="over-col-size">Image</th>
              <th className="over-col-size">Slug</th>
              <th className="over-col-size">Description</th>
              <th className="over-col-size">Status</th>
              <th className="over-col-size">Action</th>
            </tr>
          </thead>
          <tbody>
            {!!getBannersData?.list &&
              getBannersData?.list.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}.</td>
                    <td>{data?.title}</td>
                    <td>
                      <img src={`/${data?.image}`} />
                    </td>
                    <td>{data?.slug}</td>
                    <td>{data?.description}</td>
                    <td>
                      <b>{data?.status === true ? "True" : "False"}</b>
                    </td>
                    <td>
                      <BannersUpdate
                        title="Update Banner"
                        bannerName={data?.title}
                        bannerslug={data?.slug}
                        bannerdes={data?.description}
                        userStatus={data?.status}
                        id={data?.id}
                        bannerImage={data?.image}
                      />
                      <Button
                        className="m-1"
                        variant="danger"
                        onClick={async () => {
                          await dispatch(deleteBanner(data?.id));
                          await dispatch(getBanners());
                        }}
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Banners;
