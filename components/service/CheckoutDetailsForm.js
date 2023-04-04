import * as yup from "yup";
import { useFormik } from "formik";

// MATERIAL UI
import { styled } from "@mui/system";
import { Box, Typography, TextField, Button } from "@mui/material";

const CheckoutDetailsForm = ({
  headline,
  message,
  cta: cta_,
  additionalQuestions = [],
  onLogin = () => {},
}) => {
  const aQInitialValues = {};
  additionalQuestions.forEach((aq) => {
    aQInitialValues[`${aq.title}`] = aq.answer || "";
  });

  const cta = { text: "Book Now", fn: () => {} };
  if (cta_ && cta_.text) cta.text = cta_.text;
  if (cta_ && cta_.fn) cta.fn = cta_.fn;

  const formik = useFormik({
    validateOnChange: false,
    enableReinitialize: true,
    initialValues: {
      email: "",
      ...aQInitialValues,
    },
    validationSchema: createFormSchema(additionalQuestions),
    onSubmit: (values) => {
      const values_ = { ...values };
      delete values_.email;

      const newAQ = additionalQuestions.map((aq) => {
        aq.answer = values_[aq.title];
        return aq;
      });
      cta.fn({ clientEmail: values.email, additionalQuestions: newAQ });
    },
  });

  return (
    <Container onSubmit={formik.handleSubmit}>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          {headline || "Default UI value"}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          {message || "Default UI value"}
        </Typography>
      </Box>

      <div className="space-between-centered">
        <Typography variant="subtitle1">Contact Details</Typography>
        <Typography color="text.secondary">
          Already have an account?{" "}
          <Button onClick={onLogin} variant="text">
            Login
          </Button>
        </Typography>
      </div>
      <TextField
        label="Email"
        name="email"
        onChange={formik.handleChange}
        helperText={formik.errors.email}
        error={formik.errors.email}
      />

      <Typography variant="subtitle1">Other Details</Typography>
      <TextField label="Name" />
      <TextField label="Birthday" />

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
        {cta.text}
      </Button>
    </Container>
  );
};

const Container = styled("form")({
  maxWidth: 650,
});

const createFormSchema = (additionalQuestions) => {
  const aQInitialValues = {};
  additionalQuestions.forEach((aq) => {
    aQInitialValues[`${aq.title}`] = aq.isRequired
      ? yup.string().required()
      : yup.string();
  });

  const schemaAttributes = {
    email: yup.string().required(),
    ...aQInitialValues,
  };

  return yup.object().shape(schemaAttributes);
};

export default CheckoutDetailsForm;
