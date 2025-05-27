import Cost from "./cost";
import Category from "../Category/category";
import Product from "../Product/product";
import Project from "../Project/project";
import { log } from "winston";
let logger = require('../../services/logger');
const ObjectId = require('mongoose').Types.ObjectId;

function convertInFeet(size){
    let number = Math.floor(size);
    let decimal = size - number;
    decimal *= 10;
    decimal = decimal/12;
    return decimal + number;
}

function calculateVolume(no1, no2, no3, l, b, h, convert){
    l = convertInFeet(l);
    b = convertInFeet(b);
    h = convertInFeet(h);
    let volumeInFoot = no1*no2*no3*l*b*h;
    let volumeInMeter;
    if(convert == 1){
        volumeInMeter = volumeInFoot * 0.0283168;
    }else if(convert == 2){
        volumeInMeter = volumeInFoot * 0.092903;
    }else{
        volumeInMeter = volumeInFoot * 0.3048;
    }
    return volumeInMeter;
}

// Calculate the amount of substance used in making that wall
function quantity(volumeOfWall, amountInOneCubicMeter){
    return volumeOfWall*amountInOneCubicMeter;
}

const estimationCreate = async (req, res) => {
    let response = {
        message: "issue in find the estimation",
        status: 0
    };
    try {
        let data = {};
        let totalEstimationPrice = 0;

        data.projectId = ObjectId(req.body.projectId);
        
        data.name = req.body.name;
        data.slug = req.body.name;
        data.user = req.user.id;
        let rows = req.body.estimation[0].rows;
        
        data.estimation = [];
        
        let estimationData = {};

        estimationData.description = req.body.estimation[0].description;
        estimationData.estimationNo = req.body.estimation[0].estimationNo;
        estimationData.category = ObjectId(req.body.estimation[0].category); 
        estimationData.rows = rows;
        
        
        // Fetching the product IDs and converting them to ObjectId
        
        let productIdArray = req.body.estimation[0].products.map(id => ObjectId(id)); 

        estimationData.products = productIdArray;
        
        let products = await Product.find({ _id: { $in: productIdArray } });
        
        // Find calculateEstimation from the category
        let convert = 1;
        let cat = await Category.findOne({ _id: ObjectId(req.body.estimation[0].category) });
        if (cat && cat.calculateEstimation === 0) {
            convert = 0;
        }
        if (cat && cat.calculateEstimation === 2) {
            convert = 2;
        }

        let variety = req.body.estimation[0].rows[0].variety;
        
        let totalVolumeInMeter;
        
        
        if (typeof variety === 'undefined' || variety == "") {
            totalVolumeInMeter = 0;
            for (let row of rows) {
                totalVolumeInMeter += calculateVolume(row.no1, row.no2, row.no3, row.length, row.width, row.height, convert);
            }
        } else {
            totalVolumeInMeter = [];
            for (let row of rows) {
                totalVolumeInMeter.push(calculateVolume(row.no1, row.no2, row.no3, row.length, row.width, row.height, convert));
            }
        }
        
        
        let items = [];
        for (let product of products) {
            if(product.size == variety){
                let item = {};
                
                let amountInOneCubicMeter;
                for (let singleItem of product.categories) {
                    if (singleItem._id.equals(ObjectId(req.body.estimation[0].category))) {
                        amountInOneCubicMeter = singleItem.amountInOneCubicMeter;
                    }
                }
                
                let totalAmount;
                if (typeof variety === 'undefined' || variety == "") {
                    totalAmount = quantity(totalVolumeInMeter, amountInOneCubicMeter);
                } else {
                    totalAmount = quantity(totalVolumeInMeter[0], amountInOneCubicMeter);
                }
                
                item.product = product.name;
                item.amount = [];
                
                let subItem = {};
                subItem.location1 = rows[0].location1;
                subItem.estimationNo = req.body.estimation[0].estimationNo;
                subItem.location2 = rows[0].location2;
                subItem.quantity = totalAmount;
                subItem.totalCost = totalAmount * product.price;
                subItem.description = req.body.estimation[0].description;
                item.amount.push(subItem);
                item.totalQty = totalAmount;
                item.totalCost = totalAmount * product.price;
                totalEstimationPrice += item.totalCost;
                
                items.push(item);

            }
        }
        
        data.estimationReport = items;
        
        data.totalEstimationPrice = totalEstimationPrice;
        data.estimation.push(estimationData);
        
        let project = await Project.findOne({ _id: ObjectId(req.body.projectId) });
        if (!project.totalCost) {
            project.totalCost = 0;
        }
        project.totalCost += totalEstimationPrice;
        await project.save();
        
        let cost = await Cost.create(data);
        
        response.message = "Estimation saved successfully";
        response.status = 1;
        response.cost = cost;
        return res.json(response);

    } catch (err) {
        logger.error(err.message, { metadata: err });
        response.message = err.message || err.toString();
        response.status = 0;

        return res.json(response);
    }
};



const estimationUpdate = async (req, res) => {
    let response = {
        message: "issue in find the estimation",
        status: 0
    }
    try {
        // data is searched which we want to update 
        let data = await Cost.findOne({_id: ObjectId(req.body.id)}).populate('projectId');
        data.projectId.totalCost -= data.totalEstimationPrice;
        
        if(!data){
            response.message = "That estimation is not found for update";
            response.status = 0;
            return res.json(response);
        }

        data.name = req.body.name;
        data.slug = req.body.name;

        // reset estimationReport data before update because we change complete report by consider complete data 
        data.estimationReport = [];

        let totalEstimationPrice = 0;
        let estimationData = req.body.estimation;

        for(let subData of estimationData){
            
            // category is searched for because we wants to check weather we wil convert it in volume, meter or area 
            let cat = await Category.findOne({_id: ObjectId(subData.category)});
            let convert = 1;
            if(cat && cat.calculateEstimation == 0){
                convert = 0;
            }
            if(cat && cat.calculateEstimation == 2){
                convert = 2;
            }
            
            let totalVolumeInMeter;

            // this variety is finded such that we can identify weather we should consider variety or size
            //  in our further calculation
            let variety = subData.rows[0]?.variety;

            // products are fetched of which we will find reporting 
            let productIdArray = subData.products.map(id => ObjectId(id));
            subData.products = productIdArray;

            let products = await Product.find({_id: {$in : productIdArray}});

            // if variety is coming than we have to consider each row differently 
            if(typeof variety == 'undefined' || variety == ""){

                
                totalVolumeInMeter = 0;
                for(let row of subData.rows){
                    totalVolumeInMeter += calculateVolume(row.no1, row.no2, row.no3, row.length, row.width, row.height, convert);
                }
                

                for(let product of products){
                    let amountInOneCubicMeter;
                    for(let singleItem of product.categories){
                        if(singleItem._id.equals(ObjectId(subData.category))){
                            amountInOneCubicMeter = singleItem.amountInOneCubicMeter;
                        }
                    }

                    let totalAmount = quantity(totalVolumeInMeter, amountInOneCubicMeter);
                    let item = {};
                    let subItem = {};
                    item.amount = [];
                    item.product = product.name;
                    subItem.estimationNo = subData.estimationNo;
                    subItem.description = subData.description;
                    subItem.location1 = subData.rows[0].location1;
                    subItem.location2 = subData.rows[0].location2;
                    subItem.quantity = totalAmount;
                    subItem.totalCost = totalAmount*product.price;
                    item.amount.push(subItem);
                    item.totalQty = totalAmount;
                    item.totalCost = totalAmount * product.price;
                    totalEstimationPrice += item.totalCost;
                    
                    let reportItem = {...item};

                    // checking weather the product is already added or not if it is present we add the quntity 
                    // simply in this 
                    
                    let existingReport = data.estimationReport.find(r => r.product == item.product);
                    if(typeof existingReport != 'undefined'){
                        
                        existingReport.amount.push(reportItem.amount[0]);
                        existingReport.totalQty += item.totalQty;
                        existingReport.totalCost += item.totalCost;
                    }else{
                        data.estimationReport.push(reportItem);
                    }
                    
                }

                
            }else{
                let totalVolume = 0;
                // this array stores those products which will not covered in the rows 
                let productNotUsed = [];
                // in this case we calculate by row not with every product 
                for(let row of subData.rows){
                    totalVolumeInMeter = calculateVolume(row.no1, row.no2, row.no3, row.length, row.width, row.height, convert);
                    totalVolume += totalVolumeInMeter;
                    
                    
                    
                    
                    for(let product of products){
                        let amountInOneCubicMeter;
                        
                        if(product.size == row.variety){
                            productNotUsed.push(ObjectId(product.id));
                            
                            for(let singleItem of product.categories){
                                if(singleItem._id.equals(ObjectId(subData.category))){
                                    amountInOneCubicMeter = singleItem.amountInOneCubicMeter;
                                }
                            }
                            
                            let totalAmount = quantity(amountInOneCubicMeter, totalVolumeInMeter);
                            
                            
                            let item = {};
                            let subItem = {};
                            item.amount = [];
                            item.product = product.name;
                            subItem.description = subData.description;
                            subItem.estimationNo = subData.estimationNo;
                            subItem.location1 = row.location1;
                            subItem.location2 = row.location2;
                            subItem.quantity = totalAmount;
                            subItem.totalCost = totalAmount*product.price;
                            item.amount.push(subItem);
                            item.size = row.variety;
                            item.totalQty = totalAmount;
                            item.totalCost = totalAmount * product.price;
                            totalEstimationPrice += item.totalCost;
                            
                            let reportItem = {...item};
                            
                            let existingReport = data.estimationReport.find(r => r.product == item.product && item.size == product.size);
                            if(typeof existingReport != 'undefined'){
                                
                                existingReport.amount.push(reportItem.amount[0]);
                                existingReport.totalQty += item.totalQty;
                                existingReport.totalCost += item.totalCost;
                            }else{
                                data.estimationReport.push(reportItem);
                            }
                            
                            
                        }

                    }
                }
                
                // this checks which are those products whoes estimation is not found in above code 
                const leftProducts = products.filter(product => {
                    return !productNotUsed.some(id => id.equals(product._id));
                });
                
                
                // calculating estimation of rest of the products 
                for(let product of leftProducts){
                    if( ! (product.size)){
                        let amountInOneCubicMeter;
                        for(let singleItem of product.categories){
                            if(singleItem._id.equals(ObjectId(subData.category))){
                                amountInOneCubicMeter = singleItem.amountInOneCubicMeter;
                            }
                        }
                        // console.log("totalVolume", leftProducts);
    
                        let totalAmount = quantity(totalVolume, amountInOneCubicMeter);
                        let item = {};
                        let subItem = {};
                        item.amount = [];
                        item.product = product.name;
                        subItem.estimationNo = subData.estimationNo;
                        subItem.description = subData.description;
                        subItem.location1 = subData.rows[0].location1;
                        subItem.location2 = subData.rows[0].location2;
                        subItem.quantity = totalAmount;
                        subItem.totalCost = totalAmount*product.price;
                        item.amount.push(subItem);
                        item.totalQty = totalAmount;
                        item.totalCost = totalAmount * product.price;
                        totalEstimationPrice += item.totalCost;
                        
                        let reportItem = {...item};
    
                        // checking weather the product is already added or not if it is present we add the quntity 
                        // simply in this 
                        
                        let existingReport = data.estimationReport.find(r => r.product == item.product);
                        if(typeof existingReport != 'undefined'){
                            
                            existingReport.amount.push(reportItem.amount[0]);
                            existingReport.totalQty += item.totalQty;
                            existingReport.totalCost += item.totalCost;
                        }else{
                            data.estimationReport.push(reportItem);
                        }

                    }
                }
            }

        }
        data.estimation = estimationData;
        data.totalEstimationPrice = totalEstimationPrice;
        
        data.projectId.totalCost += totalEstimationPrice;

        await data.projectId.save();
        await data.save();

        response.message = "cost is updated successfully";
        response.status = 1;
        response.list = data;
        return res.json(response);

    } catch (err) {
        logger.error(err.message, { metadata: err });
        response.message = err.message || err.toString();
        response.status = 0;

        return res.json(response);
    }
}



const list = async (req, res) => {
    let response = {
        message: "issue in find the estimation",
        status: 0
    }
    try {
        let filters = {};
        

        if(req.user.role.slug != 'admin'){
            filters.user = req.user.id;
        }

        // finalReport hold the ereporting of every filter applied 
        // let finalReport = [];
        
        if(req.body.projectId){
            filters.projectId = ObjectId(req.body.projectId);
        }

        if (req.body.search) {
            filters['$or'] = [
              { name: { '$regex': req.body.search, $options: 'i' } },
              { slug: { '$regex': req.body.search, $options: 'i' } }
            ]
        }

        if (req.body.categories != null) {
          let categories = [];
          for (const singleCategory of req.body.categories) {
            categories.push(ObjectId(singleCategory));
          }
          if (categories.length) {
            filters['estimation.category'] = { $in: categories };
          }
        }
        
        let result = await Cost.find(filters).sort({createdAt: -1}).populate({ path: "estimation.category", select: 'name codeNo' });
        if(!result){
            response.message = "No estimation is present in this project";
            response.status = 0;
            return res.json(response);
        }

        // for(let singleItem of result){
        //     for(let item of singleItem.estimationReport){

        //         let existingReport = finalReport.find(r => r.product === item.product && (!item.size || r.size === item.size));

        //         if (existingReport) {
        //             // if product exists, update the quantity and total cost
        //             existingReport.quantity += item.quantity;
        //             existingReport.totalCost += item.totalCost;
        //         } else {
        //             // if not, add the new item to the report
        //             finalReport.push(item);
        //         }
        //     }
        // }
        
        
        response.list = result;
        // response.finalReport = finalReport;
        response.message = "estimation is fetched successfully";
        response.status = 1;
        return res.json(response);

    } catch (err) {
        logger.error(err.message, { metadata: err });
        response.message = err.message || err.toString();
        response.status = 0;

        return res.json(response);
    }
}

const del = async (req, res) =>{
    let response = {
        message: "issue in deleting the estimation",
        status: 0
    }
    try {
        let cost = await Cost.findOne({_id: req.params.id}).populate('projectId');
        cost.projectId.totalCost -= cost.totalEstimationPrice;
        cost.projectId.save();

        await Cost.deleteOne({_id: req.params.id});
        
        response.message = "estimation is deleted successfully";
        response.status = 1;
        return res.json(response);

    } catch (err) {
        logger.error(err.message, { metadata: err });
        response.message = err.message || err.toString();
        response.status = 0;

        return res.json(response);
    }
}

const totalEstimation = async (req, res) => {
    let response = {
        message: "issue in totaling the estimation",
        status: 0
    }
    try {
        let result = await Cost.find({projectId: ObjectId(req.body.projectId)});
        
        let sum = 0;
        for(let singleItem of result){
            sum += singleItem.totalEstimationPrice;
        }
        
        response.sum = sum;
        response.message = "total of estimation is calculated";
        response.status = 1;
        return res.json(response);

    } catch (err) {
        logger.error(err.message, { metadata: err });
        response.message = err.message || err.toString();
        response.status = 0;

        return res.json(response);
    }
}


module.exports = {estimationCreate, estimationUpdate, list, del, totalEstimation};