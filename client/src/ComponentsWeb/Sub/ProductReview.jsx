import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { productRating } from "../../const";

const ProductReview = () => {
  const { getProductReviewsList } = useSelector(
    (state) => state.orderDetailReducer
  );

  return (
    <>
      {getProductReviewsList.length <= 0 ? (
        <h4 className="text-danger">Currently no review is available now.</h4>
      ) : !!getProductReviewsList ? (
        getProductReviewsList.map((data, index) => {
          return (
            <div className="row" key={index}>
              <div className="mt-2 col-md-12">
                <div className="border-y mb-1">
                  <h5 className="mb-0">{data?.name}</h5>
                  <strong>
                    {moment(data?.createdAt).format("DD/MM/YYYY")}
                  </strong>
                  <br />
                  {<strong>{productRating(data?.rating)}</strong>}
                </div>
                <strong>{data?.title}</strong>
                <p>
                  {data?.description}
                  <br />
                </p>
                <span className="review-status">{data?.status}</span>
              </div>
            </div>
          );
        })
      ) : (
        "No Review Found...."
      )}
    </>
  );
};

export default ProductReview;
