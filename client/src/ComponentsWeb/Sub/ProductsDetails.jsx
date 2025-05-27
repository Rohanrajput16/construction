import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./Footer";
import { Col, Row, Form, Nav, Tab, Button } from "react-bootstrap";
import "./common.css";
import ProductTab from "./ProductTab";
import { Formik } from "formik";
import * as yup from "yup";
import {
  addCart,
  getCartlist,
  getCustomizeOffers,
  getOpenSetting,
  getSetting,
  getSingleProduct,
  similarproductions,
} from "../../reducers/commonReducer";
import { Link, useNavigate, useParams } from "react-router-dom";
import CommonHeader from "./CommonHeader";
import { checkout, login, shop } from "../../const";
import OnSaleProducts from "./OnSaleProducts";
import dummy from "../../images/dummy.jpeg";
import freeoffer from '../../images/freeoffer.png'

const schema = yup.object().shape({
  // processor: yup.string().required(),
  // ram: yup.string().required(),
  // storage: yup.string().required(),
});

const ProductsDetails = () => {
  const [increase, setIncrease] = useState(1);
  const [dImg, setDImg] = useState(0);
  const [processor, setProcessor] = useState("");
  const [processorName, setProcessorName] = useState("");
  const [processorPrice, setProcessorPrice] = useState(null);
  const [ramPrice, setRamPrice] = useState(null);
  const [ram, setRam] = useState("");
  const [ramName, setRamName] = useState("");
  const [storagePrice, setStoragePrice] = useState(null);
  const [storage, setStorage] = useState("");
  const [storageName, setStorageName] = useState("");
  const [otherPrice, setOtherPrice] = useState(null);
  const [other, setOther] = useState("");
  const [otherName, setOtherName] = useState("");
  const [salesPrice, setSalesPrice] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customize = [];
  if (processor) {
    customize.push(processor);
  }
  if (ram) {
    customize.push(ram);
  }
  if (storage) {
    customize.push(storage);
  }
  if (other) {
    customize.push(other);
  }
  useEffect(() =>{
    if(localStorage.getItem("x-auth-token")){
      dispatch(getSetting({
        key:"customizeoffer"
      }))
    }else(
      dispatch(getOpenSetting({
        key:"customizeoffer"
      }))
    )  
    dispatch(getCustomizeOffers());
  },[])
  
  const { getSettingData, getCustomizeOffersData, getSingleProductData, similarproductionsData } = useSelector(
    (state) => state.commonReducer
  );
  const [checked, setChecked] = useState([]);
  let params = useParams();
  useEffect(() => {
    dispatch(getSingleProduct({ slug: params?.slug }));
    dispatch(similarproductions({ slug: params?.slug }));
    // localStorage.getItem("x-auth-token") && dispatch(userProductLikedList());
  }, [params?.slug]);
  //update state from get single products data
  useEffect(() => {
    if (getSingleProductData) {
      const { sale, mrp } = getSingleProductData.product ?? {};
      const priceToSet = sale ? sale : mrp;
      setSalesPrice(priceToSet);

      for (let i = 0; i < getSingleProductData?.product?.productOptions?.ram?.length; i++) {
        if (getSingleProductData?.product?.productOptions?.ram[i]?.stock === true) {
          if (getSingleProductData?.product?.productOptions?.ram[i]?.stock === true) {
          setRamName(getSingleProductData?.product?.productOptions?.ram[i].name)
          setRamPrice(getSingleProductData?.product?.productOptions?.ram[i].price)
          setRam(getSingleProductData?.product?.productOptions?.ram[i].id)
          break;
          }
        }
      }

      for (let i = 0; i < getSingleProductData?.product?.productOptions?.processer?.length; i++) {
        if (getSingleProductData?.product?.productOptions?.processer[i]?.stock === true) {
          if (getSingleProductData?.product?.productOptions?.processer[i]?.stock === true) {
          setProcessorName(getSingleProductData?.product?.productOptions?.processer[i].name)
          setProcessorPrice(getSingleProductData?.product?.productOptions?.processer[i].price)
          setProcessor(getSingleProductData?.product?.productOptions?.processer[i].id)
          break;
          }
        }
      }

      for (let i = 0; i < getSingleProductData?.product?.productOptions?.storage?.length; i++) {
        if (getSingleProductData?.product?.productOptions?.storage[i]?.stock === true) {
          if (getSingleProductData?.product?.productOptions?.storage[i]?.stock === true) {
          setStorageName(getSingleProductData?.product?.productOptions?.storage[i].name)
          setStoragePrice(getSingleProductData?.product?.productOptions?.storage[i].price)
          setStorage(getSingleProductData?.product?.productOptions?.storage[i].id)
          break;
          }
        }
      }
      setOtherPrice(
        getSingleProductData?.product?.productOptions?.other?.leangth > 0
          ? getSingleProductData?.product?.productOptions?.other?.[0]?.price
          : 0
      );
    }
  }, [getSingleProductData]);

  useEffect(() => {
    setIncrease(getSingleProductData?.product?.minqty);
    setDImg(getSingleProductData?.product?.defaultImage);
  }, [getSingleProductData]);

  //select sub products
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };
  let productimages = !!getSingleProductData?.product?.images && [
    ...getSingleProductData?.product?.images,
  ];

  const calculateDiscountedPrice = () => {
    const product = getSingleProductData?.product;
    const saleMAinPrice = product?.sale || product?.mrp || 0;
    const totalCustomizationPrice =
      processorPrice + ramPrice + storagePrice + otherPrice;
    const salePrice =
      product?.productType === "normal"
        ? saleMAinPrice
        : saleMAinPrice + totalCustomizationPrice;

    let discountPercent = 0;
    // Find the discount price based on the quantity
    for (const q in getSingleProductData?.product?.price) {
      if (increase >= parseInt(q)) {
        discountPercent = getSingleProductData?.product?.price[q];
      }
    }
    // Calculate the discounted price
    const discountedPrice =
      (discountPercent ? discountPercent : salePrice) ;
    return +discountedPrice;
  };

  let finelProductPrice = calculateDiscountedPrice().toFixed(0) * increase

  //get data attributes
  return (
    <>
      <CommonHeader />
      <section className="mt-5 mb-5">
        <div className="container-fluid sideSlider">
          <div className="row">
            <div className="col-md-5">
              <Tab.Container
                id="left-tabs-example"
                defaultActiveKey={dImg ? dImg : 0}
              >
                <Row className="text-end">
                  <Col sm={3} md={2}>
                    <Nav variant="pills" className="flex-column mbf">
                      {!!productimages &&
                        productimages.map((data, index) => (
                          <Nav.Item className="smallimg" key={index}>
                            <Nav.Link eventKey={index}>
                              {data ? <img src={`/${data}`} /> : dummy}
                            </Nav.Link>
                          </Nav.Item>
                        ))}
                    </Nav>
                  </Col>
                  <Col sm={9} md={10}>
                    <Tab.Content>
                      {!!productimages &&
                        productimages.map((data, index) => (
                          <Tab.Pane
                            key={index}
                            eventKey={index}
                            className="text-center"
                          >
                            {data ? <img src={`/${data}`} /> : dummy}
                          </Tab.Pane>
                        ))}
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </div>
            <div className="col-md-7">
              <Row>
                <div className="col-md-7">
                  <h4 className="fw-bold product-details-name">
                    {getSingleProductData?.product?.name}
                  </h4>
                  <h6>
                    <b>
                      {" "}
                      {(getSingleProductData?.product?.productType ===
                        "customize") && <>
                        <ul className="list-style-dot px-4">
                          {processorName && <li>{processorName}</li>}
                          {ramName && <li>{ramName}</li>}
                          {storageName && <li>{storageName}</li>}
                          {otherName && <li>{otherName}</li>}
                        </ul>
                        </>}
                    </b>
                    {/* <b>
                      {" "}
                      {getSingleProductData?.product?.productType ===
                        "customize" &&
                        `${processorName}, ${ramName}, ${storageName}, ${
                          otherName ? otherName : ""
                        }`}
                    </b> */}
                  </h6>
                  <hr />
                  <div className="product__price">
                    {(getSingleProductData?.product?.sale !== getSingleProductData?.product?.mrp ) && (
                      <span className="discount-color">
                        {(
                          -(
                            100 *
                            (getSingleProductData?.product?.mrp -
                              getSingleProductData?.product?.sale)
                          ) / getSingleProductData?.product?.mrp
                        ).toFixed(0)}
                        %
                      </span>
                    )}
                    <span className="font-weight-bold-price">
                      Rs. {calculateDiscountedPrice().toFixed(0)}
                    </span>
                    {(getSingleProductData?.product?.sale !== getSingleProductData?.product?.mrp ) && (
                      <div>
                        <span className="old">
                          Rs. {getSingleProductData?.product?.mrp}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="product__stock sku">
                    <p className="mb-0">
                      <span className="fw-bold discount-color">
                        Price Inclusive of GST
                      </span>
                    </p>
                  </div>
                  <div className="product__stock">
                    <span>
                      <b>Availability:</b>
                    </span>
                    <span>
                      {getSingleProductData?.product?.quantity === 0 ? (
                        <b className="discount-color">Out Of Stock</b>
                      ) : (
                        <b className="text-success">In Stock</b>
                      )}
                    </span>
                  </div>
                  <div className="product__stock sku">
                    <span>
                      <b>Brand Name:</b>
                    </span>
                      <span>{getSingleProductData?.product?.brand?.name}</span>
                  </div>
                  {getSingleProductData?.product?.rewardStatus && <h6 className="mt-1 reward-offer-single blink_img mb-2 w-100">
                          <b><span>
                            <i className="bi bi-gift-fill"></i> Earn {`${getSingleProductData?.product?.reward} * ${increase}`} = {(getSingleProductData?.product?.reward) * increase} Reward Points </span></b> 
                        </h6>
                  }
                  <hr />
                  {getSingleProductData?.product?.productType ===
                    "customize" && (
                    <Formik
                      validationSchema={schema}
                      initialValues={{
                        processer: "",
                        storage: "",
                        ram: "",
                        other: "",
                      }}
                    >
                      {({ handleSubmit, values, setFieldValue, errors }) => (
                        <Form onSubmit={handleSubmit}>
                          <h6 className="fw-bold discount-color">
                            Select Your Configuration
                          </h6>
                          <Row className="mb-3">
                            <Col md={6} sm={12}>
                              <Form.Label>
                                <b>Processor</b>
                              </Form.Label>
                              <Form.Control
                                as="select"
                                onChange={async (e) => {
                                  setFieldValue("processor", e.target.value);
                                  setProcessor(e.target.value);
                                  const selectedOptionElement =
                                    e.target.options[e.target.selectedIndex];
                                  setProcessorPrice(
                                    +selectedOptionElement.getAttribute(
                                      "data-price"
                                    )
                                  );
                                  setProcessorName(
                                    selectedOptionElement.getAttribute(
                                      "data-name"
                                    )
                                  );
                                }}
                                name="processor"
                                className="form-control"
                                value={values.processor}
                                isInvalid={!!errors.processor}
                              >
                                {!!getSingleProductData?.product?.productOptions
                                  ?.processer &&
                                  getSingleProductData?.product?.productOptions?.processer?.map(
                                    (data, index) => (
                                      data?.stock && <option
                                        key={index}
                                        data-price={data?.price}
                                        data-name={data?.name}
                                        value={data?.id}
                                      >
                                        {data?.name}
                                      </option>
                                    )
                                  )}
                              </Form.Control>
                              <Form.Control.Feedback type="invalid">
                                {errors.processor}
                              </Form.Control.Feedback>
                            </Col>
                            <Col md={6} sm={12}>
                              <Form.Label>
                                <b>Ram</b>
                              </Form.Label>
                              <Form.Control
                                as="select"
                                onChange={async (e) => {
                                  setFieldValue("ram", e.target.value);
                                  setRam(e.target.value);
                                  const selectedOptionElement =
                                    e.target.options[e.target.selectedIndex];
                                  setRamPrice(
                                    +selectedOptionElement.getAttribute(
                                      "data-price"
                                    )
                                  );
                                  setRamName(
                                    selectedOptionElement.getAttribute(
                                      "data-name"
                                    )
                                  );
                                }}
                                name="ram"
                                className="form-control"
                                value={values.ram}
                                isInvalid={!!errors.ram}
                              >
                                {!!getSingleProductData?.product?.productOptions
                                  ?.ram &&
                                  getSingleProductData?.product?.productOptions?.ram?.map(
                                    (data, index) => (
                                      data?.stock && <option
                                        key={index}
                                        data-price={data?.price}
                                        data-name={data?.name}
                                        value={data?.id}
                                      >
                                        {data?.name}
                                      </option>
                                    )
                                  )}
                              </Form.Control>
                              <Form.Control.Feedback type="invalid">
                                {errors.ram}
                              </Form.Control.Feedback>
                            </Col>
                          </Row>
                          <Row className="mb-3">
                            <Col md={6} sm={12}>
                              <Form.Label>
                                <b>Storage</b>
                              </Form.Label>
                              <Form.Control
                                as="select"
                                onChange={async (e) => {
                                  setFieldValue("storage", e.target.value);
                                  setStorage(e.target.value);
                                  const selectedOptionElement =
                                    e.target.options[e.target.selectedIndex];
                                  setStoragePrice(
                                    +selectedOptionElement.getAttribute(
                                      "data-price"
                                    )
                                  );
                                  setStorageName(
                                    selectedOptionElement.getAttribute(
                                      "data-name"
                                    )
                                  );
                                }}
                                name="storage"
                                className="form-control"
                                value={values.storage}
                                isInvalid={!!errors.storage}
                              >
                                {!!getSingleProductData?.product?.productOptions
                                  ?.storage &&
                                  getSingleProductData?.product?.productOptions?.storage?.map(
                                    (data, index) => (
                                      data?.stock && <option
                                        key={index}
                                        data-price={data?.price}
                                        data-name={data?.name}
                                        value={data?.id}
                                      >
                                        {data?.name}
                                      </option>
                                    )
                                  )}
                              </Form.Control>
                              <Form.Control.Feedback type="invalid">
                                {errors.storage}
                              </Form.Control.Feedback>
                            </Col>
                            {!!getSingleProductData?.product?.productOptions
                              ?.other?.length > 0 && (
                              <Col md={6} sm={12}>
                                <Form.Label>
                                  <b>Other</b>
                                </Form.Label>
                                <Form.Control
                                  as="select"
                                  onChange={async (e) => {
                                    setFieldValue("other", e.target.value);
                                    setOther(e.target.value);
                                    const selectedOptionElement =
                                      e.target.options[e.target.selectedIndex];
                                    setOtherPrice(
                                      +selectedOptionElement.getAttribute(
                                        "data-price"
                                      )
                                    );
                                    setOtherName(
                                      selectedOptionElement.getAttribute(
                                        "data-name"
                                      )
                                    );
                                  }}
                                  name="other"
                                  className="form-control"
                                  value={values.other}
                                  isInvalid={!!errors.other}
                                >
                                  <option value="">Select Other</option>
                                  {getSingleProductData?.product?.productOptions?.other?.map(
                                    (data, index) => (
                                      data?.stock && <option
                                        key={index}
                                        data-price={data?.price}
                                        data-name={data?.name}
                                        value={data?.id}
                                      >
                                        {data?.name}
                                      </option>
                                    )
                                  )}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                  {errors.other}
                                </Form.Control.Feedback>
                              </Col>
                            )}
                          </Row>
                        </Form>
                      )}
                    </Formik>
                  )}
                  {
                    ((getSingleProductData?.product?.productType ==="customize") && getSettingData?.setting?.customizeoffer === "1") && <div className="sku">
                      <h4 className="mb-0">
                        <span className="fw-bold discount-color">
                        {getCustomizeOffersData?.description}
                        </span>
                        <hr className="mt-0"/>
                      </h4>
                      {
                        getCustomizeOffersData?.offers?.length > 0 && getCustomizeOffersData?.offers?.map((data, index) => <>
                          {data?.status && <p style={{color: data?.color}} key={index} className="f-18 mb-0"><b>👉 {data?.value}</b></p>}
                          </>)
                      }
                  </div>
                  }
                  
                  {
                    getSingleProductData?.product?.productType !==
                          "customize" &&  <div className="product__details-quantity mb-20">
                    <div className="row text-center">
                      <div className="col-3">
                        <div className="features-single-product fShipping">
                          <p>Fast Shipping</p>
                        </div>
                      </div>
                      <div className="col-3">
                      <div className="features-single-product moneyguarantee">
                        <p>Lowest Rates</p>
                        </div>
                      </div>
                      <div className="col-3">
                      <div className="features-single-product onlinesupport">
                        <p>Easy Replacement</p>
                        </div>
                      </div>
                      <div className="col-3">
                      <div className="features-single-product securepayment">
                        <p>Secure Payment</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  }
                 
                </div>
                <div className="col-md-5">
                  <div className="border text-center p-2">
                      {
                        (getSingleProductData?.product?.productType ===
                        "customize" && getSettingData?.setting?.customizeoffer === "1") && <img className="blink_img w-75" src={freeoffer}/>
                      }
                    <p className="product-side-details mb-0">
                      <span className="font-weight-bold-price">
                        Rs. {calculateDiscountedPrice().toFixed(0) * increase}
                      </span>
                    </p>
                    <p>
                    <span className="fw-bold discount-color small-font">{getSingleProductData?.product?.productType ===
                        "customize" ? (getSingleProductData?.product?.sale + processorPrice + ramPrice + storagePrice + otherPrice) : calculateDiscountedPrice().toFixed(0)} x {increase}</span>
                    </p>
                    <ul className="list-unstyled">
                      <li className="mt-3">
                        <div className="cart-plus-minus p-relative">
                          <div className="numbers text-center">
                            <span
                              className="minus bg-danger"
                              onClick={() => {
                                if (
                                  getSingleProductData?.product?.minqty <=
                                  increase - 1
                                ) {
                                  setIncrease(increase - 1);
                                } else( alert(getSingleProductData?.product?.quantity >= 1 ? `Please enter a quantity between ${getSingleProductData?.product?.minqty} to ${getSingleProductData?.product?.quantity}. Thank you!` : `This item is currently out of stock.`))
                                setSalesPrice(
                                  increase *
                                    parseInt(
                                      getSingleProductData?.product?.sale
                                        ? getSingleProductData?.product?.sale
                                        : getSingleProductData?.product?.mrp
                                    )
                                );
                              }}
                            >
                              -
                            </span>
                            <input
                              type="number"
                              value={increase === 0 ? "" : increase}
                              onChange={(e) => {
                                let inputValue = parseInt(e.target.value ? e.target.value : 0);
                                setIncrease(inputValue);
                                setSalesPrice(
                                  inputValue *
                                    parseInt(
                                      getSingleProductData?.product?.sale
                                    )
                                );
                              }}
                              onBlur={(e) => {
                                const minQuantity = getSingleProductData?.product?.minqty;
                                const maxQuantity = getSingleProductData?.product?.quantity;
                                const enteredValue = parseInt(e.target.value);
                                if (isNaN(enteredValue) || enteredValue < minQuantity) {
                                  e.target.value = minQuantity;
                                  alert(getSingleProductData?.product?.quantity >= 1 ? `Please enter a quantity between ${getSingleProductData?.product?.minqty} to ${getSingleProductData?.product?.quantity}. Thank you!` : `This item is currently out of stock.`);
                                } else if (enteredValue > maxQuantity) {
                                  e.target.value = maxQuantity;
                                  alert(`Currently we are having ${getSingleProductData?.product?.quantity} quantity in stock. Kindly change your quantity or contact us.`);
                                }
                                setIncrease(+e.target.value);
                                setSalesPrice(
                                  +e.target.value *
                                    parseInt(
                                      getSingleProductData?.product?.sale
                                    )
                                );
                              }}
                            />
                            <span
                              className="plus bg-success"
                              onClick={() => {
                                if (
                                  increase <
                                  getSingleProductData?.product?.quantity
                                ) {
                                  setIncrease(increase + 1);
                                  setSalesPrice(
                                    increase *
                                      parseInt(
                                        getSingleProductData?.product?.sale
                                          ? getSingleProductData?.product?.sale
                                          : getSingleProductData?.product?.mrp
                                      )
                                  );
                                }else( alert(getSingleProductData?.product?.quantity >= 1 ? `Please enter a quantity between ${getSingleProductData?.product?.minqty} to ${getSingleProductData?.product?.quantity}. Thank you!` : `This item is currently out of stock.`))
                              }}
                            >
                              +
                            </span>
                          </div>
                        </div>
                      </li>
                      <li className="m-2 product-btns">
                        {localStorage.getItem("x-auth-token") ? (
                          getSingleProductData?.product?.productType ===
                          "customize" ? (
                            <button
                              className="t-y-btn-1"
                              onClick={() => {
                                if (getSingleProductData?.product?.quantity === 0) {
                                  alert("This item is currently out of stock.");
                                } else {
                                dispatch(
                                  addCart({
                                    product: getSingleProductData?.product?.id,
                                    customize,
                                    quantity: increase,
                                  })
                                );
                                setTimeout(() => {
                                  dispatch(getCartlist());
                                }, 1000)
                              }
                              }}
                            >
                              Add to Cart
                            </button>
                          ) : (
                            <button
                              className="t-y-btn-1"
                              onClick={() => {
                                if (getSingleProductData?.product?.quantity === 0) {
                                  alert("This item is currently out of stock.");
                                } else {
                                  dispatch(
                                    addCart({
                                      product: getSingleProductData?.product?.id,
                                      quantity: increase,
                                      customize,
                                    })
                                  );
                                  setTimeout(() => {
                                    dispatch(getCartlist());
                                  }, 1000);
                                }
                              }}
                            >
                              Add to Cart
                            </button>
                          )
                        ) : (
                          <Link to={login}>
                            <button className="t-y-btn-1">Add to Cart</button>
                          </Link>
                        )}
                      </li>
                      <li className="m-2 product-btns">
                        {localStorage.getItem("x-auth-token") ? (
                          getSingleProductData?.product?.productType ===
                          "customize" ? (
                            <button
                              className="t-y-btn-2"
                              onClick={async() => {
                                if (getSingleProductData?.product?.quantity === 0) {
                                  alert("This item is currently out of stock.");
                                } else {
                                const apiResult = await dispatch(
                                  addCart({
                                    product: getSingleProductData?.product?.id,
                                    quantity: increase,
                                    customize,
                                  })
                                );
                                if(apiResult?.payload.status === 1){
                                  setTimeout(async () => {
                                    await dispatch(getCartlist());
                                    await navigate(checkout);
                                  }, 1000);
                                }
                              }
                              }}
                            >
                              Buy Now
                            </button>
                          ) : (
                            <button
                              className="t-y-btn-2"
                              onClick={() => {
                                if (getSingleProductData?.product?.quantity === 0) {
                                  alert("This item is currently out of stock.");
                                } else {
                                  dispatch(
                                    addCart({
                                      product: getSingleProductData?.product?.id,
                                      quantity: increase,
                                      customize,
                                    })
                                  );
                                  setTimeout(async() => {
                                    await dispatch(getCartlist());
                                    await navigate(checkout);
                                  }, 1000);
                                }
                              }}
                            >
                              Buy Now
                            </button>
                          )
                        ) : (
                          // </Link>
                          <Link to={login}>
                            <Button className="t-y-btn-2">Buy Now</Button>
                          </Link>
                        )}
                      </li>
                      <li className="m-2 product-btns">
                        <button
                          className="t-y-btn-2"
                          onClick={() => navigate(shop)}
                        >
                          Continue Shopping
                        </button>
                      </li>
                      {/* <li>
                        <i className="bi fs-4 bi-lock-fill"></i>
                        <span className="fw-bold"> Secure transaction </span>
                      </li> */}
                      {/* <hr /> */}
                      {getSingleProductData?.product?.attributes &&
                        getSingleProductData?.product?.attributes.map(
                          (data, index) => {
                            return (
                              <li key={index}>
                                <Row className="p-1">
                                  <Col md={6} sm={6} xs={6}>
                                    <span className="fw-bold discount-color">
                                      <b>
                                        {data?.id?.name
                                          ? data?.id?.name
                                          : "Name"}
                                        :
                                      </b>
                                    </span>
                                  </Col>
                                  <Col md={6} sm={6} xs={6}>
                                    <span className="fw-bold">
                                      {data?.value}
                                    </span>
                                  </Col>
                                </Row>
                              </li>
                            );
                          }
                        )}
                      {!!getSingleProductData?.product?.price && Object.keys(getSingleProductData?.product?.price)?.length > 0 && (
                        <>
                        <hr />
                          <li>
                            <i className="bi fs-4 bi-currency-rupee"></i>{" "}
                            <span className="fw-bold">
                              {" "}
                              Quantity Wise Discount{" "}
                            </span>
                          </li>
                          <hr />
                          {Object.entries(
                            getSingleProductData?.product?.price
                          ).map(([key, value]) => (
                            <li key={key}>
                              <Row className="p-1">
                                <Col md={6} sm={6} xs={6}>
                                  <span className="fw-bold discount-color">
                                    <b>Quantity ({key}) :</b>
                                  </span>
                                </Col>
                                <Col md={6} sm={6} xs={6}>
                                  <span className="fw-bold">Rs. {value}</span>
                                </Col>
                              </Row>
                            </li>
                          ))}
                        </>
                      )}
                      {getSingleProductData?.product?.brand && (
                        <>
                         <hr/>
                        <Row className="p-1 align-item-center">
                          <Col md={6} sm={6} xs={6}>
                            <span className="fw-bold discount-color">
                              <b>Brand</b> :
                            </span>
                          </Col>
                          <Col md={6} sm={6} xs={6}>
                              <p>
                                <img src={`/${getSingleProductData?.product?.brand?.image[0]}`}/>
                              </p>
                          </Col>
                        </Row>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </Row>
              {/* <Row>
                <SubProduct
                  selectProducts={handleCheck}
                  subProductData={getSingleProductData?.productOptions}
                />
              </Row> */}
            </div>
          </div>
          {/* warrent, review desc tab */}
          <div className="container-fluid">
            <div className="row productsreview mt-5">
              <ProductTab
                productDesc={getSingleProductData?.product?.description}
                warrantyyears={getSingleProductData?.product?.warranty}
                warrantyprocess={
                  getSingleProductData?.product?.warranty_procedure
                }
                brandId={getSingleProductData?.product?.brand?.id}
              />
            </div>
          </div>
        </div>
      </section>
      <div className="container-fluid">
        <OnSaleProducts
          productsDetails={similarproductionsData}
          title={"Similar Products"}
        />
      </div>
      <Footer />
    </>
  );
};

export default ProductsDetails;
