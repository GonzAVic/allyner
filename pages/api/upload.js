import fs from "fs";
import AWS from "aws-sdk";
import formidable from "formidable-serverless";

const ENDPOINT = "https://sfo3.digitaloceanspaces.com";
const ACCESS_KEY_ID = "RXSUX7MWQC66W6VZNNJB";
const SECRET_ACCESS_KEY_ID = "whOoAANvdHCx9sFhW2Cyh0IfooJReCSUv+DoG/Pmx9M";
const BUCKET = "allyner-1";

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadFile = async (req, res) => {
  // create S3 instance with credentials
  const s3 = new AWS.S3({
    endpoint: new AWS.Endpoint(ENDPOINT),
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY_ID,
    region: "sfo3",
  });

  // parse request to readable form
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    // Account for parsing errors
    if (err) return res.status(500);
    // Read file
    const file = fs.readFileSync(files.file.path);
    // Upload the file
    s3.upload({
      // params
      Bucket: BUCKET,
      ACL: "public-read",
      Key: `${Date.now()}_${files.file.name}`,
      Body: file,
      ContentType: files.file.type,
    }).send((err, data) => {
      if (err) {
        console.log("err", err);
        return res.status(500);
      }
      if (data) {
        return res.json({
          url: data.Location,
        });
      }
    });
  });
};

export default uploadFile;
