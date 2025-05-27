import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogOut } from "../reducers/commonReducer";
// import PCD from "../images/logo.png";
import {
  // addProduct,
  // attributes,
  // banners,
  // brands,
  categories,
  // coupons,
  dashboard,
  // EmailTemplates,
  home,
  infoPages,
  // minStockList,
  // offers,
  // permissions,
  productList,
  // reviews,
  // rewardSlab,
  // roles,
  // serviceCenter,
  settings,
  // shippingCharges,
  // shop,
  // socialMediaSetting,
  // subProducts,
  // taxClasses,
  // trackers,
  // userCartList,
  // users,
  // warranty,
  project,
  Estimation,
  // addproject,
} from "../const";
// import AddProject from "../Pages/Projects/AddProject";

const SideMenu = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const logOut = () => {
    dispatch(
      userLogOut({ "x-auth-token": localStorage.getItem("x-auth-token") })
    );
    localStorage.removeItem("x-auth-token");
    localStorage.removeItem("userRole");
    navigate(home);
  };
  return (
    <>
      <div className="row print-hide">
        <div className="col">
          <div className={`side-menu ${active ? "active-menu" : ""}`}>
            <div className="top-section">
              {/* <div>
                <img src={PCD} />
              </div> */}
              <ul className="nav side-links fs-3 mt-1  flex-column">
                {/* {localStorage.getItem("x-auth-token") && */}
                {/* // localStorage.getItem("slug") == "admin" && ( */}
                <>
                  {active && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        padding: "0 10px",
                      }}
                    >
                      <button
                        style={{
                          background: "transparent",
                          borderRadius: "5px",
                        }}
                        onClick={() => setActive(false)}
                      >
                        <i class="bi bi-x-lg"></i>
                      </button>
                    </div>
                  )}
                  <NavLink to={dashboard}>
                    {/* {active ? (
                      <i className="bi bi-bar-chart-line me-2 "></i>
                    ) : ( */}
                    <span className="border-bottom ">
                      {" "}
                      <li className="nav-item text-white">
                        <span
                          className="nav-link sideMenuLinks px-2"
                          aria-current="page"
                          href="#"
                        >
                          <i className="bi bi-bar-chart-line me-2 ds"></i>
                          Dashboard
                        </span>
                      </li>{" "}
                    </span>
                    {/* )} */}
                    <hr />
                  </NavLink>


                  <NavLink to={categories}>
                    {/* {active ? (
                      <i className="bi bi-handbag me-2 "></i>
                    ) : ( */}
                    <span className="border-bottom">
                      {" "}
                      <li className="nav-item">
                        <span
                          className="nav-link sideMenuLinks px-2"
                          aria-current="page"
                          href="#"
                        >
                          <i className="bi bi-handbag me-2 ds"></i>
                          Categories
                        </span>
                      </li>{" "}
                    </span>
                    {/* )} */}
                    <hr />
                  </NavLink>

                  <NavLink to={productList}>
                    {/* {active ? (
                      <i className="bi bi-cart3 me-2 "></i>
                    ) : ( */}
                    <span className="border-bottom">
                      <li className="nav-item">
                        <span
                          className="nav-link sideMenuLinks px-2"
                          aria-current="page"
                          href="#"
                        >
                          <i className="bi bi-cart-check me-2 ds"></i>
                          Products
                        </span>
                      </li>
                    </span>
                    {/* )} */}
                    <hr />
                  </NavLink>
                  {/* <span data-bs-toggle="collapse" data-bs-target="#demo">
                    {inactive ? (
                      <i className="bi bi-terminal-plus me-2"></i>
                    ) : (
                      <span className="border-bottom">
                        <li className="nav-item">
                          <span className="nav-link sideMenuLinks" aria-current="page" href="#">
                            <i className="bi bi-terminal-plus me-2"></i>
                            Product
                            <i className="bi bi-chevron-double-down side-space"></i>
                          </span>
                          <div id="demo" className="collapse">
                            <NavLink to={productList}>
                              <i className="bi bi-cart3 me-2"></i>
                              <span className="border-bottom">
                                <li className="nav-item">
                                  <span className="nav-link sideMenuLinks" aria-current="page" href="#">
                                    <i className="bi bi-cart-check me-2"></i>
                                    Products
                                  </span>
                                </li>
                              </span>
                            </NavLink>
                            <NavLink to={addProduct}>
                              <i className="bi bi-cart3 me-2"></i>
                              <span className="border-bottom">
                                <li className="nav-item">
                                  <span className="nav-link sideMenuLinks" aria-current="page" href="#">
                                    <i className="bi bi-cart3 me-2"></i>
                                    Add Products
                                  </span>
                                </li>
                              </span>
                            </NavLink>
                          </div>
                        </li>
                      </span>
                    )}
                  </span> */}

                  {/* <NavLink to={users}>
                        {inactive ? (
                          <i className="bi bi-people me-2 "></i>
                        ) : (
                          <span className="border-bottom">
                            {" "}
                            <li className="nav-item">
                              <span
                                className="nav-link sideMenuLinks"
                                aria-current="page"
                                href="#"
                              >
                                <i className="bi bi-people me-2 ds"></i>
                                Users
                                <hr />
                              </span>
                            </li>{" "}
                          </span>
                        )}
                      </NavLink> 
                      <NavLink to="/orders">
                        {inactive ? (
                          <i className="bi bi-clipboard-data me-2 "></i>
                        ) : (
                          <span className="border-bottom">
                            {" "}
                            <li className="nav-item">
                              <span
                                className="nav-link sideMenuLinks"
                                aria-current="page"
                                href="#"
                              >
                                <i className="bi bi-clipboard-data me-2 ds"></i>
                                Orders
                                <hr />
                              </span>
                            </li>{" "}
                          </span>
                        )}
                      </NavLink> */}
                

                  {/* <NavLink to={project}>
                    {inactive ? (
                      <i className="bi bi-people me-2 "></i>
                    ) : (
                      <span className="border-bottom">
                        {" "}
                        <li className="nav-item">
                          <span
                            className="nav-link sideMenuLinks"
                            aria-current="page"
                            href="#"
                          >
                            <i className="bi bi-people me-2 ds"></i>
                            Project
                            <hr />
                          </span>
                        </li>{" "}
                      </span>
                    )}
                  </NavLink> */}
                  {/* <NavLink to={Estimation}>
                    {inactive ? (
                      <i className="bi bi-people me-2 "></i>
                    ) : (
                      <span className="border-bottom">
                        {" "}
                        <li className="nav-item">
                          <span
                            className="nav-link sideMenuLinks"
                            aria-current="page"
                            href="#"
                          >
                            <i className="bi bi-people me-2 ds"></i>
                            Project Estimation
                            <hr />
                          </span>
                        </li>{" "}
                      </span>
                    )}
                  </NavLink> */}
                  <NavLink to={project}>
                    <span className="border-bottom">
                      <li className="nav-item">
                        <span
                          className="nav-link sideMenuLinks px-2"
                          aria-current="page"
                          href="#"
                        >
                          <i className="bi bi-folder me-2 ds"></i>
                          Project
                        </span>
                      </li>
                    </span>
                  </NavLink>

                  {/* <span data-bs-toggle="collapse" data-bs-target="#demo">
                    {inactive ? (
                      <i className="bi bi-terminal-plus me-2"></i>
                    ) : (
                      <span className="border-bottom">
                        <li className="nav-item">
                          <span className="nav-link sideMenuLinks" aria-current="page" href="#">

                            <i className="bi bi-folder me-2"></i>
                            Project
                            <i className="bi bi-chevron-double-down side-space"></i>
                          </span>
                          <div id="demo" className="collapse">
                            <NavLink to={project}>
                              <span className="border-bottom">
                                <li className="nav-item">
                                  <span className="nav-link sideMenuLinks" aria-current="page" href="#">
                                    <i className="bi bi-folder me-2"></i>
                                    Project
                                  </span>
                                </li>
                              </span>
                            </NavLink>
                            <NavLink to={Estimation}>
                              <span className="border-bottom">
                                <li className="nav-item">
                                  <span className="nav-link sideMenuLinks" aria-current="page" href="#">
                                    <i className="bi bi-calculator me-2"></i>
                                    Estimation
                                  </span>
                                </li>
                              </span>
                            </NavLink>
                          </div>
                        </li>
                      </span>
                    )}
                  </span> */}

                  {/* <NavLink to={settings}>
                    {inactive ? (
                      <i className="bi bi-gear me-2 "></i>
                    ) : (
                      <span className="border-bottom">
                        {" "}
                        <li className="nav-item">
                          <span
                            className="nav-link sideMenuLinks"
                            aria-current="page"
                            href="#"
                          >
                            <i className="bi bi-gear me-2 ds"></i>
                            Settings
                            <hr />
                          </span>
                        </li>{" "}
                      </span>
                    )}
                  </NavLink> */}

                  {/* <NavLink to={socialMediaSetting}>
                        {inactive ? (
                          <i className="bi bi-messenger me-2 "></i>
                        ) : (
                          <span className="border-bottom">
                            {" "}
                            <li className="nav-item">
                              <span
                                className="nav-link sideMenuLinks"
                                aria-current="page"
                                href="#"
                              >
                                <i className="bi bi-messenger me-2 ds"></i>
                                Social Setting
                                <hr />
                              </span>
                            </li>{" "}
                          </span>
                        )}
                      </NavLink> */}

                  {/* <NavLink to={infoPages}> */}
                  {/* {inactive ? (
                      <i className="bi bi-info-circle me-2 "></i>
                    ) : (
                      <span className="border-bottom">
                        <li className="nav-item">
                          <span
                            className="nav-link sideMenuLinks"
                            aria-current="page"
                            href="#"
                          >
                            <i className="bi bi-info-circle me-2 ds"></i>
                            Info Pages
                            <hr />
                          </span>
                        </li>
                      </span>
                    )}
                  </NavLink> */}
                  {/* old */}
                </>
              </ul>
            </div>
          </div>
        </div>

        <div className="col">
          <div className={`${active ? "content" : "content"}`}>
            <div className="d-flex justify-content-between  bg-side border-dark border-bottom">
              <div className="p-2">
                <button
                  onClick={() => setActive(!active)}
                  type="button"
                  className="btn btn-outline-primary hamburger"
                >
                  <i class="bi bi-list"></i>
                </button>
              </div>
              <div className="p-2">
                <button className="btn">
                  <Link to="/my-profile">
                    <span className="nav-link">
                      <i className="bi text-white bi-person-fill"></i>
                    </span>
                  </Link>
                </button>
                <button onClick={logOut} className="btn btn-outline-primary">
                  <span
                    className="nav-link text-white"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Log Out
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
