import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLazyQuery } from "@apollo/client";

// MATERIAL UI
import { styled } from "@mui/system";
import { Box } from "@mui/material";

// COMPONENTS
import Question from "components/service/Question";
import LayoutOne from "components/layout/LayoutOne";
import CheckoutDetailsForm from "components/service/CheckoutDetailsForm";
import ServiceCheckout from "components/service/ServiceCheckout";

// OTHER
import useBusiness from "utils/useBusiness";
import useService from "utils/useService";
import useServiceReq from "utils/useServiceReq";
import { useKeyPress, ARROW_DOWN, ARROW_UP } from "utils/useKeyPress";
import { LIST_QUESTIONS } from "graphql/apiql";

const ServiceWizard = () => {
  const router = useRouter();
  const { business } = useBusiness();
  const { service } = useService(1);
  const { createServiceReq } = useServiceReq();
  const isArrowDownPressed = useKeyPress(ARROW_DOWN);
  const isArrowUpPressed = useKeyPress(ARROW_UP);

  // TODO: REMOVE this and use the useService code
  const [listQuestionsFn, listQuestionsHpr] = useLazyQuery(LIST_QUESTIONS);

  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionsIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState("questionnaire");

  useEffect(() => {
    if (!router.query.serviceId) return;
    listQuestionsFn({
      variables: {
        serviceId: router.query.serviceId,
      },
    });
  }, [router.query.serviceId]);

  useEffect(() => {
    if (!listQuestionsHpr.called) return;
    if (!listQuestionsHpr.data) return;

    setQuestions([
      question,
      question2,
      question3,
      question4,
      // question5,
      question6,
    ]);
  }, [listQuestionsHpr]);

  useEffect(() => {
    if (isArrowUpPressed) handlePrevQuestion();
    if (isArrowDownPressed) handleNextQuestion();
  }, [isArrowDownPressed, isArrowUpPressed]);

  const handleNextQuestion = () => {
    if (questionIndex + 1 === questions.length) {
      setCurrentStep("checkoutDetails");
      createServiceReq({
        businessId: 1,
        surveyId: 1,
        userId: 2,
        orderStatusId: 1,
        additionalInfo: JSON.stringify(questions),
      });
      return;
    }

    setQuestionsIndex(questionIndex + 1);
  };

  const handlePrevQuestion = () => {
    if (questionIndex === 0) return;

    setQuestionsIndex(questionIndex - 1);
  };

  const handleCheckoutAction = () => {
    setCurrentStep("confimationPage");
  };

  const onResponse = (questionIndex, answer) => {
    const quesitonsString = JSON.stringify(questions);
    const quesitonsParsed = JSON.parse(quesitonsString);
    quesitonsParsed[questionIndex].answer = answer;

    setQuestions(quesitonsParsed);
  };

  if (!business) return "Loading business...";
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
              cta={{ text: "Book Now", fn: handleCheckoutAction }}
            />
          )}
          {currentStep === "confimationPage" && (
            <ServiceCheckout
              headline={business.additionalSettings.confirmationHeadline}
              message={business.additionalSettings.confirmationMessage}
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

const question = {
  title: "How many pets do you have?",
  description: "This is a random description",
  questionType: "MULTIPLE_SELECT",
  isDescriptionActive: true,
  isRequired: true,
  options: [
    "I have 1 pet",
    "I have more than 4 pets",
    "I have more than 10 pets",
  ],
};
const question2 = {
  title: "What is the name of your firts pet?",
  description: "Another random description (This quesiton is not required)",
  questionType: "SHORT_TEXT",
  isDescriptionActive: true,
  isRequired: false,
};
const question3 = {
  title: "What is the name of your firts pet?",
  description: "Another random description (This quesiton is not required)",
  questionType: "LONG_TEXT",
  isDescriptionActive: true,
  isRequired: false,
};
const question4 = {
  title: "What is the name of your firts pet?",
  description: "Another random description (This quesiton is not required)",
  questionType: "DROPDOWN",
  isDescriptionActive: true,
  isRequired: false,
  options: [
    "I have 1 pet",
    "I have more than 4 pets",
    "I have more than 10 pets",
  ],
};
const question5 = {
  title: "What is the name of your firts pet?",
  description: "Another random description (This quesiton is not required)",
  questionType: "DATE",
  isDescriptionActive: true,
  isRequired: false,
};
const question6 = {
  title: "What is the name of your firts pet?",
  description: "Another random description (This quesiton is not required)",
  questionType: "SINGLE_SELECT",
  isDescriptionActive: true,
  isRequired: false,
  options: [
    "I have 1 pet",
    "I have more than 4 pets",
    "I have more than 10 pets",
  ],
};

export default ServiceWizard;
