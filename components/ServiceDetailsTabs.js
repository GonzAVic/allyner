import { useRouter } from "next/router";

// MATERIAL UI
import { Button, Box } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const ServiceDetailsTabs = ({ currentStep, isNewService, serviceId }) => {
  const router = useRouter();
  return (
    <div>
      <Button
        variant={`tab${currentStep === "details" ? "-active" : ""}`}
        onClick={() =>
          router.push({
            pathname: "/app/services/details",
            query: { id: serviceId },
          })
        }
        startIcon={<CheckIcon />}
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
    </div>
  );
};

export default ServiceDetailsTabs;
