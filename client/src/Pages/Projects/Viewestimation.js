import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Modal, Table } from "react-bootstrap";
import { Formik } from "formik";
import { useDispatch } from 'react-redux';
import { getCategories, addUpdateestimation } from "../../reducers/commonReducer";

const ViewEstimation = ({ name, totalEstimationPrice, estimationReport }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const queryParameters = new URLSearchParams(window.location.search);
  const categId = queryParameters.get("catId");

  useEffect(() => {
    dispatch(getCategories({ parent: categId || undefined }));
  }, [categId, dispatch]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (values, { resetForm }) => {
    await dispatch(addUpdateestimation(values));
    handleClose();
    resetForm();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        View
      </Button>

      <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>View Estimation</Modal.Title>
        </Modal.Header>
        <Modal.Body className="custom-modal">
          <Formik
            onSubmit={handleSubmit}
            initialValues={{
              name: name || '',
              totalEstimationPrice: totalEstimationPrice || '',
              estimationReport: estimationReport || [],
            }}
          >
            {({ handleSubmit, handleChange, values }) => (
              <Form className="container" onSubmit={handleSubmit}>
                <Row className="mb-4">
                  <Col xs={12}>
                    <Form.Group>
                      <div style={{ fontWeight: 'bold', fontSize: '1.25rem', color: "#121212" }}>
                        Name:
                        <p style={{ fontWeight: 'bold', fontSize: '1.25rem', color: "#757575" }}>
                          {values.name}
                        </p>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                {values.estimationReport.map((est, estIndex) => (
                  <div key={estIndex} style={{ border: '3px solid #757575', borderRadius: '5px', padding: '15px', margin: '15px' }}>
                    <Row className="mb-3">
                      <Col xs={12}>
                        <Form.Group>
                          <div style={{ fontWeight: 'bold', fontSize: '1.25rem', color: "#121212" }}>
                            {est.product}
                          </div>
                        </Form.Group>
                      </Col>
                    </Row>

                    <div className="table-responsive">
                      <Table className="mb-4 table-border">
                        <thead>
                          <tr style={{ fontSize: '0.75rem' }}>
                            <th className="col-0.5">Sr.No</th>
                            <th className="col-2">Estimation No</th>
                            <th className="col-4">Description</th>
                            <th className="col-2">Location 1</th>
                            <th className="col-2">Location 2</th>
                            <th className="over-col-size">Qty</th>
                            <th className="over-col-size">Cost</th>
                          </tr>
                        </thead>
                        <tbody>
                          {est.amount.map((item, index) => (
                            <tr key={`${estIndex}-${index}`}>
                              <td style={{ fontSize: '0.75rem' }}>{index + 1}</td>
                              <td>{item.estimationNo}</td>
                              <td>{item.description}</td>
                              <td>{item.location1}</td>
                              <td>{item.location2}</td>
                              <td>{item.quantity.toFixed(2)}</td>
                              <td>{item.totalCost.toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colSpan="5" style={{ textAlign: 'right', fontWeight: 'bold' }}>Total:</td>
                            <td style={{ fontWeight: 'bold' }}>{est.totalQty.toFixed(2)}</td>
                            <td style={{ fontWeight: 'bold' }}>{est.totalCost.toFixed(2)}</td>
                          </tr>
                        </tfoot>
                      </Table>
                    </div>
                  </div>
                ))}
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ViewEstimation;










// import React, { useState, useEffect } from "react";
// import { Form, Row, Col, Button, Modal, Table } from "react-bootstrap";
// import { Formik } from "formik";
// import { useDispatch, useSelector } from 'react-redux';
// import { getCategories, addUpdateestimation, resetProductList, productsList, productsListExport } from "../../reducers/commonReducer";

// const Viewestimation = ({ name, estimation, totalEstimationPrice, estimationReport }) => {


//   const [show, setShow] = useState(false);
//   const dispatch = useDispatch();
//   const queryParameters = new URLSearchParams(window.location.search);
//   const categId = queryParameters.get("catId");

//   useEffect(() => {
//     if (categId) {
//       dispatch(getCategories({ parent: categId }));
//     } else {
//       dispatch(getCategories());
//     }
//   }, [categId, dispatch]);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const handleSubmit = async (values, { resetForm }) => {
//     dispatch(addUpdateestimation(values));
//     handleClose();
//     resetForm();
//   };
//   return (
//     <>
//       <Button variant="primary" onClick={handleShow}>
//         View
//       </Button>

//       <Modal
//         show={show}
//         onHide={handleClose}
//         dialogClassName="custom-modal"
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>View Estimation</Modal.Title>
//         </Modal.Header>
//         <Modal.Body className="custom-modal">
//           <Formik
//             onSubmit={handleSubmit}
//             initialValues={{
//               name: name || '',
//               estimationReport: estimationReport?.map(est2 => ({

//                 p: est2.product,
//               })),

//               totalEstimationPrice: totalEstimationPrice || '',
//               estimation: estimation?.map(est => ({
//                 estimationNo: est.estimationNo || '',
//                 categories: est.category?.name || '',
//                 codeNo: est.category?.codeNo || '',
//                 description: est.description || '',
//                 subestimationPrice: est.subestimationPrice || '',
//                 amount: est.amount.map(item => ({
//                   productName: item.product || '',
//                   priceOfOneCubicMeter: item.priceOfOneCubicMeter || 0,
//                   quantityInOneCubicMeter: item.quantityInOneCubicMeter || 0,
//                   totalCost: item.totalCost || 0,
//                   quantity: item.quantity || 0,
//                 })),

//               })) || [],
//             }}

//           >
//             {({ handleSubmit, handleChange, values, setFieldValue }) => (
//               <Form className="container" onSubmit={handleSubmit}>
//                 <Col md={12}>
//                   <Form.Group>
//                     <Form.Label >Name</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="name"
//                       style={{ fontSize: '0.75rem' }}
//                       value={values.name}
//                       onChange={handleChange}
//                     />
//                   </Form.Group>
//                 </Col>
//                 {/* estimationReport: estimationReport?.map(est2 => ({ */}
//                 {values.estimationReport.map((est2, estIndex) => (
//                   <div key={estIndex} style={{ border: '3px solid #757575', borderRadius: '5px', padding: '15px', margin: '15px' }}>
//                     <Row className="mb-3">
//                       {/* <Col md={1}>
//                         <Form.Group>
//                           <Form.Label>S.No</Form.Label>
//                           <Form.Control type="text" style={{ fontSize: '0.75rem' }} value={estIndex + 1} readOnly />
//                         </Form.Group>
//                       </Col> */}
//                       {/* <Col md={2} sm={12}>
//                         <Form.Group>
//                           <Form.Label>Estimation No</Form.Label>
//                           <Form.Control
//                             type="text"
//                             name='estimationNo'
//                             style={{ fontSize: '0.75rem' }}
//                             className="form-control bg"
//                             value={est.estimationNo}
//                             onChange={handleChange}
//                           />
//                         </Form.Group>
//                       </Col> */}
//                       <Col md={12} sm={12}>
//                         <Form.Group>
//                           <Form.Label>Product</Form.Label>
//                           <Form.Control
//                             type="text"
//                             name='Product'
//                             style={{ fontSize: '0.75rem' }}
//                             className="form-control bg"
//                             value={est2.product}

//                           />
//                         </Form.Group>
//                       </Col>
//                       {/* <Col md={7}>
//                         <Form.Group>
//                           <Form.Label>Description</Form.Label>
//                           <Form.Control
//                             type="text"
//                             placeholder="Description"
//                             name='description'
//                             style={{ fontSize: '0.75rem' }}
//                             value={est.description}
//                             onChange={handleChange}
//                           />
//                         </Form.Group>
//                       </Col> */}
//                     </Row>
//                     <Table className="mb-4">
//                       <thead>
//                         <tr style={{ fontSize: '0.75rem' }}>
//                           <th className="over-col-size">Sr</th>
//                           <th className="over-col-size">Estimate No</th>
//                           <th className="over-col-size">location1</th>
//                           <th className="over-col-size">location2</th>
//                           <th className="over-col-size">Description</th>

//                           {/* <th className="over-col-size">Price in 1 Cu. Meter</th> */}
//                           {/* <th className="over-col-size">Qty in 1 Cu. Meter</th> */}
//                           <th className="over-col-size">Qty</th>
//                           <th className="over-col-size">Cost</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {estimationReport?.map((est2, estIndex) => {

//                           return est2.amount.map((item, index) => (
//                             <tr key={`${estIndex}-${index}`}>
//                               <td style={{ fontSize: '0.75rem' }}>{index + 1}</td>
//                               <td>{item.estimationNo}</td>
//                               <td>{item.location1}</td>
//                               <td>{item.location2}</td>
//                               <td>{item.description}</td>
//                               <td>{item.quantity}</td>
//                               <td>{item.totalCost}</td>
//                             </tr>
//                           ));
//                         })}
//                       </tbody>


//                       {/* <tbody>
//                       estimationReport: estimationReport?.map(est2 => ({
//                         amount: est2.amount.map(item => ({
//                           // const totalQuantity = data.quantityInOneCubicMeter * data.quantity || 0;
//                           // const totalCost = totalQuantity * data.priceOfOneCubicMeter || 0;

//                           return (
//                             <tr key={`${estIndex}-${index}`} >
//                               <td style={{ fontSize: '0.75rem' }}>{index + 1}</td>
//                               <td>{item.estimationNo}</td>
//                         <td>{item.location1} </td>
//                         <td>{item.location2} </td>
//                         <td>{item.description}</td>
//                         <td>{item.quantity}</td>
//                         <td>{item.totalCost}</td>
//                   //  <td style={{ fontSize: '0.75rem' }}>{data.productName}</td>
//                               // <td style={{ fontSize: '0.75rem' }}>{data.priceOfOneCubicMeter.toFixed(2)}</td>
//                               // <td style={{ fontSize: '0.75rem' }}>{data.quantityInOneCubicMeter.toFixed(2)}</td>
//                               // <td style={{ fontSize: '0.75rem' }}>{data.quantity.toFixed(2)}</td>
//                               // <td style={{ fontSize: '0.75rem' }}>{data.totalCost.toFixed(2)}</td> */}
//                       {/* </tr> 
//                          ); 
//                         }))
//                       </tbody> */}
//                       {/* <tfoot>
//                         <tr>
//                           <td colSpan="5" className="text-end"><strong>Total Cost:</strong></td>
//                           <td>
//                             <strong>

//                               {estimation?.map(est => (
//                                 <span >
//                                   {est.subestimationPrice.toFixed(2)}

//                                 </span>
//                               ))}
//                             </strong>
//                           </td>
//                         </tr>
//                       </tfoot> */}
//                     </Table>

//                   </div>
//                 ))}

//                 {/* <h4 style={{ marginTop: '4.75rem', fontWeight: 'bold' }}>Final Report :</h4> */}

//                 {/* 
//                 <Table>
//                   <thead>
//                     <tr style={{ fontSize: '0.75rem' }}>
//                       <th className="over-col-size">Sr</th>
//                       <th className="over-col-size">Product</th>
//                       <th className="over-col-size">Total Qty</th>
//                       <th className="over-col-size">Cost</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {estimationReport?.map((est2, index) => (
//                       <tr key={index}>
//                         <td style={{ fontSize: '0.75rem' }}>{index + 1}</td>
//                         <td style={{ fontSize: '0.75rem' }}>{est2.product}</td>
//                         <td style={{ fontSize: '0.75rem' }}>{est2.quantity}</td>
//                         <td style={{ fontSize: '0.75rem' }}>{est2.totalCost}</td>
//                       </tr>
//                     ))}

//                   </tbody>
//                   <tfoot>
//                     <tr>
//                       <td colSpan="3" className="text-end"><strong>Total Cost:</strong></td>
//                       <td>
//                         <strong>
//                           {totalEstimationPrice}
//                         </strong>
//                       </td>
//                     </tr>
//                   </tfoot>
//                 </Table> */}
//               </Form>
//             )}
//           </Formik>
//         </Modal.Body>
//       </Modal>
//     </>
//   )
// }

// export default Viewestimation
