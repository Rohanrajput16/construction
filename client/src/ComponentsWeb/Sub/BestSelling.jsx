import React, { useEffect, useState } from "react";
import { NavLink } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import {
  addCart,
  getCartlist,
  getProducts,
} from "../../reducers/commonReducer";
import {
  userAddWishList,
  userProductLikedList,
} from "../../reducers/orderDetailsReducer";
import { dynamicPriceRange, login } from "../../const";
import dummy from "../../images/dummy.jpeg";
import { productRating } from "../../const";
import darkheart from "../../images/darkheart.png";
import lightheart from "../../images/lightheart.png";

const BestSelling = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const timeoutIdRef = React.useRef();
  const [productQuantity, setProductQuantity] = useState(1);
  let cartItems = !!localStorage.getItem("cartItem")
    ? JSON.parse(localStorage.getItem("cartItem"))
    : [];
  const settings = {
    dots: true,
    // arrows: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 2000,
    autoplay: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  useEffect(() => {
    dispatch(getProducts({ hotSelling: true }));
  }, []);
  const { userProductLikedData } = useSelector(
    (state) => state.orderDetailReducer
  );
  const { getProductsData, productRatingData } = useSelector(
    (state) => state.commonReducer
  );
  let processerPrice;
  let ramPrice;
  let storagePrice;
  return (
    <>
      <section className="best__sell pt-15 pb-40 mt-3">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="section__head d-md-flex justify-content-between mb-40">
                <div className="section__title">
                  <h3>
                    Hot Selling <span>Products</span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="tab-content" id="best-sell-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="new"
                  role="tabpanel"
                  aria-labelledby="new-tab"
                >
                  <Slider {...settings}>
                    {!!getProductsData?.list &&
                      getProductsData?.list.map((data, index) => {
                        const processer = data?.productOptions?.processer?.find(option => option.stock === true);
                        const ram = data?.productOptions?.ram?.find(option => option.stock === true);
                        const storage = data?.productOptions?.storage?.find(option => option.stock === true);
                    
                        if (processer) processerPrice = processer.price;
                        if (ram) ramPrice = ram.price;
                        if (storage) storagePrice = storage.price;
                        return (
                          <div key={index}>
                            <div className="product-grid card">
                              <div className="product-image">
                                <div className="card-img-actions ">
                                  <Link
                                    to={`/product/${data?.slug}`}
                                    className="text-default mb-2"
                                  >
                                    <img
                                      src={
                                        data?.images
                                          ? data?.images[data?.defaultImage]
                                          : dummy
                                      }
                                      className="mbl-img-size custom-card-img img-fluid product-small-img"
                                      alt={data?.name}
                                    />
                                  </Link>
                                </div>
                                {!!data?.sale && (
                                  <span className="product-discount-label">
                                    -
                                    {(
                                      (100 * (data?.mrp - data?.sale)) /
                                      data?.mrp
                                    ).toFixed(2)}
                                    %
                                  </span>
                                )}
                                <ul className="product-links">
                                  <li
                                    onClick={(e) =>
                                      navigate(`/product/${data?.slug}`)
                                    }
                                  >
                                    <NavLink to="">
                                      <i className="bi bi-search"></i>
                                    </NavLink>
                                  </li>
                                  <li
                                    onClick={() => {
                                      localStorage.getItem("x-auth-token") &&
                                        dispatch(
                                          userProductLikedData[data?.id]
                                            ? userAddWishList({
                                                productId: data?.id,
                                                status: false,
                                              })
                                            : userAddWishList({
                                                productId: data?.id,
                                                status: true,
                                              })
                                        );
                                      localStorage.getItem("x-auth-token") &&
                                        dispatch(userProductLikedList());
                                    }}
                                  >
                                    {!!userProductLikedData && (
                                      <NavLink to="" className={"heartImg"}>
                                        {userProductLikedData[data?.id] ===
                                        true ? (
                                          <img src={darkheart} />
                                        ) : (
                                          <img src={lightheart} />
                                        )}
                                      </NavLink>
                                    )}
                                  </li>
                                </ul>
                              </div>
                              <div className="product-content">
                                <button
                                  className="add-to-cart"
                                  onClick={() =>
                                    navigate(`/product/${data?.slug}`)
                                  }
                                >
                                  Add to Cart
                                </button>
                                <Link
                                  to={`/product/${data?.slug}`}
                                  className="text-default mb-2"
                                  data-abc="true"
                                >
                                  <div className="card-body text-center">
                                    <div className="mb-mbl-0 product-name-box">
                                      <b className="product-name">
                                        {data?.name.substring(0, 45) + "..."}
                                      </b>
                                    </div>
                                    <p className="mb-0">
                                      <span className="fw-bold">
                                        Price Inclusive of GST
                                      </span>
                                    </p>
                                    <hr />
                                    <h3 className="mb-0 font-weight-semibold product__price">
                                    {!!data?.price && Object.keys(data?.price)?.length > 0 && `Rs. ${dynamicPriceRange(data?.price)} - `}{data?.productType === "customize"
                                    ? `Rs. ${
                                        data?.sale +
                                        processerPrice +
                                        ramPrice +
                                        storagePrice
                                      }`
                                  : `Rs. ${data?.sale}`}
                                    </h3>
                                    <div className="rating">
                                      {!!productRatingData &&
                                        productRatingData[data.id] &&
                                        productRating(
                                          productRatingData[data.id]
                                        )}
                                    </div>
                                  </div>
                                </Link>
                                <p className="reward-offer mb-2 w-100">
                                  {data?.rewardStatus && <>  <b><span>
                                    <i className="bi bi-gift-fill"></i> Earn {data?.reward} Reward Points </span></b></>
                                  }
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BestSelling;
