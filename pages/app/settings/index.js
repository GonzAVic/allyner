import { useContext } from "react";
import { useFormik } from "formik";

// MATERIAL UI
import { Typography, Box, TextField, MenuItem } from "@mui/material";

// COMPONENTS
import DefaultLayout from "components/layout/DefaultLayout";
import Uploader from "components/Uploader";

// OTHER
import { AppContext } from "AppContext";
import useBusiness from "utils/useBusiness";
import { industries, currencies, timezones } from "utils/constants";

function Page() {
  const { modalRepo } = useContext(AppContext);

  const { business, updateBusiness } = useBusiness();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: business?.name,
      location: business?.additionalSettings?.location,
      phone: business?.additionalSettings?.phone,
      industry: business?.additionalSettings?.industry || "",

      currency: business?.additionalSettings?.currency || "",
      timezone: business?.additionalSettings?.timezone || "",
    },
    // validationSchema: createLoginSchema(),
    onSubmit: (values) => {
      console.log("-> values: ", values);
      const values_ = { ...values };
      delete values_.name;

      modalRepo.open("CropImage");

      const attributes = {
        name: values.name,
        additionalSettings: JSON.stringify({
          ...business.additionalSettings,
          ...values_,
        }),
      };
      updateBusiness(attributes);
    },
  });

  return (
    <DefaultLayout title="Settings/Store Details" formik={formik}>
      <Typography className="section-title" variant="subtitle1">
        Checkout Headline
      </Typography>
      <Box className="card" sx={{ mb: 5 }}>
        <Typography variant="subtitle1">Business Name</Typography>
        <TextField
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <Typography variant="subtitle1">Location</Typography>
        <TextField
          name="location"
          value={formik.values.location}
          onChange={formik.handleChange}
        />
        <Typography variant="subtitle1">Phone</Typography>
        <TextField
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
        />
        <Typography variant="subtitle1">Logo</Typography>
        <Uploader />
        <Typography variant="subtitle1">Industry</Typography>
        <TextField
          name="industry"
          value={formik.values.industry}
          onChange={formik.handleChange}
          sx={{ textTransform: "capitalize" }}
          select
        >
          {industries.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Typography className="section-title" variant="subtitle1">
        Business Operational
      </Typography>
      <Box className="card" sx={{ mb: 5 }}>
        <Typography variant="subtitle1">Main Currency</Typography>
        <TextField
          name="currency"
          value={formik.values.currency}
          defaultValue={formik.values.currency}
          onChange={formik.handleChange}
          sx={{ textTransform: "capitalize" }}
          select
        >
          {currencies().map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Typography variant="subtitle1">Timezone</Typography>
        <TextField
          name="timezone"
          value={formik.values.timezone}
          onChange={formik.handleChange}
          sx={{ textTransform: "capitalize" }}
          select
        >
          {timezones().map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Typography className="section-title" variant="subtitle1">
        User Details
      </Typography>
      <Box className="card" sx={{ mb: 5 }}></Box>
    </DefaultLayout>
  );
}

export default Page;
