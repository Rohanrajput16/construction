import React from "react";
import Slider from "react-slick";
import DealsOftheDaySlider from "./DealsOftheDaySlider";
import ElectronicDigitalProductsSlider from "./ElectronicDigitalProductsSlider";

const DealsOfTheDay = () => {
   

  return (
    <>
 <section className="deal__area pb-40 pt-40">
 <div className="container">
 <div className="row">
 <div className="col-xl-6 mb-40 col-lg-6">
 <div className="section__head d-md-flex justify-content-between mb-20">
                                <div className="section__title">
                                    <h3>Deals<span>Of The Day</span></h3>
                                </div>
                            </div>
<DealsOftheDaySlider/>
</div>

<div className="col-xl-6 mb-20 col-lg-6">
<div className="section__head d-md-flex justify-content-between mb-20">
                                <div className="section__title">
                                <h3>Electronic<span>& DigitalProducts</span></h3>
                                     
                                </div>
                            </div>
<ElectronicDigitalProductsSlider/>
</div>

</div>
</div>
</section>
           
    </>
  );
};

export default DealsOfTheDay;
