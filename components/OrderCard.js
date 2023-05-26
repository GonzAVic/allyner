// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, Box, Chip } from "@mui/material";

const OrderCard = ({ serviceReq }) => {
  if (!serviceReq) return null;
  return (
    <Container>
      <Chip
        sx={{ position: "absolute", top: 24, right: 24 }}
        label={serviceReq.status}
        color="primary"
      />
      <Row>
        <div className="row-column">
          <img
            className="cover"
            src={serviceReq.frozenService.cover}
            alt="Picture of the author"
          />
        </div>
        <div>
          <Typography variant="h6">{serviceReq.frozenService.name}</Typography>
          <Typography color="text.secondary">
            {serviceReq.frozenService.description}
          </Typography>
        </div>
      </Row>
    </Container>
  );
};

const Container = styled("div")({
  position: "relative",
  background: "#FFFFFF",
  borderRadius: 12,
  padding: 24,
  marginBottom: 24,

  "& .cover": {
    width: "100%",
    height: 120,
    objectFit: "cover",
    borderRadius: 12,
  },

  "& .row-column": {
    width: 192,
  },
});

const Row = styled(Box)({
  display: "flex",
  gap: 32,
  maxWidth: "calc(100% - 100px)",
});

export default OrderCard;
