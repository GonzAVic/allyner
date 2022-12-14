// MATERIAL UI
import { styled } from "@mui/system";
import { Typography } from "@mui/material";

const Card = ({ children, title }) => {
  return (
    <Container>
      <Typography variant="label" sx={{ mb: 1, textTransform: "capitalize" }}>
        {title}
      </Typography>
      {children}
    </Container>
  );
};

const Container = styled("div")(({ theme }) => ({
  position: "relative",
  padding: 24,
  border: "1px solid #DCDFEA",
  borderRadius: 12,
  background: "#F9F9FB",
  marginBottom: 32,
}));

export default Card;
