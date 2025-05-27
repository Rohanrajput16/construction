import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { orderCreate } from "../../reducers/orderDetailsReducer";

export const CODConfirmation = ({
  activeShow,
  show, 
  changeCod,
  totalAmount,
}) => {
  const handleClose = () => {
    activeShow(false);
    changeCod(false);
  };
  const { getSettingData } = useSelector((state) => state.commonReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createOrder = async () => {
    const apiResponse = await dispatch(orderCreate({
      cod:true
    }));
    if (
      apiResponse?.payload?.status === 0 &&
      localStorage.getItem("x-auth-token") ) {
      return setTimeout(() => {
        navigate('/shop');
      }, 1000);
    }
    return null;
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>COD</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <tbody>
              <tr>
                <td className="w-70">Total Order Value including shipping Charges</td>
                <td>{totalAmount}/-</td>
              </tr>
              <tr>
                <td>COD Charges</td>
                <td>
                  {
                    parseInt(
                      ((+getSettingData?.setting?.cod)?.toFixed(0) *
                        (totalAmount - (+getSettingData?.setting?.codamount * totalAmount)?.toFixed(0) /
                            100)?.toFixed(0)) /
                      100
                    ) }/-</td>
              </tr>
              <tr>
                <td>Total Amount including COD Charges</td>
                <td>
                  {+totalAmount +
                    +(
                      (getSettingData?.setting?.cod *
                        (totalAmount -
                          (getSettingData?.setting?.codamount * totalAmount) /
                            100)) /
                      100
                    ).toFixed(0)}/-
                </td>
              </tr>
              <tr>
                <td>Advance to be paid</td>
                <td>
                  {(
                    (getSettingData?.setting?.codamount * totalAmount) /
                    100
                  ).toFixed(0)}/-
                </td>
              </tr> 
              <tr>
                <td>Amount payable on delivery</td>
                <td>
                  {(
                    totalAmount -
                    (getSettingData?.setting?.codamount * totalAmount) / 100 +
                    (getSettingData?.setting?.cod *
                      (totalAmount -
                        (getSettingData?.setting?.codamount * totalAmount) /
                          100)) /
                      100
                  ).toFixed(0)}/-
                </td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer className="mx-auto popup-footer">
          <Button variant="dark" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="warning"
            onClick={async() => {
              await createOrder();
              // changeCod(true);
              // activeShow(false);
            }}
          >
           Pay {Math.round((10/100) * totalAmount)}/-
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
