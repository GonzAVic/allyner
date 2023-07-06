import { useFormik } from "formik";
import * as yup from "yup";

// MATERIAL UI
import { styled } from "@mui/system";
import { Box, Typography, TextField, Button } from "@mui/material";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";

const CheckoutDetailsForm = ({
  headline,
  message,
  cta: cta_,
  additionalQuestions = [],
  onLogin = () => {},
  userId,
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

    validationSchema: createFormSchema([
      ...additionalQuestions,
      { title: "email", isRequired: !Boolean(userId) },
    ]),
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
        <Typography variant="h4" sx={{ mb: 2 }}>
          {headline || "[COPY] Default UI value"}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4, fontSize: 20 }}>
          {message || "[COPY] Default UI value"}
        </Typography>
      </Box>

      {!userId && (
        <>
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
        </>
      )}


      {Boolean(additionalQuestions.length) && (
        <Typography variant="subtitle1">Other Details</Typography>
      )}
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

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          margin: "auto",
          display: "block",
          width: "fit-content",
          mb: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        <GppGoodOutlinedIcon fontSize="small" />
        You will not charge at the moment
      </Typography>
      <Button
        onClick={formik.submitForm}
        sx={{ margin: "auto", display: "block" }}
      >
        {cta.text}
      </Button>
    </Container>
  );
};

const Container = styled("form")({
  maxWidth: 550,
});

// TODO: Use utils function
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
