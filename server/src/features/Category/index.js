import { Router } from 'express';
import Category from './category';
import { checkpermission, verifyToken, treeUnderUser } from '../../helper/common';
import { categorySchema } from '../../services/validators';
import Joi from 'joi';

let logger = require('../../services/logger');

const router = Router();
const ObjectId = require('mongoose').Types.ObjectId;


// List
const list = async (req, res) => {

    // Default Response
    let response = {
        status: 0,
        message: 'Issue in categories list'
    }

    try {

        let filters = {};
        filters.softDelete = false;

        if(req.user.role.slug != 'admin'){
            filters.user = req.user.id;
        }

        // seraching if we send code no or category name both
        if (req.body.search) {
            const searchValue = req.body.search;
        
            let orConditions = [
                { name: { '$regex': searchValue, $options: 'i' } },
                { slug: { '$regex': searchValue, $options: 'i' } }
            ];
            
            // checking if we send no.
            if (!isNaN(searchValue)) {
                orConditions.push({ codeNo: Number(searchValue) });
            }
        
            filters["$or"] = orConditions;
        }
        

        let list = await Category.find(filters).sort({ orderby: 1 });

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


const frontEndlist = async (req, res) => {

    // Default Response
    let response = {
        status: 0,
        message: 'Issue in categories list'
    }

    try {

        let filters = {};
        // let numberOfRecords = 11;
        // let page = req.body.page ? req.body.page : 1;
        // Set for soft delete
        filters.softDelete = false;
        filters.status = true;



        if (req.body.search) {
            filters.name = { '$regex': req.body.search , $options : 'i'};
            filters.slug = { '$regex': req.body.search, $options : 'i' };
        };

        let list = await Category.find(filters).sort({ orderby: 1 });
        // let list = await Category.find(filters);
        if (list) {

            response.list = list;
            response.status = 1;
            response.message = ''

        };
        return res.json(response);

    } catch (err) {

        logger.error(err.message, { metadata: err });
        response.message = err.message || err.toString();
        response.status = 0;

        return res.json(response);
    }
}

// list
const childCategory = async (req, res) => {

    // Default Response
    let response = {
        status: 0,
        message: 'Issue in categories list'
    }

    try {

        let filters = {};
        let numberOfRecords = 11;

        filters.softDelete = false;
        filters.status = true;


        if (req.body.page) {
            let page = req.body.page
            let list = await Category.find(filters).skip((page - 1) * numberOfRecords).limit(numberOfRecords)
            // let list = await Category.find(filters);
            response.list = list;
        }
        else if (req.body.page == undefined) {
            let list = await Category.find(filters)
            response.list = list;

        }


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
        message: 'Issue in create category'
    }

    // let { value, error } = Joi.validate(req.body, categorySchema);
    // if (!value) {
    //     return res.json({
    //         message: error.details[0].message,
    //     });
    // }

    try {
        if (req.user.role) {
            let responsePermission = await checkpermission(req.user.role.slug, 'addCategories');
            if (responsePermission.status != 1) {
                return res.json(responsePermission);
            }
        }

        let data = {
            name: req.body.name,
            description: req.body.description,
            slug: req.body.name,
            codeNo: req.body.codeNo,
            user: req.user.id,
            orderby: req.body.orderby,
            status: req.body.status,
            excludedTerm: req.body.excludedTerm,
            rate: req.body.rate,
            calculateEstimation: req.body.calculateEstimation
        }

        if (req.file) {
            data.image = req.file.path;
        }

        let cat = await Category.create(data);

        response.category = cat;
        response.status = 1;
        response.message = 'Successfully Add Category'

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
        message: 'Issue in update category'
    }

    try {

        if (req.user.role) {
            let responsePermission = await checkpermission(req.user.role.slug, 'updateCategories');
            if (responsePermission.status != 1) {
                return res.json(responsePermission);
            }
        }

        let cat = await Category.findById(req.params.id);

        if(req.body.name) cat.name = req.body.name;
        if(req.body.description || req.body.description == "") cat.description = req.body.description;
        if(req.body.orderby || req.body.orderby == 0) cat.orderby = req.body.orderby;
        if(req.body.codeNo || req.body.codeNo == 0) cat.codeNo = req.body.codeNo;
        if(req.body.name) cat.slug = req.body.name;
        if(req.body.status || req.body.status == false) cat.status = req.body.status;
        if(req.body.excludedTerm) cat.excludedTerm = req.body.excludedTerm;
        if(req.body.rate) cat.rate = req.body.rate;
        if(req.body.calculateEstimation) cat.calculateEstimation = req.body.calculateEstimation;


        if (req.file) {
            cat.image = req.file.path;
        }

        cat.save()


        response.category = cat;
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
        message: 'Issue in delete category'
    }

    try {
        if (req.user.role) {
            let responsePermission = await checkpermission(req.user.role.slug, 'deleteCategories');
            if (responsePermission.status != 1) {
                return res.json(responsePermission);
            }
        }

        let newName = Date.now() + '-' + Math.round(Math.random() * 1E9);
        let cat = await Category.updateOne({_id : ObjectId(req.params.id)}, {name : newName, slug : newName, softDelete : true});

    
        if(cat.n == 1){
            response.status = 1;
            response.message = 'Category has been deleted';
        }

        return res.json(response);

    } catch (err) {
        logger.error(err.message, { metadata: err });
        response.message = err.message || err.toString();
        response.status = 0;

        return res.json(response);
    }
}


module.exports = { list, create, update, del, frontEndlist, childCategory };