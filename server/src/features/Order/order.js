import boolean from 'joi/lib/types/boolean';
import mongoose from 'mongoose';

const { Schema } = mongoose;


const OrderSchema = new Schema(
  {
    orderid: {
      type: String,
      required: [true, 'Order id is required']
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product'
        },
        mrp: Number,
        tax_name: String,
        taxamount: Number,
        taxpercentage: Number,
        pricewithtax: Number,
        customProductDetails: [{
          price: { type: Number },
          id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customize' },
          name: { type: String },
        }],
        sale: Number,
        quantity: Number,
        customProduct: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Customize', default: [] }],
        priceOfCustomize: Number
      }
    ],
    rewardStatus : {type:Boolean,default:true},
    rewards: [{
      productid: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', default: null },
      slabid: { type: mongoose.Schema.Types.ObjectId, ref: 'Cartslab', default: null },
      amount: { type: Number,default:0 }
    }],
    totalmrpprice: {
      type: Number
    },
    totalsaleprice: {
      type: Number
    },
    totaldiscount: {
      type: Number
    },
    totalTaxAmount: {
      type: Number
    },
    shippingCost: {
      type: Number
    },
    shippingTrcking: {
      type: String
    },
    codCharges: {
      type: Number
    },

    // If total payble amount is equal totalPaidAmount then Admin can complete mark this order other wise can't.
    totalPaybleAmount: {
      type: Number
    },
    totalPaidAmount: {
      type: Number
    },
    onlinePaymentCharges: {
      type: String
    },
    payment: {
      type: Number
    },
    orderMode: {
      type: String, default: ""
    },
    payment_trns_id: {
      type: String,
    },
    coupon: String,
    couponDiscountAmount: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    totalquantity: {
      type: Number,
    },
    shippingAddress: {
      firstName: { type: String },
      lastName: { type: String },
      companyName: { type: String },
      gst: { type: String, default: '' },
      email: { type: String },
      phone: { type: String, default: '' },
      addressline1: { type: String },
      addressline2: { type: String },
      city: { type: String },
      state: { type: String },
      zipcode: { type: String }
    },
    billingAddress: {
      firstName: { type: String },
      lastName: { type: String },
      companyName: { type: String },
      gst: { type: String, default: '' },
      email: { type: String },
      phone: { type: String },
      addressline1: { type: String },
      addressline2: { type: String },
      city: { type: String },
      state: { type: String },
      zipcode: { type: String }
    },
    shippingCost: {
      type: Number
    },
    userBalanceCharges: {
      type: String
    },
    shippingTrcking: {
      type: String
    },
    remarks: {
      type: String,
    },
    // 0 pending,1 cancel, 2 processing, ,  3 shipping, 4 completed
    status: {
      type: Number
    },
    statusTime: [{
      status: { type: Number },
      time: { type: Date, }
    }],
    paymentId: {
      type: mongoose.Schema.Types.ObjectId, ref: 'Payment'
    },
    serialNumber: [{
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      number: { type: Array },
    }],
    trackingid: { type: mongoose.Schema.Types.ObjectId, ref: 'Tracking' },
    trackingNumber: {
      type: String
    },
    pcdealCashback: { type: Boolean, default: false }
  },
  { timestamps: true }
);

OrderSchema.methods.toJSON = function () {

  return {
    id: this.id,
    orderid: this.orderid,
    items: this.items,
    totalmrpprice: this.totalmrpprice,
    totalsaleprice: this.totalsaleprice,
    totaldiscount: this.totaldiscount,
    totalTaxAmount: this.totalTaxAmount,
    totalPaybleAmount: this.totalPaybleAmount,
    priceOfCustomize: this.priceOfCustomize,
    codCharges: this.codCharges,
    onlinePaymentCharges: this.onlinePaymentCharges,
    mode: this.mode,
    payment: this.payment,
    paymentCharges: this.paymentCharges,
    payment_trns_id: this.payment_trns_id,
    coupon: this.coupon,
    couponDiscountAmount: this.couponDiscountAmount,
    user: this.user,
    userBalanceCharges: this.userBalanceCharges,
    totalquantity: this.totalquantity,
    shippingCost: this.shippingCost,
    shippingTrcking: this.shippingTrcking,
    shippingAddress: this.shippingAddress,
    billingAddress: this.billingAddress,
    remarks: this.remarks,
    status: this.status,
    orderMode: this.orderMode,
    statusTime: this.statusTime,
    orderPayment: this.orderPayment,
    paymentId: this.paymentId,
    trackingid: this.trackingid,
    trackingNumber: this.trackingNumber,
    pcdealCashback: this.pcdealCashback,
    serialNumber: this.serialNumber,
    rewards: this.rewards,
    rewardStatus:this.rewardStatus,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};



const Order = mongoose.model('Order', OrderSchema);

export default Order;