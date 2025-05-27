import { Router } from 'express';
import Page from './page';
import { checkpermission, verifyToken, treeUnderUser } from '../../helper/common';

let logger = require('../../services/logger');

const router = Router();
const ObjectId = require('mongoose').Types.ObjectId;


// List
const list = async (req, res) => {

    // Default Response
    let response = {
        status: 0,
        message: 'Issue in page list'
    }

    try {

        let filters = {};


        let list = await Page.find(filters);

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

// List
const listFrontEnd = async (req, res) => {

    // Default Response
    let response = {
        status: 0,
        message: 'Issue in page list'
    }

    try {

        let filters = {};
        filters.status = true;

        let list = await Page.find(filters);

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
        message: 'Issue in create page.'
    }

    try {

        let data = {
            name: req.body.name,
            description: req.body.description,
            slug: req.body.slug,
            meta_title: req.body.meta_title,
            meta_tags: req.body.meta_tags,
            meta_description: req.body.meta_description,
            meta_schema: req.body.meta_schema,
            status: req.body.status
        }

        let page = await Page.create(data);

        response.page = page;
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
        message: 'Issue in update page'
    }

    try {

        let page = await Page.findById(req.params.id);
      
        if (req.body.name) {
            page.name = req.body.name;
        }
        if (req.body.description) {
            page.description = req.body.description;
        }
        if (req.body.slug) {
            page.slug = req.body.slug;
        }
        if (req.body.meta_title) {
            page.meta_title = req.body.meta_title;
        }
        if (req.body.meta_tags) {
            page.meta_tags = req.body.meta_tags;
        }
        if (req.body.meta_description) {
            page.meta_description = req.body.meta_description;
        }
        if (req.body.meta_schema) {
            page.meta_schema = req.body.meta_schema;
        }
        if (req.body.status) {
            page.status = req.body.status;
        }
        page.save()


        response.page = page;
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

const getPage = async (req, res) => {

    // Default Response
    let response = {
        status: 0,
        message: 'Issue in update page'
    }

    try {


        let page = await Page.findOne({ slug: req.params.slug, status: true });

        response.message = 'Page not found';
        if (page) {
            response.page = page;
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

const remove = async (req, res) => {
    try {
        // Default Response
        let response = {
            status: 0,
            message: 'Issue in remove page'
        }

        let page = await Page.deleteOne({ _id: ObjectId(req.params.id) });

        if (page.acknowledged) {
            response.status = 1;
            response.message = 'Delete'
        }

        return res.json(response);
    } catch (err) {
        logger.error(err.message, { metadata: err });
        response.message = err.message || err.toString();
        response.status = 0;

        return res.json(response);
    }
}

const ckfileUploader = async (req,res) => {
    let response = {
        status: 0,
        message: 'Issue in remove page'
    }

    try {
        let data = req.file;

        if(data){
            response.status = 1;
            response.message = 'okk'
        }

    return res.json(response)

    } catch (err) {
        logger.error(err.message, { metadata: err });
        response.message = err.message || err.toString();
        response.status = 0;

        return res.json(response);
    }
}


module.exports = { list, create, update, listFrontEnd, getPage, remove ,ckfileUploader};