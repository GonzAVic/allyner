import { useContext, useState } from "react";
import * as yup from "yup";
import { useRouter } from "next/router";
import { useFormik, FieldArray, FormikProvider } from "formik";

// MATERIAL UI
import { styled } from "@mui/system";
import { MenuItem, Menu, Button, Typography } from "@mui/material";

// COMPONENTS
import Question from "components/service/Question";
import LayoutOne from "components/layout/LayoutOne";
import QuestionCard from "components/service/QuestionCard";
import PreviewLayout from "components/layout/PreviewLayout";
import DefaultLayout from "components/layout/DefaultLayout";
import ServiceDetailsTabs from "components/ServiceDetailsTabs";

// OTHERS
import { BusinessContext } from "contexts/BusinessContext";
import { questionTypes } from "utils/constants";
import { questionAdapter } from "utils/adapters";

const Page = () => {
  const router = useRouter();

  const { serviceRepo, businessRepo } = useContext(BusinessContext);
  const { service, updateService } = serviceRepo;
  const { business } = businessRepo;

  const [anchorEl, setAnchorEl] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(0);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      questions: service ? service.questionnaire : [],
    },
    validationSchema: createFormSchema(),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      updateService({ questionnaire: values.questions });
    },
  });

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

  const handleDuplicateQuestion = (index) => {
    const questionToDuplicate = formik.values.questions[index];
    formik.setFieldValue("questions", [
      ...formik.values.questions,
      questionToDuplicate,
    ]);
  };

  const open = Boolean(anchorEl);

  return (
    <DefaultLayout
      title={service?.name || "Service Name"}
      backHref="/app/services"
      formik={formik}
    >
      <ServiceDetailsTabs
        currentStep="questionnaire"
        serviceId={router.query.id}
      />

      <PreviewLayout
        previewComponent={
          <LayoutOne title={service.name} business={business}>
            <Container>
              <Question
                question={
                  formik.values.questions.length &&
                  formik.values.questions[activeQuestion]
                }
                questionIndex={activeQuestion}
              />
            </Container>
          </LayoutOne>
        }
        noTopSpace
      >
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
                          duplicateQuestion={() =>
                            handleDuplicateQuestion(index)
                          }
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
      </PreviewLayout>
    </DefaultLayout>
  );
};

const QuestionTypeOption = styled(MenuItem)({
  textTransform: "capitalize",
});

const Container = styled("div")({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: "#FFFFFF",
  borderRadius: 24,
  margin: "auto",
  padding: 32,
});

const createFormSchema = () => {
  const questionWithOptions = [
    "DROPDOWN",
    "MULTIPLE",
    "SINGLE_SELECT",
    "MULTIPLE_SELECT",
  ];

  const schemaAttributes = {
    questions: yup.array().of(
      yup.lazy((questionData) => {
        const { type } = questionData;

        if (questionWithOptions.includes(type)) {
          return yup.object().shape({
            options: yup.array().min(1, "Options should not be empty"),
            title: yup.string().required("Title can not be empty"),
          });
        } else {
          return yup.object().shape({
            title: yup.string().required("Title can not be empty"),
          });
        }
      })
    ),
  };

  return yup.object().shape(schemaAttributes);
};

export default Page;
