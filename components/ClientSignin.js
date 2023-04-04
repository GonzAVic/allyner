// MATERIAL UI
import { Typography, TextField, Button } from "@mui/material";

const ClientSignin = ({ headline, message, onSignup = () => {} }) => {
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
      <Button sx={{ mb: 5 }} fullWidth>
        Sign In
      </Button>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ textAlign: "center" }}
      >
        Don’t have an account?
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
      </Typography>
    </div>
  );
};

export default ClientSignin;
