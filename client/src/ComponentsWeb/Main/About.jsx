import React from "react";
import Footer from "../Sub/Footer";
import webBanner from "../../images/webBanner.jpg";
import CommonHeader from "../Sub/CommonHeader";
import Banner from "../Sub/Banner";
import { Col, Row } from "react-bootstrap";
import BrandsLogo from "../Sub/BrandsLogo";

const About = () => {
  let width = window.innerWidth;
  return (
    <>
      <CommonHeader />
      <div>
        <Banner bannerImg={webBanner} />
      </div>
      <div className="container-fluid">
        <div className={`page-main ${width >= 468 && "p-5"}`}>
          <Row>
            <h1 className="mb-4">ABOUT US</h1>
            <p>
            Our company (<b>Arinandana Trading</b>)
            </p>
            {/* <div className="border-y mb-4">
              <h2 className="mb-0">
                Lorem ipsum <span>dolor sit amet</span>, consectetur adipiscing
                elit. Nunc hendrerit tellus et nisi ultra trices, eu feugiat
                sapien commodo. Praesent vitae ipsum et risus.
              </h2>
            </div> */}
            <p>
            Broadly we are working in following items.
            </p>
            <p className="mb-0">1. Clothes</p>
            <p className="mb-0">2. Men clothes</p>
            <p className="mb-0">3. Women clothes</p>
            <p>
            We have more than <b>500</b> different products available.
            </p>
            <p>
            We are supplying material in <b>PAN INDIA</b> 
            </p>
            <p>With this website we want to give <b>minimum</b> price directly/indirectly to our dealers.</p>
            <p>ARINANDANA TRADING PRIVATE LIMITED<br/>
3RD FLOOR 7, GRANT LANE<br/>
KOLKATA<br/>
BOWBAZAR (KOLKATA) KOLKATA-700012<br/>
WEST BENGAL<br/>
TEL. NO.:6289526299<br/>
Email: arinandanatrading@gmail.com
</p>
           
          </Row>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
