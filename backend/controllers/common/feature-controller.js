const Feature = require("../../models/Feature");

const addFeatureImage = async (req, res) => {
    try {
        const {image} = req.body;
        const featureImages = new Feature({
            image
        })
        await featureImages.save();
        res.status(201).json({
            success: true,
            data: featureImages
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Some error occured!"
        })
    }
}

const deleteFeatureImages = async(req, res) => {
    try {
        const {id} = req.params;
        const images = await Feature.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            data: images
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Some error occured"
        })
    }
}

const getFeatureImages = async(req, res) => {
    try {
        const images = await Feature.find({});
        res.status(200).json({
            success: true,
            data: images
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Some error occured"
        })
    }
}

module.exports = {addFeatureImage, getFeatureImages, deleteFeatureImages}