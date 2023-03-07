// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, IconButton, Box } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const ServiceCheckout = ({ headline, message }) => {
  return (
    <Container>
      <Box sx={{ textAlign: "center", justifyContent: "center" }}>
        <CheckBackground>
          <CheckIcon />
        </CheckBackground>
        <Typography variant="h5">{headline || "Default UI value"}</Typography>
        <Typography
          color="text.secondary"
          sx={{ maxWidth: 320, margin: "auto", mt: 2 }}
        >
          {message || "Default UI value"}
        </Typography>
      </Box>
    </Container>
  );
};

const Container = styled("div")({});

const CheckBackground = styled("div")({
  width: 126,
  height: 126,
  background: "#EFF4FF",
  borderRadius: 100,
  margin: "auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 32,

  svg: {
    transform: "scale(2)",
  },
});

export default ServiceCheckout;
