import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import NavHeader from "./NavHeader";
import { useDispatch, useSelector } from "react-redux";
import sumBy from "lodash/sumBy";
import { applyCoupon } from "../../reducers/commonReducer";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const [coupon, setCoupon] = useState('');
  const { getCartlistData, applyCouponData } = useSelector((state) => state.commonReducer);
  let cartDetails = sumBy(
    !!getCartlistData?.list && getCartlistData?.list,
    function (o) {
      return o.quantity;
    }
  );
  let totalAmount = sumBy(!!getCartlistData?.list && getCartlistData?.list, function(o) { return o.proudct?.sale * o?.quantity; })
  return (
    <>
      <NavHeader />
      <div className="container pb-5">
        <main>
          <div className="py-3 text-center">
            <h2>Checkout form</h2>
          </div>
          <div className="row g-5">
            <div className="col-md-6 col-lg-5 order-md-last">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-primary">Your cart</span>
                <span className="badge bg-primary rounded-pill">
                  {cartDetails}
                </span>
              </h4>
              <ul className="list-group mb-3">
                {!!getCartlistData?.list &&
                  getCartlistData?.list.map((data, index) => {
                    return (
                        <li className="row list-group-item d-flex justify-content-between lh-sm" key={index}>
                          <div className="col-md-6">
                            <h6 className="my-0"><b>{data?.proudct?.name}</b></h6>
                          </div>
                          <span className="col-md-3 text-muted">{data?.quantity}</span>
                          <span className="col-md-3 text-muted">Rs. {data?.proudct?.sale * data?.quantity}</span>
                        </li>
                    );
                  })}
                <li className="row list-group-item d-flex justify-content-between">
                  <span className="col-md-6">Total (Rupee)</span>
                  <strong className="col-md-3">Qty: {cartDetails}</strong>
                  <strong className="col-md-3">Rs. {totalAmount}</strong>
                </li>
                {!!applyCouponData && !!applyCouponData?.coupon && <>
                <li className="row list-group-item d-flex justify-content-between">
                  <strong className="col-md-9">Congratulations Your Coupon Amount🎉🎉</strong>
                  <strong className="col-md-3">Rs. {!!applyCouponData && applyCouponData?.coupon?.amount}</strong>
                </li>
                <li className="row list-group-item d-flex justify-content-between">
                  <strong className="col-md-9">You Pay Only</strong>
                  <strong className="col-md-3">Rs. {totalAmount - applyCouponData?.coupon?.amount}</strong>
                </li></>}
              </ul>
              <div className="row p-2">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Promo code"
                    name="coupon"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  <button type="submit" className="btn btn-danger" 
                    onClick={() => {
                      dispatch(
                        applyCoupon({
                          coupon
                        })
                      )
                    }}>
                    Redeem
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-7">
              <h4 className="mb-3">Billing address</h4>
              <form className="needs-validation" noValidate>
                <div className="row g-3">
                  <div className="col-sm-6">
                    <label htmlFor="firstName" className="form-label">
                      First name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      placeholder
                      defaultValue
                      required
                    />
                    <div className="invalid-feedback">
                      Valid first name is required.
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="lastName" className="form-label">
                      Last name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      placeholder
                      defaultValue
                      required
                    />
                    <div className="invalid-feedback">
                      Valid last name is required.
                    </div>
                  </div>
                  <div className="col-12">
                    <label htmlFor="email" className="form-label">
                      Email <span className="text-muted">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="you@example.com"
                    />
                    <div className="invalid-feedback">
                      Please enter a valid email address for shipping updates.
                    </div>
                  </div>
                  <div className="col-12">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="Plaza street"
                      required
                    />
                    <div className="invalid-feedback">
                      Please enter your shipping address.
                    </div>
                  </div>
                  <div className="col-12">
                    <label htmlFor="address2" className="form-label">
                      Address 2 <span className="text-muted">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address2"
                      placeholder="Apartment or suite"
                    />
                  </div>
                  <div className="col-md-5">
                    <label htmlFor="country" className="form-label">
                      Country
                    </label>
                    <select className="form-select" id="country" required>
                      <option value>Choose...</option>
                      <option>India</option>
                    </select>
                    <div className="invalid-feedback">
                      Please select a valid country.
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="state" className="form-label">
                      State
                    </label>
                    <select className="form-select" id="state" required>
                      <option value>Choose...</option>
                      <option>Delhi</option>
                    </select>
                    <div className="invalid-feedback">
                      Please provide a valid state.
                    </div>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="zip" className="form-label">
                      Zip
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="zip"
                      placeholder
                      required
                    />
                    <div className="invalid-feedback">Zip code required.</div>
                  </div>
                </div>
                <hr className="my-4" />
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="same-address"
                  />
                  <label className="form-check-label" htmlFor="same-address">
                    Shipping address is the same as my billing address
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="save-info"
                  />
                  <label className="form-check-label" htmlFor="save-info">
                    Save this information for next time
                  </label>
                </div>
                <hr className="my-4" />
                <h4 className="mb-3">Payment</h4>
                <div className="my-3">
                  <div className="form-check">
                    <input
                      id="credit"
                      name="paymentMethod"
                      type="radio"
                      className="form-check-input"
                      defaultChecked
                      required
                    />
                    <label className="form-check-label" htmlFor="credit">
                      Credit card
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      id="debit"
                      name="paymentMethod"
                      type="radio"
                      className="form-check-input"
                      required
                    />
                    <label className="form-check-label" htmlFor="debit">
                      Debit card
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      id="paypal"
                      name="paymentMethod"
                      type="radio"
                      className="form-check-input"
                      required
                    />
                    <label className="form-check-label" htmlFor="paypal">
                      Paytm
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      id="paypal"
                      name="paymentMethod"
                      type="radio"
                      className="form-check-input"
                      required
                    />
                    <label className="form-check-label" htmlFor="paypal">
                      Phonepe
                    </label>
                  </div>
                </div>
                <div className="row gy-3">
                  <div className="col-md-6">
                    <label htmlFor="cc-name" className="form-label">
                      Name on card
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cc-name"
                      placeholder
                      required
                    />
                    <small className="text-muted">
                      Full name as displayed on card
                    </small>
                    <div className="invalid-feedback">
                      Name on card is required
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="cc-number" className="form-label">
                      Credit card number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cc-number"
                      placeholder
                      required
                    />
                    <div className="invalid-feedback">
                      Credit card number is required
                    </div>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="cc-expiration" className="form-label">
                      Expiration
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cc-expiration"
                      placeholder
                      required
                    />
                    <div className="invalid-feedback">
                      Expiration date required
                    </div>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="cc-cvv" className="form-label">
                      CVV
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cc-cvv"
                      placeholder
                      required
                    />
                    <div className="invalid-feedback">
                      Security code required
                    </div>
                  </div>
                </div>
                <hr className="my-4" />
                <button className="w-100 btn btn-danger btn-lg" type="submit">
                  Continue to checkout
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>

      {/* <div className="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
  <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
    <div className="modal-content">
      <div className="modal-header border-bottom-0">
        <h5 className="modal-title" id="exampleModalLabel">
          Your Shopping Cart
        </h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span>&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <table className="table table-image">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Qty</th>
              <th scope="col">Total</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="w-25">
                <img src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/vans.png" className="img-fluid img-thumbnail" alt="Sheep"/>
              </td>
              <td>Vans Sk8-Hi MTE Shoes</td>
              <td>89 Rs.</td>
              <td className="qty"><input type="text" className="form-control" id="input1" value="2"/></td>
              <td>178 Rs.</td>
              <td>
                <a href="#" className="btn btn-danger btn-sm">
                  <i className="fa fa-times"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table> 
        <div className="d-flex justify-content-end">
          <h5>Total: <span className="price text-success">89 Rs.</span></h5>
        </div>
      </div>
      <div className="modal-footer border-top-0 d-flex justify-content-between">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-success">Checkout</button>
      </div>
    </div>
  </div>
</div> */}
      <Footer />
    </>
  );
};

export default CheckoutPage;
