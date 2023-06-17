import { useState, useContext } from "react";
import { useRouter } from "next/router";

// MATERIAL UI
import { styled } from "@mui/system";
import {
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
import useService from "utils/useService";
import { AppContext } from "contexts/AppContext";

const ServiceCard = ({ service = {}, userType = "business", status }) => {
  const router = useRouter();
  const { modalRepo } = useContext(AppContext);

  const { updateService } = useService(service.id, {
    businessId: service.businessId,
  });

  const name = service.name || "[COPY] Default value";
  const description = service.description || "[COPY] Default value";
  const cover = service.cover || NoThumbnail.src;

  const [anchorEl, setAnchorEl] = useState(null);
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

  const activateService = async () => {
    await updateService({ isActive: true });
    location.reload();
  };

  const inactivateService = async () => {
    await updateService({ isActive: false });
    location.reload();
  };

  const handleDelete = () => {
    modalRepo.open("DeleteService", {
      serviceId: service.id,
    });
    handleClose();
  };

  const pricingInfo = () => {
    if (service.pricingType === 0)
      return <Typography variant="subtitle2">Contact For Pricing</Typography>;
    if (service.pricingType === 1)
      return <Typography variant="h5">${service.pricingAmount}/hr</Typography>;
    if (service.pricingType === 2)
      return <Typography variant="h5">${service.pricingAmount}</Typography>;
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
      <Typography
        className="description"
        sx={{ color: "#73839D", lineHeight: "24px" }}
      >
        {description}
      </Typography>
      {!status && (
        <PricintHelperText variant="body2" color="text.secondary">
          Starting At
        </PricintHelperText>
      )}
      <BottomContainer>
        {!status && pricingInfo()}
        {status && <Chip label={status} color="primary" />}
        {userType === "client" && !status && (
          <Button href={`/services/${service.id}`}>
            {service.callToAction || "Get Quote"}
          </Button>
        )}
        {userType === "business" && !status && (
          <div>
            <Chip
              label={service.isActive ? "Active" : "Inactive"}
              color={service.isActive ? "success" : "error"}
              size="small"
            />
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
              {service.isActive ? (
                <MenuItem onClick={inactivateService}>Inactivate</MenuItem>
              ) : (
                <MenuItem onClick={activateService}>activate</MenuItem>
              )}
              <MenuItem onClick={handleEdit}>Edit</MenuItem>
              <MenuItem onClick={handleDelete}>Delete</MenuItem>
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
  marginTop: 16,
  marginBottom: 12,
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
