// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, IconButton } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

// OTHER

const FileCard = ({ fileUrl, onDelete = () => {} }) => {
  return (
    <Container>
      <Elements>
        <img className="filePReview" src={fileUrl} />
        <Typography color="text.secondary" sx={{ fontWeight: 500 }}>
          {fileUrl}
        </Typography>
      </Elements>
      <Elements>
        <IconButton onClick={onDelete}>
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      </Elements>
    </Container>
  );
};

const Container = styled("div")({
  padding: 16,
  borderRadius: 8,
  background: "#FFFFFF",
  height: 80,
  width: "100%",
  border: "1px solid #EFF1F5",

  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  ".filePReview": {
    height: 50,
    marginRight: 16,
  },
});

const Elements = styled("div")({
  display: "flex",
  alignItems: "center",
});

export default FileCard;
