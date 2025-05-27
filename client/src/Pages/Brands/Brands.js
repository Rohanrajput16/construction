import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideMenu from "../../Components/SideMenu";
import { Button } from "react-bootstrap";
import { deleteBrand, getBrands } from "../../reducers/commonReducer";
import BrandsUpdate from "./BrandsUpdate";
import BrandsAdd from "./BrandsAdd";
import { home } from "../../const";

const Brands = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrands());
    if (!localStorage.getItem("x-auth-token")) {
      navigate(home);
    }
  }, []);

  const { getBrandsData } = useSelector((state) => state.commonReducer);
  return (
    <>
      <SideMenu />
      <div className="mt-extra content container-fluid">
        <div className="m-3">
          {" "}
          <BrandsAdd />{" "}
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
            {!!getBrandsData?.list &&
              getBrandsData?.list.map((data, index) => {
                return (
                  <React.Fragment key={index}>
                    <tr key={data?._id}>
                      <td>{index + 1}.</td>
                      <td>{data?.name}</td>
                      <td>
                        <img className="tbl-img" src={data?.image} />
                      </td>
                      <td>{data?.slug}</td>
                      <td>{data?.description}</td>
                      <td>
                        <b>{data?.status}</b>
                      </td>
                      <td>
                        <Button
                          className="m-1"
                          variant="danger"
                          onClick={async () => {
                            await dispatch(deleteBrand(data?.id));
                            dispatch(getBrands());
                          }}
                        >
                          <i className="bi bi-trash"></i>
                        </Button>
                        <BrandsUpdate
                          title="Update Brand"
                          brandName={data?.name}
                          brandslug={data?.slug}
                          branddes={data?.description}
                          userStatus={data?.status}
                          id={data?.id}
                          brandImage={data?.image}
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

export default Brands;
