import { useFormik } from "formik";

// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, Box, TextField } from "@mui/material";

// COMPONENTS
import DefaultLayout from "components/layout/DefaultLayout";
import ListGroup from "components/ListGroup";

// OTHER
import useUser from "utils/useUser";
import { diffBanner } from "utils/utils";

const Page = () => {
  const { user, updateUser } = useUser(10);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: user?.firstName,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
    },
    // validationSchema: createLoginSchema(),
    onSubmit: (values) => {
      updateUser(values);
    },
  });

  if (!user) return;
  return (
    <DefaultLayout
      title="Profile"
      userType="client"
      diffBanner={diffBanner(formik)}
    >
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
      </Box>

      <Typography className="section-title" variant="subtitle1">
        Customer details
      </Typography>
      <ListGroup
        data={[
          { label: "Sign Up Date", value: user.createdAt },
          { label: "Timezone", value: "lll" },
        ]}
      />
    </DefaultLayout>
  );
};

export default Page;
