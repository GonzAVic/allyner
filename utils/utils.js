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
