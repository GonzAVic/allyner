import { useState } from "react";
import { useFormik, FieldArray, FormikProvider } from "formik";

// MATERIAL UI
import { styled } from "@mui/system";
import { Button, Menu, MenuItem } from "@mui/material";

// COMPONENTS
import QuestionCard from "./QuestionCard";

const ServiceQuestionnaire = ({ updatePreviewData }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const formik = useFormik({
    initialValues: {
      questions: [],
    },
    onSubmit: (values) => {
      console.log("-> values: ", values);
    },
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCreateNewQuestion = (type, arrayHelpers) => {
    arrayHelpers.push({
      type: type,
      sentence: "",
      withDescription: false,
      description: "",
      isRequired: false,
      options: [],
    });
    handleClose();
  };

  const open = Boolean(anchorEl);

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <FieldArray
          name="questions"
          render={(arrayHelpers) => {
            return (
              <>
                {formik.values.questions.map((question, index) => {
                  return (
                    <QuestionCard
                      key={index}
                      index={index}
                      question={question}
                      formik={formik}
                      updatePreviewData={updatePreviewData}
                    />
                  );
                })}
                <Button onClick={handleClick} fullWidth>
                  Add New Question
                </Button>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                  {QUESTION_TYPES.map((qt) => (
                    <QuestionTypeOption
                      key={qt}
                      onClick={() => handleCreateNewQuestion(qt, arrayHelpers)}
                    >
                      {qt}
                    </QuestionTypeOption>
                  ))}
                </Menu>
              </>
            );
          }}
        />
      </form>
    </FormikProvider>
  );
};

const QuestionTypeOption = styled(MenuItem)({
  textTransform: "capitalize",
});

const QUESTION_TYPES = [
  "dropdown",
  "multiple choice",
  "picture choice",
  "short text",
  "long text",
  "file",
  "address",
  "date",
  "time",
];

export default ServiceQuestionnaire;
