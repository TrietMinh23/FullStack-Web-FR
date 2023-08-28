import AWS from "aws-sdk"
import { S3Client, PutObjectCommand, GetObjectCommand,  ListObjectsV2Command, DeleteObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import crypto from 'crypto'
import sharp from 'sharp'

const BUCKET = process.env.BUCKET;
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

export const listS3 = async (req, res) => {
  try {
    const listObjectsParams = {
      Bucket: BUCKET,
    };
    
    const response = await s3Client.send(new  ListObjectsV2Command(listObjectsParams));
    const keys = response.Contents.map((item) => item.Key);
    
    res.send(keys);
  } catch (err) {
    console.error("Error while listing objects in S3: ", err);
    res.status(500).send("Internal Server Error");
  }
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

export const deleteS3 = async (filename) => {
  try {
    await s3Client.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: filename }));
    return ("File Deleted Successfully");
  } catch (err) {
    console.error("Error while deleting file: ", err);
    return ("500 Internal Server Error");
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

export const updateS3 = async (file, filename) => {
  try {
    const fileBuffer = await sharp(file.buffer)
      .resize({ height: 1920, width: 1080, fit: "contain" })
      .toBuffer();

    const uploadParams = {
      Bucket: BUCKET,
      ACL: "public-read",
      Body: fileBuffer,
      Key: filename,
      ContentType: file.mimetype,
    };

    await s3Client.send(new PutObjectCommand(uploadParams));
    const objectUrl = `https://${BUCKET}.s3.amazonaws.com/${filename}`;
    return objectUrl;
  } catch (err) {
    console.error("Error while updating file: ", err);
    throw new Error("500 Internal Server Error");
  }
};