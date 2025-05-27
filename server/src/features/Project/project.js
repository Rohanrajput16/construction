import { unique } from 'joi/lib/types/array';
import mongoose from 'mongoose';
import Product from '../Product/product';
import { type } from 'joi/lib/types/object';

const { Schema } = mongoose;

const ProjectSchema = new Schema(
  {
   name: {
      type: String,
      required: [true, "can't be blank"],
      index: true,
    },
    description: {
      type: String,
    },
    // image: {
    //   type:String
    // },
    slug: {
      type: String, unique: true, lowercase: true, required: [true, "can't be blank"], set: (name) => name.trim().replace(/[^A-Z0-9]+/ig, "_").toLowerCase()
    },
    totalCost: {
      type: Number,
      default: 0
    },
    // orderby: {
    //   type:Number,
    //   default:0
    // },
    softDelete: {
      type:Boolean,
      default:false
    },
    status: {
      type: Boolean,
      default:true
    },
    user: {type : mongoose.Schema.Types.ObjectId, ref: 'User'},
  }
);

ProjectSchema.methods.toJSON = function () {
  
  return {
    id: this.id,
    name: this.name,
    description: this.description,
    image: this.image,
    slug: this.slug,
    softDelete: this.softDelete,
    totalCost: this.totalCost,
    // orderby:this.orderby,
    status:this.status
  };
};



const Project = mongoose.model('Project', ProjectSchema);

export default Project;