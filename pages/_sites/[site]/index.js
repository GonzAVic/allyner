// MATERIAL UI
import { Typography } from "@mui/material";

// COMPONENTS
import DefaultLayout from "components/layout/DefaultLayout";
import ServiceThumbnail from "components/service/ServiceThumbnail";

const Index = () => {
  return (
    <DefaultLayout
      title="Good Afternoon Kaenate"
      secondaryText="Welcome to Allyner technologies inc."
      userType="client"
    >
      <Typography variant="h2">Services</Typography>
      <ServiceThumbnail title="Product Managment" url="/services/12345" />
      <ServiceThumbnail title="Minimum Viable Prouct" />
    </DefaultLayout>
  );
};

export default Index;
