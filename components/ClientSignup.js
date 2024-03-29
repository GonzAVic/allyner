import { useFormik } from "formik";

// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, TextField, Button, Box } from "@mui/material";

// OTHER
import { createFormSchema } from "utils/utils";

const ClientSignup = ({
  headline,
  message,
  additionalQuestions = [],
  onSubmit = () => {},
  onSignin = () => {},
}) => {
  const aQInitialValues = {};
  additionalQuestions.forEach((aq) => {
    aQInitialValues[`${aq.title}`] = aq.answer || "";
  });

  const formik = useFormik({
    validateOnChange: false,
    enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      ...aQInitialValues,
    },
    validationSchema: createFormSchema([
      { title: "password", isRequired: true },
      { title: "firstname", isRequired: true },
      { title: "lastname", isRequired: true },
      ...additionalQuestions,
    ]),
    onSubmit: (values) => {
      const data = {
        email: values.email,
        password: values.password,
        firstname: values.firstname,
        lastname: values.lastname,
      };

      delete values.email;
      delete values.password;
      delete values.firstname;
      delete values.lastname;

      data.additionalInfo = values;
      onSubmit(data);
    },
  });

  return (
    <Container>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        {headline || "Sign up now"}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ textAlign: "center", mt: 1.5, mb: 3 }}
      >
        {message || "Sign up to book and track your services with us!"}
      </Typography>
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
      <TextField
        label="First name"
        name="firstname"
        onChange={formik.handleChange}
        helperText={formik.errors.firstname}
        error={formik.errors.firstname}
        required
      />
      <TextField
        label="Last name"
        name="lastname"
        onChange={formik.handleChange}
        helperText={formik.errors.lastname}
        error={formik.errors.lastname}
        required
      />
      {additionalQuestions.map((q, index) => {
        return (
          <TextField
            key={index}
            label={q.title || "[COPY] default value"}
            multiline={q.questionType === "LONG_TEXT"}
            rows={3}
            name={q.title}
            onChange={formik.handleChange}
            helperText={formik.errors[`${q.title}`]}
            error={formik.errors[`${q.title}`]}
            sx={{ mb: 2.5 }}
          />
        );
      })}
      <Button onClick={formik.submitForm} fullWidth>
        Sign Up
      </Button>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Typography variant="body2" color="text.secondary">
          Already have an account?
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
          onClick={onSignin}
        >
          Sign in
        </Typography>
      </Box>
    </Container>
  );
};

const Container = styled(Box)({
  maxWidth: 650,
});

export default ClientSignup;
