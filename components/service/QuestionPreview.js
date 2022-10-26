// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, TextField, MenuItem } from "@mui/material";

const renderAnswerComponent = (questionType, options) => {
  switch (questionType) {
    case "short text":
      return <TextField />;
    case "long text":
      return <TextField rows={5} maxRows={5} multiline />;
    case "dropdown":
      return (
        <TextField select>
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      );
  }
};

const QuestionPreview = ({ previewData: question }) => {
  return (
    <Container>
      <Typography variant="h3">Preview</Typography>

      <QuestionContainer>
        <Typography variant="h2">
          {question.sentence}{question.isRequired && "*"}
        </Typography>
        <Typography sx={{ mb: 3 }}>{question.description}</Typography>

        {renderAnswerComponent(question.type, question.options)}
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
