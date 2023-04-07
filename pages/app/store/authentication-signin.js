import { useFormik } from "formik";

// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, Box, TextField, Button } from "@mui/material";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import LinkIcon from "@mui/icons-material/Link";

// COMPONENTS
import DefaultLayout from "components/layout/DefaultLayout";
import StoreTabs from "components/StoreTabs";
import PreviewLayout from "components/layout/PreviewLayout";
import ClientSignin from "components/ClientSignin";

// OTHER
import useBusiness from "utils/useBusiness";

const Page = () => {
  const { business, updateBusiness, businessSubdomain } = useBusiness();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      headline: business?.additionalSettings.signInHeadline,
      message: business?.additionalSettings.signInMessage,
    },
    // validationSchema: createLoginSchema(),
    onSubmit: (values) => {
      const attributes = {
        additionalSettings: JSON.stringify({
          ...business.additionalSettings,
          signInHeadline: values.headline,
          signInMessage: values.message,
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
          <ClientSignin
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
          Sign In URL
        </Typography>
        <Box className="card" sx={{ mb: 5 }}>
          <TextField
            value={
              "https://" +
              businessSubdomain +
              ".allyner.comstore/authentication-signin"
            }
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

export default Page;
