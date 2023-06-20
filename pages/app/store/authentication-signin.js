import { useContext } from "react";
import { useFormik } from "formik";

// MATERIAL UI
import { Typography, Box, TextField, Button } from "@mui/material";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import LinkIcon from "@mui/icons-material/Link";

// COMPONENTS
import DefaultLayout from "components/layout/DefaultLayout";
import StoreTabs from "components/StoreTabs";
import PreviewLayout from "components/layout/PreviewLayout";
import ClientSignin from "components/ClientSignin";

// OTHER
import { BusinessContext } from "contexts/BusinessContext";
import { copyToClipBoard } from "utils/utils";

const Page = () => {
  const { businessRepo } = useContext(BusinessContext);
  const { business, updateBusiness } = businessRepo;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      headline: business?.additionalData.signInHeadline,
      message: business?.additionalData.signInMessage,
    },
    // validationSchema: createLoginSchema(),
    onSubmit: (values) => {
      const attributes = {
        additionalData: JSON.stringify({
          ...business.additionalData,
          signInHeadline: values.headline,
          signInMessage: values.message,
        }),
      };
      updateBusiness(attributes);
    },
  });

  const signInUrl = "https://" + business.subdomain + ".allyner.comstore/signin";

  return (
    <DefaultLayout title="Store/Authentication" formik={formik}>
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
          <TextField value={signInUrl} />
          <Button
            variant="text"
            startIcon={<LinkIcon />}
            onClick={() => copyToClipBoard(signInUrl)}
          >
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

export default Page;
