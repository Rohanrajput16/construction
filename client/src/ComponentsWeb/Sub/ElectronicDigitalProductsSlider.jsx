import React from 'react';
import { NavLink } from 'react-bootstrap';
import Slider from "react-slick";

import '../Sub/common.css'
const ElectronicDigitalProductsSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 2000, 
    autoplay: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
       <Slider {...settings}>
        <div>
        <div className="product-grid card">
            <div className="product-image">
            <div className="card-img-actions ">
                  <img
                    src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1562074043/234.png"
                    className="custom-card-img img-fluid"
                    alt=""
                  />
                </div>
                {/* <NavLink to="" className="image">
                    <img src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1562074043/234.png"/>
                </NavLink> */}
                <span className="product-discount-label">-23%</span>
                <ul className="product-links">
                    <li><NavLink to= ""> <i className="bi bi-search"></i></NavLink></li>
                   
                    <li><NavLink to= ""><i className="bi bi-heart"></i></NavLink></li>
                    <li><NavLink to= ""><i className="bi bi-shuffle"></i></NavLink></li>
                </ul>
              
            </div>
            <div className="product-content">
            <a href="" className="add-to-cart">Add to Cart</a>
                <div className="card-body text-center">
                <div className="mb-2">
                  <h6 className="font-weight-semibold mb-2">
                    <NavLink to="" className="text-default mb-2" data-abc="true">
                      Toshiba Notebook with 500GB HDD & 8GB RAM
                    </NavLink>
                  </h6>

                  <NavLink to="" className="text-muted" data-abc="true">
                    Laptops & Notebooks
                  </NavLink>
                </div>

                <h3 className="mb-0 font-weight-semibold">Rs. 250.99</h3>

                <div>
                  <i className="fa fa-star star"></i>
                  <i className="fa fa-star star"></i>
                  <i className="fa fa-star star"></i>
                  <i className="fa fa-star star"></i>
                </div>
                <div className="rating">
                          <ul>
                            <li>
                              <NavLink to= ""><i className="bi bi-star-fill"></i></NavLink>
                            </li>
                            <li>
                              <NavLink to= ""><i className="bi bi-star-fill"></i></NavLink>
                            </li>
                            <li>
                              <NavLink to= ""><i className="bi bi-star-fill"></i></NavLink>
                            </li>
                            <li>
                              <NavLink to= ""><i className="bi bi-star-fill"></i></NavLink>
                            </li>
                            <li>
                              <NavLink to= ""><i className="bi bi-star-fill"></i></NavLink>
                            </li>
                          </ul>
                        </div>
                {/* <div className="text-muted mb-3">34 reviews</div> */}
              </div>
            </div>
        </div>

        </div>

        <div>
        <div className="product-grid card">
            <div className="product-image">
            <div className="card-img-actions ">
                  <img
                    src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1562074043/234.png"
                    className="custom-card-img img-fluid"
                    alt=""
                  />
                </div>
                {/* <NavLink to="" className="image">
                    <img src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1562074043/234.png"/>
                </NavLink> */}
                <span className="product-discount-label">-23%</span>
                <ul className="product-links">
                    <li><NavLink to= ""> <i className="bi bi-search"></i></NavLink></li>
                   
                    <li><NavLink to= ""><i className="bi bi-heart"></i></NavLink></li>
                    <li><NavLink to= ""><i className="bi bi-shuffle"></i></NavLink></li>
                </ul>
              
            </div>
            <div className="product-content">
            <a href="" className="add-to-cart">Add to Cart</a>
                <div className="card-body text-center">
                <div className="mb-2">
                  <h6 className="font-weight-semibold mb-2">
                    <NavLink to="" className="text-default mb-2" data-abc="true">
                      Toshiba Notebook with 500GB HDD & 8GB RAM
                    </NavLink>
                  </h6>

                  <NavLink to="" className="text-muted" data-abc="true">
                    Laptops & Notebooks
                  </NavLink>
                </div>

                <h3 className="mb-0 font-weight-semibold">Rs. 250.99</h3>

                <div>
                  <i className="fa fa-star star"></i>
                  <i className="fa fa-star star"></i>
                  <i className="fa fa-star star"></i>
                  <i className="fa fa-star star"></i>
                </div>
                <div className="rating">
                          <ul>
                            <li>
                              <NavLink to= ""><i className="bi bi-star-fill"></i></NavLink>
                            </li>
                            <li>
                              <NavLink to= ""><i className="bi bi-star-fill"></i></NavLink>
                            </li>
                            <li>
                              <NavLink to= ""><i className="bi bi-star-fill"></i></NavLink>
                            </li>
                            <li>
                              <NavLink to= ""><i className="bi bi-star-fill"></i></NavLink>
                            </li>
                            <li>
                              <NavLink to= ""><i className="bi bi-star-fill"></i></NavLink>
                            </li>
                          </ul>
                        </div>
                {/* <div className="text-muted mb-3">34 reviews</div> */}
              </div>
            </div>
        </div>

        </div>
        <div>
        <div className="product-grid card">
            <div className="product-image">
            <div className="card-img-actions ">
                  <img
                    src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1562074043/234.png"
                    className="custom-card-img img-fluid"
                    alt=""
                  />
                </div>
                {/* <NavLink to="" className="image">
                    <img src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1562074043/234.png"/>
                </NavLink> */}
                <span className="product-discount-label">-23%</span>
                <ul className="product-links">
                    <li><NavLink to= ""> <i className="bi bi-search"></i></NavLink></li>
                   
                    <li><NavLink to= ""><i className="bi bi-heart"></i></NavLink></li>
                    <li><NavLink to= ""><i className="bi bi-shuffle"></i></NavLink></li>
                </ul>
              
            </div>
            <div className="product-content">
            <a href="" className="add-to-cart">Add to Cart</a>
                <div className="card-body text-center">
                <div className="mb-2">
                  <h6 className="font-weight-semibold mb-2">
                    <NavLink to="" className="text-default mb-2" data-abc="true">
                      Toshiba Notebook with 500GB HDD & 8GB RAM
                    </NavLink>
                  </h6>

                  <NavLink to="" className="text-muted" data-abc="true">
                    Laptops & Notebooks
                  </NavLink>
                </div>

                <h3 className="mb-0 font-weight-semibold">Rs. 250.99</h3>

                <div>
                  <i className="fa fa-star star"></i>
                  <i className="fa fa-star star"></i>
                  <i className="fa fa-star star"></i>
                  <i className="fa fa-star star"></i>
                </div>
                <div className="rating">
                          <ul>
                            <li>
                              <NavLink to= ""><i className="bi bi-star-fill"></i></NavLink>
                            </li>
                            <li>
                              <NavLink to= ""><i className="bi bi-star-fill"></i></NavLink>
                            </li>
                            <li>
                              <NavLink to= ""><i className="bi bi-star-fill"></i></NavLink>
                            </li>
                            <li>
                              <NavLink to= ""><i className="bi bi-star-fill"></i></NavLink>
                            </li>
                            <li>
                              <NavLink to= ""><i className="bi bi-star-fill"></i></NavLink>
                            </li>
                          </ul>
                        </div>
                {/* <div className="text-muted mb-3">34 reviews</div> */}
              </div>
            </div>
        </div>

        </div>
      </Slider>

    </>
  );
}

export default ElectronicDigitalProductsSlider;

