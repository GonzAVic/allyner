import * as yup from "yup";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export const copyToClipBoard = (text, cb) => {
  try {
    navigator.clipboard.writeText(text);
    if (cb) cb();
  } catch (error) {
    // TODO: habdle error
  }
};

export const createFormSchema = (additionalQuestions) => {
  const aQInitialValues = {};
  additionalQuestions.forEach((aq) => {
    aQInitialValues[`${aq.title}`] = aq.isRequired
      ? yup.string().required()
      : yup.string();
  });

  const schemaAttributes = {
    email: yup.string().email().required(),
    ...aQInitialValues,
  };

  return yup.object().shape(schemaAttributes);
};

export const diffBanner = (formik) => {
  if (!formik) return;
  const initialValuesString = JSON.stringify(formik.initialValues);
  const currentValuesString = JSON.stringify(formik.values);
  const areCurrentAndInitialValuesEqual =
    initialValuesString === currentValuesString;

  return {
    onSave: () => formik.submitForm(),
    onDiscard: () => {
      formik.handleReset();
    },
    isVisible: !areCurrentAndInitialValuesEqual,
  };
};

export const createBucketObject = (file) => {
  let fileName = `${Date.now()}___${file.name}`;
  fileName = fileName.replaceAll(" ", "-");
  const uploadParams = {
    Bucket: "allyner-dev",
    Key: fileName,
    Body: file,
    ContentType: file.type,
  };

  return uploadParams;
};

const s3Client = new S3Client({
  endpoint: "https://sfo3.digitaloceanspaces.com",
  forcePathStyle: false,
  region: "sfo3",
  credentials: {
    accessKeyId: "RXSUX7MWQC66W6VZNNJB",
    secretAccessKey: "whOoAANvdHCx9sFhW2Cyh0IfooJReCSUv+DoG/Pmx9M",
  },
});

export const uploadFile = async (file) => {
  let fileName = `${Date.now()}___${file.name}`;
  fileName = fileName.replaceAll(" ", "-");

  const uploadParams = {
    Bucket: "allyner-dev",
    Key: fileName,
    Body: file,
    ContentType: file.type,
    ACL: "public-read",
    Metadata: {
      "x-amz-meta-my-key": "your-value",
    },
  };

  await s3Client.send(new PutObjectCommand(uploadParams));

  const fileData = { url: uploadParams.Key };
  return fileData;
};

export const getFileUrl = (key) => {
  return `https://allyner-dev.sfo3.digitaloceanspaces.com/${key}`;
};

export const getFileName = (fileUrl) => {
  let fileName = fileUrl;
  fileName = fileName.replaceAll(
    "https://allyner-dev.sfo3.digitaloceanspaces.com/",
    ""
  );
  fileName = fileName.slice(16);
  return fileName;
};

export const concatStatuses = (statuses) => {
  return ["To do", ...statuses, "Complete"];
};

export const getSessionData = () => {
  return {
    accessToken: localStorage.getItem("access-token"),
    uid: localStorage.getItem("uid"),
    clintId: localStorage.getItem("clientId"),
  };
};
