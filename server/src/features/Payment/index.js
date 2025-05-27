import { Router } from 'express';
import Payment from './payment';
import { checkpermission, verifyToken, treeUnderUser, userCashback } from '../../helper/common';
import paymentReq from '../../helper/payment/payment'
import Order from '../Order/order';
// import Cart from '../Cart/cart';
import { incressQty } from '../Product/index'
import { whatsaapNotify } from '../Notification//whatsapp';
let logger = require('../../services/logger');

const router = Router();
const ObjectId = require('mongoose').Types.ObjectId;


// List
const list = async (req, res) => {

    // Default Response
    let response = {
        status: 0,
        message: 'Issue in payment list'
    }

    try {

        let filters = {};

        let list = await Payment.find(filters);

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

// Add
const create = async (req, res) => {

    // Default Response
    let response = {
        status: 0,
        message: 'Issue in create payment'
    }

    try {

        let data = {
            userid: req.body.userid,
            amount: req.body.amount,
            mode: req.body.mode,
            type: req.body.type,
            paymentTransaction: req.body.paymentTransaction,
            transactionTime: req.body.transactionTime,
            reason: req.body.reason,
            status: req.body.status
        }

        let payment = await Payment.create(data);

        response.payment = payment;
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

// Edit
const update = async (req, res) => {

    // Default Response
    let response = {
        status: 0,
        message: 'Issue in update payment'
    }

    try {


        let payment = await Payment.findById(req.params.id);

        payment.userid = req.body.userid;
        payment.amount = req.body.amount;
        payment.mode = req.body.mode;
        payment.type = req.body.type;
        payment.paymentTransaction = req.body.paymentTransaction;
        payment.transactionTime = req.body.transactionTime;
        payment.reason = req.body.reason;
        payment.status = req.body.status;

        payment.save()


        response.payment = payment;
        response.status = 1;
        response.message = 'Successfully Update'

        return res.json(response);

    } catch (err) {

        logger.error(err.message, { metadata: err });
        response.message = err.message || err.toString();
        response.status = 0;

        return res.json(response);
    }
}

// Delete - Not parmanent delete
const del = async (req, res) => {
    // Default Response
    let response = {
        status: 0,
        message: 'Issue in delete payment'
    }

    try {
        if (req.user.role) {
            let responsePermission = await checkpermission(req.user.role.slug, 'authorised');
            if (responsePermission.status != 1) {
                return res.json(responsePermission);
            }
        }

        let removeResponse = await Payment.deleteOne({ _id: ObjectId(req.params.id) });

        if (removeResponse.deletedCount) {
            response.status = 1;
            response.message = 'Payment has been deleted';

        }

        return res.json(response);

    } catch (err) {

        logger.error(err.message, { metadata: err });
        response.message = err.message || err.toString();
        response.status = 0;

        return res.json(response);
    }
}

const paymentNotification = async (req, res) => {


    // {
    //     "CURRENCY": "INR",
    //     "GATEWAYNAME": "HDFC",
    //     "RESPMSG": "Txn Success",
    //     "BANKNAME": "HDFC",
    //     "PAYMENTMODE": "NB",
    //     "CUSTID": "3183",
    //     "MID": "PCDEAL06379846292223",
    //     "MERC_UNQ_REF": "",
    //     "RESPCODE": "01",
    //     "TXNID": "20230803010900000893848115818330657",
    //     "TXNAMOUNT": "992.00",
    //     "ORDERID": "232293",
    //     "STATUS": "TXN_SUCCESS",
    //     "BANKTXNID": "232159654975",
    //     "TXNDATETIME": "2023-08-03 13:13:17.0",
    //     "TXNDATE": "2023-08-03",
    //     "CHECKSUMHASH": "pgG3aXRHJIqYGFGJa75nzv1nLkOaWm+Esae1tFRsuJe2pAV6yWXOopeNEzv0g9a+JPxInZxAnnemnS+i4DOoTUQi60JCNFZ7SVwxady5ls4="
    //   }


    // Default Response
    let response = {
        status: 0,
        message: 'Issue in nofification data'
    }

    try {

        logger.info('paymentinfo', { metadata: req.body });

        let paytmOrderId = req.body?.orderid;

        let payment = await Payment.findOne({ orderId: ObjectId(paytmOrderId) });


        if (payment.status != 0) {
            logger.info('Already Updated', { metadata: payment });
            response.message = 'UPI you already updated this order';
            response.status = 0;
            return res.json(response);
        }

        let paytmPaymentStatus = req.body?.txn_status;

        let txnAmount = req.body?.amount;

        // check order amount
        payment.orderPayment = {
            "CURRENCY": 'INR',
            "GATEWAYNAME": 'UPI',
            "RESPMSG": '',
            "TXNID": req.body?.paymentTxn,
            "TXNAMOUNT": req.body?.amount,
            "ORDERID": req.body?.orderid,
            "STATUS": req.body?.txn_status,
            "BANKTXNID": req.body?.paymentTxn,
            "TXNDATETIME": req.body?.txn_time,
            "TXNDATE": req.body?.createdAt
        }

        if (paytmPaymentStatus == 2) {

            // Success for 2
            payment.status = 2;

            

            // Todo: save paymant response

           

            let userOrder = await Order.findOne({ _id: ObjectId(payment.orderId) }).populate('user')


          
            userOrder.status = 2
            userOrder.paymentId = payment.id
            userOrder.statusTime = [
                { status: userOrder.status, time: new Date() }
            ]
            await userOrder.save()
            
           




        } else if (paytmPaymentStatus == 1) {

           

            await incressQty(paytmOrderId)

            payment.status = 1;

            let userOrder = await Order.findOne({ _id: ObjectId(payment.orderId) })
            userOrder.status = 1
            // order status time
            userOrder.statusTime = [
                { status: 1, time: new Date() }
            ]
            await userOrder.save()

        
        }

        let txTime = new Date(req.body?.txn_time);
        if (txTime || req.body?.txn_time) {
            payment.transactionTime = txTime?.toISOString();
        }

        payment.paymentTransaction = req.body?.paymentTxn
       await payment.save();

        response.status = 1;
        response.message = 'UPI Created Successfully'

        return res.json(response);

    } catch (err) {

        logger.error(err.message, { metadata: err });
        response.message = err.message || err.toString();
        response.status = 0;

        return res.json(response);
    }
}

const paytmreturn = async (req, res) => {

    logger.info('paytmreturn', { metadata: req.body });

    let orderId = req.body?.ORDERID;
    let status = req.body?.STATUS ? req.body?.STATUS : 0;

    let urlParms = '';
    if (orderId) {

        urlParms = orderId;

        if (status == 'TXN_FAILURE') {
            status = 1;




        } else if (status == 'TXN_SUCCESS') {
            status = 2;
        }
        urlParms += `/${status}`
    }

    return res.redirect('/response/' + urlParms);

}



module.exports = { list, create, update, del, paymentNotification, paytmreturn };
