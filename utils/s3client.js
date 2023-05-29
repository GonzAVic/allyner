import { S3, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3({
  forcePathStyle: false,
  endpoint: "https://fra1.digitaloceanspaces.com",
  region: "sfo3",
  credentials: {
    accessKeyId: "RXSUX7MWQC66W6VZNNJB",
    secretAccessKey: "whOoAANvdHCx9sFhW2Cyh0IfooJReCSUv+DoG/Pmx9M",
  },
});

export const uploadFile = async (bucketParams) => {
  try {
    await s3Client.send(
      new PutObjectCommand({ ...bucketParams, ACL: "public-read" })
    );
    const fileUrl = `https://${bucketParams.Bucket}.sfo3.digitaloceanspaces.com/${bucketParams.Key}`;
    return fileUrl;
  } catch (err) {
    console.log("Error ->", err);
  }
};
