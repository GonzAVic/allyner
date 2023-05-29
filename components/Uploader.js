import { useContext, useState } from "react";

// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, Box, IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

// OTHER
import { AppContext } from "contexts/AppContext";
import { createBucketObject, uploadFile } from "utils/utils";

const Uploader = ({
  multiple = false,
  withCropper = false,
  onUploadedFinished = () => {},
  cropShape,
}) => {
  const { modalRepo } = useContext(AppContext);

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);

      async function convertToFile(url, file) {
        let response = await fetch(url);
        let blob = await response.blob();

        return new File([blob], file.name, {
          type: file.type,
        });
      }

      const onCta = async (data) => {
        try {
          const newFile = await convertToFile(data, file);
          const fileData = await uploadFile(newFile);
          console.log("-> fileData: ", fileData);

          onUploadedFinished(fileData.url);
        } catch (error) {
          console.log("->>>>> error: ", error);
        }
      };

      modalRepo.open("CropImage", {
        imageSrc: imageDataUrl,
        cta: onCta,
        cropShape,
      });
    }
  };

  return (
    <>
      <input
        type="file"
        id="imgupload"
        onChange={onFileChange}
        style={{ display: "none" }}
        multiple={Boolean(multiple)}
      />
      <label for="imgupload">
        <Container>
          <CloudUploadIcon sx={{ mb: 2 }} />
          <Typography vatiant="label" sx={{ mb: 1, textAlign: "center" }}>
            <span>Click to upload</span>
          </Typography>
          <Typography vatiant="label" sx={{ textAlign: "center" }}>
            SVG, PNG, JPG, GIF or video (min. 1280x720px, 72 DPI)
          </Typography>
        </Container>
      </label>
    </>
  );
};

const Container = styled("div")({
  background: "#FFFFFF",
  border: "1px solid #DCDFEA",
  borderRadius: 8,
  display: "flex",
  flexDirection: "column",
  padding: 16,
  alignItems: "center",

  span: {
    color: "#444CE7",
  },
});

const FileItem = () => {
  return (
    <FIContainer>
      <FIFileIconCtr>
        <InsertDriveFileOutlinedIcon />
      </FIFileIconCtr>
      <Box sx={{ width: "100%" }}>
        <Typography variant="label" sx={{ mt: 1, mb: 1 }}>
          Tech design requirements.pdf
        </Typography>
        <Typography variant="label">4.2 MB</Typography>
      </Box>
      <IconButton>
        <DeleteOutlineIcon />
      </IconButton>
    </FIContainer>
  );
};

const FIContainer = styled("div")({
  border: "1px solid #EAECF0",
  borderRadius: 8,
  padding: 16,
  display: "flex",
  alignItems: "flex-start",
  gap: 16,
});

const FIFileIconCtr = styled("div")({
  border: "4px solid #F9F5FF",
  background: "#F4EBFF",
  padding: 10,
  borderRadius: 40,

  svg: {
    fill: "#7F56D9",
  },
});

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

export default Uploader;
