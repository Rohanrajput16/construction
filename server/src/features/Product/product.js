import { unique } from 'joi/lib/types/array';
import mongoose from 'mongoose';

const { Schema } = mongoose;


/*
new fields
warranty/warranty procedure/ service center list
Minimum Order/Maximum Order Quantity
Weight of the items/ Dimensions of the items(L/W/D)
qty wise dicount price
*/
const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "can't be blank"]
    },
    updationName: {
      type: String
    },
    slug: {
      type: String, unique: true, set: (name) => name.trim().replace(/[^A-Z0-9]+/ig, "_").toLowerCase()
    },
    description: {
      type: String,
      default: ''
    },
    // categories: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    categories: [{
      _id: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
      amountInOneCubicMeter: {type: Number},
      wtOrQty: {type: Number}
    }],

    size: {
      type: String,
      default: "",        
    },
    // sale: {
    //   type: Number,
    //   default: 0
    // },
    // price entered 
    price: {
      type: Number
    },
    weight: {
      type: Number
    },
    amountinOneCubicMeter: {
      type: Number,
      default: 0
    },
    images: Array,
    softDelete: {
      type: Boolean,
      default: false
    },
    instock: {
      type: Boolean,
      default: true
    },
    status: {
      type: Boolean,
      default: true
    },
    orderby: {
      type: Number,
      default: 0
    },
    defaultImage: {
      type: Number,
      default: 0
    },
    user: {type : mongoose.Schema.Types.ObjectId, ref: 'User'},
  },
  { timestamps: true }
);

ProductSchema.methods.toJSON = function () {

  return {
    id: this.id,
    name: this.name,
    updationName: this.updationName,
    slug: this.slug,
    // sku: this.sku,
    description: this.description,
    categories: this.categories,
    size: this.size,
    // sale: this.sale,
    price: this.price,
    weight: this.weight,
    amountinOneCubicMeter: this.amountinOneCubicMeter,
    images: this.images,
    softDelete: this.softDelete,
    status: this.status,
    instock: this.instock,
    user: this.user,
    orderby: this.orderby,
    defaultImage: this.defaultImage,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  }
};

// inclusive and exclusive

const Product = mongoose.model('Product', ProductSchema);

export default Product;