import express from "express";
import {
  deleteS3,
  downloadS3,
  listS3,
  getFileStream,
  updateS3,
} from "../controllers/s3Controller.js";
import multer from "multer";

const upload = multer(); // Create a multer instance
const router = express.Router();

router.get("/list", listS3);
router.get("download/:filename", downloadS3);
router.delete("/delete/:filename", deleteS3);

router.get("/images/:key", async (req, res) => {
  getFileStream(req.params.key, res);
});

// Define an endpoint for updating images
router.put("/update/:filename", upload.single("file"), async (req, res) => {
  const filename = req.params.filename;
  const updatedFile = req.file;

  try {
    const updatedImageUrl = await updateS3(updatedFile, filename);
    res.send(updatedImageUrl);
  } catch (err) {
    console.error("Error while updating file: ", err);
    res.
   
status(500).send("Internal Server Error");
  }
});

export default router;
