import express from "express";
import multer from "multer";
import {
  deleteS3,
  downloadS3,
  listLinkS3,
  listS3,
  getFileStream,
} from "../controllers/s3Controller.js";

// S3
// router.post('/upload', upload.single('image'), async function (req, res, next) {
//     const file = req.file;
//     uploadToS3(file);
//     res.send('Successfully uploaded ' + file.originalname + ' location!')

// });

const router = express.Router();

router.get("/list", listS3);
router.get("download/:filename", downloadS3);
router.delete("/delete/:filename", deleteS3);
router.get("/listlink", listLinkS3);

router.get("/images/:key", async (req, res) => {
  getFileStream(req.params.key, res);
});

export default router;
