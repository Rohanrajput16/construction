import React, { useState, useEffect } from "react";
import "../Sub/table.css";
import { useDispatch, useSelector } from "react-redux";
import { getCartlist, updateCart } from "../../reducers/commonReducer";
import { Col, Row } from "react-bootstrap";

export default function ItemTable({ cartDetails, totalAmount }) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState();
  const [productId, setProductId] = useState();
  const { getCartlistData } = useSelector((state) => state.commonReducer);
  let width = window.innerWidth;

  useEffect(() => {
    let timeOut = setTimeout(async () => {
      await dispatch(
        productId?.length > 0 &&
          updateCart({
            id: productId,
            quantity: +search,
          })
      );
      await dispatch(getCartlist());
      // await dispatch(shippingCost());
    }, 800);
    return () => clearTimeout(timeOut);
  }, [search]);

  return (
    <div className="r-main-tbl">
      <table>
        <thead className="visible@l">
          <tr className="order-tbl">
            <th>Image</th>
            <th>Product Name</th>
            <th>Quantity</th>
            {/* <th>Reward</th> */}
            <th>Rate</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!!getCartlistData?.list &&
            getCartlistData?.list.map((data, index) => {
              //calculate quantity wise Discounted Price
              const calculateDiscountedPrice = () => {
                var discountPercent = 0;
                // Find the discount price based on the quantity
                for (const q in data?.proudct?.price) {
                  if (data?.quantity >= parseInt(q)) {
                    discountPercent = data?.proudct?.price[q];
                  }
                }
                // Calculate the discounted price
                let customizeSub =
                  (data?.customize?.[0]?.price || 0) +
                  (data?.customize?.[1]?.price || 0) +
                  (data?.customize?.[2]?.price || 0) +
                  (data?.customize?.[3]?.price || 0);
                const discountedPrice = discountPercent
                  ? discountPercent
                  : data?.proudct?.sale
                  ? data?.proudct?.sale + customizeSub
                  : data?.proudct?.mrp + customizeSub;
                return +discountedPrice;
              };
              return (
                width > 468 ?
                <tr key={index}>
                  <td>
                    <img
                      src={`/${
                        data?.proudct?.images?.[data?.proudct?.defaultImage]
                      }`}
                    />
                  </td>
                  {/* <span key={index}>{`${data?.name}, `}</span> */}
                  <td>
                    <strong className="hidden@l">Product Name:</strong>{" "}
                    <b>{data?.proudct?.name}</b><br/>
                    <ul className="list-style-dot px-4">
                      {
                        data?.customize?.map((data, index) => (
                          <li>{data?.name}</li>
                        ))
                      }
                    </ul>
                  </td>
                  <td>
                    <strong className="hidden@l">Quantity:</strong>{" "}
                    <input
                      type="number"
                      className="form-control text-center"
                      value={productId === data?.id && search}
                      placeholder={data?.quantity === 0 ? "" : data?.quantity}
                      onChange={(e) => {
                        let inputValue = parseInt(e.target.value);
                        setSearch(inputValue);
                        setProductId(data?.id);
                      }}
                      onBlur={(e) => {
                        (e.target.value < data?.proudct?.minqty ||  e.target.value > data?.proudct?.quantity) && alert(`Please enter a quantity between ${data?.proudct?.minqty} to ${data?.proudct?.quantity}. Thank you!`)
                        if (e.target.value < data?.proudct?.minqty) {
                          e.target.value = data?.proudct?.minqty;
                        } else if (e.target.value > data?.proudct?.quantity) {
                          e.target.value = data?.proudct?.quantity;
                        }
                        setSearch(e.target.value);
                        setProductId(data?.id);
                      }}
                    />
                  </td>
                  {/* <td>
                    {data?.proudct?.reward * data?.quantity}
                  </td> */}
                  <td>
                    <strong className="hidden@l">Rate:</strong> Rs.{" "}
                    {calculateDiscountedPrice().toFixed(2)}
                  </td>
                  <td>
                    <strong className="hidden@l">
                      Subtotal:
                    </strong>{" "}
                    {calculateDiscountedPrice().toFixed(2) * data?.quantity}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={async () => {
                        dispatch(
                          await updateCart({
                            id: data?.id,
                            quantity: 0,
                            delete: true,
                          })
                        );
                        setTimeout(() => {
                          dispatch(getCartlist());
                        }, 500);
                      }}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>:<Row className="pt-1 pb-1 rounded mb-1 light-cart-bg mx-0">
                  <Col sm={4} xs={4}>
                  <img className="h-auto"
                      src={`/${
                        data?.proudct?.images?.[data?.proudct?.defaultImage]
                      }`}
                    />
                    <div className="mt-2">
                    <input
                      type="number"
                      className="form-control text-center"
                      value={productId === data?.id && search}
                      placeholder={data?.quantity === 0 ? "" : data?.quantity}
                      onChange={(e) => {
                        let inputValue = parseInt(e.target.value);
                        (inputValue < data?.proudct?.minqty ||  inputValue > data?.proudct?.quantity) && alert(`Please enter a quantity between ${data?.proudct?.minqty} to ${data?.proudct?.quantity}. Thank you!`)
                        if (inputValue < data?.proudct?.minqty) {
                          inputValue = data?.proudct?.minqty;
                        } else if (inputValue > data?.proudct?.quantity) {
                          inputValue = data?.proudct?.quantity;
                        }
                        setSearch(inputValue);
                        setProductId(data?.id);
                      }}
                    />
                    </div>
                  </Col>
                  <Col sm={7} xs={7} className="p-0">
                 <p className="mb-0">{data?.proudct?.name}</p>
                 <p className="mb-0"><b>Rs. {calculateDiscountedPrice().toFixed(2)}</b></p>
                 <p className="mb-0">{data?.product?.quantity === 0 ? (
                        <b className="discount-color">Out Of Stock</b>
                      ) : (
                       <b className="text-success">In Stock</b>
                      )}</p>
                 {/* <p className="mb-0">Sold By <span className="fw-bold discount-color"><b>{data?.proudct?.brand?.name}</b></span></p> */}
                  </Col>
                  <Col sm={1} xs={1} className="p-0">
                  <button
                      className="btn btn-danger btn-sm px-1 py-0"
                      onClick={async () => {
                        dispatch(
                          await updateCart({
                            id: data?.id,
                            quantity: 0,
                            delete: true,
                          })
                        );
                        setTimeout(() => {
                          dispatch(getCartlist());
                        }, 500);
                      }}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </Col>
                </Row>
              );
            })}
          <tr>
            {
              width > 468 &&  <td colSpan="2">
              <strong className="hidden@l"></strong> Total Amount (Inclusive of GST)
            </td>
            }
            <td>
              <strong className="hidden@l"></strong>Total Qty:{" "}
              <b>{cartDetails === 0 ? "" : cartDetails}</b>
            </td>
            {/* <td>
              <strong className="hidden@l"></strong>Reward:{" "}
              <b>{getCartlistData?.rewardTotal}</b>
            </td> */}
            {width > 468 && <td></td>}
            <td colSpan="2">
              <strong className="hidden@l">
              Total Amount (Inclusive of GST):
              </strong>{" "}
              Rs. <b>{totalAmount}</b>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
