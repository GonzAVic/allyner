// MATERIAL UI
import { Typography } from "@mui/material";

// COMPONENTS
import DefaultLayout from "components/layout/DefaultLayout";
import ServiceCard from "components/service/ServiceCard";

const Index = () => {
  return (
    <DefaultLayout
      title="Good Afternoon Kaenate"
      secondaryText="Welcome to Allyner technologies inc."
      userType="client"
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        Check our services
      </Typography>
      <div className="service-cards-list-ctr">
        <ServiceCard userType="client" />
        <ServiceCard userType="client" />
        <ServiceCard userType="client" />
      </div>
    </DefaultLayout>
  );
};

export default Index;
