import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import SideMenu from "../../Components/SideMenu";
import { addEstimation, deleteEstimation } from "../../reducers/commonReducer";
import { Link } from "react-router-dom";
import Viewestimation from "./Viewestimation";
import Updateestimation from "./Updateestimation";

const CostEstimationList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get("id"); // Get the project ID from the URL params

  const [updateTrigger, setUpdateTrigger] = useState(false); // Track updates to trigger re-fetching

  // Fetch estimations whenever `id` or `updateTrigger` changes
  useEffect(() => {
    const fetchEstimations = async () => {
      if (id) {
        await dispatch(addEstimation({ projectId: id }));
      }
    };

    fetchEstimations();
  }, [id, dispatch, updateTrigger]); // Re-run when `id` or `updateTrigger` changes

  const { EstimationListData } = useSelector((state) => state.commonReducer);

  // Handle deletion of an estimation
  const handleDelete = async (estimationId) => {
    if (window.confirm("Are you sure you want to delete this estimation?")) {
      await dispatch(deleteEstimation(estimationId));
      setUpdateTrigger((prev) => !prev); // Toggle updateTrigger to force a reload
    }
  };

  return (
    <>
      <SideMenu />
      <div className="container-fluid mt-extra content">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Link to="/projectlist">
            <h5>
              <i className="bi bi-arrow-left"></i> Project List
            </h5>
          </Link>
          <Link to={`/costestimation1?id=${id}`}>
            <Button>Add New Estimation</Button>
          </Link>
        </div>

        <div className="table-responsive">
          <Table className="table mt-4">
            <thead>
              <tr>
                <th className="over-col-size">Sr</th>
                <th className="over-col-size">Name</th>
                <th className="over-col-size">Estimated Price</th>
                <th className="over-col-size">Action</th>
              </tr>
            </thead>
            <tbody>
              {!!EstimationListData &&
                EstimationListData.map((data, index) => (
                  <tr key={index} value={data?.id}>
                    <td>{index + 1}.</td>
                    <td>{data?.name}</td>
                    <td>{data?.totalEstimationPrice.toFixed(2)}</td>
                    <td>
                      <div className="d-flex">
                        <Viewestimation
                          name={data.name}
                          estimationReport={data.estimationReport}
                        />
                        <Button
                          className="m-1"
                          variant="danger"
                          onClick={() => handleDelete(data?.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </Button>
                        <Updateestimation
                          name={data.name}
                          onUpdateSuccess={() => setUpdateTrigger((prev) => !prev)} // Trigger re-fetch after update
                          id={data.id}
                          totalEstimationPrice={data.totalEstimationPrice}
                          estimations={data.estimation}
                          amount={data.estimation.amount}
                          estimationReport={data.estimationReport}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default CostEstimationList;
