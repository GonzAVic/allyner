import { useFormik } from "formik";

// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, Box, TextField } from "@mui/material";

// COMPONENTS
import DefaultLayout from "components/layout/DefaultLayout";
import ServicesTabs from "components/ServicesTabs";
import PreviewLayout from "components/layout/PreviewLayout";
import ServiceCheckout from "components/service/ServiceCheckout";

// OTHER
import useBusiness from "utils/useBusiness";

const Page = () => {
  const { business, updateBusiness } = useBusiness();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      headline: business?.additionalSettings.confirmationHeadline,
      message: business?.additionalSettings.confirmationMessage,
    },
    // validationSchema: createLoginSchema(),
    onSubmit: (values) => {
      console.log("-> values: ", values);

      const attributes = {
        additionalSettings: JSON.stringify({
          ...business.additionalSettings,
          confirmationHeadline: values.headline,
          confirmationMessage: values.message,
        }),
      };

      updateBusiness(attributes);
    },
  });

  const initialValuesString = JSON.stringify(formik.initialValues);
  const currentValuesString = JSON.stringify(formik.values);
  const areCurrentAndInitialValuesEqual =
    initialValuesString === currentValuesString;

  return (
    <DefaultLayout
      title="Confirmation Page"
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
          <ServiceCheckout
            headline={formik.values.headline}
            message={formik.values.message}
          />
        }
      >
        <Typography className="section-title" variant="subtitle1">
          Order Confirmation Page
        </Typography>
        <Box className="card" sx={{ mb: 5 }}>
          <Typography variant="subtitle1">Confirmation Headline</Typography>
          <TextField
            name="headline"
            value={formik.values.headline}
            onChange={formik.handleChange}
          />

          <Typography variant="subtitle1">Confirmation Message</Typography>
          <TextField
            name="message"
            value={formik.values.message}
            onChange={formik.handleChange}
            multiline
            rows={3}
            maxRows={5}
          />
        </Box>
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
  display: "flex",
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
});

export default Page;
