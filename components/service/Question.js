import { useState } from "react";

// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, Box, Button } from "@mui/material";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

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
  const handleOnNext = () => {
    onNext();
  };

  const isMultiple = question.selectionType === "MULTIPLE";
  return (
    <Container>
      <Typography variant="h5">
        {questionIndex + 1}. {question.title || "..."}
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
      <Box className="row-2" sx={{ alignItems: "center", mt: 2 }}>
        <Button onClick={handleOnNext}>OK</Button>
        <Typography sx={{ display: "flex", alignItems: "center", ml: 2 }}>
          press <Box sx={{ width: 8 }} /> <b>Enter</b>
          <KeyboardReturnIcon />
        </Typography>
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
