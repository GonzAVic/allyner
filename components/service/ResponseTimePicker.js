import { TextField } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const ResponseTimePicker = () => {
  return (
    <TimePicker
      value={null}
      // onChange={setValue}
      renderInput={(params) => <TextField {...params} />}
    />
  );
};

export default ResponseTimePicker;
