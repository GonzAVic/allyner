import { useState, useContext } from "react";
import { useFormik, FieldArray, FormikProvider } from "formik";

// MATERIAL UI
import { styled } from "@mui/system";
import {
  Typography,
  Box,
  TextField,
  Button,
  MenuItem,
  Menu,
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";

// COMPONENTS
import DefaultLayout from "components/layout/DefaultLayout";
import StoreTabs from "components/StoreTabs";
import PreviewLayout from "components/layout/PreviewLayout";
import ClientSignup from "components/ClientSignup";
import SimpleQuestion from "components/SimpleQuestion";

// OTHER
import { BusinessContext } from "contexts/BusinessContext";
import { sUQuestionTypes } from "utils/constants";
import { copyToClipBoard } from "utils/utils";

const Page = () => {
  const { businessRepo } = useContext(BusinessContext);
  const { business, updateBusiness } = businessRepo;

  const [anchorEl, setAnchorEl] = useState(null);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      headline: business?.additionalData.signUpHeadline,
      message: business?.additionalData.signUpMessage,
      additionalQuestions: business
        ? business.additionalData.signUpQuestionnaire || []
        : [],
    },
    // validationSchema: createLoginSchema(),
    onSubmit: (values) => {
      const attributes = {
        additionalData: JSON.stringify({
          ...business.additionalData,
          signUpHeadline: values.headline,
          signUpMessage: values.message,
          signUpQuestionnaire: values.additionalQuestions,
        }),
      };
      updateBusiness(attributes);
    },
  });

  const handleCreateNewQuestion = (type, arrayHelpers) => {
    arrayHelpers.push({
      questionType: type,
      title: "",
      isRequired: false,
    });
    handleClose();
  };

  const handleAddFieldBtnClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const updateQuestionAttr = (attribute, value, index) => {
    formik.setFieldValue(`additionalQuestions[${index}].${attribute}`, value);
  };

  const deleteQuestion = (index) => {
    const newQuestionnaire = formik.values.additionalQuestions.filter(
      (q, qIndex) => {
        if (index !== qIndex) return q;
      }
    );
    formik.setFieldValue("additionalQuestions", newQuestionnaire);
  };

  const handleDuplicate = (index) => {
    const questionToDuplicate = formik.values.additionalQuestions[index];
    formik.setFieldValue("additionalQuestions", [
      ...formik.values.additionalQuestions,
      questionToDuplicate,
    ]);
  };

  const open = Boolean(anchorEl);

  const signUpUrl =
    "https://" + business.subdomain + ".allyner.comstore/signup";

  return (
    <FormikProvider value={formik}>
      <DefaultLayout title="Store/Authentication" formik={formik}>
        <StoreTabs />

        <PreviewLayout
          previewComponent={
            <ClientSignup
              headline={formik.values.headline}
              message={formik.values.message}
              additionalQuestions={formik.values.additionalQuestions}
            />
          }
        >
          <Typography className="section-title" variant="subtitle1">
            General Details
          </Typography>
          <Box className="card" sx={{ mb: 5 }}>
            <Typography variant="subtitle1">Headline</Typography>
            <TextField
              name="headline"
              value={formik.values.headline}
              onChange={formik.handleChange}
            />
            <Typography variant="subtitle1">Message</Typography>
            <TextField
              name="message"
              value={formik.values.message}
              onChange={formik.handleChange}
            />
          </Box>

          <Typography className="section-title" variant="subtitle1">
            Sign Up Form
          </Typography>
          <Box sx={{ mb: 5 }}>
            {/* <SimpleQuestion
              question={{ title: "Email", questionType: "SHORT_TEXT" }}
            />
            <SimpleQuestion
              question={{ title: "Password", questionType: "SHORT_TEXT" }}
            /> */}
            <FieldArray
              name="additionalQuestions"
              render={(arrayHelpers) => {
                return (
                  <>
                    {formik.values.additionalQuestions.map(
                      (question, index) => {
                        return (
                          <SimpleQuestion
                            key={index}
                            question={question}
                            index={index}
                            updateQuestionAttr={updateQuestionAttr}
                            deleteQuestion={deleteQuestion}
                            onDuplicate={() => handleDuplicate(index)}
                          />
                        );
                      }
                    )}

                    <Button
                      variant="dashed"
                      onClick={handleAddFieldBtnClick}
                      sx={{ mt: 2 }}
                      fullWidth
                    >
                      Add A Field
                    </Button>
                    <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                      {sUQuestionTypes().map((qt) => (
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
          </Box>

          <Typography className="section-title" variant="subtitle1">
            Sign In URL
          </Typography>
          <Box className="card" sx={{ mb: 5 }}>
            <TextField value={signUpUrl} />
            <Button
              variant="text"
              startIcon={<LinkIcon />}
              onClick={() => copyToClipBoard(signUpUrl)}
            >
              Copy Link
            </Button>
          </Box>
        </PreviewLayout>
      </DefaultLayout>
    </FormikProvider>
  );
};

const QuestionTypeOption = styled(MenuItem)({
  textTransform: "capitalize",
});

export default Page;
