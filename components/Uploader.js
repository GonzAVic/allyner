// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Uploader = ({ onFilesUploaded, multiple = false }) => {
  const handleUpload = async (e) => {
    const { files } = e.target;

    const filesArray = Array.from(files);
    const imagesUrl = filesArray.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", file.name);
      // Check that file is in proper format before making request
      const response = await fetch(`/api/upload`, {
        method: "POST",
        body: formData,
        "Content-Type": "image/jpeg",
      });
      const data = await response.json();
      console.log("-> data.url: ", data.url);
      return data.url;
    });
    Promise.all(imagesUrl).then((values) => {
      if (onFilesUploaded) onFilesUploaded(values);
    });
  };

  return (
    <>
      <input
        type="file"
        id="imgupload"
        onChange={handleUpload}
        style={{ display: "none" }}
        multiple={multiple}
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

export default Uploader;
