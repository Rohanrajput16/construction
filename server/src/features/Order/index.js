import { Router } from 'express';
import { checkpermission, verifyToken, treeUnderUser, getShippingCosting, getFilterSettings, httpRequest, getSettings, apiReq, userCashback, submitRewards, cartslabAmount, rewardsAdd } from '../../helper/common';
// import Cart from '../Cart/cart';
import Order from './order';
import User from '../User/user';
// import Coupon from '../Coupon/coupon';
// import { } from '../Shipping'
import Transaction from '../Transaction/transaction';
import Payment from '../Payment/payment';
// import EmailTemplate from '../EmailTemplate/emailTemplate';
import { emailmessage } from '../Notification/email';
import { whatsaapNotify } from '../Notification/whatsapp'
// import CustomizeCart from '../CustomCart/customizeCard';
import Product from '../Product/product';
import { paymentInitiate } from '../../helper/payment/payment';
import Customize from '../Product/customised';
// import { getShippingCostbackend } from '../Shipping/index';
// import Tracking from '../Tracks/Tracking';
import { incressQty } from '../Product'

const PaytmChecksum = require('paytmchecksum');
const env = process.env;
const https = require('https');

let logger = require('../../services/logger');

const router = Router();
const ObjectId = require('mongoose').Types.ObjectId;
import Setting from '../Setting/setting';



// List
const confirmOrder = async (req, res) => {

    // Default Response
    let response = {
        status: 0,
        message: 'Issue in place order'
    }

    try {

        let cartItems = await Cart.find({ user: req.user._id })
            .populate({
                path: 'product',
                populate: {
                    path: 'tax_class',
                    model: 'TaxGst',
                }
            }).populate({ path: 'customize' })


        if (!cartItems.length) {
            response.message = 'Cart is empty'
            return res.json(response);
        }



        if (!req.user.address.firstName &&
            !req.user.address.email &&
            !req.user.address.phone &&
            !req.user.address.addressline1
        ) {
            response.message = 'Address Not Found'
            return res.json(response)
        }

        // Shipping address  

        let shippingAddress = {
            firstName: req.user.address.firstName,
            lastName: req.user.address.lastName,
            companyName: req.user.companyName,
            gst: req.user.address.gst,
            email: req.user.address.email,
            phone: req.user.address.phone,
            addressline1: req.user.address.addressline1,
            addressline2: req.user.address.addressline2,
            city: req.user.address.city,
            state: req.user.address.state,
            zipcode: req.user.address.zipcode
        };



        let billingAddress = {
            firstName: req.user.address.firstName,
            lastName: req.user.address.lastName,
            companyName: req.user.companyName,
            gst: req.user.address.gst,
            email: req.user.address.email,
            phone: req.user.address.phone,
            addressline1: req.user.address.addressline1,
            addressline2: req.user.address.addressline2,
            city: req.user.address.city,
            state: req.user.address.state,
            zipcode: req.user.address.zipcode
        };

        let priceInclusiveTax = await getFilterSettings({ filter: 'tax' });

        priceInclusiveTax = parseInt(priceInclusiveTax);


        let totalMrp, salePrice, totalQuanity, totalTaxAmount, totalPaybleAmount = 0;

        totalQuanity = totalMrp = salePrice = totalTaxAmount = 0;
        let items = [];

        var customProductPrice = 0;
        var customProduct = [], customProductDetails = [], rewards = []
        for (const singleItem of cartItems) {
            if (singleItem.quantity > singleItem.product.quantity) {
                singleItem.quantity = singleItem.product.quantity;
                response.message = 'Updated cart item due to low quantity.';
            }


            // quantity wise discount calculate
            // price wise discount apply hear
            if (singleItem.product?.price && singleItem.product.productType == "normal") {

                let pricediscounts = Object.keys(singleItem.product.price);

                pricediscounts = pricediscounts.sort((a, b) => b - a)
                for (let singlepriceDiscount of pricediscounts) {
                    if (singleItem.quantity >= singlepriceDiscount) {
                        singleItem.product.sale = parseInt(singleItem.product.price[singlepriceDiscount])
                        break;
                    }
                }
            }
            
            if (singleItem.product.rewardStatus) {
                rewards.push({
                    amount: (singleItem.product.reward * singleItem.quantity),
                    productid: singleItem.product.id
                })

            }

            totalQuanity += singleItem.quantity;
            totalMrp += singleItem.product.mrp;
            salePrice += singleItem.product.sale;

            customProductPrice = 0
            customProduct = []
            customProductDetails = []


            let taxPercentage = parseInt(singleItem.product?.tax_class?.percentage);

            let taxamount = priceInclusiveTax == 0 ? singleItem.product.sale * (taxPercentage / 100) : singleItem.product.sale * (taxPercentage / (100 + taxPercentage));
            totalTaxAmount += taxamount;

            let priceWithTax = priceInclusiveTax == 0 ? singleItem.product.sale + taxamount : singleItem.product.sale;
            if (singleItem.product.productType == "normal") {

                totalPaybleAmount += parseInt(priceWithTax * singleItem.quantity);

                console.log("totalPaybleAmount1", totalPaybleAmount);

                // customize product amount calculate

            } else if (singleItem.product.productType == "customize" && singleItem.customize.length > 0) {
                for (let singleCustomPrice of singleItem.customize) {
                    customProductPrice += singleCustomPrice.price
                    customProduct.push(singleCustomPrice._id)


                    customProductDetails.push({
                        price: singleCustomPrice.price,
                        id: singleCustomPrice._id,
                        name: singleCustomPrice.name
                    })
                }
                customProductPrice += parseInt(singleItem.product.sale) ? parseInt(singleItem.product.sale) : parseInt(singleItem.product.mrp);
                totalPaybleAmount += (customProductPrice * singleItem.quantity) ? parseInt(customProductPrice * singleItem.quantity) : customProductPrice;

            }

            console.log("totalPaybleAmount1", totalPaybleAmount);
            // push single product details
            items.push({

                productId: singleItem.product.id,
                mrp: singleItem.product.mrp,
                customProduct: customProduct,
                tax_name: singleItem.product?.tax_class?.name,
                taxpercentage: taxPercentage ? taxPercentage : 0,
                priceOfCustomize: customProductPrice,
                customProductDetails: customProductDetails,
                taxamount: taxamount ? taxamount : 0,
                sale: singleItem.product.sale,
                pricewithtax: priceWithTax,
                quantity: singleItem.quantity
            });

            // calculate custom product and real product 

            // decrease product quantity { $inc }
            let product = await Product.findOne({ _id: singleItem.product.id })

            if ((product.quantity > 0) && (product.quantity >= singleItem.quantity)) {
                product.quantity = product.quantity - singleItem.quantity
                product.save();

            } else {
                response.message = `${product.name} Out off Stock`
                return res.json(response);
            }
        }


        let data = {
            items: items,
            totalmrpprice: totalMrp,
            totalsaleprice: salePrice,
            totalTaxAmount: totalTaxAmount ? totalTaxAmount : 0,
            shippingTrcking: 0,
            totalPaybleAmount: parseInt(totalPaybleAmount),
            mode: 'online',
            payment: parseInt(totalPaybleAmount),
            payment_trns_id: '',
            rewards: rewards,
            user: req.user._id,
            totalquantity: totalQuanity,
            shippingAddress: shippingAddress,
            billingAddress: billingAddress,
            status: 0, // pending
        }


        data.coupon = ''
        data.couponDiscountAmount = 0;



        // coupon discount calculate
        // if (req.body.couponcode) {
        //     let validateUpto = new Date();
        //     let filter = {}

        //     filter.validupto = { $gte: validateUpto.toISOString() };
        //     filter.users = ObjectId(req.user._id);


        //     let allCateg = []

        //     for (let singleProduct of cartItems) {
        //         for (let singleCategori of singleProduct.product.categories) {
        //             allCateg.push(singleCategori)
        //         }
        //     }

        //     let productIds = cartItems.map((key) => { return key.product._id })

        //     if (productIds.length) {
        //         filter.products = { $in: productIds }
        //     }

        //     if (allCateg.length) {
        //         filter.categories = { $in: allCateg }
        //     }

        //     let coupon = await Coupon.findOne(filter);


        //     if (!coupon) {
        //         response.message = 'Invalid coupon';
        //         return res.json(response);
        //     }

        //     data.coupon = coupon.code;
        //     data.couponDiscountAmount = coupon.amount;

        //     if (coupon.type == 'percentage') {
        //         data.couponDiscountAmount = parseFloat(totalPaybleAmount * (coupon.amount / 100))
        //     }
        //     data.couponDiscountAmount = coupon.amount;
        //     data.payment = data.payment - coupon.amount;
        //     data.totalPaybleAmount = data.totalPaybleAmount - coupon.amount;
        // }

        data.shippingCost = 0;

        let slab = await cartslabAmount(data.totalPaybleAmount)
        rewards.push({
            amount: slab.rate,
            slabid: slab.id
        })

        data.rewards = rewards


        // can't apply sheeping cost in local hisar

        let arr = ['hisar', 'hissar']
        if (arr.indexOf(req.user.address.city.toLowerCase()) == -1) {

            let shippingcost = await getSettings('flat_shipping');


            //shipping price calculate
            if (!req.body.pickup && shippingcost > 0) {
                let shippingcost = await getSettings('flat_shipping_cost');
                if (shippingcost) {
                    data.shippingCost = parseInt(shippingcost)
                    data.payment = data.payment + data.shippingCost;
                }

            } else if (!req.body.pickup && shippingcost <= 0) {
                let resp = await getShippingCostbackend(req.user)
                data.payment = data.payment + parseInt(resp);
                data.shippingCost = resp


            }
        }


        // COD payment
        let paymentInCaseCod = 0;
        if (req.body.cod) {
            let codPaymentPercentage = await getSettings('codamount');
            if (codPaymentPercentage != null) {
                codPaymentPercentage = parseInt(codPaymentPercentage);
                paymentInCaseCod = codPaymentPercentage ? parseInt(data.payment * (codPaymentPercentage / 100)) : 0;
            }
        }
        // Cod charges starts 
        data.codCharges = 0;


        if (req.body.cod) {
            let codPercentage = await getSettings('cod');
            if (codPercentage != null) {
                codPercentage = parseInt(codPercentage);
                data.codCharges = codPercentage ? parseInt((data.payment - paymentInCaseCod) * (codPercentage / 100)) : 0;
                data.orderMode = "1"
            }
        }

        // COD charges ends here


        if (paymentInCaseCod) {
            data.payment = paymentInCaseCod;
        }


        // Online Gateway charges
        data.onlinePaymentCharges = 0;
        if (req.body.payby == 'paymentgateway') {
            let onlineGatwayPercentage = await getSettings('online_payment');
            if (onlineGatwayPercentage != null) {
                let onlinePercentageCharges = parseInt(onlineGatwayPercentage)
                data.onlinePaymentCharges = onlineGatwayPercentage ? parseInt(data.payment * (onlinePercentageCharges / 100)) : 0;
            }
        }



        data.payment = parseInt(data.payment + data.onlinePaymentCharges);

        // data.totalPaybleAmount = parseInt(data.totalPaybleAmount) + parseInt(data.codCharges) + parseInt(data.shippingCost) + parseInt(data.onlinePaymentCharges);
        data.totalPaybleAmount = parseInt(data.totalPaybleAmount);
        // new order id create
        let lastOrder = await Order.find({}, 'orderid').sort({ _id: -1 }).limit(1);

        let counter = 1;

        if (lastOrder.length) {
            let lastUName = lastOrder[0]?.orderid;

            if (lastUName) {
                counter = parseInt(lastUName.replace('PCD', ''));
                counter++
            }
            else {
                counter = counter + 1;
            }
        } else {
            counter = counter + 1;
        }

        data.orderid = `PCD${counter}`;

        //let order = await Order.create(data);

        // remove cart value 
        //await Cart.deleteMany({ user: ObjectId(req.user.id) });

        // let orderStatues = ['Pending', 'Cancel', 'Processing', 'Shipping', 'Completed']
        // console.log("data.payment...............", order.payment);

        let spacialuserCharges = 0;
        if (req.body.spacialuser) {
            let chargesOnSpacialuser = await getSettings('spacialuser');

            if (chargesOnSpacialuser) {
                chargesOnSpacialuser = parseInt(chargesOnSpacialuser)
                spacialuserCharges = chargesOnSpacialuser ? (data.payment * (chargesOnSpacialuser / 100)) : 0;

            }
        }
        console.log("req.user.wallet", req.user.wallet);
        // when user is a spaciluser then can't open payment getway / order amount cut in user.balance
        if ((req.user.spacialuser && req.body.spacialuser) && (req.user.wallet >= (data.payment + spacialuserCharges))) {
            req.user.wallet = req.user.wallet - (data.payment + spacialuserCharges)
            data.payment = data.payment + spacialuserCharges
            req.user.save()
            data.userBalanceCharges = spacialuserCharges
            data.status = 2
            data.orderMode = "3"
            data.statusTime = [
                { status: data.status, time: new Date() }
            ]
            let userOrder = await Order.create(data);

            

            await Cart.deleteMany({ user: ObjectId(req.user.id) }); // delete cart value after create order

            //data.save()
            response.message = "Successfully Order Created";
            response.status = 1;





            // when we selest buy now pay later then order status are processing 
            // let whatsaapdata = {
            //     templateName: "pcdh_processing",
            //     phone: userOrder.shippingAddress.phone,
            //     dataArray: [userOrder.shippingAddress.firstName + " " + userOrder.shippingAddress.lastName, userOrder.orderid, userOrder.totalPaybleAmount],
            //     languageCode: "en"
            // }

            // whatsaapNotify(whatsaapdata)

            // pcdeal user cashback after status 2
            if (userOrder?.id) {
                await userCashback(userOrder.id)
            }
            return res.json(response)
        } else if ((!req.body.spacialuser || data.payment > (req.user.wallet - spacialuserCharges))) {

            // let key = '565ebe4f-9657-43b4-ab10-f6111799a02d';
            // let returnURL = 'http://hardware.havflyinvitation.com/response?client_txn_id=' + order.orderid;

            //let resp =    await paymentInitiate({ orderId: order._id.toString(), amount: parseFloat(data.payment).toString() ,custId:req.user._id.toString() })


           

            ////////////////// Panding order /////////////////////////////
            console.log("data", data.payment, data.totalPaybleAmount);

            let order = await Order.create(data);

            let cart = Cart.deleteMany({ user: ObjectId(req.user.id) });
            let payment = Payment.create({
                userid: req.user.id,
                amount: data.payment,
                orderId: order.id,
                type: 'OnlineBuy',
                status: 0
            });

            await Promise.all([cart, payment])

            /////////////////// End payment with order /////////////////////////

            response.orderid = order.id.toString();
            response.status = 1;
            response.amount = order.payment;
            response.name = req.user.address.firstName + " " + req.user.address.lastName;
            response.phone = req.user.address.phone;
            response.url = "https://payment.rpkstransporters.com/api/payment/paying";
            response.message = "Order has been succesfully created";

        }

         return res.json(response);

    } catch (err) {
        console.log('err', err)
        // logger.error(err.message, { metadata: err });
        response.message = err.message || err.toString();
        response.status = 0;

        return res.json(response);
    }
}


const ipnStatusUPI = async (req, res) => {

    // Default response
    let response = {
        "status": 0,
        "message": "Issue in receving upi ipn request."
    };

    logger.info('Payment response - ' + req.body.client_txn_id, { metadata: req.body });


    // Start from 
    let orderId = req.body.client_txn_id;

    if (!orderId) {
        response.message = "Please provide order id.";
    }

    try {

        // Create payment table proccess

        let order = await Order.findOne({ orderid: orderId });

        if (!order) {

            response.message = "We do not find any order with this ID.";
            logger.error(response.message, { metadata: {} });

        }

        if (order.status != 0) {
            response.message = "Already payment status updated.";
            logger.error(response.message, { metadata: payment });
            return 1;
        }

        order.mode = 'UPI';
        order.payment_trns_id = req.body?.upi_txn_id;
        order.status = req.body.status == true && order.totalPaybleAmount == req.body.amount ? 2 : 1;

        order.save();

        // gamil 

        let resp = await emailmessage(
            req.user.email,
            'orderCreate',
            `${req.user.firstName}`,
            order.totalPaybleAmount,
            '',
            '',
            new Date(order.createdAt.toString()).toDateString(),
            '',
            'PC DEALS INDIA',
            order.orderid
        );


        //whatsaap request
        //  await whatsaapRequest(template,req.user.phone,'value')


        // Regarding payment
        /* let data = {
             type: req.body.type,
             order: req.body.order,
             amount: req.body.amount,
             user:req.body.user,
             payment:req.body.payment,
             comment:req.body.comment,
             trans_coins:req.body.trans_coins,
             wallet_remaining_coins:req.body.wallet_remaining_coins,
             remaining_coins:req.body.remaining_coins,
             status:req.body.status
 
         }
         
         let transaction = await Transaction.create(data);*/

        // Go for payment

        // response.message = message+ " " + deleteCart;


        let txnTime = new Date(txnAt);


        let payment = Payment.create({
            userid: order.user,
            amount: order.totalPaybleAmount,
            mode: order.mode,
            type: 'Online Buy',
            paymentTransaction: order.payment_trns_id,
            transactionTime: txnTime.toISOString(),
            reason: order.status == 1 ? req.body.message : '',
            status: order.status

        });

        if (payment) {
            response.status = 1;
            response.message = '';
        }

        return res.json(response);

    } catch (err) {
        response.status = 0;
        response.message = err.message || err.toString()
        logger.error(response.message, { metadata: err });
        return res.status(500).json(response);
    }
}

// Get order by id
const getOrder = async (req, res) => {

    // Default Response
    let response = {
        status: 0,
        message: 'Issue in get order details api'
    }

    try {

        let filters = {};
        filters._id = ObjectId(req.params.id);

        if (req.user.role.slug != 'admin') {
            filters.user = ObjectId(req.user.id);
        }

        //return res.json(filters);
        let order = await Order.findOne(filters).populate({
            path: 'items.productId items.customProduct items.customProductDetails.id',
            select: 'name slug images attributes price alias',
            populate: {
                path: 'attributes._id',
                select: 'name',
                model: 'Attribute'
            }
        })
            .populate('paymentId user')
            .populate({ path: 'trackingid', select: 'name url' })
        //  .populate({ path: 'productOptions.ram', options: { sort: { 'price': 1 } } });


        response.order = order;
        response.status = 1;
        response.message = ''

        return res.json(response);

    } catch (err) {

        logger.error(err.message, { metadata: err });
        response.message = err.message || err.toString();
        response.status = 0;

        return res.json(response);
    }

}

const checkOrderStatus = async (req, res) => {


    // Default Response
    let response = {
        status: 0,
        message: 'We does not found this order id.'
    }

    try {

        if (req.user.role.slug != 'admin') {
            filters.user = ObjectId(req.user.id);
        }

        if (req.body.orderid) {
            filters.orderid = req.body.orderid;
        }

        let order = await Order.findOne(filters, { status: 1 });

        if (order) {
            response.order = order;
            response.status = 1;
            response.message = ''
        }

        return res.json(response);

    } catch (err) {

        logger.error(err.message, { metadata: err });
        response.message = err.message || err.toString();
        response.status = 0;

        return res.json(response);
    }
}

// List

// To do create order by admin
const adminOrderCreate = async (req, res) => {

    // Default Response
    let response = {
        status: 0,
        message: 'Issue in admin order create'
    }

    try {



        // Shipping address
        let shippingAddress = {
            addressline1: req.body.shippingaddress.addressline1,
            addressline2: req.body.shippingaddress.addressline2,
            city: req.body.shippingaddress.city,
            state: req.body.shippingaddress.state,
            zipcode: req.body.shippingaddress.zipcode
        };

        let billingAddress = {
            addressline1: req.body.billingaddress.addressline1,
            addressline2: req.body.billingaddress.addressline2,
            city: req.body.billingaddress.city,
            state: req.body.billingaddress.state,
            zipcode: req.body.billingaddress.zipcode
        };

        let totalMrp, salePrice, totalQuanity;

        totalQuanity = totalMrp = salePrice = 0;
        let items = req.body.Items;

        for (const singleItem of req.body.Items) {
            if (singleItem.quantity > singleItem.product.quantity) {
                singleItem.quantity = singleItem.product.quantity;
                message = 'Updated cart item due to low quantity.';
            }

            totalQuanity += singleItem.quantity;
            totalMrp += singleItem.product.mrp;
            salePrice += parseInt(singleItem.product.sale);

            items.push({
                productId: singleItem.product.id,
                mrp: singleItem.product.mrp,
                tax: 0,
                sale: singleItem.product.sale,
                quantity: singleItem.quantity
            });
        }

        let data = {
            items: items,
            totalmrpprice: totalMrp,
            totalsaleprice: salePrice,
            totaldiscount: totalMrp - salePrice,
            totalTaxAmount: 0,
            shippingCost: 0,
            shippingTrcking: 0,
            totalPaybleAmount: salePrice,
            mode: 0,
            payment: salePrice,
            payment_trns_id: '',
            coupons: req.body.coupon,
            user: req.user.id,
            totalquantity: totalQuanity,
            shippingAddress: shippingAddress,
            billingAddress: billingAddress,
            status: 0,
        }

        if (req.body.couponcode) {

            let validateUpto = new Date();
            let coupon = await Coupon.findOne({ code: req.body.couponcode, validupto: { $gte: validateUpto.toISOString() } });

            if (!coupon) {
                response.message = 'Invalid coupon';
                return res.json(res.json(response));
            }

            data.coupon = coupon.code;
            data.couponDiscountAmount = coupon.amount;
            data.payment = salePrice - coupon.amount;
        }

        let order = await Order.create(data);

        Cart.deleteMany({ user: ObjectId(req.user.id) });



        // Go for payment
        response.order = order;
        response.status = 1;
        response.message = message;

        return res.json(response);

    } catch (err) {

        logger.error(err.message, { metadata: err });
        response.message = err.message || err.toString();
        response.status = 0;

        return res.json(response);
    }
}


// place order
// coupon
// mgt order 

const list = async (req, res) => {

    // Default Response
    let response = {
        status: 0,
        message: 'Issue in order list'
    }

    try {
        let filters = {};
        if (req.body.userId) {
            filters.user = ObjectId(req.body.userId);
        }

        if (req.body.orderId) {
            filters.orderid = req.body.orderId
        }

        if (req.body.id) {
            filters.id = req.body.id
        }

        let numberOfRecords = 50;
        let page = req.body.page ? req.body.page : 1;


        if (req.body.status && req.body.status != 'all') {
            if (req.body.status) {
                filters.status = req.body.status
            }
        } else if (req.body.status == 0 && req.body.status != 'all') {
            filters.status = req.body.status
        }

        if (req.body.endDate && req.body.startDate) {

            let start = new Date(req.body.startDate)
            start.setHours(0, 0, 0)
            start.toISOString()

            let end = new Date(req.body.endDate)
            end.setHours(23, 59, 59)
            end.toISOString()

            filters.updatedAt = { $gte: start, $lte: end }
        }

        if (req.body.search) {
            filters["$or"] = [
                { "shippingAddress.companyName": { '$regex': req.body.search, $options: 'i' } },
                { "shippingAddress.city": { '$regex': req.body.search, $options: 'i' } },
                { "shippingAddress.state": { '$regex': req.body.search, $options: 'i' } },
                { "shippingAddress.phone": { '$regex': req.body.search, $options: 'i' } },
                { "shippingAddress.firstName": { '$regex': req.body.search, $options: 'i' } },
                { "shippingAddress.lastName": { '$regex': req.body.search, $options: 'i' } },
                { "shippingAddress.email": { '$regex': req.body.search, $options: 'i' } },
                { "billingAddress.companyName": { '$regex': req.body.search, $options: 'i' } },
                { "billingAddress.city": { '$regex': req.body.search, $options: 'i' } },
                { "billingAddress.state": { '$regex': req.body.search, $options: 'i' } },
                { "billingAddress.phone": { '$regex': req.body.search, $options: 'i' } },
                { "billingAddress.firstName": { '$regex': req.body.search, $options: 'i' } },
                { "billingAddress.lastName": { '$regex': req.body.search, $options: 'i' } },
                { "billingAddress.email": { '$regex': req.body.search, $options: 'i' } },
                { "serialNumber.number": { '$regex': req.body.search, $options: 'i' } },
                { "orderid": { '$regex': req.body.search, $options: 'i' } }
            ]
        }


        let list = await Order.find(filters).sort({ createdAt: -1 })
            .populate('trackingid')
            .populate('user')
            .populate({ path: "items.productId", select: 'name images' })
            .skip((page - 1) * numberOfRecords)
            .limit(numberOfRecords);

        response.list = list;
        response.status = 1;
        response.message = ''

        return res.json(response);

    } catch (err) {
        logger.error(err.message, { metadata: err });
        response.message = err.message || err.toString();
        response.status = 0;

        return res.json(response);
    }
}

// list for csv
const orders = async (req, res) => {

    // Default Response
    let response = {
        status: 0,
        message: 'Issue in order list'
    }

    try {
        let filters = {};
        if (req.body.userId) {
            filters.user = ObjectId(req.body.userId);
        }

        if (req.body.orderId) {
            filters.orderid = req.body.orderId
        }

        if (req.body.id) {
            filters.id = req.body.id
        }



        if (req.body.status && req.body.status != 'all') {
            if (req.body.status) {
                filters.status = req.body.status
            }
        } else if (req.body.status == 0 && req.body.status != 'all') {
            filters.status = req.body.status
        }

        if (req.body.endDate && req.body.startDate) {

            let start = new Date(req.body.startDate)
            start.setHours(0, 0, 0)
            start.toISOString()

            let end = new Date(req.body.endDate)
            end.setHours(23, 59, 59)
            end.toISOString()

            filters.updatedAt = { $gte: start, $lte: end }
        }

        if (req.body.search) {
            filters["$or"] = [
                { "shippingAddress.companyName": { '$regex': req.body.search, $options: 'i' } },
                { "shippingAddress.city": { '$regex': req.body.search, $options: 'i' } },
                { "shippingAddress.state": { '$regex': req.body.search, $options: 'i' } },
                { "shippingAddress.phone": { '$regex': req.body.search, $options: 'i' } },
                { "shippingAddress.firstName": { '$regex': req.body.search, $options: 'i' } },
                { "shippingAddress.lastName": { '$regex': req.body.search, $options: 'i' } },
                { "shippingAddress.email": { '$regex': req.body.search, $options: 'i' } },
                { "billingAddress.companyName": { '$regex': req.body.search, $options: 'i' } },
                { "billingAddress.city": { '$regex': req.body.search, $options: 'i' } },
                { "billingAddress.state": { '$regex': req.body.search, $options: 'i' } },
                { "billingAddress.phone": { '$regex': req.body.search, $options: 'i' } },
                { "billingAddress.firstName": { '$regex': req.body.search, $options: 'i' } },
                { "billingAddress.lastName": { '$regex': req.body.search, $options: 'i' } },
                { "billingAddress.email": { '$regex': req.body.search, $options: 'i' } },
                { "orderid": { '$regex': req.body.search, $options: 'i' } }
            ]
        }


        let list = await Order.find(filters).sort({ createdAt: -1 })
            .populate('trackingid')
            .populate('user')
            .populate({ path: "items.productId", select: 'name images' })




        response.list = list;
        response.status = 1;
        response.message = ''

        return res.json(response);

    } catch (err) {
        logger.error(err.message, { metadata: err });
        response.message = err.message || err.toString();
        response.status = 0;

        return res.json(response);
    }
}

const ownOrderList = async (req, res) => {

    // Default Response
    let response = {
        status: 0,
        message: 'Issue in own order list'
    }

    try {

        let filters = {
            user: req.user.id
        };
        let numberOfRecords = 50;
        let page = req.body.page ? req.body.page : 1;


        if (req.body.search) {
            filters["$or"] = [
                { "shippingAddress.companyName": { '$regex': req.body.search, $options: 'i' } },
                { "shippingAddress.city": { '$regex': req.body.search, $options: 'i' } },
                { "shippingAddress.state": { '$regex': req.body.search, $options: 'i' } },
                { "shippingAddress.phone": { '$regex': req.body.search, $options: 'i' } },
                { "shippingAddress.firstName": { '$regex': req.body.search, $options: 'i' } },
                { "shippingAddress.lastName": { '$regex': req.body.search, $options: 'i' } },
                { "shippingAddress.email": { '$regex': req.body.search, $options: 'i' } },
                { "billingAddress.companyName": { '$regex': req.body.search, $options: 'i' } },
                { "billingAddress.city": { '$regex': req.body.search, $options: 'i' } },
                { "billingAddress.state": { '$regex': req.body.search, $options: 'i' } },
                { "billingAddress.phone": { '$regex': req.body.search, $options: 'i' } },
                { "billingAddress.firstName": { '$regex': req.body.search, $options: 'i' } },
                { "billingAddress.lastName": { '$regex': req.body.search, $options: 'i' } },
                { "billingAddress.email": { '$regex': req.body.search, $options: 'i' } },
                { "serialNumber.number": { '$regex': req.body.search, $options: 'i' } },
                { "orderid": { '$regex': req.body.search, $options: 'i' } }
            ]
        }


        let list = await Order.find(filters).sort({ createdAt: -1 }).populate('trackingid').populate({
            path: 'items.productId',
            select: 'name',
        }).skip((page - 1) * numberOfRecords).limit(numberOfRecords);

        response.list = list;
        response.status = 1;
        response.message = ''

        return res.json(response);

    } catch (err) {

        logger.error(err.message, { metadata: err });
        response.message = err.message || err.toString();
        response.status = 0;

        return res.json(response);
    }
}

const pcdealdiscount = async (order) => {
    // 0 pending,1 cancel, 2 processing, ,  3 shipping, 4 completed
    try {

        let setting = await Setting.find({ key: { $in: ['cashback', 'cashbackcardvalue'] } })
        let cashbackPercentage = 0;
        let maxCartAmount = 0
        for (let singleSetting of setting) {
            if (singleSetting.key == 'cashback') {
                cashbackPercentage = singleSetting.value
            } else {
                maxCartAmount = singleSetting.value
            }
        }

        if (order.totalPaybleAmount >= maxCartAmount) {

            let discountAmount = (parseInt(order.totalPaybleAmount) * parseInt(cashbackPercentage)) / 100
            discountAmount = Math.round(discountAmount)

            let url = "https://www.pcdealsindia.com/api/add-money"

            var formdata = new FormData();
            formdata.append("customer_id", order.user.pcdealUserId);
            formdata.append("amount", discountAmount);
            formdata.append("remarks", `Order Id ${order.orderid}`);

            let resp = await apiReq(url, 'POST', formdata)
            if (resp?.data.success == true) {
                let value = ""
                if (setting[0].key == 'cashback') {
                    value = setting[0].value
                } else {
                    value = setting[1].value
                }
                let whatsaapdata = {
                    templateName: "cashback_utility",
                    phone: order.shippingAddress?.phone ? order.shippingAddress?.phone : order.user.phone,
                    dataArray: [
                        order.user.firstName + " " + order.user.lastName,
                        discountAmount,
                        `${value}% against your (Order ID - ${order.orderid}) on PC Deals Hardware`,
                        `https://www.pcdealsindia.com/`
                    ],
                    languageCode: "en"
                }
                whatsaapNotify(whatsaapdata)
            }

            return resp?.data
        }
    } catch (err) {

        logger.error(err.message, { metadata: err });
    }
}

// const sheepingDiscount = async (order) => {
//     try {
//         if (order.shippingCost && order.status == 4) {
//             let url = "https://www.pcdealsindia.com/api/add-money"
//             if (order.user?.pcdealUserId) {
//                 var formdata = new FormData();
//                 formdata.append("customer_id", order.user.pcdealUserId);
//                 formdata.append("amount", order.shippingCost);
//                 formdata.append("remarks", `Cash Back Support for Shipping Charges charged on our hardware website - ${order.orderid}`);

//                 let resp = await apiReq(url, 'POST', formdata)
//                 if (resp?.data.success == true) {
//                     return true
//                 }
//             }
//         } else {
//             return false
//         }
//     } catch (err) {
//         logger.error(err.message, { metadata: err });
//     }
// }

const updateStatus = async (req, res) => {

    // 0 pending, 1 processing, 2 cancel,  3 shipping, 4 completed
    let orderStatus = ["pending", "cancel", "processing", "shipping", "completed", "Partially Delivered"]
    // Default Response
    let response = {
        status: 0,
        message: 'Issue in update status.'
    }

    try {
        if (req.user.role) {
            let responsePermission = await checkpermission(req.user.role.slug, 'authorised');
            if (responsePermission.status != 1) {
                return res.json(responsePermission);
            }
        }

        let order = await Order.findById(req.params.id).populate("user").populate({ path: "items.productId" }).populate('trackingid');

        let setting = await getSettings('pcdeals')
        order.status = req.body.status

        let teackUrl = ''

        // whatsaap template and message
        let whatsaapdata = {}
        if (order.status == 1) {
            await incressQty(order.id)
        } else if (order.status == 4) {
            whatsaapdata = {
                templateName: "pcdh_dispatch",
                phone: order.shippingAddress.phone,
                dataArray: [order.shippingAddress.firstName + " " + order.shippingAddress.lastName, order.orderid],
                languageCode: "en"
            }
            
        order = await rewardsAdd(order)

          



        } else if (order.status == 3 && req.body?.trackingid) {
            order.trackingid = req.body.trackingid
            order.trackingNumber = req.body.trackingNumber

            let track = await Tracking.findOne({ _id: ObjectId(req.body.trackingid) })
            teackUrl = track?.url

            // order shipped whatsapp notification

            if (track && req.body.trackingNumber) {
                whatsaapdata = {
                    templateName: "pcdh_shipped",
                    phone: order.shippingAddress?.phone ? order.shippingAddress?.phone : order.user.phone,
                    dataArray: [
                        order?.user?.firstName ? order?.user?.firstName : order.shippingAddress.firstName + " " + order?.user?.lastName ? order?.user?.lastName : order.shippingAddress.lastName,
                        `ID ${order?.orderid}`,
                        track?.name,
                        req.body.trackingNumber,
                        teackUrl
                    ],
                    languageCode: "en"
                }
            }
        } else if (order.status == 5) {
            whatsaapdata = {
                templateName: "pcdh_partially_delivered",
                phone: order.shippingAddress.phone,
                dataArray: [order.user.firstName + " " + order.user.lastName, order.orderid],
                languageCode: "en"
            }
        }


        if ((setting != null) && setting) {
            if (order.status == 2 && order.user?.pcdealUserId) {
                let url = "https://www.pcdealsindia.com/api/profile"
                let data = {
                    "customers_id": order.user.pcdealUserId
                }



                let resp = await apiReq(url, 'GET', data)
                if (order.pcdealCashback == false) {
                    if (resp?.data?.success && resp.data?.data?.customers_id) {

                        let resp = await pcdealdiscount(order)
                        if (resp?.success) {
                            order.pcdealCashback = true
                        }
                    }
                }


                whatsaapdata = {
                    templateName: "pcdh_processing",
                    phone: order.shippingAddress?.phone ? order.shippingAddress?.phone : order.user.phone,
                    dataArray: [
                        order.user.firstName + " " + order.user.lastName,
                        order?.orderid,
                        order?.totalPaybleAmount
                    ],
                    languageCode: "en"
                }
            }
        }

        // if (whatsaapdata.templateName) {
        //     whatsaapNotify(whatsaapdata)
        // }


        // status update time
        order.statusTime.push({
            status: order.status,
            time: new Date().toISOString()
        })


        await order.save()
        // if (order) {
        //     console.log('email')
        //     await emailmessage(
        //         order.shippingAddress.email,
        //         'orderUpdate',
        //         order.shippingAddress.firstName + " " + order.shippingAddress.lastName,
        //         Math.ceil(order.payment),
        //         '',
        //         orderStatus[order.status],
        //         new Date(order.updatedAt.toString()).toDateString(),
        //         '',
        //         'PC DEALS INDIA',
        //         order.orderid,
        //         '',
        //         '',
        //         req.body.trackingNumber ? `${teackUrl}/${req.body.trackingNumber}` : ''
        //     );



        //     response.order = order;
            response.status = 1;
            response.message = 'Update order'
        // }

        return res.json(response);

    } catch (err) {
            console.log('errr',err)
        logger.error(err.message, { metadata: err });
        response.message = err.message || err.toString();
        response.status = 0;

        return res.json(response);
    }
}

const reOrderGen = async (req, res) => {
    let response = {
        status: 0,
        message: 'Issue in reorder'
    }
    try {
        let order = Order.findOne({ _id: req.body.orderid }, 'items').populate('items.productId');
        let cartValue = Cart.deleteMany({ user: req.user._id });

        let promisResp = await Promise.all([cartValue, order])
        let cart = []

        let counter = 0
        for (let singleitem of promisResp[1].items) {
            if (singleitem?.quantity) {

                if ((singleitem.productId.softDelete == false) && (singleitem.productId.status == true) && (singleitem.quantity >= 1)) {
                    cart.push(
                        {
                            product: singleitem.productId._id,
                            user: req.user.id,
                            customize: singleitem.customProduct,
                            quantity: singleitem.quantity
                        })
                } else {
                    counter++
                }
            } else {
                counter++
            }
        }


        let resp = await Cart.insertMany(cart)
        if (resp[0].quantity > 0) {
            response.message = "successfully order generate",
                response.status = 1
        } else if (counter > 1) {
            response.message = "successfully order generate \n same product are out of stock",
                response.status = 1
        }

        return res.json(response)
    } catch (err) {
        logger.error(err.message, { metadata: err });
        response.message = err.message || err.toString();
        response.status = 0;

        return res.json(response);
    }
}


const serialNumber = async (req, res) => {
    let response = {
        status: 0,
        message: 'Issue in serial number'
    }
    try {


        let srNum = await Order.findById(req.body.orderid);

        let newSrNum = []


        if (srNum.serialNumber.length) {
            let resp = srNum.serialNumber.find(obj => obj.productId.toString() === req.body.productId.toString())

            if (resp == undefined) {
                newSrNum.push(
                    {
                        productId: req.body.productId,
                        number: req.body.number
                    }
                )
                srNum.serialNumber.push(...newSrNum)

            } else {
                for (let singleSrNum of srNum.serialNumber) {
                    if (singleSrNum.productId.toString() === req.body.productId.toString()) {
                        if (req.body.number) {
                            singleSrNum.number = req.body.number
                        }
                        singleSrNum.save()
                    }
                }
            }

        } else {
            newSrNum.push(
                {
                    productId: req.body.productId,
                    number: req.body.number
                }
            )
            srNum.serialNumber.push(...newSrNum)
        }

        srNum.save()

        response.message = 'Add Serial Numbers'
        response.status = 1

        return res.json(response)

    } catch (err) {
        logger.error(err.message, { metadata: err });
        response.message = err.message || err.toString();
        response.status = 0;

        return res.json(response);
    }
}

module.exports = { list, updateStatus, confirmOrder, ownOrderList, getOrder, checkOrderStatus, ipnStatusUPI, reOrderGen, pcdealdiscount, orders, serialNumber };