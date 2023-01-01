import Image from "next/image";

// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, Divider } from "@mui/material";

// COMPONENTS
import ServiceCard from "./ServiceCard";

const ServicePreview = ({ previewData }) => {
  const { title, description, callToAction } = previewData;

  let descriptionHtml =
    description === "<p></p>" || !description
      ? "<p>Description placeholder</p>"
      : description;
  return (
    <Container>
      <Typography variant="subtitle1" sx={{ ml: 4.125, mt: 1.5, mb: 1.5 }}>
        Preview
      </Typography>
      <Divider />
      <ServiceCardContainer>
        <ServiceCard />
      </ServiceCardContainer>
      {/* <CoverContainer>
        <Image
          src={
            previewData.cover ||
            "https://images.unsplash.com/photo-1561070791-2526d30994b5"
          }
          layout="fill"
          alt="service-cover"
        />
      </CoverContainer>
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
      /> */}
    </Container>
  );
};

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  background: "#FFFFFF",
  borderRadius: 10,
  flex: 1,

  "& .content": {
    color: "#667085",
  },
});

const ServiceCardContainer = styled("div")({
  display: "flex",
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
});

export default ServicePreview;
