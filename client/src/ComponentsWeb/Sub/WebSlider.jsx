import { useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useDispatch, useSelector } from "react-redux";
import banner1 from "../../images/b1.jpg";
import banner2 from "../../images/b2.jpg";
// import { getBannerFrontend } from '../../reducers/frontEndReducer';

function WebSlider() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBannerFrontend())
  },[])
  const { getBannerFrontendData } = useSelector(
    (state) => state.frontEndReducer
  );
  return (
    <>
      {/* <img className='slider-web-size' src={webBanner}/> */}
      <Carousel variant="light">
        {/* {!!getBannerFrontendData?.list &&
          getBannerFrontendData?.list.map((banner, index) => {
            return ( */}
              <Carousel.Item>
                <img
                  className="d-block w-100 slider-web-size"
                  src={banner1}
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100 slider-web-size"
                  src={banner2}
                />
              </Carousel.Item>
            {/* );
          })} */}
      </Carousel>
    </>
  );
}

export default WebSlider;