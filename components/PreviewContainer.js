// MATERIAL UI
import { styled } from "@mui/system";
import { Typography } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const PreviewContainer = ({ children }) => {
  return (
    <Container>
      <Typography
      className="section-title"
        variant="subtitle1"
        color="text.secondary"
        sx={{ display: "flex", alignItems: "center" }}
      >
        <VisibilityOutlinedIcon sx={{ mr: 1 }} />
        Preview
      </Typography>
      <Content>{children}</Content>
    </Container>
  );
};

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  position: "relative",
});

const Content = styled("div")({
  borderRadius: 10,
  background: "#FFFFFF",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
});

export default PreviewContainer;
