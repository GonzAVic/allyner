import { useEffect, useState } from "react";
import { useFormik, FieldArray, FormikProvider } from "formik";

// MATERIAL UI
import { styled } from "@mui/system";
import { Button, Menu, MenuItem, Typography } from "@mui/material";

// COMPONENTS
import QuestionCard from "./QuestionCard";

// OTHER
import useService from "utils/useService";
import { questionTypes } from "utils/constants";
import { questionAdapter } from "utils/adapters";

const ServiceQuestionnaire = ({
  updatePreviewData,
  serviceId,
  updateDiffBanner,
}) => {
  const { service, updateService } = useService(serviceId, {
    fetchQuestions: true,
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(null);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      questions: service ? service.questionsInfo : [],
    },
    onSubmit: (values) => {
      updateService({ questionsInfo: values.questions });
    },
  });

  useEffect(() => {
    const activeQuestionData = formik.values.questions[activeQuestion];
    if (!activeQuestionData) return;
    updatePreviewData(activeQuestionData);
  }, [formik.values, activeQuestion]);

  useEffect(() => {
    const initialValuesString = JSON.stringify(formik.initialValues);
    const currentValuesString = JSON.stringify(formik.values);
    const areCurrentAndInitialValuesEqual =
      initialValuesString === currentValuesString;
    updateDiffBanner({
      onSave: () => formik.submitForm(),
      onDiscard: () => {
        formik.handleReset();
      },
      isVisible: !areCurrentAndInitialValuesEqual,
    });
  }, [formik.values]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCreateNewQuestion = (type, arrayHelpers) => {
    arrayHelpers.push(questionAdapter({ type }));
    handleClose();
  };

  const open = Boolean(anchorEl);

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <Typography className="section-title" variant="subtitle1">
          Questions
        </Typography>
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
                      setActiveQuestion={setActiveQuestion}
                      removeQuestion={() => {
                        arrayHelpers.remove(index);
                      }}
                    />
                  );
                })}
                <Button variant="dashed" onClick={handleClick} fullWidth>
                  Add New Question
                </Button>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                  {questionTypes().map((qt) => (
                    <QuestionTypeOption
                      key={qt.value}
                      onClick={() =>
                        handleCreateNewQuestion(qt.value, arrayHelpers)
                      }
                    >
                      {qt.label}
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

export default ServiceQuestionnaire;
