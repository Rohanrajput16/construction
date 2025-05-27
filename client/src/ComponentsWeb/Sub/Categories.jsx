import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import cables from "../../images/cate/cables.png";
import convertor from "../../images/cate/convertor.png";
import cpu from "../../images/cate/cpu.png";
import desktop from "../../images/cate/desktop.png";
import harddisk from "../../images/cate/harddisk.png";
import laptop from "../../images/cate/laptop.png";
import led from "../../images/cate/led.png";
import motherboard from "../../images/cate/motherboard.png";
import pendrive from "../../images/cate/pendrive.png";
import processors from "../../images/cate/processors.png";
import ssd from "../../images/cate/ssd.png";
import more from "../../images/cate/more.png";
import { Link } from "react-router-dom";
import { shop } from "../../const";
// import { getCategoriesFrontEnd } from "../../reducers/frontEndReducer";
import { getProducts } from "../../reducers/commonReducer";

const Categories = () => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getCategoriesFrontEnd());
  // }, []);
  // const { getCatsFrontEndData } = useSelector((state) => state.frontEndReducer);
  return (
    <>
      <section className="cat-text header-main">
        <div className="container-fluid">
          <Row>
            {/* {!!getCatsFrontEndData &&
              getCatsFrontEndData?.map((cat, index) => {
                return (
                  <Col
                    xs={4}
                    sm={4}
                    md={1}
                    lg={1}
                    className="pt-2 pb-2 align-center cat-main"
                    key={index}
                  >
                    <div className="cat-tab">
                      <Link
                        to={`/shop/${cat?.slug}?ref_=${cat?.id}`}
                        onClick={() =>
                          dispatch(
                            getProducts({
                              categories: [cat?.id],
                            })
                          )
                        }
                      >
                        <img src={`/${cat?.image}`} />
                        <p>{cat?.name}</p>
                      </Link>
                    </div>
                  </Col>
                );
              })} */}
            {/* <Col
              xs={4}
              sm={4}
              md={1}
              lg={1}
              className="pt-2 pb-2 align-center cat-main"
            >
              <div className="cat-tab">
                <Link to={shop}>
                  <img src={more} />
                  <p>More</p>
                </Link>
              </div>
            </Col> */}
          </Row>
        </div>
      </section>
    </>
  );
};

export default Categories;
