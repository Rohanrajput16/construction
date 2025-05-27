import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  CreateProduct,
  productsList,
  getProducts,
} from "../../reducers/commonReducer";
import SideMenu from "../../Components/SideMenu";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  name: yup.string().required("Product name is required"),
  price: yup
    .number()
    .required("Price is required")
    .min(0, "Price cannot be negative"),
  description: yup.string(),
});

function AddProduct() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const { getCategoriesData } = useSelector((state) => state.commonReducer);

  const [categories, setFormRows] = useState([
    { category: "", weight: "", amountInOneCubicMeter: "" },
  ]);

  const handleRowChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRows = [...categories];

    if (name === "weight" && value) {
      updatedRows[index][name] = value;
      updatedRows[index].amountInOneCubicMeter = "";
    } else if (name === "amountInOneCubicMeter" && value) {
      updatedRows[index][name] = value;
      updatedRows[index].weight = "";
    } else {
      updatedRows[index][name] = value;
    }

    setFormRows(updatedRows);
  };

  const addMoreRows = () => {
    setFormRows([
      ...categories,
      { category: "", weight: "", amountInOneCubicMeter: "" },
    ]);
  };

  const deleteRow = (index) => {
    const updatedRows = categories.filter((_, i) => i !== index);
    setFormRows(updatedRows);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Submitting form with values: ", values);
    for (const item of categories) {
      if (!item.category) {
        toast.error("Product must have a category");
        setSubmitting(false);
        return;
      }
      const hasWeight = item.weight && !isNaN(item.weight) && item.weight > 0;
      const hasAmountInOneCubicMeter =
        item.amountInOneCubicMeter &&
        !isNaN(item.amountInOneCubicMeter) &&
        item.amountInOneCubicMeter > 0;

      if (!hasWeight && !hasAmountInOneCubicMeter) {
        toast.error(
          "Each category must have either weight or amount in one cubic meter."
        );
        setSubmitting(false);
        return;
      }
    }
    dispatch(CreateProduct({ ...values, categories }))
      .unwrap()
      .then((res) => {
        if (res.status) {
          // toast.success(res.message); 
          navigate("/product-list");
        } else {
          if (res.message.startsWith("E11000")) {
            // toast.error("Product Name Already Exist");
          } else {
            toast.error(res.message);
          }
        }
      });
    setSubmitting(false);
  };
  const selectedCategoryIds = categories.map((item) => item.category);

  return (
    <>
      <SideMenu />
      <div className="mt-extra content container-fluid">
        <Link to={"/product-list"}>
          {" "}
          <h5>
            {" "}
            <i className="bi bi-arrow-left"></i> Product List
          </h5>
        </Link>
        <Formik
          initialValues={{
            name: "",
            price: "",
            size: "",
            description: "",
          }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md={3} sm={12}>
                  <Form.Group>
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      isInvalid={touched.name && !!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={2} sm={12}>
                  <Form.Group>
                    <Form.Label>Size (Unit)</Form.Label>
                    <Form.Control
                      type="string"
                      name="size"
                      value={values.size}
                      onChange={handleChange}
                      isInvalid={!!errors.size}
                    />
                  </Form.Group>
                </Col>

                <Col md={2} sm={12}>
                  <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="₹ 100"
                      name="price"
                      value={values.price}
                      onChange={handleChange}
                      isInvalid={!!errors.price}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.price}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <p className="mb-0">
                    <span className="fw-bold discount-color">
                      Price Inclusive of GST
                    </span>
                  </p>
                </Col>

                <Col md={5} sm={12}>
                  <Form.Group>
                    <Form.Label htmlFor="description">Description</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Description"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      isInvalid={!!errors.description}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.description}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              {categories.map((row, index) => (
                <Row className="mb-3" key={index}>
                  <Col md={5} sm={12}>
                    <Form.Group>
                      <Form.Label htmlFor={`category-${index}`}>
                        Category
                      </Form.Label>
                      <Form.Control
                        as="select"
                        name="category"
                        value={row.category}
                        onChange={(e) => handleRowChange(index, e)}
                      >
                        <option value="">Select Category</option>
                        {!!getCategoriesData?.list &&
                          // Step 2: Filter out already selected categories
                          getCategoriesData.list
                            .filter(
                              (data) =>
                                !selectedCategoryIds.includes(data.id) ||
                                data.id === row.category
                            )
                            .map((data) => (
                              <option key={data.id} value={data.id}>
                                {data.name}
                              </option>
                            ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>

                  <Col md={3} sm={12}>
                    <Form.Group>
                      <Form.Label>Weight</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="In kg"
                        name="weight"
                        value={row.weight}
                        onChange={(e) => handleRowChange(index, e)}
                        disabled={row.amountInOneCubicMeter !== ""}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={3} sm={12}>
                    <Form.Group>
                      <Form.Label>Quantity</Form.Label>
                      <Form.Control
                        type="number"
                        name="amountInOneCubicMeter"
                        value={row.amountInOneCubicMeter}
                        onChange={(e) => handleRowChange(index, e)}
                        disabled={row.weight !== ""}
                      />
                    </Form.Group>
                  </Col>

                  <Col
                    md={1}
                    sm={12}
                    style={{
                      position: "relative",
                      top: "28px",
                      display: "flex",
                      height: "35px",
                    }}
                  >
                    {index !== 0 && (
                      <Button
                        variant="danger"
                        onClick={() => deleteRow(index)}
                        className="plusbtn"
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    )}
                    <Button
                      variant="primary"
                      onClick={addMoreRows}
                      style={{ marginLeft: "3.5px" }}
                      className="plusbtn"
                    >
                      +
                    </Button>
                  </Col>
                </Row>
              ))}

              <Row className="mt-2">
                <Col md={12} sm={12} className="text-left ">
                  {/* <Link to={"/product-list"}> */}
                  <Button
                    variant="success"
                    onClick={() => {
                      handleSubmit();
                      getProducts();
                    }}
                  >
                    Add Product
                  </Button>
                  {/* </Link> */}
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default AddProduct;

// import React, { useEffect, } from "react";
// import { Form, Row, Col } from "react-bootstrap";
// import Button from "react-bootstrap/Button";
// import { FieldArray, Formik } from "formik";
// import * as yup from "yup";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// // import Select from "react-select";
// // import makeAnimated from "react-select/animated";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   // getAttributes,
//   getTaxgsts,
//   // getWarrantyProccesses,
//   // getWarranty,
//   // getCustomizeEnabledProducts,
//   CreateProduct,
// } from "../../reducers/commonReducer";
// import {
//   // getBrandsFrontend,
//   getCategoriesFrontEnd,
//   // getChildCategoriesFrontEnd,
// } from "../../reducers/frontEndReducer";
// import SideMenu from "../../Components/SideMenu";
// import AddProductImages from "./AddProductImages";

// const schema = yup.object().shape({
//   name: yup.string().required(),
//   // slug: yup.string().required(),
//   // minStockQty: yup.number().required(),
//   // sku: yup.string().required(),
//   weight: yup.string(),
//   // orderby: yup.string(),
//   description: yup.string(),
//   // brand: yup.string().required(),
//   // mrp: yup.string().required(),
//   // sale: yup.string(),
//   // minqty: yup.string().required(),
//   // maxqty: yup.string().required(),
//   // quantity: yup.string().required(),
//   // price: yup.array().of(
//   //   yup.object().shape({
//   //     id: yup.string(),
//   //     value: yup.string(),
//   //   })
//   // ),
//   // backordering: yup.string().required(),
//   categories: yup.array().min(1),
//   subcategories: yup.array(),
//   // tax_class: yup.string().required(),
//   // attributes: yup.array().of(
//   //   yup.object().shape({
//   //     id: yup.string(),
//   //     value: yup.string(),
//   //   })
//   // ),
//   // metaTitle: yup.string(),
//   // alias: yup.string(),
//   // metaDescription: yup.string(),
//   // metaTags: yup.string(),
//   // metaSchema: yup.string(),
//   // productType: yup.string().required("Product type is required"),
//   // Processor: yup.array().when("productType", {
//   //   is: "customize",
//   //   then: yup.array().min(1),
//   // }),
//   // Ram: yup.array().when("productType", {
//   //   is: "customize",
//   //   then: yup.array().min(1),
//   // }),
//   // Storage: yup.array().when("productType", {
//   //   is: "customize",
//   //   then: yup.array().min(1),
//   // }),
//   // Other: yup.array(),
//   // warranty_procedure: yup.string(),
//   // warranty: yup.string(),
//   // hotSelling: yup.string(),
//   // instock: yup.bool().required(),
//   // status: yup.bool().required(),
//   // reward: yup.number().required(),
//   // rewardStatus: yup.bool().required(),
// });
// // const animatedComponents = makeAnimated();

// function AddProduct(props) {
//   const dispatch = useDispatch();
//   // const [warrantyType, setWarrantyType] = useState();

//   useEffect(() => {
//     const getTaxClass = async () => {
//       await dispatch(getTaxgsts());
//     };

//     getTaxClass();
//     dispatch(getCategoriesFrontEnd());
//     // dispatch(getAttributes());
//     // dispatch(getWarrantyProccesses());
//     // dispatch(getBrandsFrontend());
//     // dispatch(getWarranty());
//     // dispatch(getCustomizeEnabledProducts());
//   }, [dispatch]);

//   const {
//     // getAttributesData,
//     getNewProductData,
//     // getWarrantyData,
//     // getTaxgstsData,
//     // getCustEnblProductsList,
//   } = useSelector((state) => state.commonReducer);
//   // const {
//   //   // getCatsFrontEndData,
//   //   // getBrandsFrontendData,
//   //   // childCategoriesFrontEndData
//   // } = useSelector((state) => state.frontEndReducer);
//   // const handleSelectOption = (event, values) => {
//   //   setWarrantyType(event.target.value);
//   //   values.warranty_procedure =
//   //     event.target.options[event.target.selectedIndex].dataset?.warranty;
//   // };
//   const { getCategoriesData } = useSelector(state => state.commonReducer);

//   return (
//     <>
//       <SideMenu />
//       <div className="mt-extra content container-fluid">
//         {!getNewProductData || !localStorage.getItem("newProductapiStatus") ? (
//           <Row className="mb-3 products-design">
//             <Formik
//               validationSchema={schema}
//               initialValues={{
//                 name: "",
//                 // slug: "",
//                 // sku: "",
//                 weight: "",
//                 orderby: "",
//                 description: "",
//                 // brand: "",
//                 mrp: "",
//                 // sale: "",
//                 // minqty: 1,
//                 // maxqty: "",
//                 quantity: "",
//                 // price: [
//                 //   {
//                 //     id: "",
//                 //     value: "",
//                 //   },
//                 // ],
//                 // backordering: true,
//                 categories: [],
//                 // subcategories: [],
//                 // tax_class: "63b53729a403053ba0d99d99",
//                 // attributes: [
//                 //   {
//                 //     id: "",
//                 //     value: "",
//                 //   },
//                 // ],
//                 // productType: "",
//                 // alias: '',
//                 // metaTitle: "",
//                 // metaDescription: "",
//                 // metaTags: "",
//                 // metaSchema: "",
//                 // Processor: [],
//                 // Ram: [],
//                 // Storage: [],
//                 // Other: [],
//                 // warranty_procedure: "",
//                 // warranty: "",
//                 // hotSelling: false,
//                 // instock: true,
//                 status: true,
//                 // minStockQty: '',
//                 // reward: '',
//                 // rewardStatus: ''
//               }}
//               onSubmit={(values, { resetForm }) => {
//                 dispatch(CreateProduct(values));
//               }}
//             >
//               {({
//                 handleSubmit,
//                 handleChange,
//                 values,
//                 setFieldValue,
//                 errors,
//               }) => (
//                 <Form onSubmit={handleSubmit}>
//                   <Row className="mb-3">
//                     <Col md={6} sm={12}>
//                       <Form.Group>
//                         <Form.Label>Product Name</Form.Label>
//                         <Form.Control
//                           type="text"
//                           placeholder=""
//                           name="name"
//                           className="form-control bg"
//                           value={values.name}
//                           onChange={handleChange}
//                           isInvalid={!!errors.name}
//                         />
//                         <Form.Control.Feedback type="invalid">
//                           {errors.name}
//                         </Form.Control.Feedback>
//                       </Form.Group>
//                     </Col>

//                     <Col md={6} sm={12}>
//                       <Form.Group>
//                         <Form.Label htmlFor="category">Category</Form.Label>
//                         <Form.Control
//                           as="select"
//                           name="category"
//                           className="form-control"
//                         // value={formValues.category}
//                         // onChange={(e) => setFieldValue("category", e.target.value)}
//                         >
//                           <option value="">Select Category</option>
//                           {!!getCategoriesData?.list &&
//                             getCategoriesData.list.map((data, index) => (
//                               <option key={index} value={data.id}>
//                                 {data.name}
//                               </option>
//                             ))}
//                         </Form.Control>
//                       </Form.Group>
//                     </Col>
//                     {/* <Col md={3} sm={12}>
//                       <Form.Group>
//                         <Form.Label>Slug</Form.Label>
//                         <Form.Control
//                           type="text"
//                           name="slug"
//                           className="form-control bg"
//                           value={
//                             (values.slug = values.name
//                               .toLowerCase()
//                               .replace(/ /g, "-")
//                               .replace(/[^\w-]+/g, ""))
//                           }
//                           readOnly
//                           isInvalid={!!errors.slug}
//                         />
//                         <Form.Control.Feedback type="invalid">
//                           {errors.slug}
//                         </Form.Control.Feedback>
//                       </Form.Group>
//                     </Col> */}

//                     {/* <Col md={2} sm={12}>
//                       <Form.Group>
//                         <Form.Label>SKU</Form.Label>
//                         <Form.Control
//                           type="text"
//                           name="sku"
//                           className="form-control bg"
//                           value={values.sku}
//                           onChange={handleChange}
//                           isInvalid={!!errors.sku}
//                         />
//                         <Form.Control.Feedback type="invalid">
//                           {errors.sku}
//                         </Form.Control.Feedback>
//                       </Form.Group>
//                     </Col> */}

//                     {/* <Col md={2} sm={12}>
//                       <Form.Group>
//                         <Form.Label>Weight</Form.Label>
//                         <Form.Control
//                           type="number"
//                           placeholder="In Grams"
//                           name="weight"
//                           className="form-control bg"
//                           value={values.weight}
//                           onChange={handleChange}
//                           isInvalid={!!errors.weight}
//                         />
//                         <Form.Control.Feedback type="invalid">
//                           {errors.weight}
//                         </Form.Control.Feedback>
//                       </Form.Group>
//                     </Col> */}
//                     {/* <Col md={2} sm={12}>
//                       <Form.Group>
//                         <Form.Label>OrderBy</Form.Label>
//                         <Form.Control
//                           type="number"
//                           placeholder="Enter OrderBy"
//                           name="orderby"
//                           className="form-control bg"
//                           value={values.orderby}
//                           onChange={handleChange}
//                           isInvalid={!!errors.orderby}
//                         />
//                         <Form.Control.Feedback type="invalid">
//                           {errors.orderby}
//                         </Form.Control.Feedback>
//                       </Form.Group>
//                     </Col> */}
//                   </Row>
//                   <Row className="mb-3">
//                     <Col md={12} sm={12}>
//                       <CKEditor
//                         editor={ClassicEditor}
//                         data={"Enter Your Product Description......"}
//                         onReady={(editor) => {
//                           console.log("Editor is ready to use!", editor);
//                         }}
//                         onChange={(event, editor) => {
//                           const data = editor.getData();
//                           setFieldValue("description", data);
//                           console.log({ event, editor, data });
//                         }}
//                         onBlur={(event, editor) => {
//                           console.log("Blur.", editor);
//                         }}
//                         onFocus={(event, editor) => {
//                           console.log("Focus.", editor);
//                         }}
//                       />
//                     </Col>
//                   </Row>
//                   <Row className="mb-3">
//                     <Col md={12} sm={12}>
//                       <Row>
//                         {/* <Col md={3} sm={12}>
//                           <Form.Group>
//                             <Form.Label>MRP</Form.Label>
//                             <Form.Control
//                               type="number"
//                               placeholder="₹ 100"
//                               name="mrp"
//                               className="form-control bg"
//                               value={values.mrp}
//                               onChange={handleChange}
//                               isInvalid={!!errors.mrp}
//                             />
//                             <Form.Control.Feedback type="invalid">
//                               {errors.mrp}
//                             </Form.Control.Feedback>
//                           </Form.Group>
//                         </Col> */}
//                         {/* <Col>
//                           <Form.Group>
//                             <Form.Label>Sale Price</Form.Label>
//                             <Form.Control
//                               type="number"
//                               placeholder="Sale Price"
//                               name="sale"
//                               className="form-control bg"
//                               value={values.sale}
//                               onChange={handleChange}
//                               isInvalid={!!errors.sale}
//                             />
//                             <Form.Control.Feedback type="invalid">
//                               {errors.sale}
//                             </Form.Control.Feedback>
//                           </Form.Group>
//                         </Col> */}
//                         {/* <Col>
//                           <Form.Group>
//                             <Form.Label>Min Quantity Order</Form.Label>
//                             <Form.Control
//                               type="number"
//                               name="minqty"
//                               className="form-control bg"
//                               value={values.minqty}
//                               onChange={handleChange}
//                               isInvalid={!!errors.minqty}
//                             />
//                             <Form.Control.Feedback type="invalid">
//                               {errors.minqty}
//                             </Form.Control.Feedback>
//                           </Form.Group>
//                         </Col>
//                         <Col>
//                           <Form.Group>
//                             <Form.Label>Max Quantity Order</Form.Label>
//                             <Form.Control
//                               type="number"
//                               name="maxqty"
//                               className="form-control bg"
//                               value={values.maxqty}
//                               onChange={handleChange}
//                               isInvalid={!!errors.maxqty}
//                             />
//                             <Form.Control.Feedback type="invalid">
//                               {errors.maxqty}
//                             </Form.Control.Feedback>
//                           </Form.Group>
//                         </Col> */}
//                         {/* <Col>
//                           <Form.Group>
//                             <Form.Label>Total Availablity</Form.Label>
//                             <Form.Control
//                               type="number"
//                               name="quantity"
//                               className="form-control bg"
//                               value={values.quantity}
//                                isInvalid={!!errors.quantity}
//                             />
//                             <Form.Control.Feedback type="invalid">
//                               {errors.quantity}
//                             </Form.Control.Feedback>
//                           </Form.Group>
//                         </Col> */}
//                         {/* <Col>
//                           <Form.Group>
//                             <Form.Label>Min Stock Qty</Form.Label>
//                             <Form.Control
//                               type="number"
//                               name="minStockQty"
//                               className="form-control bg"
//                               value={values.minStockQty}
//                               onChange={handleChange}
//                               isInvalid={!!errors.minStockQty}
//                             />
//                             <Form.Control.Feedback type="invalid">
//                               {errors.minStockQty}
//                             </Form.Control.Feedback>
//                           </Form.Group>
//                         </Col> */}
//                       </Row>
//                     </Col>
//                     <p className="mb-0">
//                       <span className="fw-bold ">
//                         In One Cubic Meter
//                       </span>
//                     </p>
//                     <Col className="mt-4" md={12} sm={12}>
//                       <Row>
//                         {/* // this type */}
//                         <Col md={12} sm={12}>
//                           {values.productType !== "customize" && <><Row>
//                             <FieldArray name="price">
//                               {({ remove, push }) => (
//                                 <>
//                                   {!!values.price &&
//                                     values.price.map((data, index) => {
//                                       return (
//                                         <React.Fragment key={index}>
//                                           {/* <Col md={4} sm={12}>
//                                             <Form.Label>
//                                               Quantity Discount
//                                             </Form.Label>
//                                             <Form.Control
//                                               as="select"
//                                               onChange={handleChange}
//                                               className="form-control bg"
//                                               name={`price.${index}.id`}
//                                               value={values.price[index].id}
//                                               isInvalid={!!errors.price}
//                                             >
//                                               <option value="">
//                                                 Select Quantity
//                                               </option>
//                                               <option value={"1-10"}>
//                                                 1-10
//                                               </option>
//                                               <option value={"10-15"}>
//                                                 10-15
//                                               </option>
//                                               <option value={"15-25"}>
//                                                 15-25
//                                               </option>
//                                               <option value={"25-50"}>
//                                                 25-50
//                                               </option>
//                                               <option value={"50-100"}>
//                                                 50-100
//                                               </option>
//                                             </Form.Control>
//                                           </Col> */}
//                                           <Col md={3} sm={12}>
//                                             <Form.Group>
//                                               <Form.Label>Weight</Form.Label>
//                                               <Form.Control
//                                                 type="number"
//                                                 placeholder="In Grams"
//                                                 name="weight"
//                                                 className="form-control bg"
//                                                 value={values.weight}
//                                                 onChange={handleChange}
//                                                 isInvalid={!!errors.weight}
//                                               />
//                                               <Form.Control.Feedback type="invalid">
//                                                 {errors.weight}
//                                               </Form.Control.Feedback>
//                                             </Form.Group>
//                                           </Col>

//                                           <Col md={3} sm={12}>
//                                             <Form.Group>
//                                               <Form.Label>Quantity</Form.Label>
//                                               <Form.Control
//                                                 type="number"
//                                                 placeholder="10"
//                                                 onChange={handleChange}
//                                                 name={`price.${index}.id`}
//                                                 className="form-control bg"
//                                                 isInvalid={!!errors.price}
//                                               />
//                                             </Form.Group>
//                                           </Col>

//                                           <Col md={3} sm={12}>
//                                             <Form.Group>
//                                               <Form.Label>
//                                                 Size
//                                               </Form.Label>
//                                               <Form.Control
//                                                 type="text"
//                                                 placeholder=" Size"

//                                                 className="form-control bg"

//                                               />
//                                             </Form.Group>
//                                           </Col>
//                                           <Col md={3} sm={12}>
//                                             <Form.Group>
//                                               <Form.Label>MRP</Form.Label>
//                                               <Form.Control
//                                                 type="number"
//                                                 placeholder="₹ 100"
//                                                 name="mrp"
//                                                 className="form-control bg"
//                                                 value={values.mrp}
//                                                 onChange={handleChange}
//                                                 isInvalid={!!errors.mrp}
//                                               />
//                                               <Form.Control.Feedback type="invalid">
//                                                 {errors.mrp}
//                                               </Form.Control.Feedback>
//                                             </Form.Group>
//                                             <p className="mb-0">
//                                               <span className="fw-bold discount-color">
//                                                 Price Inclusive of GST
//                                               </span>
//                                             </p>
//                                           </Col>

//                                           {/* <Col md={2} sm={12} className="mt-4">
//                                             {index !== 0 && (
//                                               <Button
//                                                 variant="danger"
//                                                 onClick={() => remove(index)}
//                                               >
//                                                 <i className="bi bi-trash3-fill"></i>
//                                               </Button>
//                                             )}
//                                           </Col> */}
//                                           {/* <Col md={2} sm={12} className="mt-4">
//                                             <Button
//                                               variant="success"
//                                               onClick={() =>
//                                                 push({ id: "", value: "" })
//                                               }
//                                             >
//                                               <i className="bi bi-plus-lg"></i>
//                                             </Button>
//                                           </Col> */}
//                                         </React.Fragment>
//                                       );
//                                     })}
//                                 </>
//                               )}
//                             </FieldArray>
//                           </Row></>}
//                         </Col>
//                         {/* <Col md={6} sm={12}>
//                           <FieldArray name="attributes">
//                             {({ remove, push }) => (
//                               <>
//                                 {!!values.attributes &&
//                                   values.attributes.map((data, index) => {
//                                     return (
//                                       <Row key={index}>
//                                         {/* <Col md={6} sm={12}>
//                                           <Form.Label>
//                                             Product Attribute
//                                           </Form.Label>
//                                           <Form.Control
//                                             as="select"
//                                             onChange={handleChange}
//                                             className="form-control bg"
//                                             name={`attributes.${index}.id`}
//                                             value={values.attributes[index].id}
//                                             isInvalid={!!errors.attributes}
//                                           >
//                                             <option value="">
//                                               Select Attribute
//                                             </option>
//                                             {!!getAttributesData?.list &&
//                                               getAttributesData.list.map(
//                                                 (data, index) => {
//                                                   return (
//                                                     <option
//                                                       value={data?.id}
//                                                       key={index}
//                                                     >
//                                                       {data?.name}
//                                                     </option>
//                                                   );
//                                                 }
//                                               )}
//                                           </Form.Control>
//                                         </Col> */}
//                         {/* <Col md={6} sm={12}>
//                                           <Form.Group>
//                                             <Form.Label>
//                                               Attribute Value
//                                             </Form.Label>
//                                             <Form.Control
//                                               type="text"
//                                               onChange={handleChange}
//                                               name={`attributes.${index}.value`}
//                                               className="form-control bg"
//                                               isInvalid={!!errors.attributes}
//                                             />
//                                           </Form.Group>
//                                         </Col> */}
//                         {/* <Col md={2} sm={12} className="mt-4">
//                                           {index !== 0 && (
//                                             <Button
//                                               variant="danger"
//                                               onClick={() => remove(index)}
//                                             >
//                                               <i className="bi bi-trash3-fill"></i>
//                                             </Button>
//                                           )}
//                                         </Col> */}
//                         {/* <Col md={2} sm={12} className="mt-4">
//                                           <Button
//                                             variant="success"
//                                             onClick={() =>
//                                               push({ id: "", value: "" })
//                                             }
//                                           >
//                                             <i className="bi bi-plus-lg"></i>
//                                           </Button>
//                                         </Col> */}
//                         {/* </Row>
//                                     );
//                                   })}
//                               </>
//                             )}
//                           </FieldArray>
//                           {/* // you have to  */}
//                         {/* </Col>  */}
//                       </Row>
//                     </Col>
//                   </Row>
//                   {/* <hr /> */}

//                   <Row className="mt-3">
//                     <Col md={12} sm={12}>
//                       <Row>
//                         {/* <Col md={12} sm={12}>
//                           <Form.Label> Category </Form.Label>
//                           <Select
//                             closeMenuOnSelect={false}
//                             components={animatedComponents}
//                             isMulti
//                             onChange={(selectedOptions) => {
//                               setFieldValue(
//                                 `categories`,
//                                 selectedOptions?.map((data) => data?.value)
//                               );
//                               dispatch(
//                                 getChildCategoriesFrontEnd({
//                                   parent: selectedOptions?.map(
//                                     (data) => data?.value
//                                   ),
//                                 })
//                               );
//                             }}
//                             options={
//                               !!getCatsFrontEndData &&
//                               getCatsFrontEndData.map((data) => {
//                                 return {
//                                   value: data?.id,
//                                   label: data?.name,
//                                 };
//                               })
//                             }
//                           />
//                           <p className="text-danger">{errors.categories}</p>
//                         </Col> */}
//                         {/* {!!childCategoriesFrontEndData.length > 0 && (
//                           <Col md={6} sm={12}>
//                             <Form.Label> SubCategories </Form.Label>
//                             <Select
//                               closeMenuOnSelect={false}
//                               components={animatedComponents}
//                               isMulti
//                               onChange={(selectedOptions) => {
//                                 setFieldValue(
//                                   `subcategories`,
//                                   selectedOptions?.map((data) => data?.value)
//                                 );
//                               }}
//                               options={
//                                 !!childCategoriesFrontEndData &&
//                                 childCategoriesFrontEndData.map((data) => {
//                                   return {
//                                     value: data?.id,
//                                     label: data?.name,
//                                   };
//                                 })
//                               }
//                             />
//                           </Col>
//                         )} */}
//                         {/* <Col md={2} sm={12}>
//                           <Form.Label>Brands</Form.Label>
//                           <Form.Control
//                             as="select"
//                             onChange={handleChange}
//                             name="brand"
//                             className="form-control bg"
//                             value={values.brand}
//                             isInvalid={!!errors.brand}
//                           >
//                             <option value="">Select Brands</option>
//                             {!!getBrandsFrontendData?.list &&
//                               getBrandsFrontendData?.list.map((data, index) => {
//                                 return (
//                                   <option value={data?.id} key={index}>
//                                     {data?.name}
//                                   </option>
//                                 );
//                               })}
//                           </Form.Control>
//                         </Col> */}
//                         {/* <Col md={6} sm={12}>
//                           <Form.Label> Tax - Class </Form.Label>
//                           <Form.Control
//                             as="select"
//                             onChange={handleChange}
//                             name="tax_class"
//                             className="form-control bg"
//                             value={values.tax_class}
//                             isInvalid={!!errors.tax_class}
//                           >
//                             {!!getTaxgstsData?.list &&
//                               getTaxgstsData.list.map((data, index) => {
//                                 return (
//                                   <option value={data?.id} key={index}>
//                                     {data?.name}
//                                   </option>
//                                 );
//                               })}
//                           </Form.Control>
//                         </Col> */}
//                       </Row>
//                     </Col>
//                     {/* <Col md={12} sm={12}>
//                       <Row>
//                         <Col md={12} sm={12}></Col>
//                       </Row>
//                     </Col> */}
//                   </Row>
//                   {/* <hr className="mt-3" /> */}
//                   {/* <Row className="mt-3">
//                     <Col md={4} sm={12} className=" ">
//                       <Form.Label> Warranty Types </Form.Label>
//                       <Form.Control
//                         as="select"
//                         onChange={(e) => handleSelectOption(e, values)}
//                         name="status"
//                         className="form-control bg"
//                       >
//                         <option value="">Select Warranty Types</option>
//                         {!!getWarrantyData?.list &&
//                           getWarrantyData.list.map((data, index) => {
//                             return (
//                               <option
//                                 key={index}
//                                 data-warranty={data?.details}
//                                 // value={data?.id}
//                               >
//                                 {data?.title}
//                               </option>
//                             );
//                           })}
//                       </Form.Control>
//                     </Col>
//                     {warrantyType && warrantyType.length > 0 && (
//                       <Col md={4} sm={12}>
//                         <Form.Group className="mb-3">
//                           <Form.Label>Warranty Procedure</Form.Label>
//                           <Form.Control
//                             className="form-control bg"
//                             as="textarea"
//                             name="warranty_procedure"
//                             onChange={async (e) => {
//                               setFieldValue(
//                                 "warranty_procedure",
//                                 e.target.value
//                               );
//                             }}
//                             rows={3}
//                             value={values?.warranty_procedure}
//                           />
//                         </Form.Group>
//                       </Col>
//                     )}
//                     <Col md={2} sm={12} className=" ">
//                       <Form.Group>
//                         <Form.Label>Warranty (2 years)</Form.Label>
//                         <Form.Control
//                           type="text"
//                           name="warranty"
//                           className="form-control bg"
//                           value={values.warranty}
//                           onChange={handleChange}
//                           isInvalid={!!errors.warranty}
//                         />
//                         <Form.Control.Feedback type="invalid">
//                           {errors.warranty}
//                         </Form.Control.Feedback>
//                       </Form.Group>
//                     </Col>
//                     <Col md={2} sm={12}>
//                       <Form.Label>Hot Selling</Form.Label>
//                       <Form.Control
//                         as="select"
//                         onChange={handleChange}
//                         name="hotSelling"
//                         className="form-control bg"
//                         value={values.hotSelling}
//                         isInvalid={!!errors.hotSelling}
//                       >
//                         <option value="">Select Hot Selling</option>
//                         <option value={true}>Active</option>
//                         <option value={false}>Inactive</option>
//                       </Form.Control>
//                     </Col>
//                   </Row> */}
//                   {/* <hr className="mt-3" /> */}
//                   {/* <Row className="mt-3">
//                     <Col md={3} sm={12} className=" ">
//                       <Form.Group>
//                         <Form.Label>ALIAS</Form.Label>
//                         <Form.Control
//                           type="text"
//                           placeholder=""
//                           name="alias"
//                           className="form-control bg"
//                           value={values.alias}
//                           onChange={handleChange}
//                           isInvalid={!!errors.alias}
//                         />
//                         <Form.Control.Feedback type="invalid">
//                           {errors.alias}
//                         </Form.Control.Feedback>
//                       </Form.Group>
//                     </Col>
//                     <Col md={2} sm={12} className=" ">
//                       <Form.Group>
//                         <Form.Label>Reward</Form.Label>
//                         <Form.Control
//                           type="number"
//                           placeholder=""
//                           name="reward"
//                           className="form-control bg"
//                           value={values.reward}
//                           onChange={handleChange}
//                           isInvalid={!!errors.reward}
//                         />
//                         <Form.Control.Feedback type="invalid">
//                           {errors.reward}
//                         </Form.Control.Feedback>
//                       </Form.Group>
//                     </Col>
//                     <Col md={3} sm={12}>
//                     <Form.Group>
//                       <Form.Label>Reward Status</Form.Label>
//                       <Form.Control
//                         as="select"
//                         onChange={async (e) => {
//                           setFieldValue("rewardStatus",  (/true/).test(e.target.value));
//                         }}
//                         name="rewardStatus"
//                         className="form-control bg"
//                         value={values.rewardStatus}
//                         isInvalid={!!errors.rewardStatus}
//                       >
//                         <option value="">Select Reward Status</option>
//                         <option value={true}>Active</option>
//                         <option value={false}>Inactive</option>
//                       </Form.Control>
//                       <Form.Control.Feedback type="invalid">
//                           {errors.rewardStatus}
//                         </Form.Control.Feedback>
//                       </Form.Group>
//                     </Col>
//                     <Col md={2} sm={12} className=" ">
//                       <Form.Group>
//                         <Form.Label>Meta Title</Form.Label>
//                         <Form.Control
//                           type="text"
//                           placeholder=""
//                           name="metaTitle"
//                           className="form-control bg"
//                           value={values.metaTitle}
//                           onChange={handleChange}
//                           isInvalid={!!errors.metaTitle}
//                         />

//                         <Form.Control.Feedback type="invalid">
//                           {errors.metaTitle}
//                         </Form.Control.Feedback>
//                       </Form.Group>
//                     </Col>
//                     <Col md={2} sm={12} className=" ">
//                       <Form.Group>
//                         <Form.Label>Meta Tags</Form.Label>
//                         <Form.Control
//                           type="text"
//                           placeholder=""
//                           name="metaTags"
//                           className="form-control bg"
//                           value={values.metaTags}
//                           onChange={handleChange}
//                           isInvalid={!!errors.metaTags}
//                         />

//                         <Form.Control.Feedback type="invalid">
//                           {errors.metaTags}
//                         </Form.Control.Feedback>
//                       </Form.Group>
//                     </Col>
//                     <Col md={6} sm={12}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Meta Schema</Form.Label>
//                         <Form.Control
//                           as="textarea"
//                           name="metaSchema"
//                           value={values.metaSchema}
//                           onChange={handleChange}
//                           rows={2}
//                         />
//                       </Form.Group>
//                     </Col>
//                     <Col md={6} sm={12}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Meta Discription</Form.Label>
//                         <Form.Control
//                           as="textarea"
//                           name="metaDescription"
//                           value={values.metaDescription}
//                           onChange={handleChange}
//                           rows={2}
//                         />
//                       </Form.Group>
//                     </Col>
//                   </Row> */}
//                   {/* <Row className="mt-3 mb-3">
//                     <Col md={4} sm={12}>
//                       <Form.Label> Select Stock </Form.Label>
//                       <Form.Control
//                         as="select"
//                         onChange={async (e) => {
//                           setFieldValue("instock", e.target.value);
//                         }}
//                         name="instock"
//                         className="form-control bg"
//                         value={values.instock}
//                         isInvalid={!!errors.instock}
//                       >
//                         <option value={true}>InStock</option>
//                         <option value={false}>Out of Stock</option>
//                       </Form.Control>
//                     </Col>
//                     <Col md={4} sm={12}>
//                       <Form.Label>Product Status </Form.Label>
//                       <Form.Control
//                         as="select"
//                         onChange={async (e) => {
//                           setFieldValue("status", e.target.value);
//                         }}
//                         name="status"
//                         className="form-control bg"
//                         value={values.status}
//                         isInvalid={!!errors.status}
//                       >
//                         <option value={true}>Active</option>
//                         <option value={false}>Inactive</option>
//                       </Form.Control>
//                     </Col>
//                     <Col md={4} sm={12}>
//                       <Form.Label> Product Type </Form.Label>
//                       <Form.Control
//                         as="select"
//                         onChange={async (e) => {
//                           setFieldValue("productType", e.target.value);
//                         }}
//                         name="productType"
//                         className="form-control bg"
//                         value={values.productType}
//                         isInvalid={!!errors.productType}
//                       >
//                         <option value="">Product Type</option>
//                         <option value={"normal"}>Normal</option>
//                         <option value={"customize"}>Customize</option>
//                       </Form.Control>
//                     </Col>
//                   </Row> */}
//                   {/* {values.productType == "customize" && (
//                     <>
//                       <h5 className="mt-5 mb-0">
//                         <b className="text-danger">Add SubProducts</b>
//                       </h5>
//                       <hr className="mb-3" />
//                       <Row>
//                         <Col md={3} sm={12}>
//                           <Form.Label> Processor </Form.Label>
//                           <Select
//                             closeMenuOnSelect={false}
//                             components={animatedComponents}
//                             isMulti
//                             onChange={(selectedOptions) => {
//                               setFieldValue(
//                                 `Processor`,
//                                 selectedOptions?.map((data) => data?.value)
//                               );
//                             }}
//                             options={
//                               !!getCustEnblProductsList?.list &&
//                               getCustEnblProductsList?.list
//                                 .filter(
//                                   (data) => ((data?.category === "Processor") && (data?.stock))
//                                 )
//                                 .map((data) => ({
//                                   value: data?.id,
//                                   label: data?.name,
//                                 }))
//                             }
//                           />
//                           <p className="text-danger">{errors.Processor}</p>
//                         </Col>
//                         <Col md={3} sm={12}>
//                           <Form.Label> Ram </Form.Label>
//                           <Select
//                             closeMenuOnSelect={false}
//                             components={animatedComponents}
//                             isMulti
//                             onChange={(selectedOptions) => {
//                               setFieldValue(
//                                 `Ram`,
//                                 selectedOptions?.map((data) => data?.value)
//                               );
//                             }}
//                             options={
//                               !!getCustEnblProductsList?.list &&
//                               getCustEnblProductsList?.list
//                                 .filter((data) => ((data?.category === "Ram") && (data?.stock)))
//                                 .map((data) => ({
//                                   value: data?.id,
//                                   label: data?.name,
//                                 }))
//                             }
//                           />
//                           <p className="text-danger">{errors.Ram}</p>
//                         </Col>
//                         <Col md={3} sm={12}>
//                           <Form.Label> Storage </Form.Label>
//                           <Select
//                             closeMenuOnSelect={false}
//                             components={animatedComponents}
//                             isMulti
//                             onChange={(selectedOptions) => {
//                               setFieldValue(
//                                 `Storage`,
//                                 selectedOptions?.map((data) => data?.value)
//                               );
//                             }}
//                             options={
//                               !!getCustEnblProductsList?.list &&
//                               getCustEnblProductsList?.list
//                                 .filter((data) => ((data?.category === "Storage") && (data?.stock)))
//                                 .map((data) => ({
//                                   value: data?.id,
//                                   label: data?.name,
//                                 }))
//                             }
//                           />
//                           <p className="text-danger">{errors.Storage}</p>
//                         </Col>
//                         <Col md={3} sm={12}>
//                           <Form.Label> Other </Form.Label>
//                           <Select
//                             closeMenuOnSelect={false}
//                             components={animatedComponents}
//                             isMulti
//                             onChange={(selectedOptions) => {
//                               setFieldValue(
//                                 `Other`,
//                                 selectedOptions?.map((data) => data?.value)
//                               );
//                             }}
//                             options={
//                               !!getCustEnblProductsList?.list &&
//                               getCustEnblProductsList?.list
//                                 .filter((data) => ((data?.category === "Other") && (data?.stock)))
//                                 .map((data) => ({
//                                   value: data?.id,
//                                   label: data?.name,
//                                 }))
//                             }
//                           />
//                           <p className="text-danger">{errors.Other}</p>
//                         </Col>
//                       </Row>
//                     </>
//                   )} */}
//                   <Row className="mt-2">
//                     <Col md={12} sm={12} className="text-left ">
//                       <Button variant="success" type="submit">
//                         Add Product
//                       </Button>
//                     </Col>
//                   </Row>
//                 </Form>
//               )}
//             </Formik>
//           </Row>
//         ) : (
//           <AddProductImages />
//         )}
//         {/* {(getNewProductData || (localStorage.getItem("newProductapiStatus") == 1)) && <AddProductImages />} */}
//       </div>
//     </>
//   );
// }

// export default AddProduct;
