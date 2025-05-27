import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideMenu from "../../Components/SideMenu";
import {
  addShipping,
  deleteShipping,
  getAllStates,
  getShippings,
  updateShipping,
} from "../../reducers/commonReducer";
import TaxClassesAction from "./ShippingChargeAction";
import { Button, Col, Row } from "react-bootstrap";
import { home } from "../../const";

const ShippingChargesList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShippings());
    dispatch(getAllStates());
    if (!localStorage.getItem("x-auth-token")) {
      navigate(home);
    }
  }, []);

  const { getShippingsData } = useSelector((state) => state.commonReducer);
  return (
    <>
      <SideMenu />
      <div className="mt-extra content container-fluid">
        <TaxClassesAction
          title={"Add Shipping"}
          popUpTitle="Add Shipping Cost Kg Wise"
          api={addShipping}
        />
        <table className="table mt-2">
          <thead className="normalplace">
            <tr>
              <th className="over-col-size">Sr.</th>
              <th className="over-col-size">State</th>
              <th className="over-col-size">Shipping Kg wise Price</th>
              <th className="over-col-size">Action</th>
            </tr>
          </thead>
          <tbody>
            {!!getShippingsData?.list &&
              getShippingsData?.list.map((data, index) => {
                return (
                  <React.Fragment key={index}>
                    <tr key={data?._id}>
                      <td>{index + 1}.</td>
                      <td>{data?.state?.toUpperCase()}</td>
                      <td>
                        <Row>
                          {Object.entries(data?.cost).map(([kg, price]) => {
                            return (
                              <>
                                <Col md={6}>
                                  <div className="shipping-cost-tab mb-1">
                                    <span>
                                      <b>{kg} </b>Kg : <b>{price} </b>Rs.
                                    </span>
                                  </div>
                                </Col>
                              </>
                            );
                          })}
                        </Row>
                      </td>
                      <td>
                        <TaxClassesAction
                          title={<i className="bi bi-pencil-square"></i>}
                          popUpTitle="Update Tax Class"
                          api={updateShipping}
                          id={data?.id}
                          ustate={data?.state}
                          ucost={data?.cost}
                          stateHide={true}
                        />
                        <Button
                          variant="danger"
                          className="mx-1"
                          onClick={async () => {
                            await dispatch(deleteShipping(data?.id));
                            await dispatch(getShippings());
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

export default ShippingChargesList;
