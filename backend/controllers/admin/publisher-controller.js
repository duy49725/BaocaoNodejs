const Publisher = require('../../models/Publisher');

const addPublisher = async (req, res) => {
    try {
        const {id, label} = req.body;
        if(!id || !label){
            return res.status(400).json({
                success: false,
                message: "Invalid data provided"
            })
        }
        const newPublisher = new Publisher({id, label});
        await newPublisher.save();
        res.status(201).json({
            success: true,
            data: newPublisher
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        })
    }
}

const fetchAllPublisher = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const totalPublisher = await Publisher.countDocuments();
        const publisherList = await Publisher.find({}).skip(skip).limit(limit);
        res.status(200).json({
            success: true,
            data: publisherList,
            pagination: {
                totalPublisher,
                currentPage: page,
                totalPages: Math.ceil(totalPublisher/limit),
                pageSize: limit
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        })
    }
}

const fetchPublisher = async(req, res) =>{
    try {
        const publisher = await Publisher.find({});
        if(!publisher){
            return res.status(404).json({
                success: false,
                message: "Not found"
            })
        }
        return res.status(200).json({
            success: true,
            data: publisher
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Some error ocurred"
        })
    }
}

const editPublisher = async (req, res) => {
    try {
        const {id} = req.params;
        const formData = req.body;
        if(!id){
            return res.status(400).json({
                success: false,
                message: "Invalid data provided"
            })
        }
        const publisher = await Publisher.findByIdAndUpdate(id, formData, {
            new: true
        });
        if(!publisher){
            return res.status(404).json({
                success: false,
                message: "Publisher not found"
            })
        }
        res.status(200).json({
            success: true,
            data: publisher
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
}

const deletePublisher = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({
                success: false,
                message: "Invalid data provided"
            })
        }
        const publisher = await Publisher.findByIdAndDelete(id);
        if(!publisher){
            return res.status(404).json({
                success: false,
                message: "Publisher not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Publisher deleted successfullly"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        })
    }
}

module.exports = {addPublisher, fetchAllPublisher, fetchPublisher, editPublisher, deletePublisher}