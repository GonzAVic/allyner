import { useState, useContext } from "react";
import Cropper from "react-easy-crop";

// MATERIAL UI
import { styled } from "@mui/system";
import { Dialog, Button, IconButton, Stack, Slider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";

// OTHER
import { AppContext } from "AppContext";

const CropImageModal = () => {
  const { modalRepo } = useContext(AppContext);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(0.2);

  const handleZoomChange = (event, newValue) => {
    setZoom(newValue);
  };

  return (
    <Container open={true}>
      <BackButton onClick={modalRepo.close}>
        <ArrowBackIcon />
      </BackButton>
      <Content>
        <CropperContainer>
          <Cropper
            image={
              "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg"
            }
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={() => {}}
            onCropComplete={() => {}}
            onZoomChange={setZoom}
          />
        </CropperContainer>
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          <ZoomOutIcon />
          <Slider
            value={zoom}
            max={3}
            min={1}
            step={0.2}
            onChange={handleZoomChange}
          />
          <ZoomInIcon />
        </Stack>
        <Button sx={{ mt: 6 }} fullWidth>
          Upload
        </Button>
      </Content>
    </Container>
  );
};

const Container = styled(Dialog)({
  ".MuiDialog-paper": {
    maxWidth: 677,
    width: "calc(100vw - 40px)",

    borderRadius: 12,
    padding: 24,
  },
});

const Content = styled("div")({ width: 290, margin: "auto" });

const BackButton = styled(IconButton)({
  position: "absolute",
  top: 24,
  left: 24,
});

const CropperContainer = styled("div")({
  position: "relative",
  width: 290,
  height: 290,
  marginBottom: 24,
  marginTop: 72,

  ".reactEasyCrop_Container": {
    borderRadius: 16,
  },
});

export default CropImageModal;
