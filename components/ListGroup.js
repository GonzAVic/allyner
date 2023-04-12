// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, Box } from "@mui/material";

const ListGroup = ({ data = [], sx = {} }) => {
  return (
    <Box sx={sx}>
      {data.map((d, index) => {
        return (
          <ListGroupItem key={index} className="list-group-item">
            <Typography>{d.label}</Typography>
            <Typography>{d.value}</Typography>
          </ListGroupItem>
        );
      })}
    </Box>
  );
};

const ListGroupItem = styled("div")({
  padding: "20px 32px",
  background: "#FFFFFF",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 16,
  borderTop: "2px solid #eff1f5",

  "&:first-child": {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderTop: "none",
  },

  "&:last-child": {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
});

export default ListGroup;
