import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import PCD from "../../images/PCD.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import {
  emptyCartlist,
  getCartlist,
  updateCart,
} from "../../reducers/commonReducer";
import sumBy from "lodash/sumBy";
import { about, checkout, contact, home, shop } from "../../const";

function NavHeader() {
  const [lgShow, setLgShow] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  const dispatch = useDispatch();

  let getCartDetails = JSON.parse(localStorage.getItem("cartItem"))
  
  useEffect(() => {
    dispatch(getCartlist());
  }, []);

  useEffect(() => {
    // const items = sumBy(
    //   !!getCartlistData?.list && getCartlistData?.list,
    //   function (o) {
    //     return o.quantity;
    //   }
    // )
    const items = JSON.parse(localStorage.getItem('cartItem'));
    if (items) {
      setCartItem(items);
    }
  }, []);

  const { getCartlistData } = useSelector((state) => state.commonReducer);
  let cartDetails = sumBy(
    !!getCartlistData?.list && getCartlistData?.list,
    function (o) {
      return o.quantity;
    }
  );
  let localcartDetails = sumBy(
    !!getCartDetails && getCartDetails,
    function (o) {
      return o.quantity;
    }
  );
  return (
    <Navbar id="header" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to={home}>
            <h2 className="logo">
              <img src={PCD} />
            </h2>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle className="mbl-btn-menu" aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll " className=" myclass">
          <Nav
            className="me-left-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link>
              <Link to={home} className="nav-link" aria-current="page" href="#">
                Home
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="nav-link" to={shop}>
                Shop
              </Link>
            </Nav.Link>
            {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown> */}
            <Nav.Link>
              <Link className="nav-link" to={about}>
                About
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="nav-link" to={contact}>
                Contact
              </Link>
            </Nav.Link>
          </Nav>
          <Form className="d-flex hideMb">
            <Form.Control
              type="searching"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
          </Form>
          <div className="d-flex pt-3">
            <div className="spacer">
              <Nav.Link>
                <li className="nav-item">
                  <p
                    className="nav-link"
                    onClick={() => cartDetails != 0 && setLgShow(true)}
                  >
                    <i className="bi bi-cart cart-size"> </i>
                    <span className="cart__total-item">{localStorage.getItem("x-auth-token") ? cartDetails : localcartDetails}</span>
                  </p>
                  <Modal
                    size="lg"
                    show={lgShow}
                    onHide={() => setLgShow(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="example-modal-sizes-title-lg">
                        Your Cart
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div>
                        <table
                          id="cart"
                          className="table table-hover table-condensed"
                        >
                          <thead>
                            <tr>
                              <th style={{ width: "50%" }}>Product</th>
                              <th style={{ width: "10%" }}>Price</th>
                              <th style={{ width: "8%" }}>Quantity</th>
                              <th
                                style={{ width: "22%" }}
                                className="text-center"
                              >
                                Subtotal
                              </th>
                              <th style={{ width: "10%" }} />
                            </tr>
                          </thead>
                          <tbody>
                            {!!getCartlistData?.list &&
                              getCartlistData?.list.map((data, index) => {
                                return (
                                  <tr key={index}>
                                    <td data-th="Product">
                                      <div className="row">
                                        <div className="col-sm-12 hidden-xs">
                                          <img
                                            src={data?.proudct?.images[0]}
                                            alt="..."
                                            className="img-responsive popup-product"
                                          />
                                        </div>
                                      </div>
                                    </td>
                                    <td data-th="Price">
                                      Rs. {data?.proudct?.sale}
                                    </td>
                                    <td data-th="Quantity">
                                      <input
                                        type="number"
                                        className="form-control text-center"
                                        value={data?.quantity}
                                        onChange={async (e) => {
                                          await dispatch(
                                            updateCart({
                                              id: data?.id,
                                              quantity: +e.target.value,
                                            })
                                          );
                                          dispatch(getCartlist());
                                        }}
                                      />
                                    </td>
                                    <td
                                      data-th="Subtotal"
                                      className="text-center phone-center"
                                    >
                                      Rs. {data?.proudct?.sale * data?.quantity}
                                    </td>
                                    <td className=" text-center phone-center">
                                      <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => {
                                          dispatch(
                                            updateCart({
                                              id: data?.id,
                                              quantity: 0,
                                            })
                                          );
                                          dispatch(getCartlist());
                                        }}
                                      >
                                        <i className="bi bi-trash"></i>
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                          <tfoot>
                            <tr>
                              <td>
                                <Link to={home}>
                                  <span className="btn btn-warning">
                                    Continue Shopping
                                  </span>
                                </Link>
                              </td>
                              <td colSpan={2} className="hidden-xs text-center">
                                {" "}
                                <strong>Total</strong>{" "}
                              </td>
                              <td className="hidden-xs text-center">
                                <strong>
                                  Rs.{" "}
                                  {sumBy(
                                    !!getCartlistData?.list &&
                                      getCartlistData?.list,
                                    function (o) {
                                      return o.proudct?.sale * o?.quantity;
                                    }
                                  )}
                                </strong>
                              </td>

                              <td>
                                <Link to={checkout}>
                                  <span className="btn btn-warning btn-block">
                                    Checkout
                                  </span>
                                </Link>
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </Modal.Body>
                  </Modal>
                </li>
              </Nav.Link>
            </div>

            <div>
              <Nav.Link>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <i className="bi bi-person person-icon"></i>
                  </a>
                </li>
              </Nav.Link>
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavHeader;
