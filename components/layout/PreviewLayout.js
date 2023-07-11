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
            <NoTouchLayer />
            <PreviewContent noTopSpace={noTopSpace} zoomOut={zoomOut}>
              {previewComponent}
            </PreviewContent>
          </PreviewContainer>
        </RightSide>
      )}
      {isMobile && isMobilePreviewOpen && (
        <PreviewContainerMobile close={() => setIsMobilePreviewOpen(false)}>
          {/* TODO: the close icon is not clickable */}
          <NoTouchLayer />
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
  marginTop: noTopSpace ? 0 : 70,
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

const NoTouchLayer = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 1,
});

export default PreviewLayout;
