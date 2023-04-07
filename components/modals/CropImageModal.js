// MATERIAL UI
import { styled } from "@mui/system";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  IconButton,
  Stack,
  Slider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";

const CropImageModal = () => {
  return (
    <Container open={true}>
      <BackButton>
        <ArrowBackIcon />
      </BackButton>
      <Content>
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          <ZoomOutIcon />
          <Slider value={2} onChange={() => {}} />
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

export default CropImageModal;
