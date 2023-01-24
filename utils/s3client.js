import { S3, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3({
  forcePathStyle: false,
  endpoint: "https://.sfo3.digitaloceanspaces.com",
  region: "us-east-1",
  credentials: {
    accessKeyId: "RXSUX7MWQC66W6VZNNJB",
    secretAccessKey: "whOoAANvdHCx9sFhW2Cyh0IfooJReCSUv+DoG/Pmx9M",
  },
});

// Specifies a path within your bucket and the file to upload.
export const bucketParams = {
  Bucket: "allyner-1",
  Key: "new image",
  Body: "content",
};

// Uploads the specified file to the chosen path.
export const run = async () => {
  try {
    const data = await s3Client.send(new PutObjectCommand(bucketParams));
    console.log(
      "Successfully uploaded object: " +
        bucketParams.Bucket +
        "/" +
        bucketParams.Key
    );
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

run();
