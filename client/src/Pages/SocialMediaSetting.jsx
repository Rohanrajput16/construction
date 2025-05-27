import React, { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  getSocialMediaSettings,
  updateSocialMediaSettings,
} from "../reducers/commonReducer";
import SideMenu from "../Components/SideMenu";

const schema = yup.object().shape({
  facbook: yup.string(),
  instagram: yup.string(),
  whatsapp: yup.string().min(10).max(10),
  youtube: yup.string(),
  linkdin: yup.string(),
  mail: yup.string(),
  phone: yup.string().min(10).max(10),
  twitter: yup.string(),
  indiamart: yup.string(),
  app: yup.string(),
  website: yup.string(),
  // websiteLogo:yup.mixed().required(),
  address: yup.string(),
  city: yup.string(),
  state: yup.string(),
  zip: yup.string(),
  topMarqueeTag: yup.string(),
});

function SocialMediaSetting() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  useEffect(() => {
    dispatch(getSocialMediaSettings());
  }, []);

  const { getSocialMediaSettingsData } = useSelector(
    (state) => state.commonReducer
  );
  const {
    address,
    app,
    city,
    facbook,
    indiamart,
    instagram,
    linkdin,
    mail,
    phone,
    state,
    twitter,
    website,
    topMarqueeTag,
    whatsapp,
    youtube,
    zip,
    id,
  } = getSocialMediaSettingsData;

  return (
    <>
      <SideMenu />
      <div className="mt-extra content container-fluid word-wrap-text">
        <div className="mb-5">
          <div className="row userAddress">
            <p className="mb-0">
              <b>Social Settings</b>
              <span className="address-edit" onClick={() => setShow(!show)}>
                <i className="bi bi-pen"></i>
              </span>
            </p>
            <hr />
            <Row >
              <Col md={6}>
                <Row>
                  <Col md={6}>
                    <p><strong>APP Url</strong></p>
                  </Col>
                  <Col md={6}><p>{app}</p></Col>
                </Row>
              </Col>
              <Col md={6}>
                <Row>
                  <Col md={6}>
                  <p><strong>Website</strong></p>
                  </Col>
                  <Col md={6}><p>{website}</p></Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Row>
                  <Col md={6}>
                  <p> <strong>Address</strong></p>
                  </Col>
                  <Col md={6}><p>{address}</p></Col>
                </Row>
              </Col>
              <Col md={6}>
                <Row>
                  <Col md={6}>
                  <p><strong>City</strong></p>
                  </Col>
                  <Col md={6}><p>{city}</p></Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Row>
                  <Col md={6}>
                  <p><strong>State</strong></p>
                  </Col>
                  <Col md={6}><p>{state}</p></Col>
                </Row>
              </Col>
              <Col md={6}>
                <Row>
                  <Col md={6}>
                  <p> <strong>Zip</strong></p>
                  </Col>
                  <Col md={6}><p>{zip}</p></Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Row>
                  <Col md={6}>
                   <p><strong>Facbook Url</strong></p> 
                  </Col>
                  <Col md={6}><p>{facbook}</p></Col>
                </Row>
              </Col>
              <Col md={6}>
                <Row>
                  <Col md={6}>
                  <p><strong>Instagram Url</strong></p>
                  </Col>
                  <Col md={6}><p>{instagram}</p></Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Row>
                  <Col md={6}>
                  <p><strong>Linkdin Url</strong></p>
                  </Col>
                  <Col md={6}><p>{linkdin}</p></Col>
                </Row>
              </Col>
              <Col md={6}>
                <Row>
                  <Col md={6}>
                  <p><strong>Twitter Url</strong></p>
                  </Col>
                  <Col md={6}><p>{twitter}</p></Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Row>
                  <Col md={6}>
                  <p><strong>Mail</strong></p>
                  </Col>
                  <Col md={6}><p>{mail}</p></Col>
                </Row>
              </Col>
              <Col md={6}>
                <Row>
                  <Col md={6}>
                  <p> <strong>Phone</strong></p>
                  </Col>
                  <Col md={6}><p>{phone}</p></Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Row>
                  <Col md={6}>
                  <p><strong>Whatsapp</strong></p>
                  </Col>
                  <Col md={6}><p>{whatsapp}</p></Col>
                </Row>
              </Col>
              <Col md={6}>
                <Row>
                  <Col md={6}>
                  <p><strong>Youtube Url</strong></p>
                  </Col>
                  <Col md={6}><p>{youtube}</p></Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Row>
                  <Col md={6}>
                  <p><strong>Indiamart URL</strong></p>
                  </Col>
                  <Col md={6}><p>{indiamart}</p></Col>
                </Row>
              </Col>
            </Row>
            <Row className="mt-3">
              <p>
                <strong>Top Marquee Text:- </strong>{topMarqueeTag}</p>
            </Row>
          </div>
        </div>
        {show === true && (
          <Formik
            validationSchema={schema}
            onSubmit={async (values, { resetForm }) => {
              await dispatch(updateSocialMediaSettings(values));
              dispatch(getSocialMediaSettings());
              setShow(false);
              resetForm({ values: "" });
            }}
            initialValues={{
              facbook: facbook,
              instagram: instagram,
              whatsapp: whatsapp,
              youtube: youtube,
              linkdin: linkdin,
              mail: mail,
              phone: phone,
              twitter: twitter,
              indiamart: indiamart,
              app: app,
              website: website,
              id: id,
              // websiteLogo: websiteLogo,
              address: address,
              city: city,
              state: state,
              zip: zip,
              topMarqueeTag: topMarqueeTag,
            }}
          >
            {({
              handleSubmit,
              handleChange,
              values,
              setFieldValue,
              errors,
            }) => (
              <Form className="container" onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col md={6} sm={12}>
                    <Form.Group controlId="validationFormik01">
                      <Form.Label>Facbook Url</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Facbook url"
                        name="facbook"
                        value={values.facbook}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} sm={12}>
                    <Form.Group controlId="validationFormik02">
                      <Form.Label>Instagram Url</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Instagram Url"
                        name="instagram"
                        value={values.instagram}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={6} sm={12}>
                    <Form.Group controlId="validationFormik03">
                      <Form.Label>Whatsapp</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Whatsapp"
                        name="whatsapp"
                        value={values.whatsapp}
                        onChange={handleChange}
                        isInvalid={!!errors.whatsapp}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.whatsapp}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6} sm={12}>
                    <Form.Group controlId="validationFormik03">
                      <Form.Label>Youtube URL</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Youtube"
                        name="youtube"
                        value={values.youtube}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={6} sm={12}>
                    <Form.Group controlId="validationFormik03">
                      <Form.Label>Linkdin Url</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="linkdin"
                        name="linkdin"
                        value={values.linkdin}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} sm={12}>
                    <Form.Group controlId="validationFormik03">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="phone"
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                        isInvalid={!!errors.phone}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.phone}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={6} sm={12}>
                    <Form.Group controlId="validationFormik03">
                      <Form.Label>Twitter</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="twitter"
                        name="twitter"
                        value={values.twitter}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} sm={12}>
                    <Form.Group controlId="validationFormik03">
                      <Form.Label>Indiamart URL</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="indiamart"
                        name="indiamart"
                        value={values.indiamart}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={6} sm={12}>
                    <Form.Group controlId="validationFormik03">
                      <Form.Label>App URL</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="app"
                        name="app"
                        value={values.app}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} sm={12}>
                    <Form.Group controlId="validationFormik03">
                      <Form.Label>Website URL</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Website"
                        name="website"
                        value={values.website}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={6} sm={12}>
                    <Form.Group controlId="validationFormik03">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Address"
                        name="address"
                        value={values.address}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} sm={12}>
                    <Form.Group controlId="validationFormik03">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="City"
                        name="city"
                        value={values.city}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={6} sm={12}>
                    <Form.Group controlId="validationFormik03">
                      <Form.Label>Zip</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="zip"
                        name="zip"
                        value={values.zip}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} sm={12}>
                    <Form.Group controlId="validationFormik03">
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="State"
                        name="state"
                        value={values.state}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={6} sm={12}>
                    <Form.Group controlId="validationFormik03">
                      <Form.Label>Top Marquee Text</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Top Marquee Text"
                        name="topMarqueeTag"
                        value={values.topMarqueeTag}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} sm={12}>
                    <Form.Group controlId="validationFormik03">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        name="mail"
                        value={values.mail}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="success" type="submit">
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </>
  );
}

export default SocialMediaSetting;
