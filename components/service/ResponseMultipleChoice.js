// MATERIAL UI
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";

const ResponseMultipleChoice = ({
  options,
  isMultiple,
  onResponse,
  questionIndex,
  question,
}) => {
  const handleChange = (event, option) => {
    const questionAnswer = question.answer || [];

    if (!event.target.checked) {
      const newAsnwer = questionAnswer.filter((a) => {
        return a !== option;
      });
      onResponse(questionIndex, newAsnwer);
      return;
    }

    onResponse(questionIndex, [...questionAnswer, option]);
  };

  return (
    <FormGroup>
      {options.map((option, index) => (
        <FormControlLabel
          key={index}
          control={<Checkbox />}
          label={option}
          onChange={(e) => handleChange(e, option)}
        />
      ))}
    </FormGroup>
  );
};

export default ResponseMultipleChoice;
