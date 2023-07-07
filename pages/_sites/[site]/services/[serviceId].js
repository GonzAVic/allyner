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
import { useKeyPress, ARROW_DOWN, ARROW_UP } from "utils/useKeyPress";

const ServiceWizard = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const businessRepo = useBusiness(null, { useBusinessName: true });

  const { business } = businessRepo;
  const { service } = useService(router.query.serviceId);
  const { createOrder } = useOrder(null, { businessId: business?.id });
  const isArrowDownPressed = useKeyPress(ARROW_DOWN);
  const isArrowUpPressed = useKeyPress(ARROW_UP);

  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionsIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState("questionnaire");
  const [shouldDisplayAlert, setShouldDisplayAlert] = useState(false);

  const currentQuestion = questions[questionIndex];

  const userId = session?.user?.id;

  useEffect(() => {
    if (!service) return;
    setQuestions(service.questionnaire);
  }, [service]);

  useEffect(() => {
    if (isArrowUpPressed) {
      handlePrevQuestion();
      return;
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

    setQuestionsIndex(questionIndex - 1);
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
    const userData = {
      email: data.email,
      password: data.password,
      firstname: data.firstname,
      lastname: data.lastname,
      businessId: "6483b7aa76172f4cb7a5d976",
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
        business={business}
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
