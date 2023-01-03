// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, Divider } from "@mui/material";

const PreviewContainer = ({ children }) => {
  return (
    <Container>
      <Typography variant="subtitle1" sx={{ ml: 4.125, mt: 1.5, mb: 1.5 }}>
        Preview
      </Typography>
      <Divider />
      <Content>{children}</Content>
    </Container>
  );
};

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  background: "#FFFFFF",
  borderRadius: 10,
  flex: 1,
  position: "relative",
});

const Content = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
});

export default PreviewContainer;
