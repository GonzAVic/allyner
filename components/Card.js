// MATERIAL UI
import { styled } from "@mui/system";
import { Typography } from "@mui/material";

const Card = ({ children, title }) => {
  return (
    <Container>
      <Typography variant="label">{title}</Typography>
      {children}
    </Container>
  );
};

const Container = styled("div")(({ theme }) => ({
  padding: 24,
  border: "1px solid #DCDFEA",
  borderRadius: 12,
  background: "#F9F9FB",
  marginBottom: 32,
}));

export default Card;
