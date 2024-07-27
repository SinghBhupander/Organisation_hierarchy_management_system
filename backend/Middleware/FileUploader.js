

const multer = require('multer');
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

cloudinary.config({                              //configuring cloudinary service
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({                   // providing format for file acceptance
    cloudinary: cloudinary,
    params:{
        folder:'uploads',
        format: async(req,file) => 'png',
        public_id: (req,file) => file.originalname.split('.')[0]+""
    }
});

const cloudinaryFileUploader = multer({ storage: storage});   // using multer to store over cloud

module.exports = {
    cloudinaryFileUploader
};