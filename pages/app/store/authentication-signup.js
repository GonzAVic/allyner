import { useState } from "react";
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
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import LinkIcon from "@mui/icons-material/Link";

// COMPONENTS
import DefaultLayout from "components/layout/DefaultLayout";
import StoreTabs from "components/StoreTabs";
import PreviewLayout from "components/layout/PreviewLayout";
import ClientSignup from "components/ClientSignup";
import SimpleQuestion from "components/SimpleQuestion";

// OTHER
import useBusiness from "utils/useBusiness";
import { sUQuestionTypes } from "utils/constants";

const Page = () => {
  const { business, updateBusiness } = useBusiness();

  const [anchorEl, setAnchorEl] = useState(null);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      headline: business?.additionalSettings.signUpHeadline,
      message: business?.additionalSettings.signUpMessage,
      additionalQuestions: business
        ? business.additionalSettings.signUpQuestionnaire || []
        : [],
    },
    // validationSchema: createLoginSchema(),
    onSubmit: (values) => {
      const attributes = {
        additionalSettings: JSON.stringify({
          ...business.additionalSettings,
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

  const initialValuesString = JSON.stringify(formik.initialValues);
  const currentValuesString = JSON.stringify(formik.values);
  const areCurrentAndInitialValuesEqual =
    initialValuesString === currentValuesString;

  const open = Boolean(anchorEl);

  return (
    <FormikProvider value={formik}>
      <DefaultLayout
        title="Store/Authentication"
        diffBanner={{
          onSave: () => formik.submitForm(),
          onDiscard: () => {
            formik.handleReset();
          },
          isVisible: !areCurrentAndInitialValuesEqual,
        }}
      >
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
          <Box  sx={{ mb: 5 }}>
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
                            question={question}
                            index={index}
                            updateQuestionAttr={updateQuestionAttr}
                            deleteQuestion={deleteQuestion}
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
            <TextField
              value={"http://localhost:3000/app/store/authentication-signin"}
            />
            <Button variant="text" startIcon={<LinkIcon />}>
              Copy Link
            </Button>
            <Button variant="text" startIcon={<ShareOutlinedIcon />}>
              Share
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
