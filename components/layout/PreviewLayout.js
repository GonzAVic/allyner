// MATERIAL UI
import { styled } from "@mui/system";

// COMPONENTS
import PreviewContainer from "components/PreviewContainer";

const PreviewLayout = ({ children, previewComponent }) => {
  return (
    <Container>
      {/**** LEFT SIDE ****/}
      <LeftSide>{children}</LeftSide>

      {/**** RIGHT SIDE ****/}
      <RightSide>
        <PreviewContainer>
          <PreviewContent>{previewComponent}</PreviewContent>
        </PreviewContainer>
      </RightSide>
    </Container>
  );
};

const Container = styled("div")({
  display: "flex",
  gap: 32,
  flex: 1,
  overflowY: "auto",
  overflowX: "hidden",
});

const LeftSide = styled("div")({
  flex: 1,
  overflowY: "auto",
  overflowX: "hidden",
});

const RightSide = styled("div")({
  display: "flex",
  flex: 1,
});

const PreviewContent = styled("div")({
  marginTop: 150,
  width: "100%",
  display: "flex",
  justifyContent: "center",
});

export default PreviewLayout;
