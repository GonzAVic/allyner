import { TextField, MenuItem } from "@mui/material";

const ResponseDropdown = ({ options, onResponse, questionIndex, question }) => {
  return (
    <TextField
      value={question.answer}
      onChange={(e) => onResponse(questionIndex, e.target.value)}
      select
    >
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default ResponseDropdown;
