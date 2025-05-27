import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Modal, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  addUpdateestimation,
  productsList,
  productsListExport,
} from "../../reducers/commonReducer";
import Select from "react-select";

const Updateestimation = ({
  onUpdateSuccess,
  id,
  name,
  totalEstimationPrice,
  estimations,
  amount,
  estimationReport,
}) => {
  const [formValues, setFormValues] = useState({
    name: name || "",
    projectId: id || "",
  });
  const [estimationState, setEstimationState] = useState([]);
  const [initialEstimations, setInitialEstimations] = useState(estimations);

  const dispatch = useDispatch();
  const queryParameters = new URLSearchParams(window.location.search);
  const categId = queryParameters.get("catId");

  const [show, setShow] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  const { getCategoriesData, productsListData } = useSelector(
    (state) => state.commonReducer
  );
  const fetchProducts = async () => {
    const productsData = await dispatch(productsList());
    setAllProducts(productsData.payload.list);
  };
  useEffect(() => {
    if (categId) {
      dispatch(getCategories({ parent: categId }));
    } else {
      dispatch(getCategories());
    }
    fetchProducts();
  }, [categId, dispatch]);

  const handleClose = () => {
    setShow(false);
    setEstimationState(initialEstimations);
  };
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateEstimation();
    handleClose();
  };
  const handleDeleteRow = (estimationIndex, rowIndex) => {
    setEstimationState((prevEstimations) => {
      const updatedEstimations = [...prevEstimations]; // Create a copy of the estimations
      const updatedRows = updatedEstimations[estimationIndex].rows.filter(
        (_, rIndex) => rIndex !== rowIndex
      ); // Filter out the row to delete

      // Update the specific estimation's rows with the filtered rows
      updatedEstimations[estimationIndex].rows = updatedRows;

      return updatedEstimations; // Return the updated state
    });
  };

  const handleSelectChange = (estimationIndex, selected) => {
    setEstimationState((prevEstimations) => {
      const newEstimations = [...prevEstimations];
      newEstimations[estimationIndex].selectedOptions = selected || [];
      return newEstimations;
    });
  };
  const convertInFeet = (size) => {
    const number = Math.floor(size);
    const decimal = (size - number) * (10 / 12);
    return decimal + number;
  };

  const calculateVolume = (no1, no2, no3, l, b, h, calculateEstimation) => {
    l = convertInFeet(l).toFixed(2);
    b = convertInFeet(b).toFixed(2);
    h = convertInFeet(h).toFixed(2);
    const volumeInFoot = no1 * no2 * no3 * l * b * h;
    let volumeInMeter;

    if (calculateEstimation === 1) {
      volumeInMeter = volumeInFoot * 0.0283168;
    } else if (calculateEstimation === 2) {
      volumeInMeter = volumeInFoot * 0.092903;
    } else {
      volumeInMeter = volumeInFoot * 0.3048;
    }

    return volumeInMeter;
  };

  const handleRowChange = (estimationIndex, rowIndex, e) => {
    const { name, value } = e.target;

    setEstimationState((prevEstimations) => {
      const updatedEstimations = [...prevEstimations];
      const updatedRows = [...updatedEstimations[estimationIndex].rows]; // Create a copy of the rows array
      const row = { ...updatedRows[rowIndex] }; // Create a copy of the specific row object

      // Update the specific property of the row
      row[name] = value;

      // Handle logic for "variety"
      if (name === "variety") {
        const selectedProduct = updatedEstimations[
          estimationIndex
        ].products.find((product) => product.size === Number(value));

        if (selectedProduct) {
          row.oneCubicMeter =
            selectedProduct.categories[0].amountInOneCubicMeter || 0;

          if (row.totalMeter) {
            row.weight = (row.oneCubicMeter * row.totalMeter).toFixed(2);
          }
        } else {
          row.oneCubicMeter = 0; // Reset if no product found
          row.weight = 0; // Reset if no product found
        }
      }

      // Handle updates for dimensions and calculations
      if (["length", "width", "height", "no1", "no2", "no3"].includes(name)) {
        const no1 = parseFloat(row.no1) || 1;
        const no2 = parseFloat(row.no2) || 1;
        const no3 = parseFloat(row.no3) || 1;
        const length = parseFloat(row.length) || 1;
        const width = parseFloat(row.width) || 1;
        const height = parseFloat(row.height) || 1;

        const totalFeet =
          no1 *
          no2 *
          no3 *
          convertInFeet(length) *
          convertInFeet(width) *
          convertInFeet(height);

        const totalMeter = calculateVolume(
          no1,
          no2,
          no3,
          length,
          width,
          height,
          updatedEstimations[estimationIndex].calculateEstimation
        );

        row.totalFeet = totalFeet;
        row.totalMeter = totalMeter;

        if (row.oneCubicMeter) {
          row.weight = (row.oneCubicMeter * totalMeter).toFixed(2);
        }
      }

      // Calculate the amount
      if (row.rate && row.totalMeter) {
        if (row.oneCubicMeter && row.weight) {
          row.amount = (parseFloat(row.weight) * parseFloat(row.rate)).toFixed(
            2
          );
        } else {
          row.amount = (parseFloat(row.rate) * row.totalMeter).toFixed(2);
        }
      }

      // Update the copied rows array with the modified row
      updatedRows[rowIndex] = row;
      updatedEstimations[estimationIndex].rows = updatedRows; // Update the estimation with new rows

      return updatedEstimations; // Return the updated state
    });
  };

  const addRow = (estimationIndex) => {
    setEstimationState((prevEstimations) =>
      prevEstimations.map((estimation, index) => {
        if (index === estimationIndex) {
          return {
            ...estimation,
            rows: [
              ...estimation.rows,
              {
                location1: "",
                location2: "",
                variety: "",
                no1: "",
                no2: "",
                no3: "",
                length: "",
                width: "",
                height: "",
                weight: "",
                rate: "",
                rateWithTax: "",
                totalFeet: "",
                totalMeter: "",
              },
            ],
          };
        }
        return estimation;
      })
    );
  };

  const updateEstimation = async () => {
    calculateVolume();
    const estimationId = formValues.projectId;
    const payload2 = {
      id: estimationId,
      name: formValues.name,
      estimation: estimationState.map((estimation) => ({
        estimationNo: estimation.estimationNo,
        category: estimation.category,
        description: estimation.description,
        products:
          estimation.selectedOptions && estimation.selectedOptions.length > 0
            ? estimation.selectedOptions.map((select) => select.value)
            : [],
        rows: estimation.rows.map((row) => ({
          location1: row.location1,
          location2: row.location2,
          variety: row.variety,
          no1: row.no1 || "1",
          no2: row.no2 || "1",
          no3: row.no3 || "1",
          length: row.length || "1",
          width: row.width || "1",
          height: row.height || "1",
          weight: row.weight || "0",
          rate: row.rate || "0",
          rateWithTax: row.rateWithTax || "0",
          totalFeet: row.totalFeet || "0",
          totalMeter: row.totalMeter || "0",
        })),
      })),
    };
    try {
      const response = await dispatch(addUpdateestimation(payload2)).unwrap();
      if (response.status) {
        console.log(response);

        setEstimationState(response.list.estimation);
        setFormValues({ ...formValues, name: response.list.name });
        onUpdateSuccess();
        handleClose();
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleEstimationFormChange = (index, name, value) => {
    setEstimationState((prevEstimations) => {
      const newEstimations = [...prevEstimations];

      if (name === "category") {
        const selectedCategory = getCategoriesData?.list.find(
          (category) => category.id === value
        );

        newEstimations[index] = {
          ...newEstimations[index],
          category: value,
          selectedOptions: [],
          products: [],
          rows: [
            {
              location1: "",
              location2: "",
              variety: "",
              no1: "",
              no2: "",
              no3: "",
              length: "",
              width: "",
              height: "",
              weight: "",
              rate: "",
              rateWithTax: "",
              totalFeet: "",
              totalMeter: "",
            },
          ],
        };

        if (!value) {
          newEstimations[index].products = [];
          return newEstimations;
        }

        newEstimations[index].excludedTerms = selectedCategory
          ? selectedCategory.excludedTerm[0].split(",")
          : [];
        newEstimations[index].calculateEstimation = selectedCategory
          ? selectedCategory.calculateEstimation
          : null;

        // setFormValues((prev) => ({
        //   ...prev,
        //   category: value,
        // }));

        const categoriesToDispatch = selectedCategory ? [value] : null;
        dispatch(productsList({ categories: categoriesToDispatch }))
          .unwrap()
          .then((fetchedProducts) => {
            setEstimationState((prevEstimations) => {
              const updatedEstimations = [...prevEstimations];
              updatedEstimations[index].products = fetchedProducts?.list || [];
              return updatedEstimations;
            });
          });

        dispatch(productsListExport({ categories: categoriesToDispatch }));
      } else {
        newEstimations[index] = {
          ...newEstimations[index],
          [name]: value,
        };
      }

      return newEstimations;
    });
  };

  const handleVarietyChange = (selected, estimationIndex, rowIndex) => {
    console.log(selected);

    const selectedValue = selected ? selected.value : "";

    setEstimationState((prevEstimations) => {
      const updatedEstimations = [...prevEstimations];
      const updatedRows = [...updatedEstimations[estimationIndex].rows];
      const row = { ...updatedRows[rowIndex] };

      row.variety = selectedValue;

      if (!selectedValue) {
        row.oneCubicMeter = 0;
        row.amount = 0;
      } else {
        const selectedProduct = updatedEstimations[
          estimationIndex
        ].products.find((product) => product.size === selectedValue);

        if (selectedProduct) {
          row.oneCubicMeter =
            selectedProduct.categories[0].amountInOneCubicMeter || 0;
          row.weight = row.oneCubicMeter * row.totalMeter || "";
          row.amount = (Number(row.rate) * (row.weight || 0)).toFixed(2);
        } else {
          row.oneCubicMeter = 0;
          row.amount = 0;
        }
      }

      console.log(row);

      updatedRows[rowIndex] = row;

      updatedEstimations[estimationIndex].rows = updatedRows;

      return updatedEstimations;
    });
  };

  const handleDeleteEstimation = (index) => {
    setEstimationState((prevEstimations) =>
      prevEstimations.filter((_, estimationIndex) => estimationIndex !== index)
    );
  };

  const handleAddEstimation = () => {
    setEstimationState((prevEstimations) => [
      ...prevEstimations,
      {
        estimationNo: "",
        category: "", // Keep this as a string initially, but ensure it gets converted where necessary
        description: "",
        selectedOptions: [],
        rows: [
          {
            location1: "",
            location2: "",
            variety: "",
            no1: "",
            no2: "",
            no3: "",
            length: "",
            width: "",
            height: "",
            weight: "",
            rate: "",
            rateWithTax: "",
            totalFeet: "",
            totalMeter: "",
          },
        ],
      },
    ]);
  };

  useEffect(() => {
    if (estimations && estimations.length > 0) {
      const initializedEstimations = estimations.map((estimation) => {
        const matchedCategory = getCategoriesData?.list?.find(
          (category) => category.id === estimation.category.id
        );

        const initializedRows = estimation.rows.map((row) => {
          const weight = parseFloat(row.weight) || 0;
          const rate = parseFloat(row.rate) || 0;

          return {
            ...row,
            amount: (weight * rate).toFixed(2),
          };
        });

        return {
          ...estimation,
          category: estimation.category.id,
          excludedTerms: matchedCategory
            ? matchedCategory.excludedTerm[0].split(",")
            : [],
          products:
            allProducts?.filter((product) =>
              product.categories.some(
                (category) => category?._id?.id === estimation?.category?.id
              )
            ) || [],
          selectedOptions: allProducts
            .filter((product) => estimation.products.includes(product.id))
            .map((product) => ({
              value: product.id,
              size: product.size,
              label: product.name,
            })),
          rows: initializedRows, // Include the initialized rows with amounts
        };
      });

      setEstimationState(initializedEstimations); // Update the state with initialized estimations
    }
  }, [estimations, getCategoriesData, allProducts, show]);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <i className="bi bi-pencil-square"></i>
      </Button>

      <Modal show={show} onHide={handleClose} fullscreen={true}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Estimation</Modal.Title>
        </Modal.Header>
        <Modal.Body className="custom-modal">
          <Row className="mb-3 products-design">
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      style={{ fontSize: "0.75rem" }}
                      value={formValues.name}
                      onChange={(e) =>
                        setFormValues({ ...formValues, name: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>

              <hr style={{ marginTop: "15px" }} />
              {estimationState.map((estimation, estimationIndex) => (
                <Row
                  className="mb-3"
                  key={estimationIndex}
                  style={{
                    border: "3px solid #757575",
                    borderRadius: "5px",
                    padding: "15px",
                    margin: "15px",
                  }}
                >
                  <Col md={1}>
                    <Form.Group>
                      <Form.Label>S.No</Form.Label>
                      <Form.Control
                        type="text"
                        style={{ fontSize: "0.75rem" }}
                        value={estimationIndex + 1}
                        readOnly
                      />
                    </Form.Group>
                  </Col>

                  <Col md={2}>
                    <Form.Group>
                      <Form.Label>Estimate S.No</Form.Label>
                      <Form.Control
                        type="number"
                        name="estimationNo"
                        style={{ fontSize: "0.75rem" }}
                        value={estimation.estimationNo}
                        onChange={(e) =>
                          handleEstimationFormChange(
                            estimationIndex,
                            e.target.name,
                            e.target.value
                          )
                        }
                      />
                    </Form.Group>
                  </Col>

                  <Col md={2} sm={12}>
                    <Form.Label>Short Name</Form.Label>
                    <Form.Select
                      required
                      name="category"
                      aria-label="Default select example"
                      value={estimation?.category || ""}
                      style={{ fontSize: "0.75rem" }}
                      onChange={(e) =>
                        handleEstimationFormChange(
                          estimationIndex,
                          e.target.name,
                          e.target.value
                        )
                      }
                    >
                      <option value="">Select Short Name</option>
                      {!!getCategoriesData?.list &&
                        getCategoriesData.list.map((data, index) => (
                          <option key={index} value={data.id}>
                            {data.name} ({data.codeNo})
                          </option>
                        ))}
                    </Form.Select>
                  </Col>

                  <Col md={3} sm={12}>
                    <Form.Group controlId="validationFormik01">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Description"
                        name="description"
                        style={{ fontSize: "0.75rem" }}
                        value={estimation.description}
                        onChange={(e) =>
                          handleEstimationFormChange(
                            estimationIndex,
                            e.target.name,
                            e.target.value
                          )
                        }
                      />
                    </Form.Group>
                  </Col>

                  <Col md={3} sm={12}>
                    <Form.Label>Product</Form.Label>
                    <Select
                      isMulti
                      style={{ fontSize: "0.75rem" }}
                      options={estimation?.products?.map((data) => ({
                        value: data.id,
                        size: data.size,
                        label: data.name,
                      }))}
                      placeholder="Select products"
                      onChange={(selected) =>
                        handleSelectChange(estimationIndex, selected)
                      }
                      value={estimationState[estimationIndex].selectedOptions}
                    />
                  </Col>
                  <Col md={1} sm={12}>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteEstimation(estimationIndex)}
                      size="sm"
                      className="float-right ml-2 mb-3"
                      style={{  margin: "2rem 2rem" }}
                    >
                      <i className="bi bi-trash"></i>
                    </Button>
                  </Col>

                  {estimation?.category &&
                    estimation?.rows.map((row, rowIndex) => (
                      <Row key={rowIndex} className="mb-3">
                        <hr style={{ marginTop: "15px" }} />
                        <Table style={{ fontSize: "0.75rem" }}>
                          <thead>
                            <tr>
                              <th>Location 1</th>
                              <th>Location 2</th>
                              {!estimation?.excludedTerms?.includes(
                                "Size (mm)"
                              ) && <th>Size (mm)</th>}
                              {!estimation?.excludedTerms?.includes("No1") && (
                                <th>No1</th>
                              )}
                              {!estimation?.excludedTerms?.includes("No2") && (
                                <th>No2</th>
                              )}
                              {!estimation?.excludedTerms?.includes("No3") && (
                                <th>No3</th>
                              )}
                              {!estimation?.excludedTerms?.includes(
                                "Length"
                              ) && <th>Length (feet)</th>}
                              {!estimation?.excludedTerms?.includes(
                                "Width"
                              ) && <th>Width (feet)</th>}
                              {!estimation?.excludedTerms?.includes(
                                "Height"
                              ) && <th>Height (feet)</th>}
                              {!estimation?.excludedTerms?.includes(
                                "Volume (Feet)"
                              ) && <th>Volume (Feet)</th>}
                              {!estimation?.excludedTerms?.includes(
                                "Volume (Meter)"
                              ) && <th>Volume (Meter)</th>}
                              {!estimation?.excludedTerms?.includes(
                                "Weight"
                              ) && <th>Weight</th>}
                              {!estimation?.excludedTerms?.includes("Rate") && (
                                <th>Rate</th>
                              )}
                              <th>Amount</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <Form.Control
                                  type="text"
                                  name="location1"
                                  style={{ fontSize: "0.75rem" }}
                                  value={row.location1}
                                  onChange={(e) =>
                                    handleRowChange(
                                      estimationIndex,
                                      rowIndex,
                                      e
                                    )
                                  }
                                />
                              </td>

                              <td>
                                <Form.Control
                                  type="text"
                                  name="location2"
                                  style={{ fontSize: "0.75rem" }}
                                  value={row.location2}
                                  onChange={(e) =>
                                    handleRowChange(
                                      estimationIndex,
                                      rowIndex,
                                      e
                                    )
                                  }
                                />
                              </td>
                              {!estimation?.excludedTerms?.includes(
                                "Size (mm)"
                              ) && (
                                <td>
                                  <Select
                                    style={{ fontSize: "0.75rem" }}
                                    options={estimation?.selectedOptions?.map(
                                      (data) => ({
                                        value: data.size,
                                        label: data.size,
                                      })
                                    )}
                                    name="variety"
                                    placeholder="Select"
                                    value={
                                      estimation?.selectedOptions?.find(
                                        (option) => option.size === row.variety
                                      ) || null
                                    }
                                    onChange={(selected) =>
                                      handleVarietyChange(
                                        selected,
                                        estimationIndex,
                                        rowIndex
                                      )
                                    }
                                  />
                                </td>
                              )}

                              {!estimation?.excludedTerms?.includes("No1") && (
                                <td>
                                  <Form.Control
                                    type="number"
                                    name="no1"
                                    value={row.no1}
                                    style={{ fontSize: "0.75rem" }}
                                    onChange={(e) =>
                                      handleRowChange(
                                        estimationIndex,
                                        rowIndex,
                                        e
                                      )
                                    }
                                  />
                                </td>
                              )}

                              {!estimation?.excludedTerms?.includes("No2") && (
                                <td>
                                  <Form.Control
                                    type="number"
                                    name="no2"
                                    value={row.no2}
                                    style={{ fontSize: "0.75rem" }}
                                    onChange={(e) =>
                                      handleRowChange(
                                        estimationIndex,
                                        rowIndex,
                                        e
                                      )
                                    }
                                  />
                                </td>
                              )}

                              {!estimation?.excludedTerms?.includes("No3") && (
                                <td>
                                  <Form.Control
                                    type="number"
                                    name="no3"
                                    value={row.no3}
                                    style={{ fontSize: "0.75rem" }}
                                    onChange={(e) =>
                                      handleRowChange(
                                        estimationIndex,
                                        rowIndex,
                                        e
                                      )
                                    }
                                  />
                                </td>
                              )}

                              {!estimation?.excludedTerms?.includes(
                                "Length"
                              ) && (
                                <td>
                                  <Form.Control
                                    type="number"
                                    name="length"
                                    value={row.length}
                                    style={{ fontSize: "0.75rem" }}
                                    onChange={(e) =>
                                      handleRowChange(
                                        estimationIndex,
                                        rowIndex,
                                        e
                                      )
                                    }
                                  />
                                </td>
                              )}

                              {!estimation?.excludedTerms?.includes(
                                "Width"
                              ) && (
                                <td>
                                  <Form.Control
                                    type="number"
                                    name="width"
                                    value={row.width}
                                    style={{ fontSize: "0.75rem" }}
                                    onChange={(e) =>
                                      handleRowChange(
                                        estimationIndex,
                                        rowIndex,
                                        e
                                      )
                                    }
                                  />
                                </td>
                              )}

                              {!estimation?.excludedTerms?.includes(
                                "Height"
                              ) && (
                                <td>
                                  <Form.Control
                                    type="number"
                                    name="height"
                                    value={row.height}
                                    style={{ fontSize: "0.75rem" }}
                                    onChange={(e) =>
                                      handleRowChange(
                                        estimationIndex,
                                        rowIndex,
                                        e
                                      )
                                    }
                                  />
                                </td>
                              )}

                              {!estimation?.excludedTerms?.includes(
                                "Volume (Feet)"
                              ) && (
                                <td>{Number(row.totalFeet || 0).toFixed(3)}</td>
                              )}
                              {!estimation.excludedTerms?.includes(
                                "Volume (Meter)"
                              ) && (
                                <td>
                                  {Number(row.totalMeter || 0).toFixed(3)}
                                </td>
                              )}

                              {!estimation.excludedTerms?.includes(
                                "Weight"
                              ) && (
                                <td>
                                  <div>{row.weight}</div>
                                </td>
                              )}

                              {!estimation.excludedTerms?.includes("Rate") && (
                                <td>
                                  <Form.Control
                                    type="number"
                                    name="rate"
                                    value={row.rate}
                                    style={{ fontSize: "0.75rem" }}
                                    onChange={(e) =>
                                      handleRowChange(
                                        estimationIndex,
                                        rowIndex,
                                        e
                                      )
                                    }
                                  />
                                </td>
                              )}

                              <td>
                                <div>{row.amount || 0}</div>
                              </td>

                              <td
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                {rowIndex !== 0 && (
                                  <Button
                                    variant="danger"
                                    size="sm"
                                    style={{ marginRight: "10px" }}
                                    onClick={() =>
                                      handleDeleteRow(estimationIndex, rowIndex)
                                    }
                                  >
                                    <i className="bi bi-trash"></i>
                                  </Button>
                                )}
                                <Button
                                  variant="primary"
                                  onClick={() => {
                                    // createEstimation();
                                    addRow(estimationIndex);
                                    // calculateVolume();
                                  }}
                                  style={{ marginBottom: "0rem" }}
                                >
                                  +
                                </Button>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </Row>
                    ))}
                </Row>
              ))}

              <Button
                variant="primary"
                onClick={() => handleAddEstimation()}
                className="mb-3"
              >
                Add New Estimation
              </Button>
              <Button
                type="submit"
                variant="danger"
                className="float-right ml-2 mb-3"
              >
                <div to={`/costestimationlist?id=${id}`}>
                  <h5> Save </h5>
                </div>
              </Button>
            </Form>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Updateestimation;
