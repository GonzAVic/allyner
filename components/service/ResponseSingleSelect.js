// MATERIAL UI
import {
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
} from "@mui/material";

const ResponseSingleSelect = ({
  options,
  onResponse,
  questionIndex,
  nextQuestion,
}) => {
  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        // value={value}
        onChange={(e) => {
          console.log('-> e.target.value: ', e.target.value)
          onResponse(questionIndex, e.target.value);
          nextQuestion();
        }}
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
