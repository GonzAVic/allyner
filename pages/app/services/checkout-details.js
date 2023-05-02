import { useState, useContext } from "react";
import { useFormik, FieldArray, FormikProvider } from "formik";

// MATERIAL UI
import { styled } from "@mui/system";
import {
  Typography,
  Box,
  TextField,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";

// COMPONENTS
import DefaultLayout from "components/layout/DefaultLayout";
import ServicesTabs from "components/ServicesTabs";
import CheckoutDetailsForm from "components/service/CheckoutDetailsForm";
import PreviewLayout from "components/layout/PreviewLayout";
import SimpleQuestion from "components/SimpleQuestion";

// OTHER
import { BusinessContext } from "contexts/BusinessContext";
import { sUQuestionTypes } from "utils/constants";

const Page = () => {
  const { businessRepo } = useContext(BusinessContext);
  const { business, updateBusiness } = businessRepo;

  const [anchorEl, setAnchorEl] = useState(null);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      headline: business?.additionalSettings.checkoutHeadline,
      message: business?.additionalSettings.checkoutMessage,
      checkoutAdditionalInfo: business
        ? business.additionalSettings.checkoutAdditionalInfo || []
        : [],
    },
    // validationSchema: createLoginSchema(),
    onSubmit: (values) => {
      const attributes = {
        additionalSettings: JSON.stringify({
          ...business.additionalSettings,
          checkoutHeadline: values.headline,
          checkoutMessage: values.message,
          checkoutAdditionalInfo: values.checkoutAdditionalInfo,
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
    formik.setFieldValue(
      `checkoutAdditionalInfo[${index}].${attribute}`,
      value
    );
  };

  const deleteQuestion = (index) => {
    const newQuestionnaire = formik.values.checkoutAdditionalInfo.filter(
      (q, qIndex) => {
        if (index !== qIndex) return q;
      }
    );
    formik.setFieldValue("checkoutAdditionalInfo", newQuestionnaire);
  };

  const open = Boolean(anchorEl);

  return (
    <FormikProvider value={formik}>
      <DefaultLayout title="Service Booking" formik={formik}>
        <ServicesTabs />

        <PreviewLayout
          previewComponent={
            <CheckoutDetailsForm
              headline={formik.values.headline}
              message={formik.values.message}
              additionalQuestions={formik.values.checkoutAdditionalInfo}
            />
          }
        >
          <Typography className="section-title" variant="subtitle1">
            Checkout Headline
          </Typography>
          <Box className="card" sx={{ mb: 5 }}>
            <Typography variant="subtitle1">Checkout Headline</Typography>
            <TextField
              name="headline"
              value={formik.values.headline}
              onChange={formik.handleChange}
            />
            <Typography variant="subtitle1">Checkout Message</Typography>
            <TextField
              name="message"
              value={formik.values.message}
              onChange={formik.handleChange}
              multiline
              rows={3}
              maxRows={5}
            />
          </Box>

          <Typography className="section-title" variant="subtitle1">
            Other Details
          </Typography>
          <FieldArray
            name="checkoutAdditionalInfo"
            render={(arrayHelpers) => {
              return (
                <>
                  {formik.values.checkoutAdditionalInfo.map(
                    (question, index) => {
                      return (
                        <SimpleQuestion
                          key={index}
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
        </PreviewLayout>
      </DefaultLayout>
    </FormikProvider>
  );
};

const QuestionTypeOption = styled(MenuItem)({
  textTransform: "capitalize",
});

export default Page;
