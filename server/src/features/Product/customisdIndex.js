import Customize from './customised';
let logger = require('../../services/logger');
const ObjectId = require('mongoose').Types.ObjectId;

const create = async (req, res) => {
    let response = {
        status: 0,
        message: 'Issue in create product',
    };

    try {

        if (req.body.alias && req.body.alias.length) {
            
            let product = await Customize.findOne({alias : req.body.alias})
             if (product?.alias == req.body.alias) {
                 response.message = 'This Alias is all ready added'
                 return res.json(response)
             }
         }
        let date = {
            name: req.body.name,
            slug: req.body.slug,
            product: req.body.product,
            category: req.body.category,
            price: req.body.price,
            description: req.body.description,
            stock: req.body.stock,
            alias : req.body.alias
        }

      

        


        let product = await Customize.create(date);

        if (product) {
            response.message = "Add customized produtc"
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

const mainlist = async (req, res) => {
    let response = {
        status: 0,
        message: 'Issue in customized produtc list',
    };

    try {
        let filters = {
            softdelete: false
        }
        if (req.body.category) {
            filters.category = req.body.category
        }

        if (req.body.stock) {
            filters.stock = req.body.stock
        }

        let list = await Customize.find(filters)


        response.message = "Add customized produtc"
        response.status = 1
        response.list = list

        return res.json(response)

    } catch (err) {
        logger.error(err.message, { metadata: err });
        response.message = err.message || err.toString();
        response.status = 0;

        return res.json(response);
    }
}

const edit = async (req, res) => {
    let response = {
        status: 0,
        message: 'Issue in produtc edit',
    };
    try {
        let product = await Customize.findOne(ObjectId(req.params.id))
        if ((req.body.alias && req.body.alias.length) && (req.body.alias != product.alias)) {
            
           let product = await Customize.findOne({alias : req.body.alias})
            if (product?.alias == req.body.alias) {
                response.message = 'This Alias is all ready added'
                return res.json(response)
            }
        }

        if (req.body.name) {
            product.name = req.body.name
        }

        if (req.body.description) {
            product.description = req.body.description
        }

        if (req.body.category) {
            product.category = req.body.category
        }
        if (req.body.stock) {
            product.stock = req.body.stock;
        } else if (req.body.stock == false) {
            product.stock = req.body.stock;
        }

        if (req.body.alias) {
            product.alias = req.body.alias
        } else if (req.body.alias == "") {
            product.alias = req.body.alias
        }

        if (req.body.price) {
            product.price = req.body.price
        }

        if (req.body.status == false) {
            product.status = req.body.status
        } else {
            product.status = req.body.status
        }

        product.save()

        response.message = "Edit produtc"
        response.status = 1
        response.list = list

        return res.json(response)

    } catch (err) {
        console.log('err',err)
        logger.error(err.message, { metadata: err });
        response.message = err.message || err.toString();
        response.status = 0;

        return res.json(response);
    }
}

const list = async (req, res) => {
    let response = {
        status: 0,
        message: 'Issue in customized produtc list',
    };

    try {
        let filters = {
            softdelete: false,
            status: true
        }

        if (req.body.category) {
            filters.category = req.body.category
        }
        let list = await Customize.find(filters).sort({ price: 1 });


        response.message = "Add customized produtc"
        response.status = 1
        response.list = list

        return res.json(response)

    } catch (err) {
        logger.error(err.message, { metadata: err });
        response.message = err.message || err.toString();
        response.status = 0;

        return res.json(response);
    }
}

const single = async (req, res) => {

    let response = {
        status: 0,
        message: 'Issue in customized produtc list',
    };
    try {
        let product = await Customize.findById(req.body.id)
        response.message = "Add customized produtc"
        response.status = 1
        response.product = product

        return res.json(response)
    } catch (err) {
        logger.error(err.message, { metadata: err });
        response.message = err.message || err.toString();
        response.status = 0;

        return res.json(response);
    }
}

const remove = async (req, res) => {
    let response = {
        status: 0,
        message: 'Issue in delete product',
    };

    try {
        let customized = await Customize.findOne(ObjectId(req.params.id))
        customized.softdelete = true;
        customized.save()

        response.message = "Delete Product"
        response.status = 1

        return res.json(response);
    } catch (err) {
        logger.error(err.message, { metadata: err });
        response.message = err.message || err.toString();
        response.status = 0;

        return res.json(response);
    }
}

module.exports = {
    create,
    mainlist,
    list,
    single,
    edit,
    remove
}