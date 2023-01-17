import { useFormik } from "formik";
import * as yup from "yup";

// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, TextField, Button, Alert } from "@mui/material";

const BusinessSignin = () => {
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: createSigninSchema(),
    onSubmit: (values) => {
      console.log("-> values: ", values);
    },
  });

  return (
    <Container onSubmit={formik.handleSubmit}>
      <Typography variant="h4" sx={{ mt: 4, textAlign: "center" }}>
        Hi. Wlecome ✋
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 5, textAlign: "center" }}
      >
        Share your services in an easy way around the world
      </Typography>
      <Alert severity="error" sx={{ mb: 3.5 }}>
        This is an error alert — check it out!
      </Alert>
      <TextField
        label="Email"
        name="email"
        onChange={formik.handleChange}
        helperText={formik.errors.email}
        error={formik.errors.email}
        sx={{ mb: 2.5 }}
      />
      <TextField
        label="Password"
        name="password"
        onChange={formik.handleChange}
        helperText={formik.errors.password}
        error={formik.errors.password}
      />
      <Button type="submit" fullWidth>
        Sign In
      </Button>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 5, textAlign: "center" }}
      >
        Already have an account?
      </Typography>
    </Container>
  );
};

const Container = styled("form")({
  width: "calc(100vw - 40px)",
  maxWidth: 360,
  margin: "auto",
  marginTop: 175,
});

export default BusinessSignin;

const createSigninSchema = () => {
  let schemaAttributes = {
    email: yup.string().required(),
    password: yup.string().required(),
  };
  return yup.object().shape(schemaAttributes);
};
