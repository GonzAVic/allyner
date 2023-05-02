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
      firstName: "",
      lastName: "",
      ...aQInitialValues,
    },
    validationSchema: createFormSchema([
      { title: "password", isRequired: true },
      { title: "firstName", isRequired: true },
      { title: "lastName", isRequired: true },
      ...additionalQuestions,
    ]),
    onSubmit: (values) => {
      const data = {
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
      };

      delete values.email;
      delete values.password;
      delete values.firstName;
      delete values.lastName;

      data.additionalInfo = values;
      onSubmit(data);
    },
  });

  console.log("-> formik: ", formik.errors);

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
      />
      <TextField
        label="Password"
        name="password"
        onChange={formik.handleChange}
        helperText={formik.errors.password}
        error={formik.errors.password}
      />
      <TextField
        label="First name"
        name="firstName"
        onChange={formik.handleChange}
        helperText={formik.errors.firstName}
        error={formik.errors.firstName}
      />
      <TextField
        label="Last name"
        name="lastName"
        onChange={formik.handleChange}
        helperText={formik.errors.lastName}
        error={formik.errors.lastName}
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
    </Container>
  );
};

const Container = styled(Box)({
  maxWidth: 650,
});

export default ClientSignup;
