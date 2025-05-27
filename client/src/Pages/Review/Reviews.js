import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideMenu from "../../Components/SideMenu";
import { Button } from "react-bootstrap";
import {
  deletePermission,
  deleteReview,
  getReviews,
  getSettings,
} from "../../reducers/commonReducer";
import ReviewUpdate from "./ReviewUpdate";
import moment from "moment";
import { home } from "../../const";

const Reviews = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReviews());
    if (!localStorage.getItem("x-auth-token")) {
      navigate(home);
    }
  }, []);

  const { getReviewsData } = useSelector((state) => state.commonReducer);
  return (
    <>
      <SideMenu />
      <div className="mt-extra content container-fluid">
        <table className="table table-scrolling ">
          <thead className="normalplace">
            <tr>
              <th className="over-col-size">Sr</th>
              <th className="over-col-size">UserName</th>
              <th className="over-col-size">Title</th>
              <th className="over-col-size">Description</th>
              <th className="over-col-size">Date</th>
              <th className="over-col-size">Recommended</th>
              <th className="over-col-size">Status</th>
              <th className="over-col-size">Action</th>
            </tr>
          </thead>
          <tbody>
            {!!getReviewsData?.list &&
              getReviewsData?.list.map((data, index) => {
                return (
                  <React.Fragment key={index}>
                    <tr key={data?._id}>
                      <td>{index + 1}.</td>
                      <td>{data?.name}</td>
                      <td>{data?.title}</td>
                      <td>{data?.description}</td>
                      <td>{moment(data?.createdAt).format("DD/MM/YYYY")}</td>
                      <td>{data?.recommended === true ? "True" : "False"}</td>
                      <td>{data?.status}</td>
                      <td>
                        <Button
                          className="m-1"
                          variant="danger"
                          onClick={async () => {
                            await dispatch(deleteReview(data?.id));
                            dispatch(getReviews());
                          }}
                        >
                          <i className="bi bi-trash"></i>
                        </Button>
                        <ReviewUpdate
                          title="Update Review"
                          reviewProduct={data?.product}
                          reviewUser={data?.user}
                          reviewTitle={data?.title}
                          reviewRating={data?.rating}
                          reviewDescription={data?.description}
                          reviewRecommended={data?.recommended}
                          reviewStatus={data?.status}
                          id={data?.id}
                        />
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Reviews;
