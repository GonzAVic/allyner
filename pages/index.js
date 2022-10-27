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

const displayStep = (step) => {
  const steps = {
    details: {
      form: <ServiceDetailsForm />,
      preview: <ServicePreview />,
    },
    questionnaire: {
      form: <ServiceQuestionnaire />,
      preview: <QuestionPreview />
    }
  };
  return steps[step];
};

export default function Home() {
  const [previewData, setPreviewData] = useState({});

  const updatePreviewData = (data) => {
    setPreviewData(data);
  };

  return (
    <DefaultLayout title={"Service name"}>
      <Button variant="secondary">Details</Button>
      <Button variant="secondary" sx={{ ml: 2, mr: 2 }}>
        In Take Quesitons
      </Button>
      <Button variant="secondary">Booking</Button>
      <Container>
        <LeftSide>
          {React.cloneElement(displayStep("questionnaire").form, {
            updatePreviewData,
          })}
        </LeftSide>

        <RightSide>
          {React.cloneElement(displayStep("questionnaire").preview, {
            previewData,
          })}
        </RightSide>
      </Container>
    </DefaultLayout>
  );
}

const Container = styled("div")({
  marginTop: 16,
  borderRadius: 12,
  border: "1px solid #DCDFEA",
  display: "flex",
  overflow: "hidden",
});

const LeftSide = styled("div")({
  padding: 16,
  flex: 1,
});

const RightSide = styled("div")({
  flex: 1,
  borderLeft: "1px solid #DCDFEA",
});
