import { useContext } from "react";
import { useFormik } from "formik";

// MATERIAL UI
import { Typography, Box, TextField, MenuItem } from "@mui/material";

// COMPONENTS
import DefaultLayout from "components/layout/DefaultLayout";
import ListGroup from "components/ListGroup";
import Uploader from "components/Uploader";
import FileCard from "components/FileCard";

// OTHER
import { BusinessContext } from "contexts/BusinessContext";
import { industries, currencies, timezones } from "utils/constants";

function Page() {
  const { businessRepo } = useContext(BusinessContext);
  const { business, updateBusiness } = businessRepo;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: business?.name,
      location: business?.location,
      phone: business?.phone,
      industry: business?.industry || "",
      logo: business?.logo || "",
      currency: business?.currency || "",
      timezone: business?.timezone || "",
    },
    onSubmit: (values) => {
      updateBusiness(values);
    },
  });

  const handleLogoChange = (logoUrl) => {
    formik.setFieldValue("logo", logoUrl);
  };

  const handleNameChange = (event) => {
    const { value } = event.target;

    const newValue = value.replace(
      /[`~!@#$%^*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
      ""
    );

    formik.setFieldValue("name", newValue);
  };

  return (
    <DefaultLayout title="Settings/Store Details" formik={formik}>
      <Typography className="section-title" variant="subtitle1">
        Checkout Headline
      </Typography>
      <Box className="card" sx={{ mb: 5 }}>
        <Typography variant="subtitle1">Business Name</Typography>
        <TextField
          name="name"
          onChange={handleNameChange}
          value={formik.values.name}
          // onChange={formik.handleChange}
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
        {formik.values.logo ? (
          <FileCard
            fileUrl={formik.values.logo}
            onDelete={() => handleLogoChange("")}
          />
        ) : (
          <Uploader onUploadedFinished={handleLogoChange} withCropper />
        )}
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
      <ListGroup
        data={[
          {
            label: "User Profile",
            render: () => (
              <Typography variant="link" href="/app/profile">
                Alwi Hesa
              </Typography>
            ),
          },
        ]}
        sx={{ mb: 4 }}
      />
    </DefaultLayout>
  );
}

export default Page;
