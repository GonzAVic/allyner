// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, IconButton, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const LayoutOne = ({ children }) => {
  return (
    <Container>
      <Header>
        <IconButton>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6">Product Management</Typography>
        <Box sx={{ width: 24, height: 24 }} />
      </Header>
      {children}
    </Container>
  );
};

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  background: "#F5F5F5",
  height: "100vh",
  width: "100vw",
});

const Header = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: 72,
  background: "#FFFFFF",
  padding: "0 24px",
});

export default LayoutOne;
