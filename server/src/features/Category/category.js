import { unique } from 'joi/lib/types/array';
import mongoose from 'mongoose';

const { Schema } = mongoose;

const CategorySchema = new Schema(
  {
   name: {
      type: String,
      required: [true, "can't be blank"],
      index: true,
    },
    description: {
      type: String,
    },
    codeNo: {
      type: Number, 
      unique: true
    },
    image: {
      type:String
    },
    slug: {
      type: String, unique: true, set: (name) => name.trim().replace(/[^A-Z0-9]+/ig, "_").toLowerCase()
    },
    orderby: {
      type:Number,
      default:0
    },
    softDelete: {
      type:Boolean,
      default:false
    },
    status: {
      type: Boolean,
      default:true
    },
    excludedTerm : {
      type: Array
    },
    rate: {
      type: Number
    },
    user: {type : mongoose.Schema.Types.ObjectId, ref: 'User'},
    // calculateEstimation is used to check weather we have to convert in meter or cubic meter
    calculateEstimation: {
      type: Number,
    }
  }
);

CategorySchema.methods.toJSON = function () {
  
  return {
    id: this.id,
    name: this.name,
    description: this.description,
    codeNo: this.codeNo,
    image: this.image,
    slug: this.slug,
    softDelete: this.softDelete,
    orderby:this.orderby,
    status:this.status,
    user: this.user,
    excludedTerm:this.excludedTerm,
    rate: this.rate,
    calculateEstimation:this.calculateEstimation
  };
};



const Category = mongoose.model('Category', CategorySchema);

export default Category;