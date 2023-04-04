import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// MATERIAL UI
import { styled } from "@mui/system";
import { Box } from "@mui/material";

// COMPONENTS
import Question from "components/service/Question";
import LayoutOne from "components/layout/LayoutOne";
import CheckoutDetailsForm from "components/service/CheckoutDetailsForm";
import ServiceCheckout from "components/service/ServiceCheckout";
import ClientSignin from "components/ClientSignin";
import ClientSignup from "components/ClientSignup";

// OTHER
import useBusiness from "utils/useBusiness";
import useService from "utils/useService";
import useServiceReq from "utils/useServiceReq";
import { useKeyPress, ARROW_DOWN, ARROW_UP } from "utils/useKeyPress";

const USER = false;

const ServiceWizard = () => {
  const router = useRouter();
  const { business } = useBusiness();
  const { service } = useService(router.query.serviceId);
  const { createServiceReq } = useServiceReq();
  const isArrowDownPressed = useKeyPress(ARROW_DOWN);
  const isArrowUpPressed = useKeyPress(ARROW_UP);

  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionsIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState("questionnaire");

  console.log("-> business: ", business);

  useEffect(() => {
    if (!service) return;
    setQuestions(service.questionsInfo);
  }, [service]);

  useEffect(() => {
    if (isArrowUpPressed) handlePrevQuestion();
    if (isArrowDownPressed) handleNextQuestion();
  }, [isArrowDownPressed, isArrowUpPressed]);

  const handleNextQuestion = () => {
    if (questionIndex + 1 === questions.length) {
      setCurrentStep("checkoutDetails");
      return;
    }

    setQuestionsIndex(questionIndex + 1);
  };

  const handlePrevQuestion = () => {
    if (questionIndex === 0) return;

    setQuestionsIndex(questionIndex - 1);
  };

  const handleCheckoutAction = (data) => {
    createServiceReq({
      businessId: 1,
      surveyId: 1,
      userId: 2,
      orderStatusId: 1,
      answers: JSON.stringify(questions),
      additionalInfo: data,
    });
  };

  const displaySigninView = () => {
    setCurrentStep("signin");
  };

  const displaySignupView = () => {
    setCurrentStep("signup");
  };

  const onResponse = (questionIndex, answer) => {
    const quesitonsString = JSON.stringify(questions);
    const quesitonsParsed = JSON.parse(quesitonsString);
    quesitonsParsed[questionIndex].answer = answer;

    setQuestions(quesitonsParsed);
  };

  if (!business || !service) return "Loading data...";
  return (
    <Box sx={{ height: "75vh", flex: 1, display: "flex" }}>
      <LayoutOne
        onArrowDown={handleNextQuestion}
        onArrowUp={handlePrevQuestion}
        progressValue={(questionIndex * 100) / questions.length}
      >
        <Container>
          {currentStep === "questionnaire" && questions.length > 0 && (
            <Question
              question={questions[questionIndex]}
              questionIndex={questionIndex}
              onNext={handleNextQuestion}
              onResponse={onResponse}
            />
          )}
          {currentStep === "checkoutDetails" && (
            <CheckoutDetailsForm
              headline={business.additionalSettings.checkoutHeadline}
              message={business.additionalSettings.checkoutMessage}
              additionalQuestions={
                business.additionalSettings.checkoutAdditionalInfo
              }
              cta={{ text: "Book Now", fn: handleCheckoutAction }}
              onLogin={displaySigninView}
            />
          )}
          {currentStep === "confimationPage" && (
            <ServiceCheckout
              headline={business.additionalSettings.confirmationHeadline}
              message={business.additionalSettings.confirmationMessage}
            />
          )}
          {currentStep === "signin" && (
            <ClientSignin
              headline={business.additionalSettings.signInHeadline}
              message={business.additionalSettings.signInMessage}
              onSignup={displaySignupView}
            />
          )}
          {currentStep === "signup" && (
            <ClientSignup
              headline={business.additionalSettings.signUpHeadline}
              message={business.additionalSettings.signUpMessage}
              additionalQuestions={
                business.additionalSettings.signUpQuestionnaire
              }
              onSignup={displaySignupView}
            />
          )}
        </Container>
      </LayoutOne>
    </Box>
  );
};

const Container = styled("div")({
  display: "flex",
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  background: "#FFFFFF",
  borderRadius: 24,
  margin: "auto",
  padding: 32,
});

export default ServiceWizard;
