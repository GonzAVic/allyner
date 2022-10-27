import React, { useState } from "react";

// MATERIAL UI
import { styled } from "@mui/system";
import { Button } from "@mui/material";

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
  const [previewData, setPreviewData] = useState({});
  const [currentStep, setCurrentStep] = useState("details");
  const [ctaData, setCtaData] = useState({});

  const updatePreviewData = (data) => {
    setPreviewData(data);
  };

  const updateCta = (newData) => {
    setCtaData(newData);
  };

  return (
    <DefaultLayout
      title={"Service name"}
      cta={{ text: "Save", withNoIcon: true, ...ctaData }}
    >
      <div>
        <Button variant="secondary" onClick={() => setCurrentStep("details")}>
          Details
        </Button>
        <Button
          variant="secondary"
          onClick={() => setCurrentStep("questionnaire")}
          sx={{ ml: 2, mr: 2 }}
        >
          In Take Quesitons
        </Button>
        <Button variant="secondary" onClick={() => setCurrentStep("checkout")}>
          Booking
        </Button>
      </div>
      <Container>
        <LeftSide>
          <Pedro>
            {React.cloneElement(displayStep(currentStep).form, {
              updatePreviewData,
              updateCta,
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
  marginTop: 16,
  borderRadius: 12,
  border: "1px solid #DCDFEA",
  display: "flex",
  flex: 1,
  overflowY: "auto",
  overflowX: "hidden",
});

const LeftSide = styled("div")({
  padding: 16,
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
  borderLeft: "1px solid #DCDFEA",
});

export default NewService;
