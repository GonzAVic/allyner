import React from "react";
import { useRouter } from "next/router";

// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, IconButton, Chip, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ServiceCard = ({ service = {} }) => {
  const router = useRouter();

  const {
    title = "Service Untitled",
    description = "Service description goes here...",
  } = service;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    router.push({ pathname: "/app/services/overview", query: { id: 3 } });
  };

  return (
    <Container>
      <img
        className="cover"
        src={"https://images.unsplash.com/photo-1661956601030-fdfb9c7e9e2f"}
        alt="Picture of the author"
      />
      <Typography variant="h6" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Typography className="description" sx={{ color: "#73839D" }}>
        {description}
      </Typography>
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
  border: "1px solid #EFF1F5",

  "& .cover": {
    width: "100%",
    height: 200,
    objectFit: "cover",
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
