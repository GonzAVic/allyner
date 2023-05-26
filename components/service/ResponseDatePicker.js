import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const ResponseDatePicker = ({ onResponse, questionIndex, question }) => {
  return (
    <DatePicker
      value={question.answer ? question.answer : null}
      onChange={(newValue) =>
        onResponse(questionIndex, newValue.format("DD/MM/YYYY"))
      }
      renderInput={(params) => <TextField {...params} />}
    />
  );
};

export default ResponseDatePicker;
