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
  Switch,
  IconButton,
} from "@mui/material";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import LinkIcon from "@mui/icons-material/Link";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

// COMPONENTS
import DefaultLayout from "components/layout/DefaultLayout";
import StoreTabs from "components/StoreTabs";
import PreviewLayout from "components/layout/PreviewLayout";
import ClientSignup from "components/ClientSignup";

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
      questionnaire: business
        ? business.additionalSettings.signUpQuestionnaire
        : [],
    },
    // validationSchema: createLoginSchema(),
    onSubmit: (values) => {
      const attributes = {
        additionalSettings: JSON.stringify({
          ...business.additionalSettings,
          signUpHeadline: values.headline,
          signUpMessage: values.message,
          signUpQuestionnaire: values.questionnaire,
        }),
      };
      updateBusiness(attributes);
      console.log("-> values: ", values);
    },
  });

  const handleCreateNewQuestion = (type, arrayHelpers) => {
    arrayHelpers.push({
      questionType: type,
      title: "",
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
    formik.setFieldValue(`questionnaire[${index}].${attribute}`, value);
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
          <Box className="card" sx={{ mb: 5 }}>
            <FieldArray
              name="questionnaire"
              render={(arrayHelpers) => {
                return (
                  <>
                    {formik.values.questionnaire.map((question, index) => {
                      return (
                        <div>
                          <QuestionTypeTitle
                            value={question.questionType}
                            onChange={(event) =>
                              updateQuestionAttr(
                                "questionType",
                                event.target.value,
                                index
                              )
                            }
                            sx={{ mb: 1, width: "fit-content" }}
                            size="small"
                            select
                          >
                            {sUQuestionTypes().map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </QuestionTypeTitle>
                          <TextField
                            name="title"
                            value={question.title}
                            onChange={(event) =>
                              updateQuestionAttr(
                                "title",
                                event.target.value,
                                index
                              )
                            }
                          />
                          <ActionsContainer>
                            <div className="space-between-centered">
                              <Switch checked={true} onChange={() => {}} />
                              <Typography>Required</Typography>
                            </div>
                            <Box>
                              <IconButton>
                                <ContentCopyIcon />
                              </IconButton>
                              <IconButton>
                                <DeleteOutlineOutlinedIcon />
                              </IconButton>
                            </Box>
                          </ActionsContainer>
                        </div>
                      );
                    })}

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

const QuestionTypeTitle = styled(TextField)({
  "& *": {
    color: "#B5BBC8",
  },
  "& fieldset": {
    border: "none",
  },
});

const QuestionTypeOption = styled(MenuItem)({
  textTransform: "capitalize",
});

const ActionsContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: 36,
});

export default Page;
