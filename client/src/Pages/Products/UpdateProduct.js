import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import * as yup from "yup";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProduct,
  getCategories,
  productsList,
  getProducts,
} from "../../reducers/commonReducer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Validation schema for Formik
const schema = yup.object().shape({
  name: yup.string().required("Product name is required"),
  price: yup
    .number()
    .required("Price is required")
    .min(0, "Price cannot be negative"),
});

function UpdateProduct(props) {
  const { pname, pdescription, psize, pprice, pcategories, pstatus, id } = props;
  const selectedCategoryIds = pcategories.map((item) => item.category);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { getCategoriesData } = useSelector((state) => state.commonReducer);

  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submit = async (values) => {
    for (const item of values.categories) {
      if (!item.category) {
        toast.error("Product must have a category");
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
        return;
      }
    }

    // Convert status back to a boolean before submitting
    const payload = {
      id,
      name: values.name || "",
      description: values.description || "",
      size: values.size || "",
      price: Number(values.price) || "",
      status: values.status === "true" ? true : values.status === "false" ? false : "",
      categories: values.categories.map((cat) => ({
        category: cat.category,
        weight: cat.weight.toString() || "",
        amountInOneCubicMeter: cat.quantity.toString() || "",
      })),
    };

    try {
      await dispatch(updateProduct(payload));
      dispatch(getProducts()); // Reload product list after update
      handleClose();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <i className="bi bi-pencil-square"></i>
      </Button>

      <Modal className="modal-xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{"Update Product"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            enableReinitialize
            validationSchema={schema}
            initialValues={{
              id,
              name: pname || "",
              description: pdescription || "",
              size: psize || "",
              price: pprice || "",
              status: pstatus ? (pstatus === true ? "true" : "false") : "", // Ensure proper boolean string conversion
              categories: pcategories.map((row) => ({
                ...row,
                category: row._id.id,
                weight: row.wtOrQty === 0 ? row.amountInOneCubicMeter : "",
                quantity: row.wtOrQty === 1 ? row.amountInOneCubicMeter : "",
              })),
            }}
            onSubmit={submit}
          >
            {({
              handleSubmit,
              handleChange,
              setFieldValue,
              values,
              errors,
            }) => {
              const selectedCategoryIds = values.categories.map(
                (item) => item.category
              );

              return (
                <Form noValidate onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Col md={2}>
                      <Form.Group>
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={values.name || ""}
                          onChange={handleChange}
                          isInvalid={!!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={2}>
                      <Form.Group>
                        <Form.Label>Size (Unit)</Form.Label>
                        <Form.Control
                          type="text"
                          name="size"
                          value={values.size || ""}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={2}>
                      <Form.Group>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="₹ 100"
                          name="price"
                          value={values.price || ""}
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
                    <Col md={2}>
                      <Form.Label>Status</Form.Label>
                      <Form.Control
                        as="select"
                        name="status"
                        value={values.status || ""}
                        onChange={handleChange}
                      >
                        <option value="">Select Status</option>
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                      </Form.Control>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Description"
                          name="description"
                          value={values.description || ""}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  {values.categories.map((row, index) => (
                    <Row className="mb-3" key={index}>
                      <Col md={5} sm={12}>
                        <Form.Group>
                          <Form.Label htmlFor={`categories[${index}].category`}>
                            Category
                          </Form.Label>
                          <Form.Control
                            as="select"
                            name={`categories[${index}].category`}
                            value={row.category || ""}
                            onChange={handleChange}
                          >
                            <option value="">Select Category</option>
                            {!!getCategoriesData?.list &&
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
                            name={`categories[${index}].weight`}
                            value={row.weight || ""}
                            onChange={(e) => {
                              handleChange(e);
                              setFieldValue(
                                `categories[${index}].quantity`,
                                ""
                              );
                            }}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={3} sm={12}>
                        <Form.Group>
                          <Form.Label>Quantity</Form.Label>
                          <Form.Control
                            type="number"
                            name={`categories[${index}].quantity`}
                            value={row.quantity || ""}
                            onChange={(e) => {
                              handleChange(e);
                              setFieldValue(`categories[${index}].weight`, "");
                            }}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={1} sm={12} className="d-flex align-items-center">
                        {index !== 0 && (
                          <Button
                            variant="danger"
                            onClick={() => {
                              const newCategories = [...values.categories];
                              newCategories.splice(index, 1);
                              setFieldValue("categories", newCategories);
                            }}
                          >
                            <i className="bi bi-trash"></i>
                          </Button>
                        )}
                        <Button
                          variant="primary"
                          onClick={() => {
                            setFieldValue("categories", [
                              ...values.categories,
                              {
                                id: "",
                                weight: "",
                                quantity: "",
                                category: "",
                              },
                            ]);
                          }}
                          style={{ marginLeft: "3.5px" }}
                        >
                          +
                        </Button>
                      </Col>
                    </Row>
                  ))}
                  <Row className="mt-2">
                    <Col md={12} className="text-left">
                      <Button variant="success" type="submit">
                        Update Product
                      </Button>
                    </Col>
                  </Row>
                </Form>
              );
            }}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UpdateProduct;


// import React, { useState } from "react";
// import { Form, Row, Col } from "react-bootstrap";
// import Button from "react-bootstrap/Button";
// import { FieldArray, Formik } from "formik";
// import * as yup from "yup";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { useDispatch, useSelector } from "react-redux";
// import Modal from "react-bootstrap/Modal";
// import {
//   productsList,
//   resetProductList,
//   updateProduct,
// } from "../../reducers/commonReducer";
// import Select from "react-select";
// import makeAnimated from "react-select/animated";

// const schema = yup.object().shape({
//   name: yup.string().required(),
//   slug: yup.string().required(),
//   sku: yup.string().required(),
//   weight: yup.string().required(),
//   description: yup.string(),
//   brand: yup.string().required(),
//   mrp: yup.string().required(),
//   sale: yup.number(),
//   minqty: yup.string().required(),
//   maxqty: yup.string().required(),
//   quantity: yup.string().required(),
//   price: yup.array().of(
//     yup.object().shape({
//       id: yup.string(),
//       value: yup.string(),
//     })
//   ),
//   backordering: yup.string().required(),
//   categories: yup.array().min(1),
//   tax_class: yup.string().required(),
//   attributes: yup.array().of(
//     yup.object().shape({
//       id: yup.string(),
//       value: yup.string(),
//     })
//   ),
//   productType: yup.string().required("Product type is required"),
//   Processor: yup.array().when("productType", {
//     is: "customize",
//     then: yup.array().min(1),
//   }),
//   Ram: yup.array().when("productType", {
//     is: "customize",
//     then: yup.array().min(1),
//   }),
//   Storage: yup.array().when("productType", {
//     is: "customize",
//     then: yup.array().min(1),
//   }),
//   Other: yup.array(),
//   metaTitle: yup.string(),
//   metaDescription: yup.string(),
//   metaTags: yup.string(),
//   metaSchema: yup.string(),
//   productOptions: yup.array().of(
//     yup.object().shape({
//       name: yup.string(),
//       slug: yup.string(),
//       description: yup.string(),
//       sku: yup.string(),
//       type: yup.string(),
//       priceMrp: yup.string(),
//       salesprice: yup.string(),
//       notCombine: yup.string(),
//       status: yup.string(),
//     })
//   ),
//   warranty_procedure: yup.string(),
//   warranty: yup.string(),
//   hotSelling: yup.string(),
//   instock: yup.bool().required(),
//   status: yup.bool().required(),
//   orderby: yup.string().required(),
//   minStockQty: yup.number().required(),
//   reward: yup.number().required(),
//   rewardStatus: yup.bool().required(),
// });
// const animatedComponents = makeAnimated();
// function UpdateProduct(props) {
//   const {
//     minStock,
//     categoriesSearchList,
//     pname,
//     pslug,
//     psku,
//     warrantyProcedure,
//     pwarranty,
//     pweight,
//     porderby,
//     pdescription,
//     pmrp,
//     psale,
//     pminqty,
//     pmaxqty,
//     pquantity,
//     pprice,
//     pcategories,
//     psubCategories,
//     pbrand,
//     ptax_class,
//     pattributes,
//     pmetaTitle,
//     pmetaTags,
//     pmetaSchema,
//     pmetaDescription,
//     pbackordering,
//     pproductType,
//     id,
//     pproductOptions,
//     photSelling,
//     pinstock,
//     pstatus,
//     minStockQty,
//     alias,
//     reward,
//     rewardStatus
//   } = props;
//   const dispatch = useDispatch();
//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => {
//     setShow(true);
//     dispatch(
//       // getChildCategoriesFrontEnd({
//       //   parent: !!pcategories && pcategories.map((data) => data.id),
//       // })
//     );
//   };
//   const { getAttributesData, getTaxgstsData, getCustEnblProductsList } =
//     useSelector((state) => state.commonReducer);
//   // const {
//   //   // getCatsFrontEndData,
//   //   getBrandsFrontendData,
//   //   childCategoriesFrontEndData,
//   // } = useSelector((state) => state.frontEndReducer);

//   return (
//     <>
//       <Button variant="primary" onClick={handleShow}>
//         <i className="bi bi-pencil-square"></i>
//       </Button>
//       <Modal
//         className="modal-xl"
//         // className="full-width-popup"
//         show={show}
//         onHide={handleClose}
//         // fullscreen={true}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>{"Update Product"}</Modal.Title>
//         </Modal.Header>
//         <Row className="mb-3 products-design popup-spacing">
//           <Formik
//             enableReinitialize={true}
//             validationSchema={schema}
//             initialValues={{
//               id,
//               name: pname,
//               slug: pslug,
//               sku: psku,
//               weight: pweight,
//               orderby: porderby,
//               description: pdescription,
//               brand: pbrand?.id,
//               mrp: pmrp,
//               sale: psale ? psale : 0,
//               minqty: pminqty,
//               maxqty: pmaxqty,
//               quantity: pquantity,
//               price: (!!pprice && Object.keys(pprice)?.length > 0)
//                 ? Object.entries(pprice).map(([key, value]) => ({
//                     id: key,
//                     value: value,
//                   }))
//                 : [{ id: "", value: "" }],
//               backordering: pbackordering,
//               categories: !!pcategories && pcategories.map((data) => data.id),
//               subcategories:
//                 !!psubCategories && psubCategories.map((data) => data),
//               tax_class: ptax_class?.id,
//               attributes:
//                 pattributes?.length > 0
//                   ? pattributes.map((userclass) => ({
//                       id: userclass?.id ? userclass?.id : userclass?._id,
//                       value: userclass?.value,
//                     }))
//                   : [{ id: "", value: "" }],
//               productType: pproductType,
//               metaTitle: pmetaTitle,
//               alias : alias,
//               reward,
//               rewardStatus,
//               metaDescription: pmetaDescription,
//               metaTags: pmetaTags,
//               metaSchema: pmetaSchema,
//               Processor:
//                 !!pproductOptions &&
//                 pproductOptions?.processer?.map((data) => data),
//               Ram:
//                 !!pproductOptions && pproductOptions?.ram?.map((data) => data),
//               Storage:
//                 !!pproductOptions &&
//                 pproductOptions?.storage?.map((data) => data),
//               Other:
//                 !!pproductOptions &&
//                 pproductOptions?.other?.map((data) => data),
//               warranty_procedure: warrantyProcedure,
//               warranty: pwarranty,
//               hotSelling: photSelling,
//               instock: pinstock,
//               status: pstatus,
//               minStockQty
//             }}
//             onSubmit={async (values) => {
//               await dispatch(updateProduct(values));
//               await dispatch(resetProductList());
//               await dispatch(productsList({categories: (categoriesSearchList?.length > 0 ? [categoriesSearchList] : categoriesSearchList), minStock} ));
//               handleClose();
//             }}
//           >
//             {({
//               handleSubmit,
//               handleChange,
//               values,
//               setFieldValue,
//               errors,
//             }) => (
//               <Form onSubmit={handleSubmit}>
//                 <Row className="mb-3">
//                   <Col md={3} sm={12}>
//                     <Form.Group>
//                       <Form.Label>Product Name</Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder=""
//                         name="name"
//                         className="form-control bg"
//                         value={values.name}
//                         onChange={handleChange}
//                         isInvalid={!!errors.name}
//                       />

//                       <Form.Control.Feedback type="invalid">
//                         {errors.name}
//                       </Form.Control.Feedback>
//                     </Form.Group>
//                   </Col>
//                   <Col md={3} sm={12}>
//                     <Form.Group>
//                       <Form.Label>Slug</Form.Label>
//                       <Form.Control
//                         type="text"
//                         name="slug"
//                         className="form-control bg"
//                         value={
//                           values.slug
//                           // (values.slug = values.name
//                           //   .toLowerCase()
//                           //   .replace(/ /g, "-")
//                           //   .replace(/[^\w-]+/g, ""))
//                         }
//                         readOnly
//                         isInvalid={!!errors.slug}
//                       />
//                       <Form.Control.Feedback type="invalid">
//                         {errors.slug}
//                       </Form.Control.Feedback>
//                     </Form.Group>
//                   </Col>

//                   <Col md={2} sm={12}>
//                     <Form.Group>
//                       <Form.Label>SKU</Form.Label>
//                       <Form.Control
//                         type="text"
//                         name="sku"
//                         className="form-control bg"
//                         value={values.sku}
//                         onChange={handleChange}
//                         isInvalid={!!errors.sku}
//                       />
//                       <Form.Control.Feedback type="invalid">
//                         {errors.sku}
//                       </Form.Control.Feedback>
//                     </Form.Group>
//                   </Col>

//                   <Col md={2} sm={12}>
//                     <Form.Group>
//                       <Form.Label>Weight</Form.Label>
//                       <Form.Control
//                         type="number"
//                         placeholder="In Grams"
//                         name="weight"
//                         className="form-control bg"
//                         value={values.weight}
//                         onChange={handleChange}
//                         isInvalid={!!errors.weight}
//                       />
//                       <Form.Control.Feedback type="invalid">
//                         {errors.weight}
//                       </Form.Control.Feedback>
//                     </Form.Group>
//                   </Col>
//                   <Col md={2} sm={12}>
//                     <Form.Group>
//                       <Form.Label>OrderBy</Form.Label>
//                       <Form.Control
//                         type="number"
//                         placeholder="Enter OrderBy"
//                         name="orderby"
//                         className="form-control bg"
//                         value={values.orderby}
//                         onChange={handleChange}
//                         isInvalid={!!errors.orderby}
//                       />
//                       <Form.Control.Feedback type="invalid">
//                         {errors.orderby}
//                       </Form.Control.Feedback>
//                     </Form.Group>
//                   </Col>
//                 </Row>
//                 <Row className="mb-3">
//                   <Col md={12} sm={12}>
//                     <CKEditor
//                       editor={ClassicEditor}
//                       data={
//                         pdescription
//                           ? pdescription
//                           : "Enter Your Product Description......"
//                       }
//                       onReady={(editor) => {
//                         console.log("Editor is ready to use!", editor);
//                       }}
//                       onChange={(event, editor) => {
//                         const data = editor.getData();
//                         setFieldValue("description", data);
//                         console.log({ event, editor, data });
//                       }}
//                       onBlur={(event, editor) => {
//                         console.log("Blur.", editor);
//                       }}
//                       onFocus={(event, editor) => {
//                         console.log("Focus.", editor);
//                       }}
//                     />
//                   </Col>
//                 </Row>
//                 <Row className="mb-3">
//                   <Col md={6} sm={12}>
//                     <Row>
//                       <Col md={3} sm={12}>
//                         <Form.Group>
//                           <Form.Label>MRP</Form.Label>
//                           <Form.Control
//                             type="number"
//                             placeholder="₹ 100"
//                             name="mrp"
//                             className="form-control bg"
//                             value={values.mrp}
//                             onChange={handleChange}
//                             isInvalid={!!errors.mrp}
//                           />
//                           <Form.Control.Feedback type="invalid">
//                             {errors.mrp}
//                           </Form.Control.Feedback>
//                         </Form.Group>
//                       </Col>
//                       <Col md={3} sm={12}>
//                         <Form.Group>
//                           <Form.Label>Sale Price</Form.Label>
//                           <Form.Control
//                             type="number"
//                             placeholder="₹ 80"
//                             name="sale"
//                             className="form-control bg"
//                             value={values.sale}
//                             onChange={handleChange}
//                             isInvalid={!!errors.sale}
//                           />
//                           <Form.Control.Feedback type="invalid">
//                             {errors.sale}
//                           </Form.Control.Feedback>
//                         </Form.Group>
//                       </Col>
//                       <Col md={3} sm={12}>
//                         <Form.Group>
//                           <Form.Label>Min Qty Order</Form.Label>
//                           <Form.Control
//                             type="number"
//                             name="minqty"
//                             className="form-control bg"
//                             value={values.minqty}
//                             onChange={handleChange}
//                             isInvalid={!!errors.minqty}
//                           />
//                           <Form.Control.Feedback type="invalid">
//                             {errors.minqty}
//                           </Form.Control.Feedback>
//                         </Form.Group>
//                       </Col>
//                       <Col md={3} sm={12}>
//                         <Form.Group>
//                           <Form.Label>Max Qty Order</Form.Label>
//                           <Form.Control
//                             type="number"
//                             name="maxqty"
//                             className="form-control bg"
//                             value={values.maxqty}
//                             onChange={handleChange}
//                             isInvalid={!!errors.maxqty}
//                           />
//                           <Form.Control.Feedback type="invalid">
//                             {errors.maxqty}
//                           </Form.Control.Feedback>
//                         </Form.Group>
//                       </Col>
//                     </Row>
//                   </Col>
//                   <Col md={6} sm={12}>
//                     <Row>
//                       <Col md={3} sm={12}>
//                         <Form.Group>
//                           <Form.Label>Total Availablity</Form.Label>
//                           <Form.Control
//                             type="number"
//                             name="quantity"
//                             className="form-control bg"
//                             value={values.quantity}
//                             onChange={handleChange}
//                             isInvalid={!!errors.quantity}
//                           />
//                           <Form.Control.Feedback type="invalid">
//                             {errors.quantity}
//                           </Form.Control.Feedback>
//                         </Form.Group>
//                       </Col>
//                       <Col md={9} sm={12}>
//                       {values.productType !== "customize" &&
//                         <Row>
//                           <FieldArray name="price">
//                             {({ remove, push }) => (
//                               <>
//                                 {!!values.price &&
//                                   values.price.map((data, index) => {
//                                     return (
//                                       <React.Fragment key={index}>
//                                         <Col md={4} sm={12}>
//                                           <Form.Group>
//                                             <Form.Label>Quantity</Form.Label>
//                                             <Form.Control
//                                               type="text"
//                                               value={data?.id}
//                                               placeholder="₹"
//                                               onChange={handleChange}
//                                               name={`price.${index}.id`}
//                                               className="form-control bg"
//                                               isInvalid={!!errors.price}
//                                             />
//                                           </Form.Group>
//                                         </Col>
//                                         <Col md={4} sm={12}>
//                                           <Form.Group>
//                                             <Form.Label>
//                                               Quantity Price
//                                             </Form.Label>
//                                             <Form.Control
//                                               type="text"
//                                               value={data?.value}
//                                               placeholder="₹"
//                                               onChange={handleChange}
//                                               name={`price.${index}.value`}
//                                               className="form-control bg"
//                                               isInvalid={!!errors.price}
//                                             />
//                                           </Form.Group>
//                                         </Col>
//                                         <Col md={2} sm={12} className="mt-4">
//                                           <Button
//                                             variant="danger"
//                                             onClick={() => remove(index)}
//                                           >
//                                             <i className="bi bi-trash3-fill"></i>
//                                           </Button>
//                                         </Col>
//                                         <Col md={2} sm={12} className="mt-4">
//                                           <Button
//                                             variant="success"
//                                             onClick={() =>
//                                               push({ id: "", value: "" })
//                                             }
//                                           >
//                                             <i className="bi bi-plus-lg"></i>
//                                           </Button>
//                                         </Col>
//                                       </React.Fragment>
//                                     );
//                                   })}
//                               </>
//                             )}
//                           </FieldArray>
//                         </Row>}
//                       </Col>
//                     </Row>
//                   </Col>
//                 </Row>
//                 <Row className="mt-3">
//                   <Col md={8} sm={12}>
//                     <Row>
//                       <Col md={4} sm={12}>
//                         <Form.Label> Category </Form.Label>
//                         <Select
//                           closeMenuOnSelect={false}
//                           components={animatedComponents}
//                           isMulti
//                           onChange={(selectedOptions) => {
//                             setFieldValue(
//                               `categories`,
//                               selectedOptions?.map((data) => data?.value)
//                             );
//                             dispatch(
//                             ({
//                                 parent: selectedOptions?.map(
//                                   (data) => data?.value
//                                 ),
//                               })
//                             );
//                           }}
//                           options={
//                             !!getCatsFrontEndData &&
//                             getCatsFrontEndData.map((data) => {
//                               return {
//                                 value: data?.id,
//                                 label: data?.name,
//                               };
//                             })
//                           }
//                           defaultValue={
//                             !!getCatsFrontEndData &&
//                             getCatsFrontEndData.map((data) => {
//                               if (values.categories.indexOf(data?.id) != -1) {
//                                 return {
//                                   value: data?.id,
//                                   label: data?.name,
//                                 };
//                               }
//                             })
//                           }
//                         />
//                       </Col>

//                       {!!childCategoriesFrontEndData &&
//                         childCategoriesFrontEndData?.length > 0 && (
//                           <Col md={4} sm={12}>
//                             <Form.Label> SubCategory </Form.Label>
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
//                               defaultValue={
//                                 !!childCategoriesFrontEndData &&
//                                 childCategoriesFrontEndData.map((data) => {
//                                   if (
//                                     values.subcategories.indexOf(data?.id) != -1
//                                   ) {
//                                     return {
//                                       value: data?.id,
//                                       label: data?.name,
//                                     };
//                                   }
//                                 })
//                               }
//                             />
//                           </Col>
//                         )}
//                       <Col md={2} sm={12}>
//                         <Form.Label>Brands</Form.Label>
//                         <Form.Control
//                           as="select"
//                           onChange={handleChange}
//                           name="brand"
//                           className="form-control bg"
//                           value={values.brand}
//                           isInvalid={!!errors.brand}
//                         >
//                           <option value="">Select Brands</option>
//                           {!!getBrandsFrontendData?.list &&
//                             getBrandsFrontendData?.list.map((data, index) => {
//                               return (
//                                 <option value={data?.id} key={index}>
//                                   {data?.name}
//                                 </option>
//                               );
//                             })}
//                         </Form.Control>
//                       </Col>
//                       <Col md={2} sm={12}>
//                         <Form.Label> Tax - Class </Form.Label>
//                         <Form.Control
//                           as="select"
//                           onChange={async (e) => {
//                             setFieldValue("tax_class", e.target.value);
//                           }}
//                           name="tax_class"
//                           className="form-control bg"
//                           value={values.tax_class}
//                           isInvalid={!!errors.tax_class}
//                         >
//                           <option value="">Select Tax-Class</option>
//                           {!!getTaxgstsData?.list &&
//                             getTaxgstsData.list.map((data, index) => {
//                               return (
//                                 <option value={data?.id} key={index}>
//                                   {data?.name}
//                                 </option>
//                               );
//                             })}
//                         </Form.Control>
//                       </Col>
//                     </Row>
//                   </Col>
//                   <Col md={4} sm={12}>
//                     <Row>
//                       <FieldArray name="attributes">
//                         {({ insert, remove, push }) => (
//                           <>
//                             {!!values.attributes &&
//                               values.attributes.map((data, index) => {
//                                 return (
//                                   <React.Fragment key={index}>
//                                     <Col md={4} sm={12}>
//                                       <Form.Label>Attribute</Form.Label>
//                                       <Form.Control
//                                         as="select"
//                                         onChange={handleChange}
//                                         className="form-control bg"
//                                         name={`attributes.${index}.id`}
//                                         value={values.attributes[index].id}
//                                         isInvalid={!!errors.attributes}
//                                       >
//                                         <option value="">
//                                           Select Attribute
//                                         </option>
//                                         {!!getAttributesData?.list &&
//                                           getAttributesData.list.map(
//                                             (data, index) => {
//                                               return (
//                                                 <option
//                                                   value={data?.id}
//                                                   key={index}
//                                                 >
//                                                   {data?.name}
//                                                 </option>
//                                               );
//                                             }
//                                           )}
//                                       </Form.Control>
//                                     </Col>
//                                     <Col md={4} sm={12}>
//                                       <Form.Group>
//                                         <Form.Label>Attribute Value</Form.Label>
//                                         <Form.Control
//                                           type="text"
//                                           onChange={handleChange}
//                                           value={data?.value}
//                                           name={`attributes.${index}.value`}
//                                           className="form-control bg"
//                                           isInvalid={!!errors.attributes}
//                                         />
//                                       </Form.Group>
//                                     </Col>
//                                     <Col md={2} sm={12} className="mt-4">
//                                       <Button
//                                         variant="danger"
//                                         onClick={() => remove(index)}
//                                       >
//                                         <i className="bi bi-trash3-fill"></i>
//                                       </Button>
//                                     </Col>
//                                     <Col md={2} sm={12} className="mt-4">
//                                       <Button
//                                         variant="success"
//                                         onClick={() =>
//                                           push({ id: "", value: "" })
//                                         }
//                                       >
//                                         <i className="bi bi-plus-lg"></i>
//                                       </Button>
//                                     </Col>
//                                   </React.Fragment>
//                                 );
//                               })}
//                           </>
//                         )}
//                       </FieldArray>
//                     </Row>
//                   </Col>
//                 </Row>
//                 <Row className="mt-3">
//                   <Col md={8} sm={12}>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Warranty Procedure</Form.Label>
//                       <Form.Control
//                         className="form-control bg"
//                         as="textarea"
//                         name="warranty_procedure"
//                         onChange={async (e) => {
//                           setFieldValue("warranty_procedure", e.target.value);
//                         }}
//                         rows={3}
//                         value={values?.warranty_procedure}
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={2} sm={12} className=" ">
//                     <Form.Group>
//                       <Form.Label>Warranty Years</Form.Label>
//                       <Form.Control
//                         type="text"
//                         name="warranty"
//                         className="form-control bg"
//                         value={values.warranty}
//                         onChange={handleChange}
//                         isInvalid={!!errors.warranty}
//                       />
//                       <Form.Control.Feedback type="invalid">
//                         {errors.warranty}
//                       </Form.Control.Feedback>
//                     </Form.Group>
//                   </Col>
//                   <Col md={2} sm={12}>
//                     <Form.Label> Hot Selling </Form.Label>
//                     <Form.Control
//                       as="select"
//                       onChange={async (e) => {
//                         setFieldValue("hotSelling", (/true/).test(e.target.value))
//                       }}
//                       name="hotSelling"
//                       className="form-control bg"
//                       value={values.hotSelling}
//                       isInvalid={!!errors.hotSelling}
//                     >
//                       <option value="">HotSelling Status</option>
//                       <option value={true}>Active</option>
//                       <option value={false}>Inactive</option>
//                     </Form.Control>
//                   </Col>
//                 </Row>
//                 <Row className="mt-3">
//                   <Col md={2} sm={12} className=" ">
//                     <Form.Group>
//                       <Form.Label>ALIAS</Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder=""
//                         name="alias"
//                         className="form-control bg"
//                         value={values.alias}
//                         onChange={handleChange}
//                         isInvalid={!!errors.alias}
//                       />

//                       <Form.Control.Feedback type="invalid">
//                         {errors.alias}
//                       </Form.Control.Feedback>
//                     </Form.Group>
//                   </Col>
//                   <Col md={2} sm={12} className=" ">
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
//                   <Col md={3} sm={12}>
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
//                   <Col md={2} sm={12} className="d-none">
//                     <Form.Group>
//                       <Form.Label>Meta Title</Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder=""
//                         name="metaTitle"
//                         className="form-control bg"
//                         value={values.metaTitle}
//                         onChange={handleChange}
//                         isInvalid={!!errors.metaTitle}
//                       />

//                       <Form.Control.Feedback type="invalid">
//                         {errors.metaTitle}
//                       </Form.Control.Feedback>
//                     </Form.Group>
//                   </Col>
//                   <Col md={2} sm={12} className="d-none">
//                     <Form.Group>
//                       <Form.Label>Meta Tags</Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder=""
//                         name="metaTags"
//                         className="form-control bg"
//                         value={values.metaTags}
//                         onChange={handleChange}
//                         isInvalid={!!errors.metaTags}
//                       />

//                       <Form.Control.Feedback type="invalid">
//                         {errors.metaTags}
//                       </Form.Control.Feedback>
//                     </Form.Group>
//                   </Col>
//                   <Col md={3} sm={12} className="d-none">
//                     <Form.Group className="mb-3">
//                       <Form.Label>Meta Schema</Form.Label>
//                       <Form.Control
//                         as="textarea"
//                         name="metaSchema"
//                         value={values.metaSchema}
//                         onChange={handleChange}
//                         rows={2}
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={3} sm={12} className="d-none">
//                     <Form.Group className="mb-3">
//                       <Form.Label>Meta Discription</Form.Label>
//                       <Form.Control
//                         as="textarea"
//                         name="metaDescription"
//                         value={values.metaDescription}
//                         onChange={handleChange}
//                         rows={2}
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>
//                 <Row className="mt-3 mb-3">
//                   <Col md={3} sm={12}>
//                     <Form.Label> InStock </Form.Label>
//                     <Form.Control
//                       as="select"
//                       onChange={async (e) => {
//                         setFieldValue("instock", (/true/).test(e.target.value));
//                       }}
//                       name="instock"
//                       className="form-control bg"
//                       value={values.instock}
//                       isInvalid={!!errors.instock}
//                     >
//                       <option value="">Please Select Stock</option>
//                       <option value={true}>InStock</option>
//                       <option value={false}>Out of Stock</option>
//                     </Form.Control>
//                   </Col>
//                   <Col md={3} sm={12}>
//                     <Form.Label> Product Status </Form.Label>
//                     <Form.Control
//                       as="select"
//                       onChange={async (e) => {
//                         setFieldValue("status", e.target.value);
//                       }}
//                       name="status"
//                       className="form-control bg"
//                       value={values.status}
//                       isInvalid={!!errors.status}
//                     >
//                       <option value="">Select Status</option>
//                       <option value={true}>True</option>
//                       <option value={false}>False</option>
//                     </Form.Control>
//                   </Col>
//                   <Col md={3} sm={12}>
//                     <Form.Label> Product Type </Form.Label>
//                     <Form.Control
//                       as="select"
//                       onChange={async (e) => {
//                         setFieldValue("productType", e.target.value);
//                       }}
//                       name="productType"
//                       className="form-control bg"
//                       value={values.productType}
//                       isInvalid={!!errors.productType}
//                     >
//                       <option value="">Product Type</option>
//                       <option value={"normal"}>Normal</option>
//                       <option value={"customize"}>Customize</option>
//                     </Form.Control>
//                   </Col>
//                   <Col md={3} sm={12}>
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
//                         </Col>
//                 </Row>
//                 {values.productType == "customize" && (
//                   <>
//                     <h3>
//                       <b>Update SubProducts</b>
//                     </h3>
//                     <hr className="section-divider" />
//                     <Row>
//                       <Col md={3} sm={12}>
//                         <Form.Label> Processor </Form.Label>
//                         <Select
//                           closeMenuOnSelect={false}
//                           components={animatedComponents}
//                           defaultValue={
//                             !!getCustEnblProductsList?.list &&
//                             getCustEnblProductsList?.list.map((data) => {
//                               if (values.Processor.indexOf(data?.id) != -1) {
//                                 return {
//                                   value: data?.id,
//                                   label: data?.name,
//                                 };
//                               }
//                             })
//                           }
//                           isMulti
//                           onChange={(selectedOptions) => {
//                             setFieldValue(
//                               `Processor`,
//                               selectedOptions?.map((data) => data?.value)
//                             );
//                           }}
//                           options={
//                             !!getCustEnblProductsList?.list &&
//                             getCustEnblProductsList?.list
//                               .filter((data) => ((data?.category === "Processor") && (data?.stock)))
//                               .map((data) => ({
//                                 value: data?.id,
//                                 label: data?.name,
//                               }))
//                           }
//                         />
//                         <p className="text-danger">{errors.Processor}</p>
//                       </Col>
//                       <Col md={3} sm={12}>
//                         <Form.Label> Ram </Form.Label>
//                         <Select
//                           closeMenuOnSelect={false}
//                           components={animatedComponents}
//                           isMulti
//                           onChange={(selectedOptions) => {
//                             setFieldValue(
//                               `Ram`,
//                               selectedOptions?.map((data) => data?.value)
//                             );
//                           }}
//                           defaultValue={
//                             !!getCustEnblProductsList?.list &&
//                             getCustEnblProductsList?.list.map((data) => {
//                               if (values.Ram.indexOf(data?.id) != -1) {
//                                 return {
//                                   value: data?.id,
//                                   label: data?.name,
//                                 };
//                               }
//                             })
//                           }
//                           options={
//                             !!getCustEnblProductsList?.list &&
//                             getCustEnblProductsList?.list
//                               .filter((data) => ((data?.category === "Ram") && (data?.stock)))
//                               .map((data) => ({
//                                 value: data?.id,
//                                 label: data?.name,
//                               }))
//                           }
//                         />
//                         <p className="text-danger">{errors.Ram}</p>
//                       </Col>
//                       <Col md={3} sm={12}>
//                         <Form.Label> Storage </Form.Label>
//                         <Select
//                           closeMenuOnSelect={false}
//                           components={animatedComponents}
//                           isMulti
//                           onChange={(selectedOptions) => {
//                             setFieldValue(
//                               `Storage`,
//                               selectedOptions?.map((data) => data?.value)
//                             );
//                           }}
//                           defaultValue={
//                             !!getCustEnblProductsList?.list &&
//                             getCustEnblProductsList?.list.map((data) => {
//                               if (values.Storage.indexOf(data?.id) != -1) {
//                                 return {
//                                   value: data?.id,
//                                   label: data?.name,
//                                 };
//                               }
//                             })
//                           }
//                           options={
//                             !!getCustEnblProductsList?.list &&
//                             getCustEnblProductsList?.list
//                               .filter((data) => ((data?.category === "Storage") && (data?.stock)))
//                               .map((data) => ({
//                                 value: data?.id,
//                                 label: data?.name,
//                               }))
//                           }
//                         />
//                         <p className="text-danger">{errors.Storage}</p>
//                       </Col>
//                       <Col md={3} sm={12}>
//                         <Form.Label> Other </Form.Label>
//                         <Select
//                           closeMenuOnSelect={false}
//                           components={animatedComponents}
//                           isMulti
//                           defaultValue={
//                             !!getCustEnblProductsList?.list &&
//                             getCustEnblProductsList?.list.map((data) => {
//                               if (values.Other.indexOf(data?.id) != -1) {
//                                 return {
//                                   value: data?.id,
//                                   label: data?.name,
//                                 };
//                               }
//                             })
//                           }
//                           onChange={(selectedOptions) => {
//                             setFieldValue(
//                               `Other`,
//                               selectedOptions?.map((data) => data?.value)
//                             );
//                           }}
//                           options={
//                             !!getCustEnblProductsList?.list &&
//                             getCustEnblProductsList?.list
//                               .filter((data) => ((data?.category === "Other") && (data?.stock)))
//                               .map((data) => ({
//                                 value: data?.id,
//                                 label: data?.name,
//                               }))
//                           }
//                         />
//                         <p className="text-danger">{errors.Other}</p>
//                       </Col>
//                     </Row>
//                   </>
//                 )}
//                 <Row className="mt-2">
//                   <Col md={12} sm={12} className="text-left ">
//                     <Button variant="success" type="submit">
//                       Update Product
//                     </Button>
//                     <Button variant="danger" onClick={handleClose}>
//                       Close
//                     </Button>
//                   </Col>
//                 </Row>
//               </Form>
//             )}
//           </Formik>
//         </Row>
//       </Modal>
//     </>
//   );
// }

// export default UpdateProduct;
