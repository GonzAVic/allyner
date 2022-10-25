// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, Button } from "@mui/material";

const QuestionPreview = ({ previewData: question }) => {
  return (
    <Container>
      <Typography variant="h3">Preview</Typography>

      <QuestionContainer>
        <Typography variant="h2">{question.sentence}</Typography>
        <Typography>{question.description}</Typography>
      </QuestionContainer>
    </Container>
  );
};

const Container = styled("div")({
  background: "#F9F9FB",
  padding: 32,
  flex: 1,
});

const QuestionContainer = styled("div")({
  marginTop: 60,
});

export default QuestionPreview;
