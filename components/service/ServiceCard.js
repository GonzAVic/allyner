import React from "react";
import { useRouter } from "next/router";

// MATERIAL UI
import { styled } from "@mui/system";
import {
  Typography,
  IconButton,
  Chip,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// OTHER
import NoThumbnail from "assets/no-thumbnail.png";

const ServiceCard = ({ service = {} }) => {
  const router = useRouter();

  const name = service.name || "Service Untitled";
  const description = service.description || "Service description goes here...";
  const cover = service.cover || NoThumbnail.src;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    router.push({ pathname: "/app/services/details", query: { id: 2 } });
  };

  return (
    <Container>
      <img
        className="cover"
        src={cover}
        alt="Picture of the author"
        sx={{ height: 200 }}
      />
      <Typography variant="h6" sx={{ mb: 1, mt: 3 }}>
        {name}
      </Typography>
      <Box
        className="description"
        sx={{ color: "#73839D" }}
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <BottomContainer>
        <Typography variant="h5">$58/hr</Typography>
        <div>
          <Chip label="Active" size="small" />
          <IconButton onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleClose}>Inactivate</MenuItem>
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleClose}>Delete</MenuItem>
          </Menu>
        </div>
      </BottomContainer>
    </Container>
  );
};

const Container = styled("div")({
  padding: 20,
  borderRadius: 16,
  background: "#FFFFFF",
  width: 354,
  height: 484,
  border: "1px solid #EFF1F5",

  "& .cover": {
    width: "100%",
    height: 200,
    objectFit: "cover",
    borderRadius: 10,
  },

  "& .description": {
    height: 80,
  },
});

const BottomContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 24,
});

export default ServiceCard;
