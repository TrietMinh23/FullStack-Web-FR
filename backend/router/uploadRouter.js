const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadImage');
const { uploadImages, deleteImages } = require('../controllers/uploadCtrl');

// Upload route
router.post('/', upload.array('images', 5), uploadImages);

// Delete route
router.delete('/:id', deleteImages);

module.exports = router;
