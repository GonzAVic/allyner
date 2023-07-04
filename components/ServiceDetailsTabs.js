import { useRouter } from "next/router";

// MATERIAL UI
import { Button, Box } from "@mui/material";

const ServiceDetailsTabs = ({ currentStep, isNewService, serviceId }) => {
  const router = useRouter();
  return (
    <Box sx={{ paddingBottom: 3, borderBottom: "1px solid #D4D9E6", mb: 3 }}>
      <Button
        variant={`tab${currentStep === "details" ? "-active" : ""}`}
        onClick={() =>
          router.push({
            pathname: "/app/services/details",
            query: { id: serviceId },
          })
        }
      >
        Details
      </Button>
      <Button
        variant={`tab${currentStep === "questionnaire" ? "-active" : ""}`}
        onClick={() =>
          router.push({
            pathname: "/app/services/in-take-questions",
            query: { id: serviceId },
          })
        }
        sx={{ ml: 2, mr: 2 }}
        disabled={isNewService}
      >
        In Take Quesitons
      </Button>
    </Box>
  );
};

export default ServiceDetailsTabs;
