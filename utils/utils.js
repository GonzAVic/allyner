import * as yup from "yup";

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

export const getFileName = (fileUrl) => {
  let fileName = fileUrl;
  fileName = fileName.replaceAll(
    "https://allyner-dev.sfo3.digitaloceanspaces.com/",
    ""
  );
  fileName = fileName.slice(16);
  return fileName;
};
