import mongoose from 'mongoose';

const { Schema } = mongoose;

const TransactionSchema = new Schema(
  {
   
    type: {
      type: String,
      enum: ['ADD','SUBTRACT','REVERSE'],
      required: [true, "can't be blank"],
    },
    order:{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    amount:{ type: Number },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' },
    comment:{
      type: String,
    },  
    trans_coins:{
      type: Number,
      required: [true, "can't be blank"],
    },
    wallet_remaining_coins: {
      type: Number
    },

    // 0 pending, 1 fail, 2 success
    status:{
      type:Number,
      default:0
    } 
  },
  { timestamps: true },
);



TransactionSchema.methods.toJSON = function () {
  return {
    id: this._id,
    type: this.type,
    order: this.order,
    amount: this.amount,
    user: this.user,
    payment: this.payment,
    comment:this.comment,
    trans_coins: this.trans_coins,
    wallet_remaining_coins:this.wallet_remaining_coins,
    remaining_coins: this.remaining_coins,
    status:this.status,
    createdAt : this.createdAt,
    updatedAt : this.updatedAt,
  };
};



const Transaction = mongoose.model('Transaction', TransactionSchema);

export default Transaction;