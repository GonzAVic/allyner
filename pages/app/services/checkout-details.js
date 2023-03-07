import { useFormik } from "formik";

// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, Box, TextField, Button } from "@mui/material";

// COMPONENTS
import DefaultLayout from "components/layout/DefaultLayout";
import ServicesTabs from "components/ServicesTabs";
import CheckoutQuestionCard from "components/CheckoutQuestionCard";
import CheckoutDetailsForm from "components/service/CheckoutDetailsForm";
import PreviewLayout from "components/layout/PreviewLayout";

// OTHER
import useBusiness from "utils/useBusiness";

const Page = () => {
  const { business, updateBusiness } = useBusiness();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      headline: business?.additionalSettings.checkoutHeadline,
      message: business?.additionalSettings.checkoutMessage,
    },
    // validationSchema: createLoginSchema(),
    onSubmit: (values) => {
      const attributes = {
        additionalSettings: JSON.stringify({
          ...business.additionalSettings,
          checkoutHeadline: values.headline,
          checkoutMessage: values.message,
        }),
      };
      updateBusiness(attributes);
    },
  });

  const handleCoverChange = () => {};

  const initialValuesString = JSON.stringify(formik.initialValues);
  const currentValuesString = JSON.stringify(formik.values);
  const areCurrentAndInitialValuesEqual =
    initialValuesString === currentValuesString;

  return (
    <DefaultLayout
      title="Service Booking"
      diffBanner={{
        onSave: () => formik.submitForm(),
        onDiscard: () => {
          formik.handleReset();
        },
        isVisible: !areCurrentAndInitialValuesEqual,
      }}
    >
      <ServicesTabs />

      <PreviewLayout
        previewComponent={
          <CheckoutDetailsForm
            headline={formik.values.headline}
            message={formik.values.message}
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
        <CheckoutQuestionCard />
        <Button variant="dashed" fullWidth sx={{ mt: 3 }}>
          Add new field
        </Button>
      </PreviewLayout>
    </DefaultLayout>
  );
};

const Container = styled("div")({
  display: "flex",
  gap: 32,
  flex: 1,
  overflowY: "auto",
  overflowX: "hidden",
});

const LeftSide = styled("div")({
  flex: 1,
  overflowY: "auto",
  overflowX: "hidden",
});

const RightSide = styled("div")({
  display: "flex",
  flex: 1,
});

const PreviewContent = styled("div")({
  marginTop: 150,
  width: "100%",
  display: "flex",
  justifyContent: "center",
});

export default Page;
