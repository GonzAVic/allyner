import { useRouter } from "next/router";

// MATERIAL UI
import { Button, Box } from "@mui/material";

const ServicesTabs = ({ currentTab }) => {
  const router = useRouter();

  return (
    <Box sx={{ paddingBottom: 3, borderBottom: "1px solid #D4D9E6", mb: 3 }}>
      <Button
        variant={`tab${
          router.pathname.includes("service-booking") ? "-active" : ""
        }`}
        href="/app/services/service-booking"
      >
        Order Status
      </Button>
      <Button
        variant={`tab${
          router.pathname.includes("checkout-details") ? "-active" : ""
        }`}
        href="/app/services/checkout-details"
        sx={{ ml: 1, mr: 1 }}
      >
        Checkout Details
      </Button>
      <Button
        variant={`tab${
          router.pathname.includes("confirmation-page") ? "-active" : ""
        }`}
        href="/app/services/confirmation-page"
      >
        Order Confirmation Page
      </Button>
    </Box>
  );
};

export default ServicesTabs;
