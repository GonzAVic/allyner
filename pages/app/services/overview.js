import React, { useState } from "react";
import { useRouter } from "next/router";

// MATERIAL UI
import { styled } from "@mui/system";
import { Button, Divider } from "@mui/material";

// COMPONENTS
import ServicePreview from "components/service/ServicePreview";
import DefaultLayout from "components/layout/DefaultLayout";
import ServiceDetailsForm from "components/service/ServiceDetailsForm";
import ServiceQuestionnaire from "components/service/ServiceQuestionnaire";
import QuestionPreview from "components/service/QuestionPreview";
import CheckoutForm from "components/service/CheckoutForm";
import CheckoutPreview from "components/service/CheckoutPreview";

const displayStep = (step) => {
  const steps = {
    details: {
      form: <ServiceDetailsForm />,
      preview: <ServicePreview />,
    },
    questionnaire: {
      form: <ServiceQuestionnaire />,
      preview: <QuestionPreview />,
    },
    checkout: {
      form: <CheckoutForm />,
      preview: <CheckoutPreview />,
    },
  };
  return steps[step];
};

const NewService = () => {
  const router = useRouter();

  const [previewData, setPreviewData] = useState({});
  const [currentStep, setCurrentStep] = useState("details");
  const [ctaData, setCtaData] = useState({});

  const isNewService = router.query.id === "new";

  const updatePreviewData = (data) => {
    setPreviewData(data);
  };

  const updateCta = (newData) => {
    setCtaData(newData);
  };

  return (
    <DefaultLayout
      title={"Service name"}
      cta={{
        text: isNewService ? "Create" : "save",
        withNoIcon: true,
        ...ctaData,
      }}
    >
      <div>
        <Button variant="secondary" onClick={() => setCurrentStep("details")}>
          Details
        </Button>
        <Button
          variant="secondary"
          onClick={() => setCurrentStep("questionnaire")}
          sx={{ ml: 2, mr: 2 }}
          disabled={isNewService}
        >
          In Take Quesitons
        </Button>
        <Button
          variant="secondary"
          onClick={() => setCurrentStep("checkout")}
          disabled={isNewService}
        >
          Booking
        </Button>
      </div>
      <Divider sx={{ mb: 3, mt: 3 }} />
      <Container>
        <LeftSide>
          <Pedro>
            {React.cloneElement(displayStep(currentStep).form, {
              updatePreviewData,
              updateCta,
              serviceId: router.query.id,
            })}
          </Pedro>
        </LeftSide>

        <RightSide>
          {React.cloneElement(displayStep(currentStep).preview, {
            previewData,
          })}
        </RightSide>
      </Container>
    </DefaultLayout>
  );
};

const Container = styled("div")({
  display: "flex",
  gap: 32,
  flex: 1,
  overflowY: "auto",
  overflowX: "hidden",
});

const LeftSide = styled("div")({
  flex: 1,
  overflowY: "auto",
  overflowX: "hidden",
});

const Pedro = styled("div")({
  overflow: "auto",
});

const RightSide = styled("div")({
  display: "flex",
  flex: 1,
});

export default NewService;
