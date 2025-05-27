export const rewardSite = "https://pcdealsreward.havflyinvitation.com/user-dashboard";
export const home = "/";
export const thankyou = "/thankyou";
export const checkout = "/checkout";
export const about = "/about";
export const shop = "/shop";
export const login = "/login";
export const signup = "/signup";
export const addUserAddress = "/add-user-address";
export const userDashboard = "/user-dashboard";
export const contact = "/contact";
export const dashboard = "/dashboard";
export const attributes = "/attributes";
export const roles = "/roles";
export const users = "/users";
export const userCartList = "/user-cart";
export const categories = "/categories";
export const banners = "/banners";
export const brands = "/brands";
export const coupons = "/coupons";
export const settings = "/settings";
export const permissions = "/permissions";
export const warranty = "/warranty";
export const serviceCenter = "/service-center";
export const servicecareCenter = "/servicecare-center";
export const reviews = "/reviews";
export const addProduct = "/add-product";
export const productList = "/product-list";
export const minStockList = "/min-stock-list";
export const socialMediaSetting = "/social-media-setting";
export const EmailTemplates = "/email-templates";
export const infoPages = "/pages";
export const taxClasses = "/tax-classes";
export const forgotPass = "/forgot-password";
export const verifyOtp = "/verify-otp";
export const newPassword = "/create-new-password";
export const connection = "/connect";
export const shippingCharges = "/shipping-charges";
export const trackers = "/trackers";
export const rewardSlab = "/reward-slab";
export const offers = "/offers";
export const subProducts = "/sub-products";

export const project = "/projectlist";
export const Estimation = "/costestimationlist";

export const currentUrl = window.location.href;


// common Functions
export const productRating = (times) => {
  var repeatedString = "";
  while (times > 0) {
    repeatedString += "⭐";
    times--;
  }
  return (
    <ul
      dangerouslySetInnerHTML={{ __html: !!repeatedString && repeatedString }}
    />
  );
};
export const dynamicPriceRange = (price) => {
  const keys = Object.keys(price);
  const lastKey = keys[keys.length - 1];
  const lastValue = price[lastKey];
  return lastValue
}