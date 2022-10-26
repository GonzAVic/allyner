// MATERIAL UI
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";

const ResponseMultipleChoice = ({ options }) => {
  return (
    <FormGroup>
      {options.map((option, index) => (
        <FormControlLabel key={index} control={<Checkbox />} label={option} />
      ))}
    </FormGroup>
  );
};

export default ResponseMultipleChoice;
