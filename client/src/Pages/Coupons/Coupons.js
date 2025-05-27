import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideMenu from "../../Components/SideMenu";
import { Button } from "react-bootstrap";
import {
  deleteBrand,
  deleteCoupon,
  getBrands,
  getCategories,
  getCoupons,
  getProducts,
  getUsers,
} from "../../reducers/commonReducer";
import CouponUpdate from "./CouponUpdate";
import CouponAdd from "./CouponAdd";
import moment from "moment";
import { home } from "../../const";

const Coupons = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCoupons());
    dispatch(getCategories());
    dispatch(getUsers());
    dispatch(getProducts());
    if (!localStorage.getItem("x-auth-token")) {
      navigate(home);
    }
  }, []);

  const { getCouponsData } = useSelector((state) => state.commonReducer);
  return (
    <>
      <SideMenu />
      <div className="mt-extra content container-fluid"> 
        <div className="m-3">
        <CouponAdd />
        </div>
      
        <table className="table table-scrolling ">
          <thead className="normalplace">
            <tr>
              <th className="over-col-size">Sr</th>
              <th className="over-col-size">Code</th>
              <th className="over-col-size">Validupto</th>
              <th className="over-col-size">Amount</th>
              <th className="over-col-size">Cart Value</th>
              <th className="over-col-size">Description</th>
              <th className="over-col-size">Status</th>
              <th className="over-col-size">Action</th>
            </tr>
          </thead>
          <tbody>
            {!!getCouponsData?.list &&
              getCouponsData?.list.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}.</td>
                    <td>{data?.code}</td>
                    <td>{moment(data?.validupto).format("DD/MM/YYYY")}</td>
                    <td>{data?.amount}</td>
                    <td>{data?.cartValue}</td>
                    <td>{data?.description}</td>
                    <td>
                      <b>{data?.status === true ? "True" : "False"}</b>
                    </td>
                    <td>
                      <Button
                        className="m-1"
                        variant="danger"
                        onClick={async () => {
                          await dispatch(deleteCoupon(data?.id));
                          dispatch(getCoupons());
                        }}
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                      <CouponUpdate
                        title="Update Coupon"
                        couponCode={data?.code}
                        cvalidupto={data?.validupto}
                        couponAmount={data?.amount}
                        userStatus={data?.status}
                        id={data?.id}
                        couponDesc={data?.description}
                        couponCategories={data?.categories}
                        couponproducts={data?.products}
                        couponusers={data?.users}
                        couponcartValue={data?.cartValue}
                      />
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

export default Coupons;
