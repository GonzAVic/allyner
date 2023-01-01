// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, Box } from "@mui/material";

// COMPONENTS
import ResponseShortText from "./ResponseShortText";
import ResponseLongText from "./ResponseLongText";
import ResponseDropdown from "./ResponseDropdown";
import ResponseDatePicker from "./ResponseDatePicker";
import ResponseFile from "./ResponseFile";
import ResponseMultipleChoice from "./ResponseMultipleChoice";
import ResponsePictureChoice from "./ResponsePictureChoice";

const renderAnswerComponent = (questionType, options, isMultiple) => {
  switch (questionType) {
    case "SHORT_TEXT":
      return <ResponseShortText />;
    case "LONG_TEXT":
      return <ResponseLongText />;
    case "DROPDOWN":
      return <ResponseDropdown options={options} />;
    case "DATE":
      return <ResponseDatePicker />;
    case "FILE":
      return <ResponseFile />;
    case "PICTURE":
      return <ResponsePictureChoice options={options} />;
    case "MULTIPLE":
      return (
        <ResponseMultipleChoice options={options} isMultiple={isMultiple} />
      );
  }
};

const Question = ({ question, number }) => {
  const isMultiple = question.selectionType === "MULTIPLE";
  return (
    <Container>
      <Typography variant="h5">
        {number}. {question.sentence || "Title placeholder"}
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

      {renderAnswerComponent(question.type, question.options, isMultiple)}
    </Container>
  );
};

const Container = styled(Box)({});

export default Question;
