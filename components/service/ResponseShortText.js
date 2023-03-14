import { TextField } from "@mui/material";

const ResponseShortText = ({ onResponse, questionIndex, question, label }) => {
  const props = {};
  if (onResponse)
    props.onChange = (e) => onResponse(questionIndex, e.target.value);
  if (question.answer) props.value = question.answer;
  if (label) props.label = label;

  return <TextField {...props} />;
};

export default ResponseShortText;
