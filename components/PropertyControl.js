import { Box } from "@mui/system";

const PropertyControl = ({ children }) => {
  return (
    <Box className="space-between-centered" sx={{ mb: 1 }}>
      {children}
    </Box>
  );
};

export default PropertyControl;
