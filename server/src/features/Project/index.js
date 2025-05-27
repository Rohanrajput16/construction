import { Router } from 'express';
import Project from './project';
import { checkpermission, verifyToken, treeUnderUser, apiReq, getFilterSettings } from '../../helper/common';
import { emailmessage } from '../../features/Notification/email';
// import EmailTemplate from '../EmailTemplate/emailTemplate';
import { whatsaapNotify } from '../Notification/whatsapp';
import Cost from '../Cost/cost';

let logger = require('../../services/logger');

const router = Router();
const ObjectId = require('mongoose').Types.ObjectId;


const list = async (req, res) => {
    let response = {
        status: 0,
        message: 'Issue in project list'
    }
    try {
        let filters = {};
        if(req.user.role.slug != 'admin'){
            filters.user = req.user.id;
        }
        let project = await Project.find(filters);

        response.list = project;
        response.message = "projects are fteched";
        response.status = 1;

        return res.json(response);
    } catch (err) {
        logger.error(err.message, { metadata: err });
        response.message = err.message || err.toString();
        response.status = 0;

        return res.json(response);
    }
}

const create = async (req, res) => {
    let response = {
        status: 0,
        message: 'Issue in creating project'
    }
    try {
        let data = {};

        data.user = req.user.id;

        if(req.body.name){ 
            data.name = req.body.name;
            data.slug = req.body.name;
        }
        if(req.body.description){ 
            data.description = req.body.description;
        }
        // if(req.body.image){ 
        //     data.image = req.body.image;
        // }
        if(req.body.status){ 
            data.status = req.body.status;
        }
        if(req.body.softDelete){ 
            data.softDelete = req.body.softDelete;
        }

        let project = await Project.create(data);

        response.list = project;
        response.message = "project is created";
        response.status = 1;

        return res.json(response);
    } catch (err) {
        console.log(err);
        
        logger.error(err.message, { metadata: err });
        response.message = err.message || err.toString();
        response.status = 0;

        return res.json(response);
    }
}

const update = async (req, res) => {
    let response = {
        status: 0,
        message: 'Issue in updating project'
    }
    try {
        
        let id = req.body.id
        let project = await Project.findById(id);

        if(req.body.name){ 
            project.name = req.body.name;
            project.slug = req.body.name;
        }
        if(req.body.description){ 
            project.description = req.body.description;
        }
        // if(req.body.image){ 
        //     project.image = req.body.image;
        // }
        if(req.body.status){ 
            project.status = req.body.status;
        }
        if(req.body.softDelete){ 
            project.softDelete = req.body.softDelete;
        }
        if(req.body.totalCost){
            project.totalCost = req.body.totalCost;
        }

        project.save();

        response.list = project;
        response.message = "projects are updated";
        response.status = 1;

        return res.json(response);
    } catch (err) {
        console.log(err);
        
        logger.error(err.message, { metadata: err });
        response.message = err.message || err.toString();
        response.status = 0;

        return res.json(response);
    }
}

const del = async (req, res) => {
    // Default Response
    let response = {
        status: 0,
        message: 'Issue in delete project'
    }

    try {

        let removeResponse = await Project.deleteOne({ _id: ObjectId(req.params.id) });

        await Cost.deleteMany({projectId: ObjectId(req.params.id)});

        if (removeResponse.deletedCount) {
            response.status = 1;
            response.message = 'Project has been deleted';

        }

        return res.json(response);

    } catch (err) {

        logger.error(err.message, { metadata: err });
        response.message = err.message || err.toString();
        response.status = 0;

        return res.json(response);
    }
}

module.exports = { list, create, update, del};