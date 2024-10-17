const Product = require("../../models/Product");

const searchProducts = async(req, res) => {
    try {
        const {keyword} = req.params;
        if(!keyword || typeof keyword !== "string"){
            return res.status(400).json({
                success: false,
                message: "Keyword is required and must be in string format"
            })
        }
        const regEX = new RegExp(keyword, "i");
        const createSearchQuery = {
            $or: [
                {title: regEX},
                {description: regEX},
                {category: regEX},
                {publisher: regEX}
            ]
        }
        const searchResult = await Product.find(createSearchQuery);
        res.status(200).json({
            success: true,
            data: searchResult
        })
    } catch (error) {
        res.status(500).json({
            success: true,
            data: "Error"
        })
    }
}

module.exports = {searchProducts};