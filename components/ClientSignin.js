// MATERIAL UI
import { Typography, TextField, Button } from "@mui/material";

const ClientSignin = ({ headline, message }) => {
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
      <TextField label="Email" />
      <TextField label="Password" />
      <Button fullWidth>Sign In</Button>
    </div>
  );
};

export default ClientSignin;
