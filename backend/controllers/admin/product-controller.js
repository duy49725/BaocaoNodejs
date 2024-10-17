const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");

const handleImageUpload = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const url = "data:" + req.file.mimetype + ";base64," + b64;
        const result = await imageUploadUtil(url);
        res.json({
            success: true,
            result
        })
    } catch (error) {
        res.json({
            success: false,
            message: "Error occured"
        })
    }
}

const addProduct = async (req, res) => {
    try {
        const { image, title, publisher, description, category, author, price, salePrice, totalStock, averageReview } = req.body;
        const newlyCreateProduct = new Product({
            image, title, publisher, description, category, author, price, salePrice, totalStock, averageReview
        });
        await newlyCreateProduct.save();
        res.status(200).json({
            success: true,
            data: newlyCreateProduct
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occured"
        })
    }
}

const fetchAllProduct = async(req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const totalProduct = await Product.countDocuments();
        const listOfProducts = await Product.find({}).skip(skip).limit(limit);
        res.status(200).json({
            success: true,
            data: listOfProducts,
            pagination: {
                totalProduct,
                currentPage: page,
                totalPages: Math.ceil(totalProduct/limit),
                pageSize: limit
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occured"
        })
    }
}

const editProduct = async(req, res) => {
    try {
        const { id } = req.params;
        const { image, title, publisher, description, category, author, price, salePrice, totalStock, averageReview } = req.body;
        let findProduct = await Product.findById(id);
        if(!findProduct){
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }
        findProduct.title = title || findProduct.title;
        findProduct.publisher = publisher || findProduct.publisher;
        findProduct.description = description || findProduct.description;
        findProduct.category = category || findProduct.category;
        findProduct.author = author || findProduct.author;
        findProduct.price = price === "" ? 0 : price || findProduct.price;
        findProduct.salePrice = salePrice === "" ? 0 : salePrice || findProduct.salePrice;
        findProduct.totalStock = totalStock || findProduct.totalStock;
        findProduct.image = image || findProduct.image;
        await findProduct.save();
        res.status(200).json({
            success: true,
            data: findProduct
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occured"
        })
    }
}

const deleteProduct = async(req, res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product)
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        res.status(200).json({
            success: true,
            message: "Product delete successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occured"
        })
    }
}

module.exports = {handleImageUpload, addProduct, editProduct, deleteProduct, fetchAllProduct}