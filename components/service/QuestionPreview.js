// MATERIAL UI
import { styled } from "@mui/system";

// COMPONENTS
import PreviewContainer from "components/PreviewContainer";
import LayoutOne from "components/layout/LayoutOne";
import Question from "./Question";

const QuestionPreview = ({ previewData: question = {} }) => {
  return (
    <PreviewContainer>
      <LayoutOne>
        <Container>
          <Question question={question} number={1} />
        </Container>
      </LayoutOne>
    </PreviewContainer>
  );
};

const Container = styled("div")({
  display: "flex",
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
});

export default QuestionPreview;
