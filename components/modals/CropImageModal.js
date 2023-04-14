import { useState, useContext } from "react";
import Cropper from "react-easy-crop";

// MATERIAL UI
import { styled } from "@mui/system";
import { Dialog, Button, IconButton, Stack, Slider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";

// OTHER
import { AppContext } from "contexts/AppContext";
import { getCroppedImg } from "utils/crop";

const CropImageModal = ({
  imageSrc = "",
  cta = () => {},
  cropShape = null,
  cropOptions: cropOptions_ = { cropShape: "rect", aspect: 1 },
}) => {
  const { modalRepo } = useContext(AppContext);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const handleZoomChange = (event, newValue) => {
    setZoom(newValue);
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, 0);
      if (cta) {
        cta(croppedImage);
        modalRepo.close();
      }
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  };

  const cropOptions = cropOptions_;
  if (cropShape === "serviceCover") {
    cropOptions.aspect = 312 / 200;
  }

  return (
    <Container open={true}>
      <BackButton onClick={modalRepo.close}>
        <ArrowBackIcon />
      </BackButton>
      <Content>
        <CropperContainer>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            {...cropOptions}
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
        <Button onClick={showCroppedImage} sx={{ mt: 6 }} fullWidth>
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
