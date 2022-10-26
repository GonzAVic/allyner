// MATERIAL UI
import { styled } from "@mui/system";
import { Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Uploader = () => {
  return (
    <Container>
      <CloudUploadIcon sx={{ mb: 2 }} />
      <Typography vatiant="label" sx={{ mb: 1, textAlign: "center" }}>
        <span>Click to upload</span> or drag and drop
      </Typography>
      <Typography vatiant="label" sx={{ textAlign: "center" }}>
        SVG, PNG, JPG, GIF or video (min. 1280x720px, 72 DPI)
      </Typography>
    </Container>
  );
};

const Container = styled("div")({
  background: "#FFFFFF",
  border: "1px solid #DCDFEA",
  borderRadius: 8,
  display: "flex",
  flexDirection: "column",
  padding: 16,
  alignItems: "center",

  span: {
    color: "#444CE7",
  },
});

export default Uploader;
