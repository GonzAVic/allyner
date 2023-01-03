import { useState } from "react";

// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, IconButton, Box } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CheckIcon from "@mui/icons-material/Check";

const ServiceCheckout = () => {
  const [isConfirmationPage, setIsConfirmationPage] = useState(false);

  return (
    <Container>
      <Header />
      <Box sx={{ textAlign: "center" }}>
        <CheckBackground>
          <CheckIcon />
        </CheckBackground>
        <Typography variant="h5">Thank You!</Typography>
        <Typography
          color="text.secondary"
          sx={{ maxWidth: 320, margin: "auto", mt: 2 }}
        >
          Thank for choosing porject managment, lorem ipsum color diamet,
          paterair.
        </Typography>
      </Box>
    </Container>
  );
};

const Container = styled("div")({
  minWidth: 410,
});

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
    transform: "scale(2)"
  }
});

const Header = () => {
  return (
    <HContainer>
      <IconButton>
        <ArrowBackIosNewIcon />
      </IconButton>
      <Typography variant="h6">Confirmation Page</Typography>
      <IconButton>
        <ArrowForwardIosIcon />
      </IconButton>
    </HContainer>
  );
};

const HContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 70,
});

export default ServiceCheckout;
