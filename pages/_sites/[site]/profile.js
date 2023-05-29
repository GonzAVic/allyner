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
import { AppContext } from "contexts/AppContext";
import useUser from "utils/useUser";
import { timezones } from "utils/constants";
import { getFileUrl } from "utils/utils";

const Page = () => {
  const { sessionRepo } = useContext(AppContext);
  const { user: user_ } = sessionRepo;
  const { updateClient, user } = useUser(user_?.id);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: user?.firstName,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
      profilePicture: user?.profilePicture,
      additionalInfo: user ? user.additionalInfo || {} : {},
      timezone: user?.timezone || "",
    },
    // validationSchema: createLoginSchema(),
    onSubmit: (values) => {
      updateClient(values);
    },
  });

  const handleProfilePictureChange = (profilePictureUrl) => {
    if (!profilePictureUrl) {
      formik.setFieldValue("profilePicture", null);
      return;
    }
    formik.setFieldValue("profilePicture", getFileUrl(profilePictureUrl));
  };

  if (!user) return;
  return (
    <DefaultLayout title="Profile" userType="client" formik={formik}>
      <Typography className="section-title" variant="subtitle1">
        Customer details
      </Typography>
      <Box className="card" sx={{ mb: 5 }}>
        <Typography variant="subtitle1">Name</Typography>
        <TextField
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
        />
        <Typography variant="subtitle1">Email</Typography>
        <TextField
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <Typography variant="subtitle1">Phone Number</Typography>
        <TextField
          name="phoneNumber"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
        />
        <Typography variant="subtitle1">Profile Picture</Typography>
        {formik.values.profilePicture ? (
          <FileCard
            fileUrl={formik.values.profilePicture}
            onDelete={() => handleProfilePictureChange("")}
          />
        ) : (
          <Uploader
            onUploadedFinished={handleProfilePictureChange}
            withCropper
          />
        )}

        {Object.entries(formik.values.additionalInfo).map((aI) => {
          return (
            <>
              <Typography variant="subtitle1">{aI[0]}</Typography>
              <TextField
                name={`additionalInfo["${aI[0]}"]`}
                value={formik.values.additionalInfo[`${aI[0]}`]}
                onChange={formik.handleChange}
              />
            </>
          );
        })}
      </Box>

      <Typography className="section-title" variant="subtitle1">
        Customer details
      </Typography>
      <ListGroup
        data={[
          { label: "Sign Up Date", value: user.createdAt },
          {
            label: "Timezone",
            render: () => {
              return (
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
              );
            },
          },
        ]}
      />
    </DefaultLayout>
  );
};

export default Page;
