import React, { useState } from "react";
import WebSlider from "./WebSlider";
import "../Sub/common.css";
import sideImg from "../../images/slider-pcdeals.jpg";
import sideImgOne from "../../images/sideImg.jpg";
import sideImgtwo from "../../images/sideimgThree.jpg";

const Slider = () => {
  const [active, setActive] = useState(true);
  return (
    <>
      <section className="slider__area pt-50">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-lg-3 d-none d-md-block">
              <div className="cat__menu-wrapper">
                <div className="cat-toggle cat-toggle-2">
                  <span
                    type="button"
                    className="cat-toggle-btn"
                    onClick={() => setActive(!active)}
                  >
                    <i className="bi bi-justify"></i> Shop by department
                  </span>
                  <div className={active ? "cat__menu" : "d-none"}>
                    <nav id="mobile-menu">
                      <ul>
                        <li>
                          <a href="product.html">All Categories</a>
                        </li>
                        <li>
                          <a href="product.html">
                            Best Seller Products
                            <span className="cat-label">hot!</span>
                          </a>
                        </li>
                        <li>
                          <a href="product.html">
                            Top 10 Offers
                            <span className="cat-label green">new!</span>
                          </a>
                        </li>
                        <li>
                          <a href="product.html">
                            New Arrivals <i className="far fa-angle-down"></i>
                          </a>
                          {/* <ul className="submenu">
                          <li>
                            <a href="product.html">Home Appliances</a>
                          </li>
                          <li>
                            <a href="product.html">Technology</a>
                            <ul className="submenu">
                              <li>
                                <a href="product.html">Storage Devices</a>
                              </li>
                              <li>
                                <a href="product.html">Monitors</a>
                              </li>
                              <li>
                                <a href="product.html">Laptops</a>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a href="product.html">Office Equipments</a>
                          </li>
                        </ul> */}
                        </li>
                        <li>
                          <a href="product.html">Phones & Tablets</a>
                        </li>
                        <li>
                          <a href="product.html">Electronics & Digital</a>
                        </li>
                        <li className="d-laptop-none">
                          <a href="product.html">Fashion & Clothings</a>
                        </li>
                        <li className="d-laptop-none">
                          <a href="product.html">Jewelry & Watches</a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-9 custom-col-10 col-lg-9">
              <div className="row">
                <div className="col-xl-9 slider-gap custom-col-9 col-lg-8">
                  <WebSlider />
                </div>
                <div className="col-xl-3 custom-col-3 col-lg-4">
                  <div className="row">
                    <div className="banner__item w-img">
                      <a href="product-details.html">
                        <img src={sideImg} alt="" />
                      </a>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="banner__item w-img">
                      <a href="product-details.html">
                        <img src={sideImgOne} alt="" />
                      </a>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="banner__item w-img">
                      <a href="product-details.html">
                        <img src={sideImgtwo} alt="" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Slider;
