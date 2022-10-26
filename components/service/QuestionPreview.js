// MATERIAL UI
import { styled } from "@mui/system";
import { Typography } from "@mui/material";

// COMPONENTS
import ResponseShortText from "./ResponseShortText";
import ResponseLongText from "./ResponseLongText";
import ResponseDropdown from "./ResponseDropdown";
import ResponseDatePicker from "./ResponseDatePicker";
import ResponseTimePicker from "./ResponseTimePicker";
import ResponseFile from "./ResponseFile";
import ResponseMultipleChoice from "./ResponseMultipleChoice";

const renderAnswerComponent = (questionType, options) => {
  switch (questionType) {
    case "short text":
      return <ResponseShortText />;
    case "long text":
      return <ResponseLongText />;
    case "dropdown":
      return <ResponseDropdown options={options} />;
    case "date":
      return <ResponseDatePicker />;
    case "time":
      return <ResponseTimePicker />;
    case "file":
      return <ResponseFile />;
    case "multiple choice":
      return <ResponseMultipleChoice options={options} />;
  }
};

const QuestionPreview = ({ previewData: question = {} }) => {
  return (
    <Container>
      <Typography variant="h3">Preview</Typography>

      <QuestionContainer>
        <Typography variant="h2">
          {question.sentence || "Title placeholder"}
          {question.isRequired && "*"}
        </Typography>
        {question.withDescription && (
          <Typography sx={{ mb: 3 }}>
            {question.description || "Description placeholder"}
          </Typography>
        )}

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
