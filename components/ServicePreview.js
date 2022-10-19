// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, Button } from "@mui/material";

const ServicePreview = ({ title, description }) => {
  return (
    <Container>
      <Typography variant="h3">Preview</Typography>
      <Header>
        <div>
          <Typography variant="h2">{title}</Typography>
          <Typography variant="h3">$53 / Hour</Typography>
        </div>
        <Button>Book Now</Button>
      </Header>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </Container>
  );
};

const Container = styled("div")({
  background: "#F9F9FB",
  padding: 32,
});

const Header = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
});

export default ServicePreview;
