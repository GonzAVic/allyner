import { TextField, MenuItem } from "@mui/material";

const ResponseDropdown = ({ options }) => {
  return (
    <TextField select>
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default ResponseDropdown;
