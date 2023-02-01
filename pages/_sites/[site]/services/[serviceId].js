import { useRouter } from "next/router";

// MATERIAL UI
import { styled } from "@mui/system";
import { Box } from "@mui/material";

// COMPONENTS
import Question from "components/service/Question";
import LayoutOne from "components/layout/LayoutOne";

const ServiceWizard = () => {
  const router = useRouter();

  const question = {
    sentence: "Lorem ipsum title",
    description: "Lorem ipsum description",
    type: "MULTIPLE",
    isDescriptionActive: true,
    isRequired: true,
    options: ["option 1", "option 2"],
  };

  return (
    <Box sx={{ height: "75vh", flex: 1, display: "flex" }}>
      <LayoutOne>
        <Container>
          <Question question={question} number={1} />
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

export default ServiceWizard;
