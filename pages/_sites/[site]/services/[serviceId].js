import { useEffect, useState, useContext } from "react";
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
import { ClientContext } from "contexts/ClientContext";
import { AppContext } from "contexts/AppContext";
import useService from "utils/useService";
import useUser from "utils/useUser";
import useServiceReq from "utils/useServiceReq";
import { useKeyPress, ARROW_DOWN, ARROW_UP } from "utils/useKeyPress";

const ServiceWizard = () => {
  const router = useRouter();
  const { businessRepo } = useContext(ClientContext);
  const { sessionRepo } = useContext(AppContext);
  const { business } = businessRepo;
  const { user, updateUser } = sessionRepo;
  const { service } = useService(router.query.serviceId);
  const { createServiceReq } = useServiceReq();
  const { createClientUser } = useUser();
  const isArrowDownPressed = useKeyPress(ARROW_DOWN);
  const isArrowUpPressed = useKeyPress(ARROW_UP);

  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionsIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState("questionnaire");

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

  const checkoutAction = async (checkoutFormData) => {
    const serviceReqData = {
      businessId: 2,
      surveyId: 1,
      orderStatusId: 1,
      answers: JSON.stringify(questions),
      additionalInfo: checkoutFormData,
    };

    if (user) {
      serviceReqData.userId = Number(user.id);
      const response = await createServiceReq(serviceReqData);
      router.push({
        pathname: "/orders/[orderId]",
        query: { orderId: response.id },
      });
    } else {
      await createServiceReq(serviceReqData);
      setCurrentStep("confimationPage");
    }
  };

  const displaySigninView = () => {
    setCurrentStep("signin");
  };

  const handleSignin = () => {
    /**
     * 1. get client user data
     * 2. store user data
     * 3. display checkout form again
     */
  };

  const handleSignup = async (data) => {
    const response = await createClientUser(data);
    // TODO: Handle error for email taken
    const user = response.data.createClient.user;
    updateUser(user);
    setCurrentStep("checkoutDetails");
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
        title={service.name}
        logo={business.logo}
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
              user={user}
              headline={business.additionalSettings.checkoutHeadline}
              message={business.additionalSettings.checkoutMessage}
              additionalQuestions={
                business.additionalSettings.checkoutAdditionalInfo
              }
              cta={{
                text: "Book Now",
                fn: checkoutAction,
              }}
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
              onSubmit={handleSignin}
            />
          )}
          {currentStep === "signup" && (
            <ClientSignup
              headline={business.additionalSettings.signUpHeadline}
              message={business.additionalSettings.signUpMessage}
              additionalQuestions={
                business.additionalSettings.signUpQuestionnaire
              }
              onSubmit={handleSignup}
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
