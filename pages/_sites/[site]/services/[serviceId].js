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

const ServiceWizard = () => {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionsIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState("questionnaire");

  useEffect(() => {
    setQuestions([question, question2]);
  }, []);

  const handleNextQuestion = () => {
    if (questionIndex + 1 === questions.length) {
      setCurrentStep("checkoutDetails");
      return;
    }

    setQuestionsIndex(questionIndex + 1);
  };

  const handleCheckoutAction = () => {
    setCurrentStep("confimationPage");
  };

  return (
    <Box sx={{ height: "75vh", flex: 1, display: "flex" }}>
      <LayoutOne>
        <Container>
          {currentStep === "questionnaire" && questions.length > 0 && (
            <Question
              question={questions[questionIndex]}
              number={questionIndex + 1}
              onNext={handleNextQuestion}
            />
          )}
          {currentStep === "checkoutDetails" && (
            <CheckoutDetailsForm
              cta={{ text: "Book Now", fn: handleCheckoutAction }}
            />
          )}
          {currentStep === "confimationPage" && <ServiceCheckout />}
        </Container>
      </LayoutOne>
    </Box>
  );
};

const Container = styled("div")({
  display: "flex",
  flex: 1,
  alignItems: "center",
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

export default ServiceWizard;
