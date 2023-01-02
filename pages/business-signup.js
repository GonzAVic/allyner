// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, TextField, Button } from "@mui/material";

const BusinessSignup = () => {
  return (
    <Container>
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
      <TextField placeholder="Email" />
      <TextField placeholder="Password" />
      <TextField placeholder="Name" />
      <TextField placeholder="Company Name" />
      <TextField placeholder="Industry" />
      <Button fullWidth>Sign In</Button>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 5, textAlign: "center" }}
      >
        Don’t have an account?{" "}
        <Typography
          variant="body2"
          sx={{
            color: "#3C64C5",
            display: "inline-block",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Sign up
        </Typography>
      </Typography>
    </Container>
  );
};

const Container = styled("div")({
  width: "calc(100vw - 40px)",
  maxWidth: 360,
  margin: "auto",
});

export default BusinessSignup;
