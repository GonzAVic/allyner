import { useRouter } from "next/router";

// MATERIAL UI
import { styled } from "@mui/system";

// COMPONENTS
import Question from "components/service/Question";
import LayoutOne from "components/layout/LayoutOne";

const ServiceWizard = () => {
  const router = useRouter();

  const question = {
    sentence: "Lorem ipsum title",
    description: "Lorem ipsum description",
    type: "MULTIPLE",
    withDescription: true,
    isRequired: true,
    options: ["option 1", "option 2"],
  };

  return (
    <LayoutOne>
      <Container>
        <Question question={question} />
      </Container>
    </LayoutOne>
  );
};

const Container = styled("div")({
  display: "flex",
  background: "#FFFFFF",
  width: "calc(100vw - 200px)",
  height: "calc(100vh - 250px)",
  borderRadius: 24,
  margin: "auto",
  padding: 32,
});

export default ServiceWizard;
