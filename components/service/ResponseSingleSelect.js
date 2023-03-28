// MATERIAL UI
import {
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
} from "@mui/material";

const ResponseSingleSelect = ({ options, onResponse, questionIndex }) => {
  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        // value={value}
        onChange={(e) => onResponse(questionIndex, e.target.value)}
      >
        {options.map((option, index) => {
          return (
            <FormControlLabel
              key={index}
              value={option}
              control={<Radio />}
              label={option}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

export default ResponseSingleSelect;
