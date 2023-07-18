// MATERIAL UI
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";

const ResponseMultipleChoice = ({
  options,
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
          control={
            <Checkbox
              checked={question.answer && question.answer.includes(option)}
            />
          }
          label={option}
          onChange={(e) => handleChange(e, option)}
        />
      ))}
    </FormGroup>
  );
};

export default ResponseMultipleChoice;
