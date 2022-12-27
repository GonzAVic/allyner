// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, Button } from "@mui/material";

const ServiceThumbnail = ({ cover, title, url }) => {
  return (
    <Container>
      <div>
        <Typography variant="h3">{title}</Typography>
      </div>
      <Button href={url}>Get a Quote</Button>
    </Container>
  );
};

const Container = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderRadius: 16,
  background: "#FFFFFF",
  padding: 20,
  marginBottom: 16,
});

export default ServiceThumbnail;
