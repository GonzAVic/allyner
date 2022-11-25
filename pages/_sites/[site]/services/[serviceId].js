import { useRouter } from "next/router";

// MATERIAL UI
import { styled } from "@mui/system";
import { Typography } from "@mui/material";

// COMPONENTS
import QuestionPreview from "components/service/QuestionPreview";
import LayoutOne from "components/layout/LayoutOne";

const ServiceWizard = () => {
  const router = useRouter();
  console.log("-> router: ", router);
  const { serviceId } = router.query;

  const question = {
    sentence: "Lorem ipsum title",
    description: "Lorem ipsum description",
    type: "MULTIPLE",
    withDescription: true,
    isRequired: true,
    options: ["option 1", "option 2"],
  };

  const isMultiple = question.selectionType === "MULTIPLE";

  return (
    <LayoutOne>
      <Container>
        <Typography variant="h2">
          {question.sentence || "Title placeholder"}
          {question.isRequired && "*"}
        </Typography>
        {question.withDescription && (
          <Typography sx={{ mb: 3 }}>
            {question.description || "Description placeholder"}
          </Typography>
        )}
        {isMultiple && (
          <Typography variant="small" sx={{ mb: 2 }}>
            Select multiple
          </Typography>
        )}
      </Container>
    </LayoutOne>
  );
};

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
});

export default ServiceWizard;
