import React, { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { FieldArray, Formik } from "formik";
import * as yup from "yup";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useDispatch, useSelector } from "react-redux";
import {
  getAttributes,
  getTaxgsts,
  getWarrantyProccesses,
  CreateProduct,
  getWarranty,
} from "../../reducers/commonReducer";
// import {
//   getBrandsFrontend,
//   getCategoriesFrontEnd,
//   getChildCategoriesFrontEnd,
// } from "../../reducers/frontEndReducer";
import SideMenu from "../../Components/SideMenu";
import AddProductImages from "./AddProductImages";

const schema = yup.object().shape({
  name: yup.string().required(),
  slug: yup.string().required(),
  sku: yup.string().required(),
  weight: yup.string().required(),
  orderby: yup.string(),
  description: yup.string(),
  brand: yup.string().required(),
  mrp: yup.string().required(),
  sale: yup.string(),
  minqty: yup.string().required(),
  maxqty: yup.string().required(),
  quantity: yup.string().required(),
  price: yup.array().of(
    yup.object().shape({
      id: yup.string(),
      value: yup.string(),
    })
  ),
  backordering: yup.string().required(),
  categories: yup.array().min(1),
  subcategories: yup.array(),
  tax_class: yup.string().required(),
  attributes: yup.array().of(
    yup.object().shape({
      id: yup.string(),
      value: yup.string(),
    })
  ),
  productType: yup.string().required(),
  metaTitle: yup.string(),
  metaDescription: yup.string(),
  metaTags: yup.string(),
  metaSchema: yup.string(),
  productOptions: yup.array().of(
    yup.object().shape({
      name: yup.string(),
      slug: yup.string(),
      description: yup.string(),
      sku: yup.string(),
      type: yup.string(),
      priceMrp: yup.string(),
      salesprice: yup.string(),
      notCombine: yup.string(),
      status: yup.string(),
    })
  ),
  warranty_procedure: yup.string(),
  warranty: yup.string(),
  hotSelling: yup.string(),
  instock: yup.bool().required(),
  status: yup.bool().required(),
});
const animatedComponents = makeAnimated();

function AddProductLongWay(props) {
  const dispatch = useDispatch();
  const [warrantyType, setWarrantyType] = useState();

  useEffect(() => {
    const getTaxClass = async () => {
      await dispatch(getTaxgsts());
    };
    getTaxClass();
    dispatch(getCategoriesFrontEnd());
    dispatch(getAttributes());
    dispatch(getWarrantyProccesses());
    dispatch(getBrandsFrontend());
    dispatch(getWarranty());
  }, []);
  const {
    getAttributesData,
    getNewProductData,
    getWarrantyData,
    getTaxgstsData,
  } = useSelector((state) => state.commonReducer);
  const {
    getCatsFrontEndData,
    getBrandsFrontendData,
    childCategoriesFrontEndData,
  } = useSelector((state) => state.frontEndReducer);
  const handleSelectOption = (event, values) => {
    setWarrantyType(event.target.value);
    values.warranty_procedure =
      event.target.options[event.target.selectedIndex].dataset?.warranty;
  };

  return (
    <>
      <SideMenu />
      <div className="mt-extra content container-fluid">
        {!getNewProductData || !localStorage.getItem("newProductapiStatus") ? (
          <Row className="mb-3 products-design">
            <Formik
              validationSchema={schema}
              initialValues={{
                name: "",
                slug: "",
                sku: "",
                weight: "",
                orderby: "",
                description: "",
                brand: "",
                mrp: "",
                sale: "",
                minqty: 1,
                maxqty: "",
                quantity: "",
                price: [
                  {
                    id: "",
                    value: "",
                  },
                ],
                backordering: true,
                categories: [],
                subcategories: [],
                tax_class: "63b53729a403053ba0d99d99",
                attributes: [
                  {
                    id: "",
                    value: "",
                  },
                ],
                productType: "",
                metaTitle: "",
                metaDescription: "",
                metaTags: "",
                metaSchema: "",
                productOptions: [
                  {
                    name: "",
                    slug: "",
                    description: "",
                    type: "",
                    sku: "",
                    priceMrp: "",
                    salesprice: "",
                    notCombine: "",
                    status: true,
                  },
                ],
                warranty_procedure: "",
                warranty: "",
                hotSelling: false,
                instock: true,
                status: true,
              }}
              onSubmit={(values, { resetForm }) => {
                dispatch(CreateProduct(values));
              }}
            >
              {({
                handleSubmit,
                handleChange,
                values,
                setFieldValue,
                errors,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Col md={3} sm={12}>
                      <Form.Group>
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder=""
                          name="name"
                          className="form-control bg"
                          value={values.name}
                          onChange={handleChange}
                          isInvalid={!!errors.name}
                        />

                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={3} sm={12}>
                      <Form.Group>
                        <Form.Label>Slug</Form.Label>
                        <Form.Control
                          type="text"
                          name="slug"
                          className="form-control bg"
                          value={
                            (values.slug = values.name
                              .toLowerCase()
                              .replace(/ /g, "-")
                              .replace(/[^\w-]+/g, ""))
                          }
                          readOnly
                          isInvalid={!!errors.slug}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.slug}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col md={2} sm={12}>
                      <Form.Group>
                        <Form.Label>SKU</Form.Label>
                        <Form.Control
                          type="text"
                          name="sku"
                          className="form-control bg"
                          value={values.sku}
                          onChange={handleChange}
                          isInvalid={!!errors.sku}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.sku}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col md={2} sm={12}>
                      <Form.Group>
                        <Form.Label>Weight</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="In Grams"
                          name="weight"
                          className="form-control bg"
                          value={values.weight}
                          onChange={handleChange}
                          isInvalid={!!errors.weight}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.weight}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={2} sm={12}>
                      <Form.Group>
                        <Form.Label>OrderBy</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter OrderBy"
                          name="orderby"
                          className="form-control bg"
                          value={values.orderby}
                          onChange={handleChange}
                          isInvalid={!!errors.orderby}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.orderby}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={12} sm={12}>
                      <CKEditor
                        editor={ClassicEditor}
                        data={"Enter Your Product Description......"}
                        onReady={(editor) => {
                          console.log("Editor is ready to use!", editor);
                        }}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setFieldValue("description", data);
                          console.log({ event, editor, data });
                        }}
                        onBlur={(event, editor) => {
                          console.log("Blur.", editor);
                        }}
                        onFocus={(event, editor) => {
                          console.log("Focus.", editor);
                        }}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={12} sm={12}>
                      <Row>
                        <Col>
                          <Form.Group>
                            <Form.Label>MRP</Form.Label>
                            <Form.Control
                              type="number"
                              placeholder="₹ 100"
                              name="mrp"
                              className="form-control bg"
                              value={values.mrp}
                              onChange={handleChange}
                              isInvalid={!!errors.mrp}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.mrp}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group>
                            <Form.Label>Sale Price</Form.Label>
                            <Form.Control
                              type="number"
                              placeholder="Sale Price"
                              name="sale"
                              className="form-control bg"
                              value={values.sale}
                              onChange={handleChange}
                              isInvalid={!!errors.sale}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.sale}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group>
                            <Form.Label>Min Quantity Order</Form.Label>
                            <Form.Control
                              type="number"
                              name="minqty"
                              className="form-control bg"
                              value={values.minqty}
                              onChange={handleChange}
                              isInvalid={!!errors.minqty}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.minqty}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group>
                            <Form.Label>Max Quantity Order</Form.Label>
                            <Form.Control
                              type="number"
                              name="maxqty"
                              className="form-control bg"
                              value={values.maxqty}
                              onChange={handleChange}
                              isInvalid={!!errors.maxqty}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.maxqty}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group>
                            <Form.Label>Total Availablity</Form.Label>
                            <Form.Control
                              type="number"
                              name="quantity"
                              className="form-control bg"
                              value={values.quantity}
                              onChange={handleChange}
                              isInvalid={!!errors.quantity}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.quantity}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>
                    <Col className="mt-4" md={12} sm={12}>
                      <Row>
                        {/* // this type */}
                        <Col md={6} sm={12}>
                          <Row>
                            <FieldArray name="price">
                              {({ remove, push }) => (
                                <>
                                  {!!values.price &&
                                    values.price.map((data, index) => {
                                      return (
                                        <React.Fragment key={index}>
                                          <Col md={4} sm={12}>
                                            <Form.Label>
                                              Quantity Discount
                                            </Form.Label>
                                            <Form.Control
                                              as="select"
                                              onChange={handleChange}
                                              className="form-control bg"
                                              name={`price.${index}.id`}
                                              value={values.price[index].id}
                                              isInvalid={!!errors.price}
                                            >
                                              <option value="">
                                                Select Quantity
                                              </option>
                                              <option value={"1-10"}>
                                                1-10
                                              </option>
                                              <option value={"10-15"}>
                                                10-15
                                              </option>
                                              <option value={"15-25"}>
                                                15-25
                                              </option>
                                              <option value={"25-50"}>
                                                25-50
                                              </option>
                                              <option value={"50-100"}>
                                                50-100
                                              </option>
                                            </Form.Control>
                                          </Col>
                                          <Col md={4} sm={12}>
                                            <Form.Group>
                                              <Form.Label>
                                                Quantity Price
                                              </Form.Label>
                                              <Form.Control
                                                type="text"
                                                placeholder="₹"
                                                onChange={handleChange}
                                                name={`price.${index}.value`}
                                                className="form-control bg"
                                                isInvalid={!!errors.price}
                                              />
                                            </Form.Group>
                                          </Col>
                                          <Col md={2} sm={12} className="mt-4">
                                            {index !== 0 && (
                                              <Button
                                                variant="danger"
                                                onClick={() => remove(index)}
                                              >
                                                <i className="bi bi-trash3-fill"></i>
                                              </Button>
                                            )}
                                          </Col>
                                          <Col md={2} sm={12} className="mt-4">
                                            <Button
                                              variant="success"
                                              onClick={() =>
                                                push({ id: "", value: "" })
                                              }
                                            >
                                              <i className="bi bi-plus-lg"></i>
                                            </Button>
                                          </Col>
                                        </React.Fragment>
                                      );
                                    })}
                                </>
                              )}
                            </FieldArray>
                          </Row>
                        </Col>
                        <Col md={6} sm={12}>
                          <FieldArray name="attributes">
                            {({ remove, push }) => (
                              <>
                                {!!values.attributes &&
                                  values.attributes.map((data, index) => {
                                    return (
                                      <Row key={index}>
                                        <Col md={4} sm={12}>
                                          <Form.Label>
                                            Product Attribute
                                          </Form.Label>
                                          <Form.Control
                                            as="select"
                                            onChange={handleChange}
                                            className="form-control bg"
                                            name={`attributes.${index}.id`}
                                            value={values.attributes[index].id}
                                            isInvalid={!!errors.attributes}
                                          >
                                            <option value="">
                                              Select Attribute
                                            </option>
                                            {!!getAttributesData?.list &&
                                              getAttributesData.list.map(
                                                (data, index) => {
                                                  return (
                                                    <option
                                                      value={data?.id}
                                                      key={index}
                                                    >
                                                      {data?.name}
                                                    </option>
                                                  );
                                                }
                                              )}
                                          </Form.Control>
                                        </Col>
                                        <Col md={4} sm={12}>
                                          <Form.Group>
                                            <Form.Label>
                                              Attribute Value
                                            </Form.Label>
                                            <Form.Control
                                              type="text"
                                              onChange={handleChange}
                                              name={`attributes.${index}.value`}
                                              className="form-control bg"
                                              isInvalid={!!errors.attributes}
                                            />
                                          </Form.Group>
                                        </Col>
                                        <Col md={2} sm={12} className="mt-4">
                                          {index !== 0 && (
                                            <Button
                                              variant="danger"
                                              onClick={() => remove(index)}
                                            >
                                              <i className="bi bi-trash3-fill"></i>
                                            </Button>
                                          )}
                                        </Col>
                                        <Col md={2} sm={12} className="mt-4">
                                          <Button
                                            variant="success"
                                            onClick={() =>
                                              push({ id: "", value: "" })
                                            }
                                          >
                                            <i className="bi bi-plus-lg"></i>
                                          </Button>
                                        </Col>
                                      </Row>
                                    );
                                  })}
                              </>
                            )}
                          </FieldArray>
                          {/* // you have to  */}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <hr />

                  <Row className="mt-3">
                    <Col md={12} sm={12}>
                      <Row>
                        <Col md={4} sm={12}>
                          <Form.Label> Category </Form.Label>
                          <Select
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            isMulti
                            onChange={(selectedOptions) => {
                              setFieldValue(
                                `categories`,
                                selectedOptions?.map((data) => data?.value)
                              );
                              dispatch(
                                getChildCategoriesFrontEnd({
                                  parent: selectedOptions?.map(
                                    (data) => data?.value
                                  ),
                                })
                              );
                            }}
                            options={
                              !!getCatsFrontEndData &&
                              getCatsFrontEndData.map((data) => {
                                return {
                                  value: data?.id,
                                  label: data?.name,
                                };
                              })
                            }
                          />
                        </Col>
                        {!!childCategoriesFrontEndData.length > 0 && (
                          <Col md={4} sm={12}>
                            <Form.Label> SubCategories </Form.Label>
                            <Select
                              closeMenuOnSelect={false}
                              components={animatedComponents}
                              isMulti
                              onChange={(selectedOptions) => {
                                setFieldValue(
                                  `subcategories`,
                                  selectedOptions?.map((data) => data?.value)
                                );
                              }}
                              options={
                                !!childCategoriesFrontEndData &&
                                childCategoriesFrontEndData.map((data) => {
                                  return {
                                    value: data?.id,
                                    label: data?.name,
                                  };
                                })
                              }
                            />
                          </Col>
                        )}
                        <Col md={2} sm={12}>
                          <Form.Label>Brands</Form.Label>
                          <Form.Control
                            as="select"
                            onChange={handleChange}
                            name="brand"
                            className="form-control bg"
                            value={values.brand}
                            isInvalid={!!errors.brand}
                          >
                            <option value="">Select Brands</option>
                            {!!getBrandsFrontendData?.list &&
                              getBrandsFrontendData?.list.map((data, index) => {
                                return (
                                  <option value={data?.id} key={index}>
                                    {data?.name}
                                  </option>
                                );
                              })}
                          </Form.Control>
                        </Col>
                        <Col md={2} sm={12}>
                          <Form.Label> Tax - Class </Form.Label>
                          <Form.Control
                            as="select"
                            onChange={handleChange}
                            // onChange={async (e) => {
                            //   setFieldValue(
                            //     "tax_class",
                            //     e.target.value
                            //       ? e.target.value
                            //       : !!getTaxgstsData.list?.[0]?.id &&
                            //           getTaxgstsData.list?.[0]?.id
                            //   );
                            // }}
                            name="tax_class"
                            className="form-control bg"
                            value={values.tax_class}
                            isInvalid={!!errors.tax_class}
                          >
                            {/* <option value="">Select Tax-Class</option> */}
                            {!!getTaxgstsData?.list &&
                              getTaxgstsData.list.map((data, index) => {
                                return (
                                  <option value={data?.id} key={index}>
                                    {data?.name}
                                  </option>
                                );
                              })}
                          </Form.Control>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={12} sm={12}>
                      <Row>
                        <Col md={12} sm={12}></Col>
                      </Row>
                    </Col>
                  </Row>
                  <hr className="mt-3" />
                  <Row className="mt-3">
                    <Col md={4} sm={12} className=" ">
                      <Form.Label> Warranty Types </Form.Label>
                      <Form.Control
                        as="select"
                        onChange={(e) => handleSelectOption(e, values)}
                        name="status"
                        className="form-control bg"
                      >
                        <option value="">Select Warranty Types</option>
                        {!!getWarrantyData?.list &&
                          getWarrantyData.list.map((data, index) => {
                            return (
                              <option
                                key={index}
                                data-warranty={data?.details}
                                // value={data?.id}
                              >
                                {data?.title}
                              </option>
                            );
                          })}
                      </Form.Control>
                    </Col>
                    {warrantyType && warrantyType.length > 0 && (
                      <Col md={4} sm={12}>
                        <Form.Group className="mb-3">
                          <Form.Label>Warranty Procedure</Form.Label>
                          <Form.Control
                            className="form-control bg"
                            as="textarea"
                            name="warranty_procedure"
                            onChange={async (e) => {
                              setFieldValue(
                                "warranty_procedure",
                                e.target.value
                              );
                            }}
                            rows={3}
                            value={values?.warranty_procedure}
                          />
                        </Form.Group>
                      </Col>
                    )}
                    <Col md={2} sm={12} className=" ">
                      <Form.Group>
                        <Form.Label>Warranty Years</Form.Label>
                        <Form.Control
                          type="text"
                          name="warranty"
                          className="form-control bg"
                          value={values.warranty}
                          onChange={handleChange}
                          isInvalid={!!errors.warranty}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.warranty}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={2} sm={12}>
                      <Form.Label>Hot Selling</Form.Label>
                      <Form.Control
                        as="select"
                        onChange={handleChange}
                        name="hotSelling"
                        className="form-control bg"
                        value={values.hotSelling}
                        isInvalid={!!errors.hotSelling}
                      >
                        <option value="">Select Hot Selling</option>
                        <option value={true}>Active</option>
                        <option value={false}>Inactive</option>
                      </Form.Control>
                    </Col>
                  </Row>
                  <hr className="mt-3" />
                  <Row className="mt-3">
                    <Col md={6} sm={12} className=" ">
                      <Form.Group>
                        <Form.Label>Meta Title</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder=""
                          name="metaTitle"
                          className="form-control bg"
                          value={values.metaTitle}
                          onChange={handleChange}
                          isInvalid={!!errors.metaTitle}
                        />

                        <Form.Control.Feedback type="invalid">
                          {errors.metaTitle}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6} sm={12} className=" ">
                      <Form.Group>
                        <Form.Label>Meta Tags</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder=""
                          name="metaTags"
                          className="form-control bg"
                          value={values.metaTags}
                          onChange={handleChange}
                          isInvalid={!!errors.metaTags}
                        />

                        <Form.Control.Feedback type="invalid">
                          {errors.metaTags}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6} sm={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Meta Schema</Form.Label>
                        <Form.Control
                          as="textarea"
                          name="metaSchema"
                          value={values.metaSchema}
                          onChange={handleChange}
                          rows={2}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} sm={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Meta Discription</Form.Label>
                        <Form.Control
                          as="textarea"
                          name="metaDescription"
                          value={values.metaDescription}
                          onChange={handleChange}
                          rows={2}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mt-3 mb-3">
                    <Col md={3} sm={12}>
                      <Form.Label> Select Stock </Form.Label>
                      <Form.Control
                        as="select"
                        onChange={async (e) => {
                          setFieldValue("instock", e.target.value);
                        }}
                        name="instock"
                        className="form-control bg"
                        value={values.instock}
                        isInvalid={!!errors.instock}
                      >
                        <option value={true}>InStock</option>
                        <option value={false}>Out of Stock</option>
                      </Form.Control>
                    </Col>
                    <Col md={3} sm={12}>
                      <Form.Label>Product Status </Form.Label>
                      <Form.Control
                        as="select"
                        onChange={async (e) => {
                          setFieldValue("status", e.target.value);
                        }}
                        name="status"
                        className="form-control bg"
                        value={values.status}
                        isInvalid={!!errors.status}
                      >
                        <option value={true}>Active</option>
                        <option value={false}>Inactive</option>
                      </Form.Control>
                    </Col>
                    <Col md={3} sm={12}>
                      <Form.Label> Product Type </Form.Label>
                      <Form.Control
                        as="select"
                        onChange={async (e) => {
                          setFieldValue("productType", e.target.value);
                        }}
                        name="productType"
                        className="form-control bg"
                        value={values.productType}
                        isInvalid={!!errors.productType}
                      >
                        <option value="">Product Type</option>
                        <option value={"normal"}>Normal</option>
                        <option value={"customize"}>Customize</option>
                      </Form.Control>
                    </Col>
                  </Row>
                  {values.productType == "customize" && (
                    <>
                      <h5 className="mt-5 mb-0">
                        <b className="text-danger">Add SubProducts</b>
                      </h5>
                      <hr className="mb-3" />
                      <FieldArray name="productOptions">
                        {({ remove, push }) => (
                          <>
                            {!!values.productOptions &&
                              values.productOptions.map((data, index) => {
                                return (
                                  <React.Fragment key={index}>
                                    <Row key={index} className="mb-3 mt-3">
                                      <Col md={12} sm={12}>
                                        <Row>
                                          <Col md={3}>
                                            <Form.Group>
                                              <Form.Label>
                                                Product Name
                                              </Form.Label>
                                              <Form.Control
                                                type="text"
                                                placeholder="Name"
                                                name={`productOptions.${index}.name`}
                                                className="form-control bg"
                                                value={
                                                  values.productOptions[index]
                                                    .name
                                                }
                                                onChange={handleChange}
                                                isInvalid={!!errors.name}
                                              />
                                              <Form.Control.Feedback type="invalid">
                                                {errors.name}
                                              </Form.Control.Feedback>
                                            </Form.Group>
                                          </Col>
                                          <Col md={3} sm={12}>
                                            <Form.Group>
                                              <Form.Label>Slug</Form.Label>
                                              <Form.Control
                                                type="text"
                                                name={`productOptions.${index}.slug`}
                                                className="form-control bg"
                                                value={
                                                  (values.productOptions[
                                                    index
                                                  ].slug =
                                                    values.productOptions[
                                                      index
                                                    ].name
                                                      .toLowerCase()
                                                      .replace(/ /g, "-")
                                                      .replace(/[^\w-]+/g, ""))
                                                }
                                                onChange={handleChange}
                                                isInvalid={!!errors.slug}
                                              />
                                              <Form.Control.Feedback type="invalid">
                                                {errors.slug}
                                              </Form.Control.Feedback>
                                            </Form.Group>
                                          </Col>
                                          <Col md={3}>
                                            <Form.Group>
                                              <Form.Label>Type</Form.Label>
                                              <Form.Control
                                                type="type"
                                                placeholder="Enter Type"
                                                name={`productOptions.${index}.type`}
                                                className="form-control bg"
                                                value={
                                                  values.productOptions[index]
                                                    .type
                                                }
                                                onChange={handleChange}
                                                isInvalid={!!errors.type}
                                              />
                                              <Form.Control.Feedback type="invalid">
                                                {errors.type}
                                              </Form.Control.Feedback>
                                            </Form.Group>
                                          </Col>
                                          <Col md={3}>
                                            <Form.Group>
                                              <Form.Label>PriceMRP</Form.Label>
                                              <Form.Control
                                                type="number"
                                                placeholder="Enter MRP"
                                                name={`productOptions.${index}.priceMrp`}
                                                className="form-control bg"
                                                value={
                                                  values.productOptions[index]
                                                    .priceMrp
                                                }
                                                onChange={handleChange}
                                                isInvalid={!!errors.priceMrp}
                                              />
                                              <Form.Control.Feedback type="invalid">
                                                {errors.priceMrp}
                                              </Form.Control.Feedback>
                                            </Form.Group>
                                          </Col>
                                        </Row>
                                      </Col>
                                      <Col md={12} sm={12}>
                                        <Row>
                                          <Col md={3}>
                                            <Form.Group>
                                              <Form.Label>
                                                Sales Price
                                              </Form.Label>
                                              <Form.Control
                                                type="number"
                                                placeholder=""
                                                name={`productOptions.${index}.salesprice`}
                                                className="form-control bg"
                                                value={
                                                  values.productOptions[index]
                                                    .salesprice
                                                }
                                                onChange={handleChange}
                                                isInvalid={!!errors.salesprice}
                                              />
                                              <Form.Control.Feedback type="invalid">
                                                {errors.salesprice}
                                              </Form.Control.Feedback>
                                            </Form.Group>
                                          </Col>
                                          <Col md={3}>
                                            <Form.Group>
                                              <Form.Label>SKU</Form.Label>
                                              <Form.Control
                                                type="text"
                                                placeholder=""
                                                name={`productOptions.${index}.sku`}
                                                className="form-control bg"
                                                value={
                                                  values.productOptions[index]
                                                    .sku
                                                }
                                                onChange={handleChange}
                                                isInvalid={!!errors.sku}
                                              />
                                              <Form.Control.Feedback type="invalid">
                                                {errors.sku}
                                              </Form.Control.Feedback>
                                            </Form.Group>
                                          </Col>
                                          <Col md={3}>
                                            <Form.Group>
                                              <Form.Label>
                                                Not Combine
                                              </Form.Label>
                                              <Form.Control
                                                type="text"
                                                placeholder=""
                                                name={`productOptions.${index}.notCombine`}
                                                className="form-control bg"
                                                value={
                                                  values.productOptions[index]
                                                    .notCombine
                                                }
                                                onChange={handleChange}
                                                isInvalid={!!errors.notCombine}
                                              />
                                              <Form.Control.Feedback type="invalid">
                                                {errors.notCombine}
                                              </Form.Control.Feedback>
                                            </Form.Group>
                                          </Col>
                                          <Col md={3} sm={12} className="">
                                            <Form.Label> Status </Form.Label>
                                            <Form.Control
                                              as="select"
                                              onChange={handleChange}
                                              name={`productOptions.${index}.status`}
                                              className="form-control bg"
                                              value={
                                                values.productOptions[index]
                                                  .status
                                              }
                                              isInvalid={!!errors.status}
                                              defaultValue={true}
                                            >
                                              <option value={true} selected>
                                                Active
                                              </option>
                                              <option value={false}>
                                                Inactive
                                              </option>
                                            </Form.Control>
                                          </Col>
                                        </Row>
                                      </Col>
                                    </Row>
                                    <Row>
                                      <Col md={10}>
                                        <CKEditor
                                          editor={ClassicEditor}
                                          data={
                                            "Enter Your Product Description......"
                                          }
                                          onReady={(editor) => {
                                            console.log(
                                              "Editor is ready to use!",
                                              editor
                                            );
                                          }}
                                          onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setFieldValue(
                                              `productOptions.${index}.description`,
                                              data
                                            );
                                            console.log({
                                              event,
                                              editor,
                                              data,
                                            });
                                          }}
                                          onBlur={(event, editor) => {
                                            console.log("Blur.", editor);
                                          }}
                                          onFocus={(event, editor) => {
                                            console.log("Focus.", editor);
                                          }}
                                        />
                                      </Col>
                                      <Col md={1}>
                                        {index !== 0 && (
                                          <Button
                                            variant="danger"
                                            onClick={() => remove(index)}
                                          >
                                            <i className="bi bi-trash3-fill"></i>
                                          </Button>
                                        )}
                                      </Col>
                                      <Col md={1}>
                                        <Button
                                          variant="success"
                                          onClick={() =>
                                            push({
                                              name: "",
                                              slug: "",
                                              description: "",
                                              type: "",
                                              priceMrp: "",
                                              salesprice: "",
                                              notCombine: "",
                                              sku: "",
                                              status: true,
                                            })
                                          }
                                        >
                                          <i className="bi bi-plus-lg"></i>
                                        </Button>
                                      </Col>
                                    </Row>
                                  </React.Fragment>
                                );
                              })}
                          </>
                        )}
                      </FieldArray>
                    </>
                  )}
                  <Row className="mt-2">
                    <Col md={12} sm={12} className="text-left ">
                      <Button variant="success" type="submit">
                        Add Product
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </Row>
        ) : (
          <AddProductImages />
        )}
        {/* {(getNewProductData || (localStorage.getItem("newProductapiStatus") == 1)) && <AddProductImages />} */}
      </div>
    </>
  );
}

export default AddProductLongWay;
