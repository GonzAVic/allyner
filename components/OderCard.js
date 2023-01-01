// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, Box } from "@mui/material";

const OderCard = () => {
  return (
    <Container>
      <Row sx={{ mb: 4 }}>
        <div className="row-column">
          <img
            className="cover"
            src={"https://images.unsplash.com/photo-1661956601030-fdfb9c7e9e2f"}
            alt="Picture of the author"
          />
        </div>
        <div>
          <Typography variant="h6">Product Management</Typography>
          <Typography color="text.secondary">
            Lorem ipsum dolor siamet, putra a etra maser tu sonic tkoalsdf
            malapa kanga patamb23 adasdf
          </Typography>
        </div>
      </Row>
      <Row>
        <div className="row-column">
          <Typography color="text.secondary" sx={{ mb: 1 }}>
            Order number
          </Typography>
          <Typography variant="subtitle1">#12345</Typography>
        </div>
        <div className="row-column">
          <Typography color="text.secondary" sx={{ mb: 1 }}>
            Customer Name
          </Typography>
          <Typography variant="subtitle1">Alwi Hesa</Typography>
        </div>
        <div className="row-column">
          <Typography color="text.secondary" sx={{ mb: 1 }}>
            Created Date
          </Typography>
          <Typography variant="subtitle1">
            Sun, Dec 18 2022 / 8.45 AM
          </Typography>
        </div>
      </Row>
    </Container>
  );
};

const Container = styled("div")({
  background: "#FFFFFF",
  borderRadius: 12,
  padding: 24,

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
});

export default OderCard;
