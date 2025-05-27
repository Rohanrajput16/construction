import { Link, useLocation, useNavigate } from "react-router-dom";
import SideMenu from "../../Components/SideMenu";
import { Col, Row, Form, Button, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addEstimation,
  addUpdateestimation,
  getCategories,
  getEstimation,
  productsList,
  productsListExport,
} from "../../reducers/commonReducer";
import Select from "react-select";
import { toast } from "react-toastify";

export default function CostestimationCopy() {
  // Imports and Hooks
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const navigate = useNavigate();

  // Selectors
  const { getCategoriesData } = useSelector((state) => state.commonReducer);

  // States
  const [formValues, setFormValues] = useState({
    name: "",
    projectId: id || "",
  });
  const [count, setCount] = useState(0);

  const [estimations, setEstimations] = useState([
    {
      estimateNo: "",
      category: "",
      description: "",
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
    },
  ]);

  const handleDispatch = () => {
    console.log(id);
    if (id) {
      dispatch(addEstimation({ projectId: id }));
    }
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
      volumeInMeter = volumeInFoot * 0.02831685;
    } else if (calculateEstimation === 2) {
      volumeInMeter = volumeInFoot * 0.092903;
    } else {
      volumeInMeter = volumeInFoot * 0.3048;
    }

    return volumeInMeter;
  };

  const handleRowChange = (estimationIndex, rowIndex, e) => {
    const { name, value } = e.target;
    const updatedEstimations = [...estimations];
    const row = updatedEstimations[estimationIndex].rows[rowIndex];

    row[name] = value;

    if (name === "variety") {
      const selectedProduct = updatedEstimations[estimationIndex].products.find(
        (product) => product.size === Number(value)
      );
      console.log(selectedProduct);
      if (selectedProduct) {
        row.oneCubicMeter =
          selectedProduct.categories[0].amountInOneCubicMeter || 0;

        if (row.totalMeter) {
          row.weight = row.oneCubicMeter * row.totalMeter;
        }
      }
    }

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
        convertInFeet(length).toFixed(2) *
        convertInFeet(width).toFixed(2) *
        convertInFeet(height).toFixed(2);

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
        row.weight = row.oneCubicMeter * totalMeter;
      }
    }

    if (row.rate && row.totalMeter) {
      if (row.oneCubicMeter && row.weight) {
        row.amount = parseFloat(row.weight) * parseFloat(row.rate);
      } else {
        row.amount = parseFloat(row.rate) * row.totalMeter;
      }
    }

    setEstimations(updatedEstimations);
  };

  const handleEstimationFormChange = (index, name, value) => {
    setEstimations((prevEstimations) => {
      const newEstimations = [...prevEstimations];

      if (name === "category") {
        // Find the selected category from the list
        const selectedCategory = getCategoriesData?.list.find(
          (category) => category.id === value.value
        );
        console.log(selectedCategory);

        // Update the selected estimation's fields
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
          description: selectedCategory ? selectedCategory.description : "",
          excludedTerms: selectedCategory
            ? selectedCategory.excludedTerm[0].split(",")
            : [],
          calculateEstimation: selectedCategory
            ? selectedCategory.calculateEstimation
            : null,
        };

        // Update form values for category
        setFormValues((prev) => ({
          ...prev,
          category: value.value,
        }));

        // Dispatch actions for fetching products based on the selected category
        const categoriesToDispatch = selectedCategory ? [value.value] : null;

        // Fetch products related to the selected category
        dispatch(productsList({ categories: categoriesToDispatch }))
          .unwrap()
          .then((fetchedProducts) => {
            setEstimations((prevEstimations) => {
              const updatedEstimations = [...prevEstimations];
              updatedEstimations[index].products = fetchedProducts?.list || [];
              return updatedEstimations;
            });
          });

        // Dispatch another action for exporting products
        dispatch(productsListExport({ categories: categoriesToDispatch }));
      } else {
        // Handle other fields updates
        newEstimations[index] = {
          ...newEstimations[index],
          [name]: value,
        };
      }

      return newEstimations;
    });
  };

  const handleSelectChange = (estimationIndex, selected) => {
    setEstimations((prevEstimations) => {
      const newEstimations = [...prevEstimations];
      newEstimations[estimationIndex].selectedOptions = selected || [];
      return newEstimations;
    });
  };
  const createEstimation = async (index) => {
    if (count === 0) {
      await handleSubmit(index);
    } else {
      updateEstimation(index);
    }
  };

  const addRow = (estimationIndex) => {
    const updatedEstimations = [...estimations];
    updatedEstimations[estimationIndex].rows.push({
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
    });
    setEstimations(updatedEstimations);
  };

  const handleAddEstimation = () => {
    setEstimations((prev) => [
      ...prev,
      {
        estimateNo: "",
        category: "",
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

  const handleDeleteEstimation = (index) => {
    const updatedEstimations = estimations.filter(
      (_, estimationIndex) => estimationIndex !== index
    );
    setEstimations(updatedEstimations);
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch, id]);

  const handleVarietyChange = (selected, estimationIndex, rowIndex) => {
    console.log(selected);
    const selectedValue = selected ? selected.value : "";

    setEstimations((prevEstimations) => {
      const updatedEstimations = [...prevEstimations];
      const row = updatedEstimations[estimationIndex].rows[rowIndex];

      // Update the variety field
      row.variety = selectedValue;

      // Clear fields if no variety is selected
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

          row.amount = row.oneCubicMeter * (row.weight || 0);
        } else {
          row.oneCubicMeter = 0;
          row.amount = 0;
        }
      }

      return updatedEstimations;
    });
  };

  const handleDeleteRow = (estimationIndex, rowIndex) => {
    const updatedEstimations = [...estimations];
    updatedEstimations[estimationIndex].rows = updatedEstimations[
      estimationIndex
    ].rows.filter((_, rIndex) => rIndex !== rowIndex);
    setEstimations(updatedEstimations);
  };

  const validateEstimations = (estimations) => {
    for (const estimation of estimations) {
      if (!estimation.category || !estimation.category.value) {
        toast.error("Each estimation must have a category selected.");
        return false;
      }

      if (
        !estimation.selectedOptions ||
        estimation.selectedOptions.length === 0
      ) {
        toast.error("Each estimation must have at least one product selected.");
        return false;
      }

      for (const row of estimation.rows) {
        if (!row.location1) {
          console.log("Missing field: location1");
          toast.error("Fill all the fields in the row");
          return false;
        }
        if (!row.location2) {
          console.log("Missing field: location2");
          toast.error("Fill all the fields in the row");
          return false;
        }
        if (!estimation.excludedTerms?.includes("No1") && !row.no1) {
          console.log("Missing field: No1");
          toast.error("Fill all the fields in the row");
          return false;
        }
        if (!estimation.excludedTerms?.includes("No2") && !row.no2) {
          console.log("Missing field: No2");
          toast.error("Fill all the fields in the row");
          return false;
        }
        if (!estimation.excludedTerms?.includes("No3") && !row.no3) {
          console.log("Missing field: No3");
          toast.error("Fill all the fields in the row");
          return false;
        }
        if (!estimation.excludedTerms?.includes("Size (mm)") && !row.variety) {
          console.log("Missing field: variety");
          toast.error("Fill all the fields in the row");
          return false;
        }
        if (
          !estimation.excludedTerms?.includes("Length") &&
          (!row.length || isNaN(row.length) || row.length <= 0)
        ) {
          console.log("Invalid or missing field: length");
          toast.error("Fill all the fields in the row");
          return false;
        }
        if (
          !estimation.excludedTerms?.includes("Width") &&
          (!row.width || isNaN(row.width) || row.width <= 0)
        ) {
          console.log("Invalid or missing field: width");
          toast.error("Fill all the fields in the row");
          return false;
        }
        if (!row.height || isNaN(row.height) || row.height <= 0) {
          console.log("Invalid or missing field: height");
          toast.error("Fill all the fields in the row");
          return false;
        }
        // if (
        //   !estimation.excludedTerms?.includes("Weight") &&
        //   (!row.weight || isNaN(row.weight) || row.weight < 0)
        // ) {
        //   console.log("Invalid or missing field: weight");
        //   toast.error("Fill all the fields in the row");
        //   return false;
        // }
        if (
          !estimation.excludedTerms?.includes("Rate") &&
          (!row.rate || isNaN(row.rate) || row.rate < 0)
        ) {
          console.log("Invalid or missing field: rate");
          toast.error("Fill all the fields in the row");
          return false;
        }
        if (
          !estimation.excludedTerms?.includes("Volume (Feet)") &&
          !row.totalFeet
        ) {
          console.log("Invalid or missing field: totalFeet");
          toast.error("Fill all the fields in the row");
          return false;
        }
        if (
          !estimation.excludedTerms?.includes("Volume (Meter)") &&
          !row.totalMeter
        ) {
          console.log("Invalid or missing field: totalMeter");
          toast.error("Fill all the fields in the row");
          return false;
        }
      }
    }
    return true;
  };

  const handleSubmit = (index) => {
    calculateVolume();

    if (!validateEstimations(estimations)) {
      return;
    }

    const payload = {
      name: formValues.name,
      projectId: formValues.projectId || "",
      estimation: estimations.map((estimation) => ({
        estimationNo: estimation.estimateNo,
        category: estimation.category.value,
        description: estimation.description,
        products: estimation.selectedOptions.map((select) => select.value),
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
          totalFeet: row.totalFeet || "0",
          totalMeter: row.totalMeter || "0",
          amount: row.amount || 0,
        })),
      })),
    };

    dispatch(getEstimation(payload))
      .unwrap()
      .then((res) => {
        if (res.status) {
          setCount(count + 1);
          if (index !== undefined && typeof index === "number") {
            addRow(index);
          }
          if (typeof index === "object") {
            navigate(`/costestimationlist?id=${id}`);
          }
        } else {
          if (res.message.startsWith("E11000")) {
            toast.error("Estimation Name Already Used");
          } else {
            toast.error(res.message);
          }
        }
      });
  };

  const updateEstimation = (index) => {
    calculateVolume();

    if (!validateEstimations(estimations)) {
      return;
    }

    const estimationId = localStorage.getItem("estimationId");
    const payload2 = {
      id: estimationId,
      name: formValues.name,
      estimation: estimations.map((estimation) => ({
        estimationNo: estimation.estimateNo,
        category: estimation.category.value,
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
    dispatch(addUpdateestimation(payload2))
      .unwrap()
      .then((res) => {
        if (res.status) {
          // toast.success(res.message);
          setCount(count + 1);
          if (index !== undefined && typeof index === "number") {
            addRow(index);
          }
          if (typeof index === "object") {
            navigate(`/costestimationlist?id=${id}`);
          }
        } else {
          toast.error(res.message);
        }
      });
  };

  const saveAndCreateRow = () => {};

  

  return (
    <>
      <SideMenu />
      <div className="mt-extra content container-fluid">
        <Link to={`/costestimationlist?id=${id}`}>
          <h5>
            <i className="bi bi-arrow-left"></i> Estimation List
          </h5>
        </Link>
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
            {estimations.map((estimation, estimationIndex) => (
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
                      name="estimateNo"
                      style={{ fontSize: "0.75rem" }}
                      value={formValues.estimateNo}
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
                  <Select
                    value={estimations[estimationIndex]?.category || ""}
                    placeholder="Select"
                    options={
                      getCategoriesData?.list?.map((data) => ({
                        value: data.id,
                        label: `${data.name} (${data.codeNo})`,
                      })) || []
                    }
                    onChange={(selectedOption) =>
                      handleEstimationFormChange(
                        estimationIndex,
                        "category",
                        selectedOption
                      )
                    }
                  />
                </Col>
                <Col md={3} sm={12}>
                  <Form.Group controlId="validationFormik01">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Description"
                      name="description"
                      style={{ fontSize: "0.75rem" }}
                      value={estimation.description || " "}
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
                    value={estimations[estimationIndex].selectedOptions}
                  />
                </Col>
                <Col md={1} sm={12}>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteEstimation(estimationIndex)}
                    size="sm"
                    className="float-right ml-2 mb-3"
                    style={{ margin: "2rem 2rem" }}
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </Col>

                {estimation.category &&
                  estimation.rows.map((row, rowIndex) => (
                    <Row key={rowIndex} className="mb-3">
                      <hr style={{ marginTop: "15px" }} />
                      <Table style={{ fontSize: "0.75rem" }}>
                        <thead>
                          <tr>
                            <th>Location 1</th>
                            <th>Location 2</th>
                            {!estimation.excludedTerms.includes(
                              "Size (mm)"
                            ) && <th>Size (Unit)</th>}
                            {!estimation.excludedTerms.includes("No1") && (
                              <th>No1</th>
                            )}
                            {!estimation.excludedTerms.includes("No2") && (
                              <th>No2</th>
                            )}
                            {!estimation.excludedTerms.includes("No3") && (
                              <th>No3</th>
                            )}
                            {!estimation.excludedTerms.includes("Length") && (
                              <th>Length (feet)</th>
                            )}
                            {!estimation.excludedTerms.includes("Width") && (
                              <th>Width (feet)</th>
                            )}
                            {!estimation.excludedTerms.includes("Height") && (
                              <th>Height (feet)</th>
                            )}
                            {!estimation.excludedTerms.includes(
                              "Volume (Feet)"
                            ) && <th>Volume (Feet)</th>}
                            {!estimation.excludedTerms.includes(
                              "Volume (Meter)"
                            ) && <th>Volume (Meter)</th>}
                            {!estimation.excludedTerms.includes("Weight") && (
                              <th>Weight</th>
                            )}
                            {!estimation.excludedTerms.includes("Rate") && (
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
                                required
                                type="text"
                                name="location1"
                                style={{ fontSize: "0.75rem" }}
                                value={row.location1}
                                onChange={(e) =>
                                  handleRowChange(estimationIndex, rowIndex, e)
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
                                  handleRowChange(estimationIndex, rowIndex, e)
                                }
                              />
                            </td>
                            {!estimation.excludedTerms.includes(
                              "Size (mm)"
                            ) && (
                              <td>
                                <Select
                                  isSearchable={false}
                                  options={estimation?.selectedOptions?.map(
                                    (data) => ({
                                      value: data.size,
                                      label: data.size,
                                    })
                                  )}
                                  className="sizew"
                                  name="variety"
                                  // type="r"
                                  placeholder="Select"
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

                            {!estimation.excludedTerms.includes("No1") && (
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

                            {!estimation.excludedTerms.includes("No2") && (
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

                            {!estimation.excludedTerms.includes("No3") && (
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

                            {!estimation.excludedTerms.includes("Length") && (
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

                            {!estimation.excludedTerms.includes("Width") && (
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

                            {!estimation.excludedTerms.includes("Height") && (
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

                            {!estimation.excludedTerms.includes(
                              "Volume (Feet)"
                            ) && <td>{(row.totalFeet || 0).toFixed(3)}</td>}
                            {!estimation.excludedTerms.includes(
                              "Volume (Meter)"
                            ) && <td>{(row.totalMeter || 0).toFixed(3)}</td>}

                            {!estimation.excludedTerms.includes("Weight") && (
                              <td>
                                <div>{row.weight}</div>
                              </td>
                            )}

                            {!estimation.excludedTerms.includes("Rate") && (
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
                              <div>{(row.amount || 0).toFixed(2)}</div>
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
                                onClick={async () => {
                                  await createEstimation(estimationIndex);
                                  // addRow(estimationIndex);
                                  calculateVolume();
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
              onClick={() => {
                handleAddEstimation();
                createEstimation();
              }}
              className="mb-3"
            >
              Add New Estimation
            </Button>

            <Button
              variant="danger"
              className="float-right ml-2 mb-3"
              onClick={async (e) => {
                await createEstimation(e);
                handleDispatch();
              }}
            >
              <h5>Save</h5>
            </Button>
          </Form>
        </Row>
      </div>
    </>
  );
}
