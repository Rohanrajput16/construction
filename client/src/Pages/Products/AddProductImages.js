import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addProductImages } from "../../reducers/commonReducer";
import "./imageInput.css";
import { productList } from "../../const";

function AddProductImages(props) {
  const dispatch = useDispatch();
  const [images, setImages] = useState(!!props.pImages ? props.pImages : []);
  const [defaultImg, setDefaultImg] = useState(false);
  const [defaultImgIndex, setDefaultImgIndex] = useState(props?.dfltImg);
  const onUpload = async (images) => {
    await dispatch(
      addProductImages({
        product: props?.pID ? props?.pID : localStorage.getItem("productId"),
        images: images,
        defaultImage: defaultImgIndex,
      })
    );
    await dispatch(productList());
  };
  const handleImageUpload = (event) => {
    const fileList = event.target.files;
    setImages([...images, ...fileList]);
  };

  const handleImageDelete = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  return (
    <>
      <Row>
        <Col md={6}>
          <label className="label">
            <div className="upload-files-container">
              <div className="drag-file-area">
                <Row>
                  <span className="material-icons-outlined upload-icon">
                    Upload Images
                  </span>
                </Row>
                <Row>
                  <span className="browse-files">
                    <input
                      type="file"
                      onChange={handleImageUpload}
                      className="default-file-input"
                      multiple
                    />
                  </span>
                </Row>
              </div>
              <div className="file-block">
                <div className="file-info">
                  <span className="material-icons-outlined file-icon">
                    description
                  </span>
                  <span className="file-name"> </span>
                  <span className="file-size"> </span>
                </div>
                <span className="material-icons remove-file-icon">delete</span>
                <div className="progress-bar"> </div>
              </div>
              {images?.length > 0 && (
                <button
                  type="button"
                  className="upload-button"
                  onClick={() => onUpload(images)}
                >
                  Upload
                </button>
              )}
            </div>
          </label>
        </Col>
        <Col md={6}>
          <Row>
            {!!images &&
              images.map((image, index) => (
                <React.Fragment key={index}>
                  <Col
                    md={4}
                    className={`${
                      defaultImgIndex === index && "selectedDef"
                    } d-flex p-4 upload-img align-items-center`}
                  >
                    {image.length > 0 ? (
                      <img src={image} />
                    ) : (
                      <img src={URL.createObjectURL(image)} />
                    )}
                    <p className="mb-0">
                      <Button
                        variant="danger"
                        className="mb-3"
                        onClick={() => handleImageDelete(index)}
                      >
                        <i className="bi bi-trash"></i>{" "}
                      </Button>
                      <Button
                        variant={
                          defaultImgIndex === index ? "success" : "warning"
                        }
                        onClick={() => {
                          setDefaultImg(!defaultImg);
                          setDefaultImgIndex(index);
                        }}
                      >
                        <i className="bi bi-plus-circle"></i>
                      </Button>
                    </p>
                  </Col>
                </React.Fragment>
              ))}
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default AddProductImages;
