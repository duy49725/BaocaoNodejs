const Product = require('../../models/Product');

const getFilteredProducts = async(req, res) => {
    try {
        const {category = [], publisher = [], sortBy = "price-lowtohigh"} = req.query;
        let filters = {};
        if(category.length){
            filters.category = {$in: category.split(",")}
        }
        if(publisher.length){
            filters.publisher = {$in: publisher.split(",")}
        }
        let sort = {}
        switch(sortBy){
            case 'price-lowtohight':
                sort.price = 1;
                break;
            case 'price-hightolow':
                sort.price = -1;
                break;
            case 'title-atoz':
                sort.title = 1;
                break;
            case 'title-ztoa':
                sort.title = -1;
                break;
            default:
                sort.price = 1
                break;
        }
        const products = await Product.find(filters).sort(sort)
        res.status(200).json({
            success: true,
            data: products
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Some error occured'
        })
    }
}

const getProductDetail = async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        if(!product)
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        res.status(200).json({
            success: true,
            data: product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Some error occured"
        })
    }
}

module.exports = {getFilteredProducts, getProductDetail}