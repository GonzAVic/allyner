// MATERIAL UI
import { styled } from "@mui/system";
import { Typography } from "@mui/material";

// OTHER
import NotFoundImg from "assets/not-found.png";

const NullState = ({ primaryText, secondaryText }) => {
  return (
    <Container>
      <img className="notFoundImg" src={NotFoundImg.src} />
      <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
        {primaryText}
      </Typography>
      <Typography color="text.secondary">{secondaryText}</Typography>
    </Container>
  );
};

const Container = styled("div")({
  height: 500,
  borderRadius: 12,
  background: "#FFFFFF",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",

  ".notFoundImg": {
    height: 137,
    width: "fit-content",
  },
});

export default NullState;
