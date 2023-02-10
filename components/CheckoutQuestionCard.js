// MATERIAL UI
import { styled } from "@mui/system";
import {
  TextField,
  Switch,
  Typography,
  IconButton,
  MenuItem,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";

// OTHER
import { questionTypes } from "utils/constants";

const CheckoutQuestionCard = () => {
  return (
    <Container>
      <QuestionTypeTitle
        value={"question.type"}
        onChange={(event) => updateQuestionAttr("type", event.target.value)}
        sx={{ mb: 1, width: "fit-content" }}
        size="small"
        select
      >
        {questionTypes().map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </QuestionTypeTitle>
      <TextField value="lalala" />
      <ActionsContainer>
        <div className="space-between-centered">
          <Switch checked={true} onChange={() => {}} />
          <Typography>Required</Typography>
        </div>
        <div className="space-between-centered">
          <IconButton>
            <ContentCopyIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={() => {}}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </div>
      </ActionsContainer>
    </Container>
  );
};

const QuestionTypeTitle = styled(TextField)({
  "& *": {
    color: "#B5BBC8",
  },
  "& fieldset": {
    border: "none",
  },
});

const Container = styled("div")({
  borderRadius: 10,
  background: "#FFFFFF",
  padding: 24,
});

const ActionsContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

export default CheckoutQuestionCard;
