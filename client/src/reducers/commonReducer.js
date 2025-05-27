import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  allApi,
  multiFileUpload,
  messages,
  postApi,
  postApiFile,
} from "../helpers/apiStructure";

const initialState = {
  localStorageCartItem: !!localStorage.getItem("cartItem")
    ? JSON.parse(localStorage.getItem("cartItem"))
    : [],
  getDashBoardData: [],
  getHomePageSettingList: [],
  getAttributesData: [],
  getRolesData: [],
  getCheckoutDeatilsData: [],
  getUsersData: [],
  usersBlank: [],
  dashboardreportData: [],
  getCategoriesData: [],
  getCategoryData: [],
  getWarrantyProccessesData: [],
  getSocialMediaSettingsData: [],
  getBannersData: [],
  getSettingsData: [],
  getSettingData: [],
  getBrandsData: [],
  getCouponsData: [],
  applyCouponData: [],
  getPermissionsData: [],
  getWarrantyData: [],
  getServicesCenterData: [],
  getReviewsData: [],
  getShippingsData: [],
  getTaxgstsData: [],
  getTransactionsData: [],
  getZipcodesData: [],
  getCartlistData: [],
  getProductsData: [],
  getSingleProductData: [],
  getNewProductData: [],
  productsListData: [],
 
  productsBlank: [],
  productRatingData: [],
  getAllStatesList: [],
  fetchAddressData: [],
  getTrackersData:[],
  getCustomizeProductsList: [],
  getCustEnblProductsList: [],
  
};


var baseUrl = "http://localhost:3000";

if (window.location.host) {
  baseUrl = window.location.protocol + "//" + window.location.host;
}
//reset products list
export const resetProductList = createAsyncThunk(
  "resetProductList",
  async (data) => {
    return [];
  }
);
//resetUser list
export const resetUsersList = createAsyncThunk(
  "resetUsersList",
  async (data) => {
    return [];
  }
);
export const getDashBoard = createAsyncThunk("getDashBoard", async (data) => {
  const result = await allApi(`${baseUrl}/api/admin/dashboard`, "get");
  return result;
});































//Home page settings
export const getHomePageSetting = createAsyncThunk(
  "getHomePageSetting",
  async (data) => {
    const result = await allApi(`${baseUrl}/api/home`, "get");
    return result;
  }
);
// social media settings
export const getSocialMediaSettings = createAsyncThunk(
  "getSocialMediaSettings",
  async (body) => {
    const result = await postApi(`${baseUrl}/api/social`, "post", body);
    return result;
  }
);
export const updateSocialMediaSettings = createAsyncThunk(
  "updateSocialMediaSettings",
  async (body) => {
    const result = await postApi(
      `${baseUrl}/api/socialmedia/edit`,
      "post",
      body
    );
    await messages(result?.message, result?.status);
    return result;
  }
);
//admin dashboard
export const dashboardreport = createAsyncThunk(
  "dashboardRecord",
  async (body) => {
    const result = await postApi(
      `${baseUrl}/api/counter/reports`,
      "post",
      body
    );
   
   console.log('dgdfg',result);
   
    return result;
    
  }
);
// users manage
export const getUsers = createAsyncThunk("getUsers", async (body) => {
  const result = await postApi(`${baseUrl}/api/users`, "post", body);
  return result;
});
export const getUsersExport = createAsyncThunk("getUsersExport", async (body) => {
  const result = await postApi(`${baseUrl}/api/users/forcsv`, "post", body);
  return result;
});
//forgot password
export const sendVerificationCode = createAsyncThunk(
  "sendVerificationCode",
  async (body) => {
    const result = await postApi(`${baseUrl}/api/email/otp`, "post", body);
    await messages(result?.message, result?.status);
    return result;
  }
);
export const verifyOTP = createAsyncThunk("verifyOTP", async (body) => {
  const result = await postApi(
    `${baseUrl}/api/user/forgetPassword`,
    "post",
    body
  );
  await messages(result?.message, result?.status);
  return result;
});
export const passwordChanges = createAsyncThunk(
  "passwordChanges",
  async (body) => {
    const result = await postApi(
      `${baseUrl}/api/user/password/change`,
      "post",
      body
    );
    await messages(result?.message, result?.status);
    return result;
  }
);
// roles manage
export const addRole = createAsyncThunk("addRole", async (body) => {
  const result = await postApi(`${baseUrl}/api/role/add`, "post", body);
  await messages(result?.message, result?.status);
  return result;
});
export const getRoles = createAsyncThunk("getRoles", async (data) => {
  const result = await allApi(`${baseUrl}/api/roles`, "get");
  return result;
});
export const deleteRole = createAsyncThunk("deleteRole", async (data) => {
  const result = await allApi(`${baseUrl}/api/role/${data}`, "delete");
  await messages(result?.message, result?.status);
  return result;
});
//upload products
export const uploadProducts = createAsyncThunk(
  "uploadProducts",
  async (body) => {
    const result = await postApiFile(`${baseUrl}/api/product/upload`, "post", body);
    await messages(result?.message, result?.status);
    return result;
  }
);
//upload Users
export const uploadUsers = createAsyncThunk(
  "uploadUsers",
  async (body) => {
    const result = await postApiFile(`${baseUrl}/api/users/upload`, "post", body);
    await messages(result?.message, result?.status);
    return result;
  }
);
// Banners manage
export const addBanner = createAsyncThunk("addBanner", async (body) => {
  const result = await postApiFile(`${baseUrl}/api/banner/add`, "post", body);
  await messages(result?.message, result?.status);
  return result;
});
export const getBanners = createAsyncThunk("getBanners", async (data) => {
  const result = await allApi(`${baseUrl}/api/banners`, "get");
  return result;
});
export const deleteBanner = createAsyncThunk("deleteBanner", async (data) => {
  const result = await allApi(`${baseUrl}/api/banner/${data}`, "delete");
  await messages(result?.message, result?.status);
  return result;
});
export const updateBanner = createAsyncThunk("updateBanner", async (body) => {
  const result = await postApiFile(
    `${baseUrl}/api/banner/edit/${body?.id}`,
    "put",
    body
  );
  await messages(result?.message, result?.status);
  return result;
});
// brands manage
export const addBrand = createAsyncThunk("addBrand", async (body) => {
  const result = await postApiFile(`${baseUrl}/api/brand/add`, "post", body);
  await messages(result?.message, result?.status);
  return result;
});
export const getBrands = createAsyncThunk("getBrands", async (data) => {
  const result = await allApi(`${baseUrl}/api/brands`, "get");
  return result;
});
export const deleteBrand = createAsyncThunk("deleteBrand", async (data) => {
  const result = await allApi(`${baseUrl}/api/brand/${data}`, "delete");
  await messages(result?.message, result?.status);
  return result;
});
export const updateBrand = createAsyncThunk("updateBrand", async (body) => {
  const result = await postApiFile(
    `${baseUrl}/api/brand/edit/${body?.id}`,
    "put",
    body
  );
  // await messages(result?.message, result?.status);
  return result;
});

//estimation


export const addEstimation = createAsyncThunk("addEstimation", async (body) => {
const result = await postApi(`${baseUrl}/api/estimation/list`, "post", body);
// await messages(result?.message, result?.status);
return result;
});


export const getEstimation = createAsyncThunk("getEstimation", async (body) => {

  
  const result = await postApi(`${baseUrl}/api/estimation/add`, "post", body);

  
  if (result?.cost?.id) {
    localStorage.setItem('estimationId', result.cost.id);
  }
  // await messages(result?.message, result?.status);
 return result;
 
});
export const deleteEstimation = createAsyncThunk("deleteEstimation", async (data) => {
  const result = await allApi(`${baseUrl}/api/estimation/delete/${data}`, "delete");
  await messages(result?.message, result?.status);
  return result;
});
export const addUpdateestimation = createAsyncThunk("addUpdateestimation", async (body) => {
  const result = await postApi(`${baseUrl}/api/estimation/update`, "post", body);
  // await messages(result?.message, result?.status);
  return result;
});



//project
export const getProjects = createAsyncThunk("getProjects", async (data) => {
  const result = await allApi(`${baseUrl}/api/project/list`, "get");
 return result;
});


export const addProject = createAsyncThunk("addProject", async (body) => {
const result = await postApi(`${baseUrl}/api/project/add`, "post", body);
 await messages(result?.message, result?.status);
 return result;
});

export const deleteProject = createAsyncThunk("deleteProject", async (id) => {
 try {
   const result = await allApi(`${baseUrl}/api/project/${id}`, "delete");
  //  await messages(result?.message, result?.status);
   return result;
 } catch (error) {
  //  console.error("Failed to delete project:", error);
   throw error; 
 }
});

// export const updateProject = createAsyncThunk("updateProject", async (body) => {
//  try {
//    const result = await postApiFile(
//      `${baseUrl}/api/project/edit/${body}`,
//      "post",
//      body
//    );
//   //  await messages(result?.message, result?.status);
//    return result;
//  } catch (error) {
//    console.error("Failed to update project:", error);
//    throw error; 
//  }
// });

export const updateProject = createAsyncThunk("updateProject", async (body) => {
  const result = await postApi(
    `${baseUrl}/api/project/edit`, 
    "post",
    body
  );
  return result;
});






// Create Product
export const CreateProduct = createAsyncThunk("CreateProduct", async (body) => {
  const result = await postApi(`${baseUrl}/api/product/add`, "post", body);
  await messages(result?.message, result?.status);
  return result;
});
export const updateProduct = createAsyncThunk("updateProduct", async (body) => {
  const result = await postApi(
    `${baseUrl}/api/product/edit/${body?.id}`,
    "put",
    body
  );
  
  
  await messages(result?.message, result?.status);
  return result;
});
export const addProductImages = createAsyncThunk(
  "addProductImages",
  async (body) => {
    const result = await multiFileUpload(
      `${baseUrl}/api/product/updateimage`,
      "post",
      body
    );
    await messages(result?.message, result?.status);
    result?.status === 1 && (window.location.href = baseUrl + `/product-list`);
    result?.status === 1 && localStorage.removeItem("productId");
    localStorage.removeItem("uploadProductimg");
    localStorage.removeItem("newProductapiStatus");
    return result;
  }
);
export const productsList = createAsyncThunk("productsList", async (body) => {
const result = await postApi(`${baseUrl}/api/products`, "post", body);
  return result;
});
export const productsListExport = createAsyncThunk("productsListExport", async (body) => {
  const result = await postApi(`${baseUrl}/api/products/forcsv`, "post", body);
  return result;
});
export const similarproductions = createAsyncThunk(
  "similarproductions",
  async (body) => {
    const result = await postApi(
      `${baseUrl}/api/similarproductions`,
      "post",
      body
    );
    return result;
  }
);
export const deleteProduct = createAsyncThunk("deleteProduct", async (data) => {
  const result = await allApi(`${baseUrl}/api/product/${data}`, "delete");
  await messages(result?.message, result?.status);
  return result;
});
//Offer
export const addUpdateOffers = createAsyncThunk("addUpdateOffers", async (body) => {
  const result = await postApi(`${baseUrl}/api/offer/update`, "post", body);
  await messages(result?.message, result?.status);
  return result;
});
export const getOffers = createAsyncThunk("getOffers", async (data) => {
  const result = await allApi(`${baseUrl}/api/offers`, "get"); 
  return result;
});
//customize Offer
export const addUpdateCustomizeOffers = createAsyncThunk("addUpdateCustomizeOffers", async (body) => {
  const result = await postApi(`${baseUrl}/api/customize/offer/update`, "post", body);
  await messages(result?.message, result?.status);
  return result;
});
export const getCustomizeOffers = createAsyncThunk("getCustomizeOffers", async (data) => {
  const result = await allApi(`${baseUrl}/api/customize/offers`, "get");
  return result;
});
// coupon manage
export const addCoupon = createAsyncThunk("addCoupon", async (body) => {
  const result = await postApi(`${baseUrl}/api/coupon/add`, "post", body);
  await messages(result?.message, result?.status);
  return result;
});
export const applyCoupon = createAsyncThunk("applyCoupon", async (body) => {
  const result = await postApi(`${baseUrl}/api/coupon/apply`, "post", body);
  await messages(result?.message, result?.status);
  return result;
});
export const getCoupons = createAsyncThunk("getCoupons", async (data) => {
  const result = await allApi(`${baseUrl}/api/coupons`, "get");
  return result;
});
export const deleteCoupon = createAsyncThunk("deleteCoupon", async (data) => {
  const result = await allApi(`${baseUrl}/api/coupon/${data}`, "delete");
  await messages(result?.message, result?.status);
  return result;
});
export const updateCoupon = createAsyncThunk("updateCoupon", async (body) => {
  const result = await postApi(
    `${baseUrl}/api/coupon/edit/${body?.id}`,
    "put",
    body
  );
  await messages(result?.message, result?.status);
  return result;
});
//serial numbers
export const OrderSerialNumbers = createAsyncThunk("OrderSerialNumbers", async (body) => {
  const result = await postApi(`${baseUrl}/api/order/serialnumber`, "post", body);
  await messages(result?.message, result?.status);
  return result;
});
// setting manage
export const addSetting = createAsyncThunk("addSetting", async (body) => {
  const result = await postApi(`${baseUrl}/api/setting/add`, "post", body);
  await messages(result?.message, result?.status);
  return result;
});
export const getSettings = createAsyncThunk("getSettings", async (data) => {
  const result = await allApi(`${baseUrl}/api/settings`, "get");
  return result;
});
export const getSetting = createAsyncThunk("getSetting", async (body) => {
  const result = await postApi(`${baseUrl}/api/setting`, "post", body);
  return result;
});
export const getOpenSetting = createAsyncThunk("getOpenSetting", async (body) => {
  const result = await postApi(`${baseUrl}/api/settings/forcustomer`, "post", body);
  return result;
});
export const deleteSetting = createAsyncThunk("deleteSetting", async (data) => {
  const result = await allApi(`${baseUrl}/api/setting/${data}`, "delete");
  await messages(result?.message, result?.status);
  return result;
});
export const updateSetting = createAsyncThunk("updateSetting", async (body) => {
  const result = await postApi(
    `${baseUrl}/api/setting/edit/${body?.id}`,
    "put",
    body
  );
  await messages(result?.message, result?.status);
  return result;
});
// Permission manage
export const addPermission = createAsyncThunk("addPermission", async (body) => {
  const result = await postApi(`${baseUrl}/api/permission/add`, "post", body);
  await messages(result?.message, result?.status);
  return result;
});
export const getPermissions = createAsyncThunk(
  "getPermissions",
  async (data) => {
    const result = await allApi(`${baseUrl}/api/permissions`, "get");
    return result;
  }
);
export const deletePermission = createAsyncThunk(
  "deletePermission",
  async (data) => {
    const result = await allApi(`${baseUrl}/api/permission/${data}`, "delete");
    await messages(result?.message, result?.status);
    return result;
  }
);
export const updatePermission = createAsyncThunk(
  "updatePermission",
  async (body) => {
    const result = await postApi(
      `${baseUrl}/api/permission/edit/${body?.id}`,
      "put",
      body
    );
    await messages(result?.message, result?.status);
    return result;
  }
);
// Warranty manage
export const addWarranty = createAsyncThunk("addWarranty", async (body) => {
  const result = await postApi(
    `${baseUrl}/api/warrantyproccess/add`,
    "post",
    body
  );
  await messages(result?.message, result?.status);
  return result;
});
export const getWarranty = createAsyncThunk("getWarranty", async (data) => {
  const result = await allApi(`${baseUrl}/api/warrantyproccesses`, "get");
  return result;
});
export const deleteWarranty = createAsyncThunk(
  "deleteWarranty",
  async (data) => {
    const result = await allApi(
      `${baseUrl}/api/warrantyproccess/${data}`,
      "delete"
    );
    await messages(result?.message, result?.status);
    return result;
  }
);
export const updateWarranty = createAsyncThunk(
  "updateWarranty",
  async (body) => {
    const result = await postApi(
      `${baseUrl}/api/warrantyproccess/edit/${body?.id}`,
      "put",
      body
    );
    await messages(result?.message, result?.status);
    return result;
  }
);
// services Center manage
export const addServicesCenter = createAsyncThunk(
  "addServicesCenter",
  async (body) => {
    const result = await postApi(
      `${baseUrl}/api/servicecenter/add`,
      "post",
      body
    );
    await messages(result?.message, result?.status);
    return result;
  }
);
export const getServicesCenter = createAsyncThunk(
  "getServicesCenter",
  async (body) => {
    const result = await postApi(`${baseUrl}/api/servicecenters`, "post", body);
    return result;
  }
);
export const deleteServicesCenter = createAsyncThunk(
  "deleteServicesCenter",
  async (data) => {
    const result = await allApi(
      `${baseUrl}/api/servicecenter/${data}`,
      "delete"
    );
    await messages(result?.message, result?.status);
    return result;
  }
);
export const updateServicesCenter = createAsyncThunk(
  "updateServicesCenter",
  async (body) => {
    const result = await postApi(
      `${baseUrl}/api/servicecenter/edit/${body?.id}`,
      "put",
      body
    );
    await messages(result?.message, result?.status);
    return result;
  }
);
// Review manage
export const addReview = createAsyncThunk("addReview", async (body) => {
  const result = await postApi(`${baseUrl}/api/review/add`, "post", body);
  await messages(result?.message, result?.status);
  return result;
});
export const getReviews = createAsyncThunk("getReviews", async (data) => {
  const result = await allApi(`${baseUrl}/api/reviews`, "get");
  return result;
});
export const deleteReview = createAsyncThunk("deleteReview", async (data) => {
  const result = await allApi(`${baseUrl}/api/review/${data}`, "delete");
  await messages(result?.message, result?.status);
  return result;
});
export const updateReview = createAsyncThunk("updateReview", async (body) => {
  const result = await postApi(
    `${baseUrl}/api/review/edit/${body?.id}`,
    "put",
    body
  );
  await messages(result?.message, result?.status);
  return result;
});
// Shippings manage
export const addShipping = createAsyncThunk("addShipping", async (body) => {
  const result = await postApi(`${baseUrl}/api/shipping/add`, "post", body);
  await messages(result?.message, result?.status);
  return result;
});
export const getShippings = createAsyncThunk("getShippings", async (data) => {
  const result = await allApi(`${baseUrl}/api/shippings`, "get");
  return result;
});
export const deleteShipping = createAsyncThunk(
  "deleteShipping",
  async (data) => {
    const result = await allApi(`${baseUrl}/api/shipping/${data}`, "delete");
    await messages(result?.message, result?.status);
    return result;
  }
);
export const updateShipping = createAsyncThunk(
  "updateShipping",
  async (body) => {
    const result = await postApi(
      `${baseUrl}/api/shipping/edit/${body?.id}`,
      "put",
      body
    );
    await messages(result?.message, result?.status);
    return result;
  }
);
// reward slab
export const getRewardSlab = createAsyncThunk("getRewardSlab", async (body) => {
  const result = await postApi(`${baseUrl}/api/slab/list`, "post", body);
  return result;
});
export const addRewardSlab = createAsyncThunk("addRewardSlab", async (body) => {
  const result = await postApi(`${baseUrl}/api/slab/add`, "post", body);
  await messages(result?.message, result?.status);
  return result;
});
export const updateRewardSlab = createAsyncThunk("updateRewardSlab", async (body) => {
    const result = await postApi(`${baseUrl}/api/slab/edit/${body?.id}`, "put", body);
    await messages(result?.message, result?.status);
    return result;
  }
);
export const getOrderRewardSlab = createAsyncThunk("getOrderRewardSlab", async (body) => {
  const result = await postApi(`${baseUrl}/api/slab`, "post", body);
  return result;
});
// trackers manage
export const addTracker = createAsyncThunk("addTracker", async (body) => {
  const result = await postApi(`${baseUrl}/api/track/add`, "post", body);
  await messages(result?.message, result?.status);
  return result;
});
export const getTrackers = createAsyncThunk("getTrackers", async (data) => {
  const result = await allApi(`${baseUrl}/api/track/list`, "get");
  return result;
});
export const deleteTracker = createAsyncThunk(
  "deleteTracker",
  async (data) => {
    const result = await allApi(`${baseUrl}/api/track/delete/${data}`, "delete");
    await messages(result?.message, result?.status);
    return result;
  }
);
export const updateTracker = createAsyncThunk(
  "updateTracker",
  async (body) => {
    const result = await postApi(
      `${baseUrl}/api/track/edit/${body?.id}`,
      "put",
      body
    );
    await messages(result?.message, result?.status);
    return result;
  }
);
// taxgsts manage
export const addTaxgst = createAsyncThunk("addTaxgst", async (body) => {
  const result = await postApi(`${baseUrl}/api/taxgst/add`, "post", body);
  await messages(result?.message, result?.status);
  return result;
});
export const getTaxgsts = createAsyncThunk("getTaxgsts", async (data) => {
  const result = await allApi(`${baseUrl}/api/taxgsts`, "get");
  return result;
});
export const deleteTaxgst = createAsyncThunk("deleteTaxgst", async (data) => {
  const result = await allApi(`${baseUrl}/api/taxgst/${data}`, "delete");
  await messages(result?.message, result?.status);
  return result;
});
export const updateTaxgst = createAsyncThunk("updateTaxgst", async (body) => {
  const result = await postApi(
    `${baseUrl}/api/taxgst/edit/${body?.id}`,
    "put",
    body
  );
  await messages(result?.message, result?.status);
  return result;
});
// Transaction manage
export const addTransaction = createAsyncThunk(
  "addTransaction",
  async (body) => {
    const result = await postApi(
      `${baseUrl}/api/transaction/add`,
      "post",
      body
    );
    await messages(result?.message, result?.status);
    return result;
  }
);
export const getTransactions = createAsyncThunk(
  "getTransactions",
  async (data) => {
    const result = await allApi(`${baseUrl}/api/transactions`, "get");
    return result;
  }
);
export const deleteTransaction = createAsyncThunk(
  "deleteTransaction",
  async (data) => {
    const result = await allApi(`${baseUrl}/api/transaction/${data}`, "delete");
    await messages(result?.message, result?.status);
    return result;
  }
);
export const updateTransaction = createAsyncThunk(
  "updateTransaction",
  async (body) => {
    const result = await postApi(
      `${baseUrl}/api/transaction/edit/${body?.id}`,
      "put",
      body
    );
    await messages(result?.message, result?.status);
    return result;
  }
);
//checkout
export const getCheckoutDeatils = createAsyncThunk(
  "getCheckoutDeatils",
  async (data) => {
    const result = await allApi(`${baseUrl}/api/checkout`, "get");
    return result;
  }
);
// cart manage
export const addCart = createAsyncThunk("addCart", async (body) => {
  const result = await postApi(`${baseUrl}/api/cart/add`, "post", body);
  await messages(result?.message, result?.status);
  return result;
});
export const getCartlist = createAsyncThunk("getCartlist", async (data) => {
  const result = await allApi(`${baseUrl}/api/cartlist`, "get");
  return result;
});
export const deleteCart = createAsyncThunk("deleteCart", async (data) => {
  const result = await allApi(`${baseUrl}/api/cart/${data}`, "delete");
  await messages(result?.message, result?.status);
  return result;
});
export const updateCart = createAsyncThunk("updateCart", async (body) => {
  const result = await postApi(
    `${baseUrl}/api/cart/edit/${body?.id}`,
    "put",
    body
  );
  // await messages(result?.message, result?.status);
  return result;
});
export const emptyCartlist = createAsyncThunk("emptyCartlist", async (data) => {
  const result = await allApi(`${baseUrl}/api/cart/empty`, "get");
  return result;
});
// product wise rating
export const getProductRating = createAsyncThunk(
  "getProductRating",
  async (body) => {
    const result = await postApi(
      `${baseUrl}/api/reviewbyproducts`,
      "post",
      body
    );
    return result;
  }
);
// Product manage
export const getProducts = createAsyncThunk("getProducts", async (body) => {
  const result = await postApi(`${baseUrl}/api/backend/products`, "post", body);
  return result;
});
export const getSingleProduct = createAsyncThunk(
  "getSingleProduct",
  async (body) => {
    const result = await postApi(`${baseUrl}/api/getproduct`, "post", body);
    return result;
  }
);
//customize Product manage
export const getCustomizeProducts = createAsyncThunk(
  "getCustomizeProducts",
  async (body) => {
    const result = await postApi(
      `${baseUrl}/api/customise/main/list`,
      "post",
      body
    );
    return result;
  }
);
export const getCustomizeEnabledProducts = createAsyncThunk(
  "getCustomizeEnabledProducts",
  async (body) => {
    const result = await postApi(`${baseUrl}/api/customise/list`, "post", body);
    return result;
  }
);
export const addCustomizeProduct = createAsyncThunk(
  "addCustomizeProduct",
  async (body) => {
    const result = await postApi(`${baseUrl}/api/customise`, "post", body);
    await messages(result?.message, result?.status);
    return result;
  }
);
export const updateCustomizeProduct = createAsyncThunk(
  "updateCustomizeProduct",
  async (body) => {
    const result = await postApi(
      `${baseUrl}/api/customise/edit/${body?.id}`,
      "post",
      body
    );
    await messages(result?.message, result?.status);
    return result;
  }
);
export const deleteCustomizeProduct = createAsyncThunk(
  "deleteCustomizeProduct",
  async (body) => {
    const result = await postApi(
      `${baseUrl}/api/customise/${body?.id}`,
      "post",
      body
    );
    await messages(result?.message, result?.status);
    return result;
  }
);
export const uploadCustomizeProduct = createAsyncThunk(
  "uploadCustomizeProduct",
  async (body) => {
    const result = await postApiFile(`${baseUrl}/api/subproduct/upload`, "post", body);
    await messages(result?.message, result?.status);
    return result;
  }
);
// zipcodes manage
export const addZipcode = createAsyncThunk("addZipcode", async (body) => {
  const result = await postApi(`${baseUrl}/api/zipcode/add`, "post", body);
  await messages(result?.message, result?.status);
  return result;
});
export const getZipcodes = createAsyncThunk("getZipcodes", async (data) => {
  const result = await allApi(`${baseUrl}/api/zipcodes`, "get");
  return result;
});
// Warranty proccesses manage
export const getWarrantyProccesses = createAsyncThunk(
  "getWarrantyProccesses",
  async (data) => {
    const result = await allApi(`${baseUrl}/api/warrantyproccesses`, "get");
    return result;
  }
);
// Categories manage
// export const categoriesData = createAsyncThunk("categoriesData", async (body) => {
//   const result = await postApiFile(`${baseUrl}/api/frontend/categories`, "post", body);
//   await messages(result?.message, result?.status);
//   return result;
// });
export const getCategory = createAsyncThunk("getCategory", async (body) => {
  const result = await postApi(`${baseUrl}/api/categories`, "post", body);
   return result;
 });


export const addCategorie = createAsyncThunk("addCategorie", async (body) => {
  const result = await postApiFile(`${baseUrl}/api/category/add`, "post", body);
  // await messages(result?.message, result?.status);
  return result;
});
export const getCategories = createAsyncThunk("getCategories", async (body) => {
 const result = await postApi(`${baseUrl}/api/frontend/categories`, "post", body);
  return result;
});
export const deleteCategorie = createAsyncThunk(
  "deleteCategorie",
  async (data) => {
    const result = await allApi(`${baseUrl}/api/category/${data}`, "delete");
    // await messages(result?.message, result?.status);
    return result;
  }
);
export const updateCategorie = createAsyncThunk(
  "updateCategorie",
  async (body) => {
    const result = await postApiFile(
      `${baseUrl}/api/category/edit/${body?.id}`,
      "put",
      body
    );
    await messages(result?.message, result?.status);
    return result;
  }
);
// Attributes manage
export const addAttribute = createAsyncThunk(
  "updateAttribute",
  async (body) => {
    const result = await postApi(`${baseUrl}/api/attribute/add`, "post", body);
    await messages(result?.message, result?.status);
    return result;
  }
);
export const getAttributes = createAsyncThunk("getAttributes", async (data) => {
  const result = await allApi(`${baseUrl}/api/attributes`, "get");
  return result;
});
export const deleteAttribute = createAsyncThunk(
  "deleteAttribute",
  async (data) => {
    const result = await allApi(
      `${baseUrl}/api/attribute/${data}`,
      "delete",
      "Record is deleted successfully."
    );
    await messages(result?.message, result?.status);
    return result;
  }
);
export const updateAttribute = createAsyncThunk(
  "updateAttribute",
  async (body) => {
    const result = await postApi(
      `${baseUrl}/api/attribute/edit/${body?.id}`,
      "put",
      body
    );
    await messages(result?.message, result?.status);
    return result;
  }
);
//all states
export const getAllStates = createAsyncThunk("getAllStates", async (data) => {
  const result = await allApi(`${baseUrl}/api/states`, "get");
  return result;
});
// myprofile manage
export const getMyProfile = createAsyncThunk("getMyProfile", async (data) => {
  const result = await allApi(`${baseUrl}/api/user/profile`, "get");
  return result;
});
export const editMyProfile = createAsyncThunk("editMyProfile", async (body) => {
  const result = await postApi(
    `${baseUrl}/api/user/profile/edit`,
    "post",
    body,
    "Updated successfully."
  );
  await messages(result?.message, result?.status);
  return result;
});
// update profile form admin side
export const editProfileByAdmin = createAsyncThunk(
  "editProfileByAdmin",
  async (body) => {
    const result = await postApi(
      `${baseUrl}/api/user/edit/${body?.id}`,
      "put",
      body
    );
    await messages(result?.message, result?.status);
    return result;
  }
);
export const adminLogin = createAsyncThunk("adminLogin", async (body) => {
  const result = await postApi(`${baseUrl}/auth/login`, "post", body);
  await messages(result?.message, result?.status);
  return result;
});
//pcdeals login
export const pcdealsLogin = createAsyncThunk("pcdealsLogin", async (body) => {
  const result = await postApi(`${baseUrl}/auth/pcdeal/login`, "post", body);
  await messages(result?.message, result?.status);
  return result;
});
export const pcDealsConnectAdmin = createAsyncThunk("pcDealsConnectAdmin", async (body) => {
  const result = await postApi(`${baseUrl}/api/user/connected`, "post", body);
  await messages(result?.message, result?.status);
  return result;
});
export const fetchAddressFromPcdeals = createAsyncThunk(
  "fetchAddressFromPcdeals",
  async (body) => {
    const result = await postApi(
      `${baseUrl}/auth/pcdeal/user/profile`,
      "post",
      body
    );
    await messages(result?.message, result?.status);
    return result;
  }
);
export const userLogOut = createAsyncThunk("userLogOut", async (body) => {
  const result = await postApi(
    `${baseUrl}/auth/logout`,
    "post",
    body,
    "Your are logout successfully."
  );
  await messages(result?.message, result?.status);
  return result;
});
const userReducer = createSlice({
  name: "details",
  initialState,
  reducers: {
    increaseLocalItem: (state) => {
      state.localStorageCartItem += 1;
    },
  },
  extraReducers: {
    [resetProductList.fulfilled]: (state, action) => {
      state.productsListData = [];
    },
    
    [resetUsersList.fulfilled]: (state, action) => {
      state.getUsersData = [];
    },
    [getHomePageSetting.fulfilled]: (state, action) => {
      state.getHomePageSettingList = action.payload;
    },
    [getAllStates.fulfilled]: (state, action) => {
      state.getAllStatesList = action.payload;
    },
    [getSocialMediaSettings.fulfilled]: (state, action) => {
      state.getSocialMediaSettingsData = action.payload?.socialAccounts;
    },
    [getDashBoard.fulfilled]: (state, action) => {
      state.getDashBoardData = action.payload;
    },
    [getAttributes.fulfilled]: (state, action) => {
      state.getAttributesData = action.payload;
    },
    [CreateProduct.fulfilled]: (state, action) => {
      state.getNewProductData = action.payload?.product?.id;
      action.payload?.product?.id.length > 0 &&
        localStorage.setItem("productId", action.payload?.product?.id);
      action.payload?.status === 1 &&
        localStorage.setItem("newProductapiStatus", action.payload?.status);
    },
    [productsList.fulfilled]: (state, action) => {
      state.productsListData = [
        // ...state.productsListData,
        ...action.payload?.list,
      ];
      state.productsBlank = action.payload?.list;
    },
    [productsListExport.fulfilled]: (state, action) => {
      state.productsListExportData = action.payload?.list;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.getProductsData = action.payload?.list;
    },

    
    [similarproductions.fulfilled]: (state, action) => {
      state.similarproductionsData = action.payload;
    },
    [getRoles.fulfilled]: (state, action) => {
      state.getRolesData = action.payload;
    },
    [fetchAddressFromPcdeals.fulfilled]: (state, action) => {
      state.fetchAddressData = action.payload?.address;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.getUsersData = [...state.getUsersData, ...action.payload?.list];
      state.usersBlank = action.payload?.list;
    },
    [getUsersExport.fulfilled]: (state, action) => {
      state.getUsersExportList = action.payload?.list;
    },
    [sendVerificationCode.fulfilled]: (state, action) => {
      action.payload?.status === 1 &&
        localStorage.setItem("sendVerificationCode", action.payload?.status);
    },
    [verifyOTP.fulfilled]: (state, action) => {
      action.payload?.status === 1 &&
        localStorage.setItem("verifyOTP", action.payload?.status);
    },
    [passwordChanges.fulfilled]: (state, action) => {
      action.payload?.status === 1 &&
        localStorage.setItem("passwordChanges", action.payload?.status);
    },
    // [dashboardRecord.fulfilled]: (state, action) => {
    //   state.dashboardRecordData = action.payload?.list;
    // },
    [dashboardreport.fulfilled]: (state, action) => {
      state.dashboardreportData = action.payload;
    },
   
    
    [getCategories.fulfilled]: (state, action) => {
      state.getCategoriesData = action.payload;
    },
    [getCategory.fulfilled]: (state, action) => {
      state.getCategoryData = action.payload;
    },
    [getWarrantyProccesses.fulfilled]: (state, action) => {
      state.getWarrantyProccessesData = action.payload;
    },
    [getServicesCenter.fulfilled]: (state, action) => {
      state.getServicesCenterData = action.payload;
    },
    [getBanners.fulfilled]: (state, action) => {
      state.getBannersData = action.payload;
    },
    [getBrands.fulfilled]: (state, action) => {
      state.getBrandsData = action.payload;
    },
    [getProjects.fulfilled]: (state, action) => {
      state.projectListData = action.payload?.list;
      
    },
    [addEstimation.fulfilled]: (state, action) => {
   state.EstimationListData = action.payload?.list;
      
    },
    [ getEstimation.fulfilled]: (state, action) => {
      state. getEstimationData = action.payload?.list;
         
       },
   
    [getCheckoutDeatils.fulfilled]: (state, action) => {
      state.getCheckoutDeatilsData = action.payload;
    },
    [getCoupons.fulfilled]: (state, action) => {
      state.getCouponsData = action.payload;
    },
    [applyCoupon.fulfilled]: (state, action) => {
      state.applyCouponData = action.payload;
      action.payload?.status === 1 &&
        localStorage.setItem("couponCode", action.payload?.status);
      action.payload?.status === 1 &&
        localStorage.setItem("couponAmount", action.payload?.coupon?.amount);
    },
    [getSettings.fulfilled]: (state, action) => {
      state.getSettingsData = action.payload;
    },
    [getSetting.fulfilled]: (state, action) => {
      state.getSettingData = action.payload;
    },
    [getOpenSetting.fulfilled]: (state, action) => {
      state.getSettingData = action.payload;
    },
    [getPermissions.fulfilled]: (state, action) => {
      state.getPermissionsData = action.payload;
    },
    [getWarranty.fulfilled]: (state, action) => {
      state.getWarrantyData = action.payload;
    },
    [getReviews.fulfilled]: (state, action) => {
      state.getReviewsData = action.payload;
    },
    [getShippings.fulfilled]: (state, action) => {
      state.getShippingsData = action.payload;
    },
    [getTrackers.fulfilled]: (state, action) => {
      state.getTrackersData = action.payload;
    },
    [getRewardSlab.fulfilled]: (state, action) => {
      state.rewardSlabList = action.payload?.list;
    },
    [getOrderRewardSlab.fulfilled]: (state, action) => {
      state.orderRewardSlab = action.payload;
    },
    [getTaxgsts.fulfilled]: (state, action) => {
      state.getTaxgstsData = action.payload;
    },
    [getTransactions.fulfilled]: (state, action) => {
      state.getTransactionsData = action.payload;
    },
    [getZipcodes.fulfilled]: (state, action) => {
      state.getZipcodesData = action.payload;
    },
    [getCartlist.fulfilled]: (state, action) => {
      state.getCartlistData = action.payload;
    },
    [getCustomizeProducts.fulfilled]: (state, action) => {
      state.getCustomizeProductsList = action.payload;
    },
    [getCustomizeEnabledProducts.fulfilled]: (state, action) => {
      state.getCustEnblProductsList = action.payload;
    },
    // [getProducts.fulfilled]: (state, action) => {
    //   state.getProductsData = action.payload;
    // },
    [getOffers.fulfilled]: (state, action) => {
      state.getOffersData = action.payload?.offers;
    },
    [getCustomizeOffers.fulfilled]: (state, action) => {
      state.getCustomizeOffersData = action.payload?.offers;
    },
    [getProductRating.fulfilled]: (state, action) => {
      state.productRatingData = action.payload?.list;
    },
    [getSingleProduct.fulfilled]: (state, action) => {
      state.getSingleProductData = action.payload;
    },
    [getMyProfile.fulfilled]: (state, action) => {
      state.getMyProfileData = action.payload;
    },
    [editMyProfile.pending]: (state, action) => {
      state.editMyProfileMsg = "Please Wait......";
    },
    [editMyProfile.fulfilled]: (state, action) => {
      state.editMyProfileMsg = "Your profile is edit successfully.";
    },
    [editMyProfile.rejected]: (state, action) => {
      state.editMyProfileMsg = action?.error?.message;
    },
    [adminLogin.fulfilled]: (state, action) => {
      if (action.payload.status === 1) {
        localStorage.setItem("x-auth-token", action.payload.token);
        localStorage.setItem("userRole", action.payload?.me?.role?.name);
        localStorage.setItem("slug", action.payload?.me?.role?.slug);
        localStorage.setItem("username", action.payload?.me?.email);
        action.payload?.me?.pcdealUserAddressid &&
          localStorage.setItem(
            "pcdealUserAddressid",
            action.payload?.me?.pcdealUserAddressid
          );
      }
    },
    [addProductImages.fulfilled]: (state, action) => {
      localStorage.setItem("uploadProductimg", action.payload?.status);
    },
  },
});

export const { increaseLocalItem } = userReducer.actions;
export default userReducer.reducer;
