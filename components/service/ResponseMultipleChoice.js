// MATERIAL UI
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  RadioGroup,
  Radio,
} from "@mui/material";

const ResponseMultipleChoice = ({ options, isMultiple }) => {
  const handleRadioChange = () => {};

  if (isMultiple) {
    return (
      <FormGroup>
        {options.map((option, index) => (
          <FormControlLabel key={index} control={<Checkbox />} label={option} />
        ))}
      </FormGroup>
    );
  } else {
    return (
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          // value={value}
          onChange={handleRadioChange}
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
  }
};

export default ResponseMultipleChoice;
