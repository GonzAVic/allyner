import { useState } from "react";

// MATERIAL UI
import { styled } from "@mui/system";
import { Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

// COMPONENTS
import PreviewContainer from "components/PreviewContainer";
import PreviewContainerMobile from "components/PreviewContainerMobile";

const PreviewLayout = ({ children, previewComponent, noTopSpace, zoomOut }) => {
  const isMobile = useMediaQuery("(max-width:768px)");

  const [isMobilePreviewOpen, setIsMobilePreviewOpen] = useState(false);

  return (
    <Container>
      {/**** LEFT SIDE ****/}
      <LeftSide>
        {isMobile && (
          <MobilePreviewButton
            variant="text"
            startIcon={<VisibilityOutlinedIcon />}
            onClick={() => setIsMobilePreviewOpen(true)}
          >
            Preview
          </MobilePreviewButton>
        )}
        {children}
      </LeftSide>

      {/**** RIGHT SIDE ****/}
      {!isMobile && (
        <RightSide>
          <PreviewContainer noTopSpace={noTopSpace}>
            <PreviewContent noTopSpace={noTopSpace} zoomOut={zoomOut}>
              {previewComponent}
            </PreviewContent>
          </PreviewContainer>
        </RightSide>
      )}
      {isMobile && isMobilePreviewOpen && (
        <PreviewContainerMobile close={() => setIsMobilePreviewOpen(false)}>
          {previewComponent}
        </PreviewContainerMobile>
      )}
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
  position: "relative",
  flex: 1,
  overflowY: "auto",
  overflowX: "hidden",
});

const RightSide = styled("div")({
  display: "flex",
  flex: 1,
});

const PreviewContent = styled("div")(({ noTopSpace, zoomOut }) => ({
  marginTop: noTopSpace ? 0 : 150,
  width: "100%",
  display: "flex",
  justifyContent: "center",
  transform: zoomOut ? "scale(.8)" : "",
  overflow: "auto",
}));

const MobilePreviewButton = styled(Button)({
  position: "absolute",
  right: -18,
  top: -8,
});

export default PreviewLayout;
