const fs = require("fs");
const asyncHandler = require("express-async-handler");
const { uploadImageToS3, deleteImageFromS3 } = require("../utils/aws");
const { saveImageUrlToMongoDB, deleteImageUrlFromMongoDB } = require("../utils/mongodb");

const uploadImages = asyncHandler(async (req, res) => {
    try {
        const files = req.files;
        const uploadedImages = [];

        for (const file of files) {
            const { path } = file;
            const imageUrl = await uploadImageToS3(path);
            uploadedImages.push(imageUrl);
            fs.unlinkSync(path);
        }

        // Store image URLs in MongoDB
        saveImageUrlToMongoDB(uploadedImages);

        res.json(uploadedImages);
    } catch (error) {
        throw new Error(error);
    }
});

const deleteImages = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        // Delete image from S3
        await deleteImageFromS3(id);

        // Delete image URL from MongoDB
        await deleteImageUrlFromMongoDB(id);

        res.json({ message: 'Image deleted successfully' });
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = {
    uploadImages,
    deleteImages,
};
