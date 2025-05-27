import mongoose from 'mongoose';
import Category from '../Category/category';
import { type } from 'joi/lib/types/object';
import { unique } from 'joi/lib/types/array';

const { Schema } = mongoose;

const CostSchema = new Schema(
  {
   name: {
      type: String,
      required: [true, "can't be blank"],
      index: true
    },
    slug: {
      type: String, unique: true, set: (name) => name.trim().replace(/[^A-Z0-9]+/ig, "_").toLowerCase()
    },

    estimation : [
      {
      estimationNo: Number,
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
      },
      description: String,
      rows: [{type: Object}],
      products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      }]
    }],

    estimationReport : [{
      product : String,
      amount: [{type: Object}],
      totalQty: Number,
      totalCost: Number
    }],

    user: {type : mongoose.Schema.Types.ObjectId, ref: 'User'},

    projectId: {type : mongoose.Schema.Types.ObjectId, ref: 'Project'},
    totalEstimationPrice: {type: Number},
  },
  { timestamps: true }
);

CostSchema.methods.toJSON = function () {
  
  return {
    id: this._id,
    name: this.name,
    slug: this.slug,
    estimation: this.estimation,
    user: this.user,
    totalEstimationPrice: this.totalEstimationPrice,
    estimationReport: this.estimationReport,
    projectId: this.projectId,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
    // Qty: this.Qty
  };
};



const Cost = mongoose.model('Cost', CostSchema);

export default Cost;