// MATERIAL UI
import { styled } from "@mui/system";

// COMPONENTS
import ServiceCard from "./ServiceCard";
import PreviewContainer from "components/PreviewContainer";

const ServicePreview = ({ previewData }) => {
  return (
    <PreviewContainer>
      <Container>
        <ServiceCard service={previewData} />
      </Container>
    </PreviewContainer>
  );
};

const Container = styled("div")({
  display: "flex",
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
});

export default ServicePreview;
