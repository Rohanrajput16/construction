import React from "react";

const Features = (props) => {
  return (
    <>
      <section className={`mt-5 shipping-section ${props?.mobileHide}`}>
        <div className="container">
          <div className="row p-4 m-0 our-features remove-cursore-style">
            <div className="col  fShipping d-flex r-border">
              <p className="pt-2 pb-2">
                <span className="font-700">Fast Shipping</span>
                <br />
                <span>Fast Shipping</span>
              </p>
            </div>
            <div className="col moneyguarantee d-flex r-border">
              <p className="pt-2 pb-2">
                <span className="font-700">Lowest Rates</span>
                <br />
                <span>Save money with lowest rates</span>
              </p>
            </div>
            <div className="col onlinesupport d-flex r-border">
              <p className="pt-2 pb-2">
                <span className="font-700">Easy Replacement</span>
                <br />
                <span>Pick & Drop Facility</span>
              </p>
            </div>
            <div className="col securepayment d-flex">
              <p className="pt-2 pb-2">
                <span className="font-700">Secure Payment</span>
                <br />
                <span>All Payment Method</span>
              </p>
            </div>
            {/* <div className="col memberDiscount d-flex ">
                        <p className="pt-2 pb-2">
                        <span className="font-700">Member Discount</span><br/>
                        <span>Upto 40% Discount</span>
                        </p>
                    </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
