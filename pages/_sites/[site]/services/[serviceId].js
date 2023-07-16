import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";

// MATERIAL UI
import { styled } from "@mui/system";
import { Box, Alert } from "@mui/material";

// COMPONENTS
import Question from "components/service/Question";
import LayoutOne from "components/layout/LayoutOne";
import CheckoutDetailsForm from "components/service/CheckoutDetailsForm";
import ServiceCheckout from "components/service/ServiceCheckout";
import ClientSignin from "components/ClientSignin";
import ClientSignup from "components/ClientSignup";

// OTHER
import useService from "utils/useService";
import useBusiness from "utils/useBusiness";
import useOrder from "utils/useOrder";
import { useKeyPress, ARROW_DOWN, ARROW_UP, ENTER } from "utils/useKeyPress";

const ServiceWizard = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const businessRepo = useBusiness(null, { useBusinessName: true });

  const { business } = businessRepo;
  const { service } = useService(router.query.serviceId);
  const { createOrder } = useOrder(null, { businessId: business?.id });
  const isArrowDownPressed = useKeyPress(ARROW_DOWN);
  const isArrowUpPressed = useKeyPress(ARROW_UP);
  const isEnterPressed = useKeyPress(ENTER);

  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionsIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState("questionnaire");
  const [shouldDisplayAlert, setShouldDisplayAlert] = useState(false);
  const [isSigninError, setIsSigninError] = useState(false);

  const currentQuestion = questions[questionIndex];

  const userId = session?.user?.id;

  useEffect(() => {
    if (!service) return;
    setQuestions(service.questionnaire);
  }, [service]);

  useEffect(() => {
    if (!isEnterPressed) return;
    handleNextQuestion();
  }, [isEnterPressed]);

  useEffect(() => {
    if (isArrowUpPressed) {
      if (questionIndex === 0) return;
      handlePrevQuestion();
    }
    if (
      currentQuestion &&
      currentQuestion.isRequired &&
      !Boolean(currentQuestion.answer)
    ) {
      setShouldDisplayAlert(true);
      return;
    }
    setShouldDisplayAlert(false);

    if (isArrowDownPressed) handleNextQuestion();
  }, [isArrowDownPressed, isArrowUpPressed]);

  const handleNextQuestion = () => {
    if (currentStep === "confimationPage") return;
    if (
      currentQuestion &&
      currentQuestion.isRequired &&
      !Boolean(currentQuestion.answer)
    ) {
      setShouldDisplayAlert(true);
      return;
    }
    setShouldDisplayAlert(false);

    if (questionIndex + 1 === questions.length) {
      setCurrentStep("checkoutDetails");
      return;
    }

    setQuestionsIndex(questionIndex + 1);
  };

  const handlePrevQuestion = () => {
    if (questionIndex === 0) return;
    if (currentStep === "confimationPage") return;

    if (
      questionIndex === questions.length - 1 &&
      currentStep !== "questionnaire"
    ) {
      setCurrentStep("questionnaire");
    } else {
      setQuestionsIndex(questionIndex - 1);
    }
  };

  const checkoutAction = async (checkoutFormData) => {
    const serviceReqData = {
      businessId: 2,
      answers: JSON.stringify(questions),
      additionalInfo: checkoutFormData,
      frozenService: JSON.stringify(service),
    };

    if (session) {
      serviceReqData.userId = userId;
      await createOrder(serviceReqData);
    } else {
      await createOrder(serviceReqData);
    }
    setCurrentStep("confimationPage");
  };

  const handleSignin = async (data) => {
    const userData = {
      email: data.email,
      password: data.password,
      businessId: business.id,
      userType: "CLIENT",
    };

    const res = await signIn("credentials", {
      redirect: false,
      email: JSON.stringify({ userData, action: "SIGNIN" }),
      password: "---",
    });

    if (res.error) setIsSigninError(true);
    if (!res.error) {
      setCurrentStep("checkoutDetails");
    }
  };

  const handleSignup = async (data) => {
    const userData = {
      email: data.email,
      password: data.password,
      firstname: data.firstname,
      lastname: data.lastname,
      businessId: business.id,
      userType: "CLIENT",
    };
    const res = await signIn("credentials", {
      redirect: false,
      email: JSON.stringify({ userData }),
      password: "---",
    });
    setCurrentStep("checkoutDetails");
  };

  const displaySignupView = () => {
    setCurrentStep("signup");
  };

  const displaySigninView = () => {
    setCurrentStep("signin");
  };

  const onResponse = (questionIndex, answer) => {
    const quesitonsString = JSON.stringify(questions);
    const quesitonsParsed = JSON.parse(quesitonsString);
    quesitonsParsed[questionIndex].answer = answer;

    setQuestions(quesitonsParsed);
  };

  const stepNumber = () => {
    if (currentStep === "questionnaire") {
      return questionIndex + 1;
    }
    if (currentStep === "checkoutDetails") return questionIndex + 1 + 1;
    if (currentStep === "confimationPage") return questionIndex + 1 + 2;
  };

  if (!business || !service) return "Loading data...";
  return (
    <Box sx={{ height: "75vh", flex: 1, display: "flex" }}>
      <LayoutOne
        title={service.name}
        business={business}
        onArrowDown={handleNextQuestion}
        onArrowUp={
          currentStep === "questionnaire" && questionIndex === 0
            ? null
            : handlePrevQuestion
        }
        progressValue={(stepNumber() * 100) / (questions.length + 2)}
        shouldDisplayActions={
          currentStep === "questionnaire" || currentStep === "checkoutDetails"
        }
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
          {shouldDisplayAlert && (
            <Alert severity="error" sx={{ mt: 2, width: "100%" }}>
              Please fill this in
            </Alert>
          )}
          {currentStep === "checkoutDetails" && (
            <CheckoutDetailsForm
              userId={userId}
              headline={business.additionalData.checkoutHeadline}
              message={business.additionalData.checkoutMessage}
              additionalQuestions={
                business.additionalData.checkoutAdditionalInfo
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
              headline={business.additionalData.confirmationHeadline}
              message={business.additionalData.confirmationMessage}
              user={session?.user}
            />
          )}
          {currentStep === "signin" && (
            <ClientSignin
              headline={business.additionalData.signInHeadline}
              message={business.additionalData.signInMessage}
              isDisplayError={isSigninError}
              onSignup={displaySignupView}
              onSubmit={handleSignin}
            />
          )}
          {currentStep === "signup" && (
            <ClientSignup
              headline={business.additionalData.signUpHeadline}
              message={business.additionalData.signUpMessage}
              additionalQuestions={business.additionalData.signUpQuestionnaire}
              onSubmit={handleSignup}
              onSignin={displaySigninView}
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
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: "#FFFFFF",
  borderRadius: 24,
  margin: "auto",
  padding: 32,
});

export default ServiceWizard;
