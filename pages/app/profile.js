import { useContext } from "react";
import { useFormik } from "formik";

// MATERIAL UI
import { Typography, Box, TextField } from "@mui/material";

// COMPONENTS
import DefaultLayout from "components/layout/DefaultLayout";
import ListGroup from "components/ListGroup";
import Uploader from "components/Uploader";
import FileCard from "components/FileCard";

// OTHER
import useUser from "utils/useUser";
import { BusinessContext } from "contexts/BusinessContext";

const Page = () => {
  const { user, updateUser } = useUser(3);
  const { businessRepo } = useContext(BusinessContext);
  const { business } = businessRepo;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
      profilePicture: user?.profilePicture,
    },
    // validationSchema: createLoginSchema(),
    onSubmit: (values) => {
      updateUser(values);
    },
  });

  const handleProfilePictureChange = (profilePictureUrl) => {
    formik.setFieldValue("profilePicture", profilePictureUrl);
  };

  if (!user) return;
  return (
    <DefaultLayout title="Profile" formik={formik}>
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
        <Typography variant="subtitle1">Last Name</Typography>
        <TextField
          name="lastName"
          value={formik.values.lastName}
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
      </Box>

      <Typography className="section-title" variant="subtitle1">
        Store Details
      </Typography>
      <ListGroup
        data={[
          {
            label: "Stores",
            render: () => (
              <Typography variant="link" href="/app/settings">
                {business.name}
              </Typography>
            ),
          },
        ]}
        sx={{ mb: 4 }}
      />

      <Typography className="section-title" variant="subtitle1">
        Settings
      </Typography>
      <ListGroup data={[{ label: "Password", value: user.createdAt }]} />
    </DefaultLayout>
  );
};

export default Page;
