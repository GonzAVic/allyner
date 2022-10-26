import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const ResponseDatePicker = () => {
  return (
    <DatePicker
      value={null}
      // onChange={(newValue) => {
      //   setValue(newValue);
      // }}
      renderInput={(params) => <TextField {...params} />}
    />
  );
};

export default ResponseDatePicker;
