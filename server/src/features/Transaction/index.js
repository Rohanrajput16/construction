import { Router } from 'express';
import Transaction from './transaction';
import { checkpermission, verifyToken, treeUnderUser } from '../../helper/common';

let logger = require('../../services/logger');

const router = Router();
const ObjectId = require('mongoose').Types.ObjectId;


// List
const list = async (req, res) => {
    
    // Default Response
    let response = {
        status: 0,
        message: 'Issue in transaction list'    
    }

    try {
        
        let filters = {};

        let list = await Transaction.find(filters);
        
        response.list = list;
        response.status = 1;
        response.message = ''

        return res.json(response);

    } catch (err) {
        
        logger.error(err.message, {metadata: err});
        response.message = err.message || err.toString();
        response.status = 0;

        return res.json(response);
    }
}

// Add
const create = async (req, res) =>  {

    // Default Response
    let response = {
        status: 0,
        message: 'Issue in create transaction'    
    }

    try {

        let data = {
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
        
        let transaction = await Transaction.create(data);
        
        response.transaction = transaction;
        response.status = 1;
        response.message = ''

        return res.json(response);

    } catch (err) {
        
        logger.error(err.message, {metadata: err});
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
        message: 'Issue in update transaction'    
    }

    try {


        let transaction = await Transaction.findById(req.params.id);

        transaction.type = req.body.type;
        transaction.order = req.body.order;
        transaction.amount = req.body.amount;
        transaction.user = req.body.user;
        transaction.payment = req.body.payment;
        transaction.comment = req.body.comment;
        transaction.trans_coins = req.body.trans_coins;
        transaction.wallet_remaining_coins = req.body.wallet_remaining_coins;
        transaction.remaining_coins = req.body.remaining_coins;
        transaction.status = req.body.status;

        transaction.save()
        
        
        response.transaction = transaction;
        response.status = 1;
        response.message = 'Successfully Update'

        return res.json(response);

    } catch (err) {
        
        logger.error(err.message, {metadata: err});
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
        message: 'Issue in delete transaction'    
    }

    try {

        let removeResponse = await Transaction.deleteOne({_id: ObjectId(req.params.id)});
        
        if(removeResponse.deletedCount) {
            response.status = 1;
            response.message = 'Transaction has been deleted';
     
        }

        return res.json(response);

    } catch (err) {
        
        logger.error(err.message, {metadata: err});
        response.message = err.message || err.toString();
        response.status = 0;

        return res.json(response);
    }   
}


module.exports = { list,create, update, del};