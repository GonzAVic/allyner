import { useEffect, useState } from "react";
import { useFormik, FieldArray, FormikProvider } from "formik";
import { useMutation, useLazyQuery } from "@apollo/client";

// MATERIAL UI
import { styled } from "@mui/system";
import { Button, Menu, MenuItem, Typography } from "@mui/material";

// COMPONENTS
import QuestionCard from "./QuestionCard";

// OTHER
import { CREATE_QUESTION, LIST_QUESTIONS } from "graphql/apiql";
import useService from "utils/useService";
import { questionTypes } from "utils/constants";

const ServiceQuestionnaire = ({
  updatePreviewData,
  serviceId,
  updateDiffBanner,
}) => {
  const [createQuestionFn, createQuestionHpr] = useMutation(CREATE_QUESTION);
  const [getServiceFn, getServiceFnHelper] = useLazyQuery(FIND_SERVICE);

  const { service } = useService(serviceId);

  const [anchorEl, setAnchorEl] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(null);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      // questions: service ? service.questionnaire : [],
      questions: [],
    },
    onSubmit: (values) => {
      values.questions.forEach((q) => {
        const attributes = {
          businessId: 1,
          title: q.title,
          description: q.description,
          isRequired: q.isRequired,
          isDescriptionActive: q.isDescriptionActive,
        };
        createQuestionFn({
          variables: {
            input: {
              attributes,
            },
          },
        });
      });
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
    arrayHelpers.push({
      id: "new",
      type: type,
      title: "",
      selectionType: "SINGLE",
      isDescriptionActive: false,
      description: "",
      options: [],
      isRequired: false,
    });
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
