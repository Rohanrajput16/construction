import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
// import { getBrandsFrontend } from "../../reducers/frontEndReducer";

const BrandsLogo = () => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getBrandsFrontend())
  // },[])
  const settings = {
    infinite: true,
    speed: 500,
    autoplaySpeed: 2000,
    autoplay: true,
    slidesToShow: 5,
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

  return (
    <>
      {/* //    react slider */}

      <section className="best__sell pt-15 pb-40 mt-3">
        <div className="row">
          <div className="col-xl-12">
            <div className="section__head d-md-flex justify-content-between mb-40">
              <div className="section__title">
                <h3>Our Brands</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <Slider {...settings}>
            {/* {!!getBrandsFrontendData?.list &&
              getBrandsFrontendData?.list.map((brand, index) => {
                return (
                  <Link key={index} to={`/shop/${brand?.slug}?brdanRef_=${brand?.id}`}>
                    <img
                      src={brand?.image[0]}
                      className="custom-card-img img-fluid"
                      alt={brand?.name}
                    />
                  </Link>
                );
              })} */}
          </Slider>
        </div>
      </section>
    </>
  );
};

export default BrandsLogo;
