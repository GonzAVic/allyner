import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { useFormik, FieldArray, FormikProvider } from "formik";

// MATERIAL UI
import { styled } from "@mui/system";
import { MenuItem, Menu, Button, Typography } from "@mui/material";

// COMPONENTS
import Question from "components/service/Question";
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

  const { serviceRepo } = useContext(BusinessContext);
  const { service, updateService } = serviceRepo;

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
    <DefaultLayout
      title={service?.name || "Service Name"}
      backHref="/app/services"
      formik={formik}
    >
      <ServiceDetailsTabs
        currentStep="questionnaire"
        serviceId={router.query.id}
      />

      <PreviewLayout previewComponent={<Question question={{}} />}>
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
      </PreviewLayout>
    </DefaultLayout>
  );
};

const QuestionTypeOption = styled(MenuItem)({
  textTransform: "capitalize",
});

export default Page;
