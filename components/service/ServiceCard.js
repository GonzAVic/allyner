import React from "react";
import { useRouter } from "next/router";

// MATERIAL UI
import { styled } from "@mui/system";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// OTHER
import NoThumbnail from "assets/no-thumbnail.png";

const ServiceCard = ({ service = {}, userType = "business" }) => {
  const router = useRouter();

  const name = service.name || "[COPY] Default value";
  const description = service.description || "[COPY] Default value";
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
    router.push({
      pathname: "/app/services/details",
      query: { id: service.id },
    });
  };

  return (
    <Container>
      <img
        className="cover"
        src={cover}
        alt="Picture of the author"
        sx={{ height: 200 }}
      />
      <ServiceName variant="h6">{name}</ServiceName>
      <Box
        className="description"
        sx={{ color: "#73839D" }}
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <PricintHelperText variant="body2" color="text.secondary">
        Starting At
      </PricintHelperText>
      <BottomContainer>
        <Typography variant="h5">$58/hr</Typography>
        {userType === "client" ? (
          <Button href={`/services/${service.id}`}>Get Quote</Button>
        ) : (
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
        )}
      </BottomContainer>
    </Container>
  );
};

const Container = styled("div")({
  position: "relative",
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
    lineHeight: "24px",
    height: 76,
    overflow: "hidden",
    display: "-webkit-box",
    "-webkit-line-clamp": "3",
    "-webkit-box-orient": "vertical",
  },
});

const ServiceName = styled(Typography)({
  marginTop: 24,
  marginBottom: 16,
  maxHeight: 78,
  overflow: "hidden",
  display: "-webkit-box",
  "-webkit-line-clamp": "3",
  "-webkit-box-orient": "vertical",
});

const BottomContainer = styled("div")({
  position: "absolute",
  bottom: 20,
  left: 20,
  width: "calc(100% - 40px)",

  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 24,
});

const PricintHelperText = styled(Typography)({
  position: "absolute",
  bottom: 55,
  left: 20,
});

export default ServiceCard;
