const aws = require("aws-sdk");

const endpoint = new aws.Endpoint(process.env.ENDPOINT_S3);

const s3 = new aws.S3({
  endpoint,
  credentials: {
    accessKeyId: process.env.KEY_ID,
    secretAccessKey: process.env.APP_KEY,
  },
});

const uploadImagem = async (path, buffer, mineType) => {

  const imagem = await s3.upload({
    Bucket: process.env.BACKBLAZE_BUCKET,
    Key: path,
    Body: buffer,
    ContentType: mineType
  }).promise();

  return {
    path: imagem.Key,
    Url: `https://${process.env.BACKBLAZE_BUCKET}.${process.env.ENDPOINT_S3}/${imagem.Key}`
  }
};

const deleteImagem = async (path) => {
  try {
    await s3
      .deleteObject({
        Bucket: process.env.BACKBLAZE_BUCKET,
        Key: path,
      })
      .promise();

    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  uploadImagem,
  deleteImagem,
};