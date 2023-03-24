import React, { useState } from "react";
import { useRouter } from "next/router";

// MATERIAL UI
import { Button, Divider } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

// COMPONENTS
import DefaultLayout from "components/layout/DefaultLayout";
import ServiceDetailsForm from "components/service/ServiceDetailsForm";
import ServiceQuestionnaire from "components/service/ServiceQuestionnaire";
import PreviewLayout from "components/layout/PreviewLayout";
import ServiceCard from "components/service/ServiceCard";
import Question from "components/service/Question";

// OTHERS
import useService from "utils/useService";

const displayStep = (step) => {
  const steps = {
    details: {
      form: <ServiceDetailsForm />,
      preview: <ServiceCard />,
    },
    questionnaire: {
      form: <ServiceQuestionnaire />,
      preview: <Question />,
    },
  };
  return steps[step];
};

const NewService = () => {
  const router = useRouter();
  const { service } = useService(router.query.id);

  const [previewData, setPreviewData] = useState({});
  const [currentStep, setCurrentStep] = useState("details");
  const [diffBannerData, setDiffBannerData] = useState({}); // { onSave, onDiscard, isVisible }

  const isNewService = router.query.id === "new";

  const updatePreviewData = (data) => {
    setPreviewData(data);
  };

  const updateDiffBanner = (newData) => {
    setDiffBannerData(newData);
  };

  const title = () => {
    if (previewData.name !== undefined) {
      return previewData.name || "Service name";
    }
    return service ? service.name || "Service name" : "Service name";
  };

  return (
    <DefaultLayout
      title={title()}
      diffBanner={{
        onDiscard: diffBannerData.onDiscard,
        onSave: diffBannerData.onSave,
        isVisible: diffBannerData.isVisible,
      }}
    >
      <div>
        <Button
          variant={`tab${currentStep === "details" ? "-active" : ""}`}
          onClick={() => setCurrentStep("details")}
          startIcon={<CheckIcon />}
        >
          Details
        </Button>
        <Button
          variant={`tab${currentStep === "questionnaire" ? "-active" : ""}`}
          onClick={() => setCurrentStep("questionnaire")}
          sx={{ ml: 2, mr: 2 }}
          disabled={isNewService}
        >
          In Take Quesitons
        </Button>
      </div>
      <Divider sx={{ mb: 3, mt: 3 }} />

      <PreviewLayout
        previewComponent={React.cloneElement(displayStep(currentStep).preview, {
          service: previewData,
          question: previewData,
          number: 1,
        })}
      >
        {React.cloneElement(displayStep(currentStep).form, {
          updatePreviewData,
          updateDiffBanner,
          serviceId: router.query.id,
        })}
      </PreviewLayout>
    </DefaultLayout>
  );
};

export default NewService;
