import mongoose from 'mongoose';

const { Schema } = mongoose;

const TaxGstSchema = new Schema(
  {
   name: {
      type: String,
      required: [true, "can't be blank"],
      index: true,
    },
    percentage: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true
    }
  }
);

TaxGstSchema.methods.toJSON = function () {
  
  return {
    id: this.id,
    name: this.name,
    percentage: this.percentage,
    status:this.status
  };
};



const TaxGst = mongoose.model('TaxGst', TaxGstSchema);

export default TaxGst;