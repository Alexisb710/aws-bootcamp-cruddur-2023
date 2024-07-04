const sharp = require("sharp");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");

function getClient() {
  const client = new S3Client();
  return client;
}

async function getOriginalImage(client, srcBucket, srcKey) {
  console.log("get==");
  console.log("Getting original image from", srcBucket, srcKey);
  const params = {
    Bucket: srcBucket,
    Key: srcKey,
  };
  console.log("params", params);
  const command = new GetObjectCommand(params);
  const response = await client.send(command);

  const chunks = [];
  for await (const chunk of response.Body) {
    chunks.push(chunk);
  }
  const buffer = Buffer.concat(chunks);
  console.log("Retrieved original image successfully, size:", buffer.length);
  return buffer;
}

async function processImage(image, width, height) {
  console.log("SHARP===");
  console.log("Processing image with dimensions", width, height);
  const processedImage = await sharp(image)
    .resize(width, height)
    .jpeg()
    .toBuffer();
  console.log("Processed image successfully, size:", processedImage.length);
  return processedImage;
}

async function uploadProcessedImage(client, dstBucket, dstKey, image) {
  console.log("upload==");
  console.log("Uploading processed image to", dstBucket, dstKey);
  const params = {
    Bucket: dstBucket,
    Key: dstKey,
    Body: image,
    ContentType: "image/jpeg",
  };
  console.log("params", params);
  const command = new PutObjectCommand(params);
  const response = await client.send(command);
  console.log("Uploaded processed image successfully, response:", response);
  return response;
}

module.exports = {
  getClient: getClient,
  getOriginalImage: getOriginalImage,
  processImage: processImage,
  uploadProcessedImage: uploadProcessedImage,
};
