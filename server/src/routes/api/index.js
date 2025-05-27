import { Router } from 'express';
import Joi from 'joi';
import { addUserSchema, addUsersSchema } from '../../services/validators';
import requireJwtAuth from '../../middleware/requireJwtAuth';
import { requireUserAuth } from '../../middleware/requireLocalAuth';
import { notification } from '../../features/Notification/';
//import rolesRoutes from './roles';
//import usersRoutes from './users';
import errLogger from './logger';
import Category from '../../features/Category';
import Attribute from '../../features/Attribute';
import Product from '../../features/Product'; 
import Dashboard from '../../features/Dashborad';
import User from '../../features/User';
import Role from '../../features/Role';
import Brand from '../../features/Brand';
import Setting from '../../features/Setting';
import Payment from '../../features/Payment';
import Permission from '../../features/Permission';
import Cost from '../../features/Cost';
import TaxGst from '../../features/TaxGst';
import Transaction from '../../features/Transaction';
import Order from '../../features/Order';
import Home from '../../features/Home';
import Project from '../../features/Project';
import { uploadDestination } from '../../helper/fileuploader';
import Page from '../../features/Pages';
import { emailTemplates, emailTemplate, otp, rateLimiter } from '../../helper/common';
import counter from '../../helper/counter';
import customise from '../../features/Product/customisdIndex';
import importFiles from '../../helper/importExport';
//bettingType

const router = Router();

// Role routing
/*
router.get('/roles', Category.list);
router.post('/role/add', Category.add);
router.put('/role/edit/:id', Category.edit);
router.delete('/role/edit/:id', Category.delete);

router.put('/user/edit/:id', Category.edit);
 

router.delete('/user/edit/:id', Category.delete);
*/

// cost Estimation

router.post('/estimation/add', requireJwtAuth, Cost.estimationCreate);
router.post('/estimation/update', requireJwtAuth, Cost.estimationUpdate);
router.post('/estimation/list', requireJwtAuth, Cost.list);
router.post('/estimation/totalEstimation',requireJwtAuth, Cost.totalEstimation);
router.delete('/estimation/delete/:id', requireJwtAuth, Cost.del);

router.get('/home', Home.getHomePage);

router.get('/roles', Role.list);
router.post('/role/add', Role.create);
router.put('/role/edit/:id', Role.update);


// adminDashboard
// User routing
//requireJwtAuth

router.post('/users/forcsv', requireJwtAuth, User.users);
router.post('/users', requireJwtAuth, User.list);
router.post('/latestupdated/users', requireJwtAuth, User.latestUpdated);
router.post('/user/add', User.create);
router.post('/user/signup', User.create);
// updateProfile, getProfile
router.get('/user/profile', requireJwtAuth, User.getProfile);
router.post('/user/profile',  User.userProfile);
router.post('/user/profile/edit', requireJwtAuth, User.updateProfile);

// Address
router.post('/user/address/add', requireJwtAuth, User.addAddress);
router.put('/user/address/edit', requireJwtAuth, User.updateAddress);
router.put('/user/edit/:id', requireJwtAuth, User.update);
router.get('/user/address', requireJwtAuth, User.getAddress);
//router.delete('/user/address/:addresskey',User.removeAddress);
router.post('/user/password/change', User.updatePassword);
router.post('/user/forgetPassword', User.forgetPassword);
router.post('/user/verifification',requireJwtAuth, User.verifification);
router.post('/user/cashback/add',requireJwtAuth, User.addwallet);


router.get('/admin/dashboard', requireJwtAuth, Dashboard.adminDashboard);

// Product routing
//requireJwtAuth

router.post('/backend/products', requireJwtAuth, Product.list);
router.post('/products', Product.listForFrontEnd);
router.post('/products/forcsv',requireJwtAuth, Product.products);
router.post('/getproduct', Product.getproduct);
router.post('/getproduct/limits', Product.letestProduct);
//
router.post('/product/add', requireJwtAuth, Product.create);
router.put('/product/edit/:id', requireJwtAuth, Product.update);
router.delete('/product/:id', requireJwtAuth, Product.del);
router.post('/similarproductions', Product.similarproductions);

router.post('/customise', customise.create)
router.post('/customise/main/list', customise.mainlist)
router.post('/customise/list', customise.list)
router.post('/customise/product', customise.single)
router.post('/customise/:id', customise.remove)
router.post('/customise/edit/:id', customise.edit)


// req.body.product, req.body.deleteKey
router.post('/product/deleteimage', requireJwtAuth, Product.deleteImage);
// req.body.product, images
router.post('/product/updateimage', requireJwtAuth, uploadDestination('products').any('images'), Product.updateImage);


//router.put('/page/edit/:id', Page.update);

// For Varient
//  router.get('/varients/:productid', requireJwtAuth, Product.addVarient);
//  router.post('/varient/:productid/add', requireJwtAuth, uploadDestination('products').any('images'), Product.addVarient);
//  router.put('/varient/edit/:id', requireJwtAuth, uploadDestination('products').any('images'), Product.updateVarient);

//varient
// Page - list,create, update, listFrontEnd, getPage
router.get('/pages', Page.list);
router.get('/page/list', Page.listFrontEnd)
router.post('/page/add', Page.create);
router.put('/page/edit/:id', Page.update);
router.delete('/page/:id', Page.remove);
router.post('/page/:slug', Page.getPage);
router.post('/editor', uploadDestination('cdEditor').single('upload'), Page.ckfileUploader)

// Categories routing 
// requireJwtAuth
router.get('/attributes', requireJwtAuth, Attribute.list);
router.get('/attribute/list', Attribute.listFrontEnd);
router.post('/attribute/add', requireJwtAuth, Attribute.create);
router.put('/attribute/edit/:id', requireJwtAuth, Attribute.update);
router.delete('/attribute/:id', requireJwtAuth, Attribute.del);


// Project routing
router.get('/project/list', requireJwtAuth, Project.list);
router.post('/project/add', requireJwtAuth, Project.create);
router.post('/project/edit', requireJwtAuth, Project.update);
router.delete('/project/:id', requireJwtAuth, Project.del);


// Categories routing 
//requireJwtAuth
router.post('/frontend/categories', Category.frontEndlist);
router.post('/categories', requireJwtAuth, Category.list);
router.post('/category/add', requireJwtAuth, uploadDestination('categories').single('image'), Category.create);
router.put('/category/edit/:id', requireJwtAuth, uploadDestination('categories').single('image'), Category.update);
router.delete('/category/:id', requireJwtAuth, Category.del);
router.post('/childcategorys', Category.childCategory)


// Brands 
//requireJwtAuth
router.get('/brands', requireJwtAuth, Brand.list);
router.get('/frontend/brands', Brand.frontEndList);
router.post('/brand/add', requireJwtAuth, uploadDestination('brand').single('image'), Brand.create);
router.put('/brand/edit/:id', requireJwtAuth, uploadDestination('brand').single('image'), Brand.update);
router.delete('/brand/:id', requireJwtAuth, Brand.del);



// Settings routing 
// requireJwtAuth
router.get('/settings', requireJwtAuth, Setting.list);
router.post('/settings/forcustomer',  Setting.settings);
router.post('/setting/add', requireJwtAuth, Setting.create);
router.put('/setting/edit/:id', requireJwtAuth, Setting.update);
router.delete('/setting/:id', requireJwtAuth, Setting.del);
router.post('/setting', requireJwtAuth, Setting.singleSetting);
router.post('/offer/update',requireJwtAuth,Setting.offerUpdate)
router.get('/offers',Setting.getOffers)


router.post('/customize/offer/update',requireJwtAuth,Setting.customizeofferUpdate)
router.get('/customize/offers',Setting.customizeofferGet)



// Payment routing 
router.get('/payments', requireJwtAuth, Payment.list);
router.post('/payment/add', requireJwtAuth, Payment.create);
router.put('/payment/edit/:id', requireJwtAuth, Payment.update);
router.delete('/payment/:id', requireJwtAuth, Payment.del);

router.post('/paytmipn', Payment.paymentNotification);
router.post('/paytm/returnurl/:paymentid', Payment.paytmreturn);

// Permission routing
router.get('/permissions', requireJwtAuth, Permission.list);
router.post('/permission/add', requireJwtAuth, Permission.create);
router.put('/permission/edit/:id', requireJwtAuth, Permission.update);
router.delete('/permission/:id', requireJwtAuth, Permission.del);



// Review routing
// requireJwtAuth
router.get('/taxgsts', TaxGst.list);
router.get('/frontend/taxgst', TaxGst.listForFrontEnd);
router.post('/taxgst/add', TaxGst.create);
router.put('/taxgst/edit/:id', TaxGst.update);
//router.delete('/taxgst/:id', TaxGst.del);



// Transaction routing
router.get('/transactions', requireJwtAuth, Transaction.list);
router.post('/transaction/add', requireJwtAuth, Transaction.create);
router.put('/transaction/edit/:id', requireJwtAuth, Transaction.update);
router.delete('/transaction/:id', requireJwtAuth, Transaction.del);

// Transaction routing
router.post('/admin/orders', requireJwtAuth, Order.list);
router.put('/admin/order/status/:id', requireJwtAuth, Order.updateStatus)
router.post('/order/create', requireJwtAuth, Order.confirmOrder);
router.post('/orders/forcsv',requireJwtAuth,Order.orders)
// Get order details
router.get('/order/detail/:id', requireJwtAuth, Order.getOrder);

router.post('/orders', requireJwtAuth, requireUserAuth, Order.ownOrderList);
// checkOrderStatus, IpnStatusUPI
router.post('/order/ipnstatusupi', requireJwtAuth, requireUserAuth, Order.ipnStatusUPI);
router.post('/order/checkorderstatus', requireJwtAuth, requireUserAuth, Order.checkOrderStatus);
router.post('/order/recreate', requireJwtAuth, Order.reOrderGen)
router.post('/order/serialnumber', Order.serialNumber)


//router.use('/roles', rolesRoutes);
//router.use('/users', usersRoutes);
//router.use('/errorlog', errLogger);
// notifincation for android

router.get('/notification', notification);
router.post('/template', emailTemplate)
router.get('/templates', emailTemplates)



router.post('/counter/reports', counter.counterReports)
router.post('/email/otp', otp)


router.post('/product/upload', uploadDestination('products').single('products'), importFiles.productImport)
router.post('/users/upload', uploadDestination('users').single('users'), importFiles.userUpload)
router.post('/subproduct/upload', uploadDestination('subproduct').single('subproduct'), importFiles.subproduct)
// router.get('/users/file', userimport)


export default router;