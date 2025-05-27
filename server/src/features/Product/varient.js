import mongoose from 'mongoose';

const { Schema } = mongoose;

const VaientSchema = new Schema(
  {

  attributs: [
          {
            id:String,
            value:String
          }
        ],
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },      
  status:{
      type:Boolean,
      default: true
    }
  },
  { timestamps: true }
);

VaientSchema.methods.toJSON = function () {
  return {
    id: this.id,
    attributs: this.attributs,
    product: this.product,
    mrp:this.mrp,
    sale:this.sale,
    quantity:this.quantity,
    images: this.images,
    status:this.status,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};



const Varient = mongoose.model('Varient', VaientSchema);

export default Varient;