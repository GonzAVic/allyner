import { useFormik } from "formik";

// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, Box, TextField } from "@mui/material";

// COMPONENTS
import DefaultLayout from "components/layout/DefaultLayout";

const Page = () => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      // headline:
    },
    // validationSchema: createLoginSchema(),
    onSubmit: (values) => {
      console.log("-> values: ", values);
    },
  });

  return (
    <DefaultLayout
      title="Profile"
      userType="client"
      // diffBanner={{
      //   onSave: () => formik.submitForm(),
      //   onDiscard: () => {
      //     formik.handleReset();
      //   },
      //   isVisible: !areCurrentAndInitialValuesEqual,
      // }}
    >
      <Typography className="section-title" variant="subtitle1">
        Customer details
      </Typography>
      <Box className="card" sx={{ mb: 5 }}>
        <Typography variant="subtitle1">Name</Typography>
        <TextField
          name="headline"
          value={"formik.values.headline"}
          onChange={formik.handleChange}
        />
        <Typography variant="subtitle1">Email</Typography>
        <TextField
          name="headline"
          value={"formik.values.headline"}
          onChange={formik.handleChange}
        />
        <Typography variant="subtitle1">Business Name</Typography>
        <TextField
          name="headline"
          value={"formik.values.headline"}
          onChange={formik.handleChange}
        />
        <Typography variant="subtitle1">Location</Typography>
        <TextField
          name="headline"
          value={"formik.values.headline"}
          onChange={formik.handleChange}
        />
      </Box>
      
      <Typography className="section-title" variant="subtitle1">
        Customer details
      </Typography>
      <Box className="card" sx={{ mb: 5 }}></Box>
    </DefaultLayout>
  );
};

export default Page;
