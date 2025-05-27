import React, { useEffect, useState } from "react";
import { NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
// import { getLatestReviews } from "../../reducers/frontEndReducer";

const Review = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLatestReviews())
  },[])
  const { getLatestReviewsData } = useSelector(
    (state) => state.frontEndReducer
  );
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 2000,
    autoplay: false,
    slidesToShow: 3,
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
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <section className="best__sell pt-15 pb-40">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="section__head d-md-flex justify-content-between ">
                <div className="section__title">
                  <h3>
                    Client <span>Review</span>
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
                    {!!getLatestReviewsData &&
                      getLatestReviewsData.map((review, index) => {
                        return (
                          <div className="main-review" key={index}>
                            <Link
                              to={`/product/${review?.product?.slug}`}
                              className="text-default mb-2"
                            >
                              <div className="row review">
                                <i className="bi bi-chat-right-quote-fill"></i>
                                <p>
                                  {review?.description.substring(0, 165)}...
                                </p>
                              </div>
                              <div className="review-user-details">
                                <h4 className="mb-0">{review?.name}</h4>
                                <p className="mb-0">{review?.product?.name}</p>
                                <strong>
                                  {moment(review?.createdAt).format(
                                    "DD/MM/YYYY"
                                  )}
                                </strong>
                              </div>
                            </Link>
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

export default Review;
