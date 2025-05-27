import React from "react";
import { useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import SideMenu from "../../Components/SideMenu";
import { useDispatch, useSelector } from "react-redux";
import InfoPagesCreate from "./InfoPagesCreate";
// import { deletePage, getPages } from "../../reducers/frontEndReducer";
import UpdatePage from "./UpdatePage";
import { Button } from "react-bootstrap";

function Pages() {
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getPages());
  }, []);
  const { getPagesList } = useSelector((state) => state.frontEndReducer);

  const handleSelect = (key) => {
    // dispatch(getPages());
  };
  return (
    <>
      <SideMenu />
      <div className="mt-extra content container-fluid">
        <Tabs
          defaultActiveKey="signUp"
          onSelect={handleSelect}
          className="mb-3"
          justify
        >
          <Tab className="p-3" eventKey="signUp" title="Pages List">
            <table className="table table-scrolling ">
              <thead className="normalplace">
                <tr>
                  <th className="over-col-size">Sr No.</th>
                  <th className="over-col-size">Page Name</th>
                  <th className="over-col-size">Slug</th>
                  <th className="over-col-size">Status</th>
                  <th className="over-col-size">Action</th>
                </tr>
              </thead>
              <tbody>
                {!!getPagesList &&
                  getPagesList.map((data, index) => {
                    return (
                      <React.Fragment key={index}>
                        <tr key={data?._id}>
                          <td>{index + 1}.</td>
                          <td>{data?.name}</td>
                          <td>{data?.slug}</td>
                          <td>{data?.status === true ? "True" : "False"}</td>
                          <td>
                            <UpdatePage
                              pageDesc={data?.description}
                              pageMetadesc={data?.meta_description}
                              pageScheams={data?.meta_schema}
                              pageStatus={data?.status}
                              pageTag={data?.meta_tags}
                              pageMetatitle={data?.meta_title}
                              pageid={data?.id}
                            />
                            <Button
                              className="m-1"
                              variant="danger"
                              onClick={async () => {
                                // await dispatch(deletePage(data?.id));
                                // dispatch(getPages());
                              }}
                            >
                              <i className="bi bi-trash"></i>
                            </Button>
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
              </tbody>
            </table>
          </Tab>
          <Tab className="p-3" eventKey="orderCreate" title="Pages Create">
            <InfoPagesCreate />
          </Tab>
        </Tabs>
      </div>
    </>
  );
}

export default Pages;
