const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
    cloud_name: 'dfqusdmxt',
    api_key: '758126667795486',
    api_secret: 'sEcTJNnIt3PvGRf1E6RM2nl7gts'
})

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file, {
        resourse_type: "auto"
    })
    return result;
}

const upload = multer({storage});

module.exports = {upload, imageUploadUtil}