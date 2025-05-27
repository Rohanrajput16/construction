import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SideMenu from "../../Components/SideMenu";
import { object } from "yup";
import moment from "moment";


const UsersCartList = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(userCartDetails())
  // },[])
  const { userCartDetailsList } = useSelector(
    (state) => state.orderDetailReducer
  );
  return (
    <>
      <SideMenu />
        <div className="mt-extra content container-fluid">
          <table className="table table-scrolling">
            <thead className="normalplace">
              <tr>
                <th className="over-col-size">User Detail</th>
                <th className="over-col-size">Phone</th>
                <th className="over-col-size">Quantity / Product</th>
              </tr>
            </thead>
            <tbody>
                {
                    !!userCartDetailsList && Object.values(userCartDetailsList)?.map((data, index) => {
                        return(
                            <tr key={index}>
                             <td>
                              CustomerId: <b>{data?.[0]?.user?.customerId}</b><br/>
                           <b>{`${data?.[0]?.user?.firstName} ${data?.[0]?.user?.lastName}`}</b><br/>
                            Company Name: <b>{data?.[0]?.user?.companyName}</b><br/>
                             {`${data?.[0]?.user?.address?.city}-${data?.[0]?.user?.address?.zipcode}, ${data?.[0]?.user?.address?.state}`}</td>
                             <td>{data?.[0]?.user?.phone}</td>
                             <td>
                             {
                                 !!data && data?.map((items, itemIndex) => {
                                     return(
                                         <Fragment key={itemIndex}>
                                             <div className="user-cart-item mb-1 p-1">
                                              Date: <b>{moment(items?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</b><br/>
                                             Qty: <b>{items?.quantity}).</b> <span>{items?.proudct?.name}</span><br/>
                                                 {items?.customize?.length > 0 && <><b>SubProduct</b><br/></>}
                                                 {items?.customize?.map((custom, customIndex) => {
                                                     return(
                                                         <Fragment key={customIndex}>
                                                             <b>{customIndex + 1}. </b> <span>
                                                                 {custom?.name}
                                                             </span><br/>
                                                         </Fragment>
                                                     )
                                                 })}
                                             </div>
                                         </Fragment>
                                     )
                                 })
                             }
                             </td>
                            </tr>
                         )
                      })
                }
            </tbody>
          </table>
        </div>
    </>
  );
};

export default UsersCartList;
