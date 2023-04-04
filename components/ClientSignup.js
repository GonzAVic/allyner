// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, TextField, Button, Box } from "@mui/material";

const ClientSignup = ({ headline, message, additionalQuestions = [] }) => {
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
      <TextField label="Email" />
      <TextField label="Password" />
      {additionalQuestions.map((q, index) => {
        return (
          <TextField
            label={q.title || "[COPY] default value"}
            multiline={q.questionType === "LONG_TEXT"}
            rows={3}
          />
        );
      })}
      <Button fullWidth>Sign Up</Button>
    </Container>
  );
};


const Container = styled(Box)({
  maxWidth: 650,
});

export default ClientSignup;
