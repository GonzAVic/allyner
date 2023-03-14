import { TextField } from "@mui/material";

const ResponseLongText = ({ onResponse, questionIndex, question }) => {
  return (
    <TextField
      value={question.answer}
      onChange={(e) => onResponse(questionIndex, e.target.value)}
      rows={5}
      maxRows={5}
      multiline
    />
  );
};

export default ResponseLongText;
