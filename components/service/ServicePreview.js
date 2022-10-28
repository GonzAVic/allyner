// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, Button } from "@mui/material";

const ServicePreview = ({ previewData }) => {
  const { title, description, callToAction } = previewData;

  let descriptionHtml =
    description === "<p></p>" || !description
      ? "<p>Description placeholder</p>"
      : description;
  return (
    <Container>
      <Typography variant="h3">Preview</Typography>
      <Header sx={{ mb: 5, mt: 6 }}>
        <div>
          <Typography variant="h2">{title || "Untitled"}</Typography>
          <Typography variant="h3">$53 / Hour</Typography>
        </div>
        <Button>{callToAction || "Book Now"}</Button>
      </Header>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: descriptionHtml }}
      />
    </Container>
  );
};

const Container = styled("div")({
  background: "#F9F9FB",
  padding: 32,
  flex: 1,

  "& .content": {
    color: "#667085",
  },
});

const Header = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
});

export default ServicePreview;
