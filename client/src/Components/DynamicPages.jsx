import { useEffect } from "react";
import { Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CommonHeader from "../ComponentsWeb/Sub/CommonHeader";
import Footer from "../ComponentsWeb/Sub/Footer";

import NotFoundPage from "./NotFoundPage";
import ReactPlayer from "react-player";

const DynamicPages = () => {
  const dispatch = useDispatch();
  let params = useParams();
  useEffect(() => {
    dispatch(
      ({
        slug: params?.slug,
      })
    );
  }, []);
  // const { getSinglePageData } = useSelector((state) => state.frontEndReducer);
//   const videoUrlRegex = /<oembed[^>]*url="([^"]+)"[^>]*><\/oembed>/;
//   const videoUrlMatch =
    // !!getSinglePageData?.description &&
//     getSinglePageData?.description.match(videoUrlRegex);
//   const videoUrl = videoUrlMatch ? videoUrlMatch[1] : null;
  return (
    <>
       
      <div className="container-fluid">
        <div className="page-main p-5">
          
            <>
              <Row>
                <div className="section__head d-md-flex justify-content-between mb-40">
                  <div className="section__title">
                    {/* <h1>{getSinglePageData?.name}</h1> */}
                  </div>
                </div>
              </Row>
              {(
                <ReactPlayer
                //   url={videoUrl}
                  controls
                  width="100%"
                  height="360px"
                />
              )}
              <Row
                // dangerouslySetInnerHTML={{
                //   __html: getSinglePageData?.description,
                // }}
              />
            </>
           : (
            <NotFoundPage />
          )
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DynamicPages;
