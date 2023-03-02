// MATERIAL UI
import { Typography, TextField, Button } from "@mui/material";

const ClientSignup = ({ headline, message }) => {
  return (
    <div>
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
      <Button fullWidth>Sign In</Button>
    </div>
  );
};

export default ClientSignup;