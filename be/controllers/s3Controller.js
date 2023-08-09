import AWS from "aws-sdk"
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import crypto from 'crypto'
import sharp from 'sharp'

const BUCKET = process.env.BUCKET;
const s3 = new AWS.S3();
const region = process.env.REGION;
const accessKeyId = process.env.ACCESS_KEY;
const secretAccessKey = process.env.ACCESS_SECRET;

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

AWS.config.update({
  secretAccessKey: secretAccessKey,
  accessKeyId: accessKeyId,
  region: region,
});

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey
  }
});

export const uploadFile = async (file) => {
  const fileName = generateFileName()

  const fileBuffer = await sharp(file.buffer)
    .resize({ height: 1920, width: 1080, fit: "contain" })
    .toBuffer()

  const uploadParams = {
    Bucket: BUCKET,
    ACL: "public-read",
    Body: fileBuffer,
    Key: fileName,
    ContentType: file.mimetype
  }

  await s3Client.send(new PutObjectCommand(uploadParams));
  const objectUrl = `https://${BUCKET}.s3.amazonaws.com/${fileName}`;
  return objectUrl;
}

// export const upload = multer({
//     storage: multerS3({
//         s3: s3,
//         acl: "public-read",
//         bucket: BUCKET,
//         key: function (req, file, cb) {
//             console.log(file);
//             cb(null, file.originalname)
//         }
//     })
// })

export const listS3 = async (req, res) => {
  let r = await s3.listObjectsV2({ Bucket: BUCKET }).promise();
  let x = r.Contents.map((item) => item.Key);
  res.send(x);
};

export const downloadS3 = async (req, res) => {
  const filename = req.params.filename;
  try {
    let x = await s3.getObject({ Bucket: BUCKET, Key: filename }).promise();
    res.send(x.Body);
  } catch (err) {
    console.error("Error while downloading file: ", err);
    res.status(500).send("Internal Server Error");
  }
};

export const deleteS3 = async (req, res) => {
  const filename = req.params.filename;
  try {
    await s3.deleteObject({ Bucket: BUCKET, Key: filename }).promise();
    res.send("File Deleted Successfully");
  } catch (err) {
    console.error("Error while deleting file: ", err);
    res.status(500).send("Internal Server Error");
  }
};

export const listLinkS3 = async (req, res) => {
  try {
    let r = await s3.listObjectsV2({ Bucket: BUCKET }).promise();
    let urls = r.Contents.map((item) => {
      const params = { Bucket: BUCKET, Key: item.Key };
      return s3.getSignedUrl("getObject", params);
    });
    res.json(urls);
  } catch (err) {
    console.error("Error while fetching URLs: ", err);
    res.status(500).send("Internal Server Error");
  }
};

export const getFileStream = async (key, res) => {
  const imageUrl = await getSignedUrl(
    s3Client,
    new GetObjectCommand({
      Bucket: BUCKET,
      Key: key
    }),
    { expiresIn: 60 }// 60 seconds
  )

  res.send(imageUrl);
}