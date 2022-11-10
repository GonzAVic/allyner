import { useEffect, useState } from "react";
import { useFormik, FieldArray, FormikProvider } from "formik";
import { useMutation } from "@apollo/client";

// MATERIAL UI
import { styled } from "@mui/system";
import { Button, Menu, MenuItem } from "@mui/material";

// COMPONENTS
import QuestionCard from "./QuestionCard";
import { UPDATE_QUESTIONNAIRE } from "graphql/apiql";
import { serviceAdapter } from "utils/adapters";
import useService from "utils/useService";
import { questionTypes } from "utils/constants";

const ServiceQuestionnaire = ({ updatePreviewData, updateCta, serviceId }) => {
  const [updateQuestionnaireFn, updateQuestionnaireHpr] =
    useMutation(UPDATE_QUESTIONNAIRE);

  const { service } = useService(serviceId);

  const [anchorEl, setAnchorEl] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(null);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      questions: service ? service.questionnaire : [],
    },
    onSubmit: (values) => {
      const dataReq = values.questions.map((q) => {
        return serviceAdapter({
          ...q,
          isMultiple: q.selectionType !== "SINGLE",
        });
      });
      updateQuestionnaireFn({
        variables: { input: dataReq, serviceId },
      });
    },
  });

  useEffect(() => {
    const activeQuestionData = formik.values.questions[activeQuestion];
    if (!activeQuestionData) return;
    updatePreviewData(activeQuestionData);
  }, [formik.values, activeQuestion]);

  useEffect(() => {
    updateCta({
      fn: () => {
        formik.submitForm();
      },
    });
  }, []);

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
      sentence: "",
      selectionType: "SINGLE",
      withDescription: false,
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
                <Button onClick={handleClick} fullWidth>
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
