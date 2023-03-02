// MATERIAL UI
import { Box, Typography, TextField, Button } from "@mui/material";

const CheckoutDetailsForm = ({ headline, message, cta: cta_ }) => {
  const cta = { text: "Book Now", fn: () => {} };
  if (cta_ && cta_.text) cta.text = cta_.text;
  if (cta_ && cta_.fn) cta.fn = cta_.fn;
  return (
    <div>
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
          Already have an account? <Button variant="text">Login</Button>
        </Typography>
      </div>
      <TextField placeholder="Email" />

      <Typography variant="subtitle1">Other Details</Typography>
      <TextField value="Name" />
      <TextField value="Birthday" />
      <Button onClick={cta.fn} fullWidth>
        {cta.text}
      </Button>
    </div>
  );
};

export default CheckoutDetailsForm;
