import { Router } from 'express';
import { checkpermission, verifyToken, treeUnderUser, getSettings } from '../../helper/common';
import Product from './product';
import Varient from './varient';
import { sulgValidation } from '../../services/validators';
import Joi from 'joi';
import { emailmessage } from '../Notification/email';
import TaxGst from '../TaxGst/taxgst';
import fs from 'fs';
import User from '../User/user';
import Order from '../Order/order';
import { path } from 'dotenv/lib/env-options';
import { log } from 'winston';
import Category from '../Category/category';
import { match } from 'assert';
let logger = require('../../services/logger');

const router = Router();
const ObjectId = require('mongoose').Types.ObjectId;

// /backend/products
const list = async (req, res) => {
  // Default Response
  let response = {
    status: 0,
    message: 'Issue in product list',
  };

  try {
    let numberOfRecords = 50;
    let page = req.body.page ? req.body.page : 1;

    if (req.user.role) {
      let responsePermission = await checkpermission(req.user.role.slug, 'authorised');
      if (responsePermission.status != 1) {
        return res.json(responsePermission);
      }
    }

    let filters = {};
    if(req.user.role.slug != 'admin'){
      filters.user = req.user.id;
    }

    // if (req.body.status) {
    //   filters.status = false;
    // }


    // if(req.body.startDate && req.body.endDate){
    //   filters.createdAt = {
    //     $gte: new Date(startDate),
    //     $lte: new Date(endDate)
    //   }
    // }

    filters.softDelete = false;
    if (req.body.categories != null) {
      let categories = [];
      for (const singleCategory of req.body.categories) {
        categories.push(ObjectId(singleCategory));
      }
      if (categories.length) {
        filters["categories._id"] = { $in: categories };
      }
    }


    if (req.body.search) {
      filters['$or'] = [
        { name: { '$regex': req.body.search, $options: 'i' } },
        { slug: { '$regex': req.body.search, $options: 'i' } },
        { sku: { '$regex': req.body.search, $options: 'i' } },
      ]
    }

    // Updated by vikram
    // check inactive categories in product and filter out
  //   let inActiveCatListQuery = await Category.find({softDelete: false, status: false}, {_id:1}).sort({ orderby: 1 });

  //   let inActiveCats = [];
  //   for (const singleCat of inActiveCatListQuery) {
  //     inActiveCats.push(singleCat._id);
  //   }

  //  // return res.json(inActiveCats);

  //   if(inActiveCats.length) {
  //     filters["categories._id"] = {$nin : inActiveCats}
  //   }

    
    let list = await Product.find(filters)
      .sort({ orderby: 1 })
      .skip((page - 1) * numberOfRecords)
      .limit(numberOfRecords)
      .populate({
        path: 'categories._id', 
        select: 'name'
        // match: {status : true}
    })

    response.list = list;
    response.status = 1;
    response.message = '';

    return res.json(response);
  } catch (err) {
    logger.error(err.message, { metadata: err });
    response.message = err.message || err.toString();
    response.status = 0;

    return res.json(response);
  }
};
const products = async (req, res) => {
  // Default Response
  let response = {
    status: 0,
    message: 'Issue in product list',
  };

  try {

    let filters = {};

  

    if (req.body.status) {
      filters.status = false;
    }


    filters.softDelete = false;
    if (req.body.categories != null) {
      let categories = [];
      for (const singleCategory of req.body.categories) {
        categories.push(ObjectId(singleCategory));
      }
      if (categories.length) {
        filters.categories = { $in: categories };
      }
    }


    if (req.body.search) {
      filters['$or'] = [
        { name: { '$regex': req.body.search, $options: 'i' } },
        { slug: { '$regex': req.body.search, $options: 'i' } },
        { sku: { '$regex': req.body.search, $options: 'i' } },
      ]
    }


    let list = await Product.find(filters)
      .sort({ orderby: 1 })
      .populate('categories')

    response.list = list;
    response.status = 1;
    response.message = '';

    return res.json(response);
  } catch (err) {
    logger.error(err.message, { metadata: err });
    response.message = err.message || err.toString();
    response.status = 0;

    return res.json(response);
  }
};
// /products
const listForFrontEnd = async (req, res) => {
  // Default Response
  let response = {
    status: 0,
    message: 'Issue in product list',
  };

  try {
    let numberOfRecords = 50;
    let page = req.body.page ? req.body.page : 1;

    let filters = {
      status : true
    };
    // filters.softDelete = { $ne: true };
    // filters.status = { $ne: false };
    // filters.instock = { $ne: false };

    // return res.json(filters);
    // let categories = [];
    if (req.body.categories != null) {
      let categories = [];
      for (const singleCategory of req.body.categories) {
        categories.push(ObjectId(singleCategory));
      }
      if (categories.length) {
        filters["categories._id"] = { $in: categories };
      }
    }


    if (req.body.minprice || req.body.maxprice) {
      let categories = [];
      for (const singleCategory of req.body.categories) {
        categories.push(ObjectId(singleCategory));
      }
      filters.sale = {};
      let minprice = req.body.minprice ? req.body.minprice : 1;
      let maxprice = req.body.maxprice ? req.body.maxprice : 100000;

      if (minprice && maxprice) {
        filters.sale = { $gte: minprice, $lte: maxprice };
      }
    }


    if (req.body.search) {
      filters['$or'] = [

        { name: { '$regex': req.body.search, $options: 'i' } },
        { slug: { '$regex': req.body.search, $options: 'i' } },
        { sku: { '$regex': req.body.search, $options: 'i' } },
      ]
    }

    let list = await Product.find(filters)
    .sort({ orderby: 1 })
    .skip((page - 1) * numberOfRecords)
    .limit(numberOfRecords)
    .populate({
      path: 'categories._id'
  })

    response.list = list;
    response.status = 1;
    response.message = '';

    return res.json(response);
  } catch (err) {
    logger.error(err.message, { metadata: err });
    response.message = err.message || err.toString();
    response.status = 0;

    return res.json(response);
  }
};

const letestProduct = async (req, res) => {
  // Default Response
  let response = {
    status: 0,
    message: 'Issue in product list',
  };

  try {
    let counter = req.body.counter ? req.body.counter : 8;
    let page = req.body.page ? req.body.page : 1;

    let filters = {};
    filters.softDelete = false;
    filters.status = true;
    filters.instock = true;

    if (req.body.categories != null) {
      let categories = [];
      for (const singleCategory of req.body.categories) {
        categories.push(ObjectId(singleCategory));
      }
      if (categories.length) {
        filters.categories = { $in: categories };
      }
    }

    if (req.body.minprice || req.body.maxprice) {
      let categories = [];
      for (const singleCategory of req.body.categories) {
        categories.push(ObjectId(singleCategory));
      }
      // filters.sale = {};
      // if (req.body.minprice) {
      //   filters.sale[$gte] = parseInt(req.body.minprice);
      // }

      // if (req.body.maxprice) {
      //   filters.sale[$lte] = parseInt(req.body.maxprice);
      // }
    }


    if (req.body.search) {
      filters["$or"] = [

        { name: { '$regex': req.body.search, $options: 'i' } },
        { slug: { '$regex': req.body.search, $options: 'i' } },
        { sku: { '$regex': req.body.search, $options: 'i' } },
      ]
    }


    let list = await Product.find(filters)
      .skip(0)
      .limit(counter)
      .sort({ orderby: 1 })
      .populate('categories')
    // let products = list.map((key) => {  return ObjectId(key._id)});
    // let reviews = await Review.find({ product: { $in: products } });
    // let avgRating = {};
    // let avg = 0;
    // for (let ratings of reviews) {
    //   avg += ratings.rating;
    //   avgRating[ratings.product] = avg;
    // }

    response.list = list;
    // response.avgRating = avgRating
    response.status = 1;
    response.message = '';
    return res.json(response);
  } catch (err) {
    logger.error(err.message, { metadata: err });
    response.message = err.message || err.toString();
    response.status = 0;

    return res.json(response);
  }
};

const getproduct = async (req, res) => {
  // Default Response
  let response = {
    status: 0,
    message: 'Issue in single product.',
  };

  try {
    let filters = {
      slug: req.body.slug,
      softDelete: false,
      status: true,
      instock: { $ne: false },
    };





    let product = await Product.findOne(filters)
      .populate('categories')


    // let id = product.id ? product.id : product._id;

    // response.avgRating = await ReviewController.getProductReviewRating([id]);
    response.product = product;
    response.status = 1;
    response.message = '';

    return res.json(response);
  } catch (err) {
    logger.error(err.message, { metadata: err });
    response.message = err.message || err.toString();
    response.status = 0;

    return res.json(response);
  }
};

// Add
// Only admin/shop manager
const create = async (req, res) => {
  // Default Response
  let response = {
    status: 0,
    message: 'Issue in create product',
  };

  try {
    
    
    if (req.user.role) {
      let responsePermission = await checkpermission(req.user.role.slug, 'authorised');
      if (responsePermission.status != 1) {
        return res.json(responsePermission);
      }
    }
    
    
    // multiple categories
    let categories = [];
    if (req.body.categories != null) {
      for (let singleCategory of req.body.categories) {
        let item = {};
        item._id = ObjectId(singleCategory.category);
        if(singleCategory.weight){
          item.amountInOneCubicMeter = singleCategory.weight;
          item.wtOrQty = 0;
        }else{
          item.amountInOneCubicMeter = singleCategory.amountInOneCubicMeter;
          item.wtOrQty = 1;
        }
        categories.push(item);
      }
    }

    let updationName = req.body.name;
    
    let name = req.body.name;
    if(req.body.size){
      name = name + " " + req.body.size;
    }

    let data = {
      // Basic information
      updationName: updationName,
      name: name,
      slug: name,
      description: req.body.description,
      user: req.user.id,
    
      
      // Price
      price: req.body.price,
      size: req.body.size,

      categories: categories,
      images: [],
      status: req.body.status,
    };

    // if ((req.body.gstTax == 'exclusive') && (req.body.tax_class)) {
    //     let gstpercentage = await TaxGst.findById({ _id: req.body.tax_class }, { percentage: 1 })
    //     data.sale = parseInt(req.body.sale) + (req.body.sale * parseInt(gstpercentage.percentage) / 100)
    // }


    if (req.body.orderby) {
      data.orderby = req.body.orderby
    }

    // if (req.body.minStockQty) {
    //   data.minStockQty = req.body.minStockQty;
    // }

    if (req.body.defaultImage) {
      data.defaultImage = req.body.defaultImage
    }

    // Create product
    let product = await Product.create(data);

    response.product = product;
    response.status = 1;
    response.message = 'Successfully Add New Product';


    return res.json(response);
  } catch (err) {
    logger.error(err.message, { metadata: err });
    response.message = err.message || err.toString();
    response.status = 0;

    return res.json(response);
  }
};

const updateImage = async (req, res) => {
  // Default Response
  let response = {
    status: 0,
    message: 'Update product images',
  };

  try {
    if (req.user.role) {
      let responsePermission = await checkpermission(req.user.role.slug, 'authorised');
      if (responsePermission.status != 1) {
        return res.json(responsePermission);
      }
    }
    // multiple images
    let images = [];
    for (const file of req.files) {
      images.push(file.path);
    }

    if (req.body.images != undefined && req.body.images.length) {
      for (const singleImagePath of req.body.images) {
        images.push(singleImagePath);
      }
    }



    let productId = req.body.product;

    // Create product
    let product = await Product.findById(productId);

    product.images = images;

    if (req.body.defaultImage) {
      product.defaultImage = req.body.defaultImage;
    }

    await product.save();

    response.product = product;
    response.status = 1;
    response.message = 'Image upload';

    return res.json(response);
  } catch (err) {
    logger.error(err.message, { metadata: err });
    response.message = err.message || err.toString();
    response.status = 0;

    return res.json(response);
  }
};

const deleteImage = async (req, res) => {
  // Default Response
  let response = {
    status: 0,
    message: 'Update product images',
  };

  try {
    if (req.user.role) {
      let responsePermission = await checkpermission(req.user.role.slug, 'authorised');
      if (responsePermission.status != 1) {
        return res.json(responsePermission);
      }
    }

    let productId = req.body.product;
    let deleteKey = req.body.deleteKey;

    // Create product
    let product = await Product.findById(productId);

    let allImages = product.images;

    product.images = allImages.filter((element, index) => index != deleteKey);

    await product.save();

    response.images = product.images;
    response.status = 1;
    response.message = 'Product Image has been deleted';

    return res.json(response);
  } catch (err) {
    logger.error(err.message, { metadata: err });
    response.message = err.message || err.toString();
    response.status = 0;

    return res.json(response);
  }
};

// Only admin/shop manager
const update = async (req, res) => {
  // Default Response
  let response = {
    status: 0,
    message: 'Issue in update product',
  };

  try {

    let product = {}

    // Basic information
    if (req.body.defaultImage) {
      product.defaultImage = req.body.defaultImage
    }

    let categories = [];
    if (req.body.categories != null) {
      for (let singleCategory of req.body.categories) {
        let item = {};
        item._id = ObjectId(singleCategory.category)
        if(singleCategory.weight){
          item.amountInOneCubicMeter = singleCategory.weight;
          item.wtOrQty = 0;
        }else{
          item.amountInOneCubicMeter = singleCategory.amountInOneCubicMeter;
          item.wtOrQty = 1;
        }
        categories.push(item);
      }
    }
    product.categories = categories;

    let updationName = req.body.name;
    product.updationName = updationName;
    let name;
    if (req.body.name) {
      name = req.body.name;
      product.name = name;
    }
    if(req.body.size){
      product.size = req.body.size;
      name = name + " " + req.body.size;
      product.name = name;
    }
    if (req.body.name) {
      product.slug = name;
    }
    if (req.body.description || req.body.description == "") {
      product.description = req.body.description;
    }


    if(req.body.price){
      product.price = req.body.price;
    }


    // amountinOneCubicMeter
    if (req.body.amountinOneCubicMeter >= 0) {
      product.amountinOneCubicMeter = req.body.amountinOneCubicMeter;
    }


    // Other things
    if (req.body.weight || (req.body.weight > -1)) {
      product.weight = req.body.weight;
    }
  

    if (req.body.instock) {
      product.instock = req.body.instock
    } else if (req.body.instock == false) {
      product.instock = req.body.instock
    }

    if (req.body.images) {
      product.images = req.body.images;
    }
    console.log("stutas",req.body.status);
    if (req.body.status || req.body.status == false) {
      product.status = req.body.status;
      
    }

    if (req.body.orderby) {
      product.orderby = req.body.orderby;
    }
    
    // product.save();
    let update = await Product.updateOne({ _id: req.params.id }, { $set: product });

    if (update.n > 0) {
      response.product = product;
      response.status = 1;
      response.message = 'Successfully Update';
    }

    return res.json(response);
  } catch (err) {
    console.log(err);
    logger.error(err.message, { metadata: err });
    response.message = err.message || err.toString();
    response.status = 0;

    return res.json(response);
  }
};

// Delete - Not parmanent delete
const del = async (req, res) => {
  // Default Response
  let response = {
    status: 0,
    message: 'Issue in delete product',
  };

  try {

    let newName = Date.now() + '-' + Math.round(Math.random() * 1E9);
    let product = await Product.updateOne({ _id: ObjectId(req.params.id) }, {name : newName, slug : newName, softDelete : true});

    if(product.n == 1){
      response.status = 1;
      response.message = 'Product has been Deleted';
    }

    return res.json(response);
  } catch (err) {
    logger.error(err.message, { metadata: err });
    response.message = err.message || err.toString();
    response.status = 0;

    return res.json(response);
  }
};

const similarproductions = async (req, res) => {
  let response = {
    status: 0,
    message: 'Issue in similar product',
  };
  try {
    let filters = {};

    filters.showsimilarproductions = true;
    if (req.body.slug) {
      filters.slug = req.body.slug;
      filters.status = true;
      filters.instock = true;
    } else {
      filters._id = ObjectId(req.body.product);
    }

    filters.quantity = { $gt: 1 };

    let product = await Product.findOne(filters, 'categories');
    if (product?.categories || product?.brand) {

      let cat = product?.categories;

      let list = await Product.find({
        instock: true,
        softDelete: { $ne: true },
        $or: [{ categories: { $in: cat } }, { brand: ObjectId(brand) }],
      })
        .sort({ createdAt: -1 })
        .limit(4);

      response.list = list;
    }

    // let products = list.map((key) => {
    //   return ObjectId(key._id);
    // });

    // Review
    // response.avgRating = await ReviewController.getProductReviewRating(products);

    response.status = 0;
    response.message = '';
    return res.json(response);
  } catch (err) {
    logger.error(err.message, { metadata: err });
    response.message = err.message || err.toString();
    response.status = 0;

    return res.json(response);
  }
};


// payment failed then product quantity incress from order detalis
const incressQty = async (id) => {
  try {
    let order = await Order.findById(id)

    for (let singleItem of order.items) {
      await Product.updateOne({ _id: singleItem.productId }, { $inc: { quantity: singleItem.quantity } })
    }

  } catch (err) {
    logger.error(err.message, { metadata: err });
  }
}

module.exports = {
  list,
  create,
  update,
  del,
  getproduct,
  letestProduct,
  listForFrontEnd,
  deleteImage,
  updateImage,
  similarproductions,
  incressQty,
  products
};
