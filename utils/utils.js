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
    email: yup.string().required(),
    ...aQInitialValues,
  };

  return yup.object().shape(schemaAttributes);
};

export const diffBanner = (formik) => {
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
