import mongoose from 'mongoose';

const { Schema } = mongoose;

const BrandSchema = new Schema(
  {
   name: {
      type: String,
      required: [true, "can't be blank"],
      index: true,
    },
    description: {
      type: String,
    },
    image: {
      type:Array
    },
    slug: {
      type:String
    },
    status: {
      type: String
    }
  }
);

BrandSchema.methods.toJSON = function () {
  
  return {
    id: this.id,
    name: this.name,
    description: this.description,
    image: this.image,
    slug: this.slug,
    status:this.status
  };
};



const Brand = mongoose.model('Brand', BrandSchema);

export default Brand;