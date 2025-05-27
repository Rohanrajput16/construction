import React, { useEffect, useState } from "react";
import "./sub.css";
import "../Sub/common.css";
import PCD from "../../images/logo.png";
import { CloseButton, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import {
  getCartlist,
  getProducts,
  getSocialMediaSettings,
  updateCart,
} from "../../reducers/commonReducer";
import sumBy from "lodash/sumBy";
import { checkout, dashboard, home, login, userDashboard } from "../../const";

const Header = () => {
  const [lgShow, setLgShow] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    !!localStorage.getItem("x-auth-token") && dispatch(getCartlist());
    // !!localStorage.getItem("x-auth-token") && dispatch(getUserProfile());
    dispatch(getSocialMediaSettings());
  }, []);
  // const {
  //   getCartlistData,
  // } = useSelector((state) => state.commonReducer);
  // let getCartDetails = JSON.parse(localStorage.getItem("cartItem"));
  // let cartDetails = sumBy(
  //   !!getCartlistData?.list && getCartlistData?.list,
  //   function (o) {
  //     return o.quantity;
  //   }
  // );
  // let localcartDetails = sumBy(
  //   !!getCartDetails && getCartDetails,
  //   function (o) {
  //     return o.quantity;
  //   }
  // );
  const handleClose = () => {
    setLgShow(false);
  };

  return (
    <>
      <section className="yellow-header header-main botm-border">
        <div className="container-fluid">
          <div className="row p-0 m-0">
            <div className="col-md-4 small-txt mbl-hide">
              <div className="d-flex">
                <div>
                  <p className="pt-2 pb-2">Welcome to Arinandana Trading</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 small-txt">
              <div className="pt-2 pb-2 justify-content-center card-details d-flex mbl-cntr">
                {((localStorage.getItem("x-auth-token") &&
                  localStorage.getItem("slug") !== "admin") ||
                  localStorage.getItem("slug") == "customer") && (
                  <>
                    <Link to={userDashboard}>
                      <p>
                        My Account <span>|</span>
                      </p>
                    </Link>
                  </>
                )}
                {localStorage.getItem("x-auth-token") &&
                  localStorage.getItem("slug") === "admin" && (
                    <Link to={dashboard}>
                      <p>
                        Dashboard <span>|</span>
                      </p>
                    </Link>
                  )}
                {!localStorage.getItem("x-auth-token") ? (
                  <p>
                    <Link to="/login" className="singIn">
                    <i className="bi bi-box-arrow-in-left"></i> Sign In
                    </Link>
                    {/* <span>|</span> */}
                    {/* <Link className="singIn" to="/signup"> <i className="bi bi-door-open-fill"></i> Register
                    </Link> */}
                  </p>
                ) : (
                  <p
                    onClick={() => {
                      localStorage.clear();
                      setTimeout(() => {
                        navigate(home);
                      }, 1000);
                    }}
                  >
                    <Link className="singIn">
                      <i className="bi bi-power"></i>
                    </Link>
                  </p>
                )}
              </div>
            </div>
            <div className="col-md-4 small-txt mbl-none">
              <div className="pt-2 pb-2 float-right-lg card-details d-flex mbl-cntr">
                <Link to={home}>
                  <p>
                    <i className="bi bi-house-door-fill"></i> Home{" "}
                    <span>|</span>
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* logo menu */}
      <section className="yellow-header header-main">
        <div className="container-fluid">
          <div className="row pt-3 pb-3 mbl-padding-0 align-item-center">
            <Col
              xs={6}
              md={3}
              lg={3}
              className="weblogo justify-content-center mbl-margin-0"
            >
              <Link to={home}>
                <img className="logo" src={PCD} />
              </Link>
            </Col>
            <Col className="col-md-5 col-lg-5 search-box mbl-hide">
              <div className="search">
                <input
                  autoFocus
                  type="text"
                  className="searchTerm"
                  placeholder="What are you looking for?"
                  onClick={(e) => navigate("/shop")}
                  onChange={(e) => {
                    dispatch(
                      getProducts({
                        search:
                          e.target.value.charAt(0).toUpperCase() +
                          e.target.value.slice(1),
                      })
                    );
                  }}
                />
                {search.length < 2 ? (
                  <button
                    type="submit"
                    className="searchButton"
                    onClick={() => dispatch(getProducts({ search: search }))}
                  >
                    <i className="bi bi-search"></i>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="searchButton"
                    onClick={() => {
                      dispatch(getProducts());
                      setSearch("");
                    }}
                  >
                    <CloseButton />
                  </button>
                )}
              </div>
            </Col>
            <Col
              md={2}
              lg={2}
              className="hdphone d-flex justify-content-center mbl-hide"
            >
              <p className="pt-2 pb-2">
                <span>HelpLine:</span>
                <br />
                <span className="font-700">
                6289526299
                </span>
              </p>
            </Col>

            <Col
              xs={6}
              md={2}
              lg={2}
              className="d-flex justify-content-end-mbl"
            >
              {/* <Link to={getCartlistData?.list?.length >= 1 && checkout}> */}
                {/* <div className="userCart">
                  {localStorage.getItem("x-auth-token") && (
                    <span className="cart-order">
                      {localStorage.getItem("x-auth-token")
                        ? cartDetails
                        : localcartDetails}
                    </span>
                  )}
                </div> */}
              {/* </Link> */}
              <Link to={home}>
                <div className="header-cart-right">
                  <i className="bi bi-house-door-fill"></i>
                </div>
              </Link>
              <Link
                to={
                  localStorage.getItem("x-auth-token") ? userDashboard : login
                }
              >
                <div className="header-cart-right">
                  {localStorage.getItem("x-auth-token") ? (
                    <i className="bi bi-person-fill"></i>
                  ) : (
                    <i className="bi bi-lock-fill"></i>
                  )}
                </div>
              </Link>
              {/* start checkout popup */}
              <Modal
                size="lg"
                show={lgShow}
                onHide={handleClose}
                // onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
              >
                {/* <Modal.Header>
                  <Modal.Title id="example-modal-sizes-title-lg">
                    Your Cart
                  </Modal.Title>
                </Modal.Header> */}
                <Modal.Body>
                  <div>
                    <table
                      id="cart"
                      className="table table-hover table-condensed"
                    >
                      <thead>
                        <tr>
                          <th style={{ width: "50%" }}>Product</th>
                          <th style={{ width: "10%" }}>Price</th>
                          <th style={{ width: "8%" }}>Quantity</th>
                          <th style={{ width: "22%" }} className="text-center">
                            Subtotal
                          </th>
                          <th style={{ width: "10%" }} />
                        </tr>
                      </thead>
                      {/* <tbody>
                        {!!getCartlistData?.list &&
                          getCartlistData?.list.map((data, index) => {
                            return (
                              <tr key={index}>
                                <td data-th="Product">
                                  <div className="row">
                                    <div className="col-sm-12 hidden-xs">
                                      <img
                                        src={data?.proudct?.images[0]}
                                        alt="..."
                                        className="img-responsive popup-product"
                                      />
                                    </div>
                                  </div>
                                </td>
                                <td data-th="Price">
                                  Rs. {data?.proudct?.sale}
                                </td>
                                <td data-th="Quantity">
                                  <input
                                    type="number"
                                    className="form-control text-center"
                                    value={data?.quantity}
                                    onChange={async (e) => {
                                      await dispatch(
                                        updateCart({
                                          id: data?.id,
                                          quantity: +e.target.value,
                                        })
                                      );
                                      dispatch(getCartlist());
                                    }}
                                  />
                                </td>
                                <td
                                  data-th="Subtotal"
                                  className="text-center phone-center"
                                >
                                  Rs. {data?.proudct?.sale * data?.quantity}
                                </td>
                                <td className=" text-center phone-center">
                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={async () => {
                                      dispatch(
                                        await updateCart({
                                          id: data?.id,
                                          quantity: 0,
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
                              </tr>
                            );
                          })}
                      </tbody> */}
                      {/* <tfoot>
                        <tr>
                          <td>
                            <Link to={home}>
                              <span className="btn btn-warning">
                                Continue Shopping
                              </span>
                            </Link>
                          </td>
                          <td colSpan={2} className="hidden-xs text-center">
                            {" "}
                            <strong>Total</strong>{" "}
                          </td>
                          <td className="hidden-xs text-center">
                            <strong>
                              Rs.{" "}
                              {sumBy(
                                !!getCartlistData?.list &&
                                  getCartlistData?.list,
                                function (o) {
                                  return o.proudct?.sale * o?.quantity;
                                }
                              )}
                            </strong>
                          </td>

                          <td>
                            <Link to={checkout}>
                              <span className="btn btn-warning btn-block">
                                Checkout
                              </span>
                            </Link>
                          </td>
                        </tr>
                      </tfoot> */}
                    </table>
                  </div>
                </Modal.Body>
              </Modal>
              {/* end checkout popup */}
            </Col>
          </div>
        </div>
      </section>
    
      <section>
        <Row>
          <Col className="col-sx-12 col-sm-12 mt-1 desktop-hide">
            <div className="search">
              <input
                autoFocus
                type="text"
                className="searchTerm"
                placeholder="What are you looking for?"
                onClick={(e) => navigate("/shop")}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              {search.length < 2 ? (
                <button
                  type="submit"
                  className="searchButton"
                  onClick={() => dispatch(getProducts({ search: search }))}
                >
                  <i className="bi bi-search"></i>
                </button>
              ) : (
                <button
                  type="submit"
                  className="searchButton"
                  onClick={() => {
                    dispatch(getProducts());
                    setSearch("");
                  }}
                >
                  <CloseButton />
                </button>
              )}
            </div>
          </Col>
        </Row>
      </section>
      {/* {!!getHomePageSettingList?.home?.floating_icon &&
        getHomePageSettingList.home.floating_icon === true && (
          <ul id="social_side_links" className="side-social-links">
            {getSocialMediaSettingsData?.whatsapp && (
              <li>
                <a
                  href={`https://api.whatsapp.com/send?phone=+91${getSocialMediaSettingsData?.whatsapp}&text=Hi. I am intrested in Your Services..&source=&data=&app_absent=`}
                  target="_blank"
                >
                  <img src={whatsapp} />
                </a>
              </li>
            )}
            {getSocialMediaSettingsData?.facbook && (
              <li>
                <a href={getSocialMediaSettingsData.facbook} target="_blank">
                  <img src={facebook} />
                </a>
              </li>
            )}
            {getSocialMediaSettingsData?.instagram && (
              <li>
                <a href={getSocialMediaSettingsData.instagram} target="_blank">
                  <img src={instagram} />
                </a>
              </li>
            )}
            {getSocialMediaSettingsData?.twitter && (
              <li>
                <a href={getSocialMediaSettingsData.twitter} target="_blank">
                  <img src={twitter} />
                </a>
              </li>
            )}
            {getSocialMediaSettingsData?.youtube && (
              <li>
                <a href={getSocialMediaSettingsData?.youtube} target="_blank">
                  <img src={youtube} />
                </a>
              </li>
            )}
            {getSocialMediaSettingsData?.linkdin && (
              <li>
                <a href={getSocialMediaSettingsData.linkdin} target="_blank">
                  <img src={linked} />
                </a>
              </li>
            )}
            {getSocialMediaSettingsData?.mail && (
              <li>
                <a href={`mailto:${getSocialMediaSettingsData.mail}`}>
                  <img src={mail} />
                </a>
              </li>
            )}
            {getSocialMediaSettingsData?.phone && (
              <li>
                <a href={`tel:+91${getSocialMediaSettingsData.phone}`}>
                  <img src={phone} />
                </a>
              </li>
            )}
            {getSocialMediaSettingsData?.indiamart && (
              <li>
                <a href={getSocialMediaSettingsData.indiamart} target="_blank">
                  <img src={indiamart} />
                </a>
              </li>
            )}
          </ul>
        )} */}
    </>
  );
};

export default Header;
