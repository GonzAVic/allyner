// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, Box, Button } from "@mui/material";

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
    case "SINGLE_SELECT":
      return (
        <ResponseMultipleChoice options={options} isMultiple={isMultiple} />
      );
    case "MULTIPLE_SELECT":
      return (
        <ResponseMultipleChoice options={options} isMultiple={isMultiple} />
      );
  }
};

const Question = ({ question, number, onNext }) => {
  const isMultiple = question.selectionType === "MULTIPLE";
  return (
    <Container>
      <Typography variant="h5">
        {number}. {question.title || "Title placeholder"}
        {question.isRequired && "*"}
      </Typography>
      {question.isDescriptionActive && (
        <Typography sx={{ mt: 1, color: "#73839D" }}>
          {question.description || "Description placeholder"}
        </Typography>
      )}
      {isMultiple && (
        <Typography variant="small" sx={{ mb: 2 }}>
          Select multiple
        </Typography>
      )}
      <Box sx={{ height: 16 }} />
      {renderAnswerComponent(question.questionType, question.options, isMultiple)}
      <Box className="row-2" sx={{ alignItems: "center" }}>
        <Button onClick={onNext}>OK</Button>
        <Typography>press Enter</Typography>
      </Box>
    </Container>
  );
};

const Container = styled(Box)({
  width: "100%",
});

export default Question;
