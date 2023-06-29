import { useFormik } from "formik";

// MATERIAL UI
import { Typography, TextField, Button, Box, Alert } from "@mui/material";

// OTHER
import { createFormSchema } from "utils/utils";

const ClientSignin = ({
  headline,
  message,
  onSignup = () => {},
  onSubmit = () => {},
  isDisplayError = false,
}) => {
  const formik = useFormik({
    validateOnChange: false,
    enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: createFormSchema([
      { title: "password", isRequired: true },
    ]),
    onSubmit: (values) => {
      const data = {
        email: values.email,
        password: values.password,
      };

      onSubmit(data);
    },
  });

  return (
    <div>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        {headline || "Sign in now"}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ textAlign: "center", mt: 1.5, mb: 3 }}
      >
        {message || "Start selling your services online today!"}
      </Typography>
      {isDisplayError && (
        <Alert severity="error" sx={{ mb: 3.5 }}>
          [Copy] Wrong Credentials
        </Alert>
      )}
      <TextField
        label="Email"
        name="email"
        onChange={formik.handleChange}
        helperText={formik.errors.email}
        error={formik.errors.email}
        required
      />
      <TextField
        label="Password"
        name="password"
        onChange={formik.handleChange}
        helperText={formik.errors.password}
        error={formik.errors.password}
        required
      />
      <Button onClick={formik.submitForm} sx={{ mb: 5 }} fullWidth>
        Sign In
      </Button>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography
          variant="body2"
          color="text.secondary"
          // sx={{ textAlign: "center" }}
        >
          Don’t have an account?
        </Typography>
        <Typography
          variant="body2"
          color="primary"
          sx={{
            display: "inline-block",
            ml: 1,
            fontWeight: 700,
            cursor: "pointer",
          }}
          onClick={onSignup}
        >
          Sign up
        </Typography>
      </Box>
    </div>
  );
};

export default ClientSignin;
