// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, Box, IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

// OTHER
import { uploadFile } from "utils/s3client";

const Uploader = ({
  onFilesUploaded,
  onFileUploaded,
  onFilesLoaded = () => {},
  multiple = false,
}) => {
  const handleUpload = async (e) => {
    const { files } = e.target;

    const filesArray = Array.from(files);
    const filesParams = filesArray.map((file) => {
      const uploadParams = {
        Bucket: "allyner-dev",
        Key: `${Date.now()}-${file.name}`,
        Body: file,
        ContentType: file.type,
      };
      return uploadParams;
    });
    onFilesLoaded(filesParams);
    filesParams.forEach(async (fp) => {
      const fileUrl = await uploadFile(fp);
      if (!multiple && onFileUploaded) {
        onFileUploaded(fileUrl);
      }
    });
  };

  return (
    <>
      <input
        type="file"
        id="imgupload"
        onChange={handleUpload}
        style={{ display: "none" }}
        multiple={Boolean(multiple)}
      />
      <label for="imgupload">
        <Container>
          <CloudUploadIcon sx={{ mb: 2 }} />
          <Typography vatiant="label" sx={{ mb: 1, textAlign: "center" }}>
            <span>Click to upload</span> or drag and drop
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

export default Uploader;
