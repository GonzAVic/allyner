// MATERIAL UI
import { styled } from "@mui/system";
import { Typography } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const PreviewContainer = ({ children, noTopSpace }) => {
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
      <Content noTopSpace={noTopSpace}>{children}</Content>
    </Container>
  );
};

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  position: "relative",
});

const Content = styled("div")(({ noTopSpace }) => ({
  borderRadius: 10,
  border: "1px solid #e1e1e1",
  background: "#FFFFFF",
  display: "flex",
  flex: 1,
  overflow: "hidden",
  padding: noTopSpace ? 0 : 16,
}));

export default PreviewContainer;
