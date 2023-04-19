import { useState } from "react";

// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, Box, Button, Alert } from "@mui/material";

// COMPONENTS
import ResponseShortText from "./ResponseShortText";
import ResponseLongText from "./ResponseLongText";
import ResponseDropdown from "./ResponseDropdown";
import ResponseDatePicker from "./ResponseDatePicker";
import ResponseFile from "./ResponseFile";
import ResponseMultipleChoice from "./ResponseMultipleChoice";
import ResponsePictureChoice from "./ResponsePictureChoice";
import ResponseSingleSelect from "./ResponseSingleSelect";

const Question = ({ question, questionIndex, onNext, onResponse }) => {
  const [shouldDisplayAlert, setShouldDisplayAlert] = useState(false);

  const handleOnNext = () => {
    if (question.isRequired && !Boolean(question.answer)) {
      setShouldDisplayAlert(true);
      return;
    }

    setShouldDisplayAlert(false);
    onNext();
  };

  const isMultiple = question.selectionType === "MULTIPLE";
  return (
    <Container>
      <Typography variant="h5">
        {questionIndex + 1}. {question.title || "Title placeholder"}
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
      {renderAnswerComponent(questionIndex, question, isMultiple, onResponse)}
      {shouldDisplayAlert && (
        <Alert severity="error" sx={{ mt: 1 }}>
          [COPY] {question.title} is a required field.
        </Alert>
      )}
      <Box className="row-2" sx={{ alignItems: "center", mt: 2 }}>
        <Button onClick={handleOnNext}>OK</Button>
        <Typography>press Enter</Typography>
      </Box>
    </Container>
  );
};

const Container = styled(Box)({
  width: "100%",
});

const renderAnswerComponent = (
  questionIndex,
  question,
  isMultiple,
  onResponse
) => {
  switch (question.type) {
    case "SHORT_TEXT":
      return (
        <ResponseShortText
          onResponse={onResponse}
          questionIndex={questionIndex}
          question={question}
        />
      );
    case "LONG_TEXT":
      return (
        <ResponseLongText
          onResponse={onResponse}
          questionIndex={questionIndex}
          question={question}
        />
      );
    case "DROPDOWN":
      return (
        <ResponseDropdown
          options={question.options}
          onResponse={onResponse}
          questionIndex={questionIndex}
          question={question}
        />
      );
    case "DATE":
      return (
        <ResponseDatePicker
          onResponse={onResponse}
          questionIndex={questionIndex}
          question={question}
        />
      );
    case "FILE":
      return (
        <ResponseFile
          onResponse={onResponse}
          questionIndex={questionIndex}
          question={question}
        />
      );
    case "PICTURE":
      return (
        <ResponsePictureChoice
          options={question.options}
          onResponse={onResponse}
          questionIndex={questionIndex}
          question={question}
        />
      );
    case "SINGLE_SELECT":
      return (
        <ResponseSingleSelect
          options={question.options}
          isMultiple={isMultiple}
          onResponse={onResponse}
          questionIndex={questionIndex}
          question={question}
        />
      );
    case "MULTIPLE_SELECT":
      return (
        <ResponseMultipleChoice
          options={question.options}
          isMultiple={isMultiple}
          onResponse={onResponse}
          questionIndex={questionIndex}
          question={question}
        />
      );
  }
};

export default Question;
