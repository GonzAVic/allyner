// MATERIAL UI
import { styled } from "@mui/system";
import {
  Typography,
  Box,
  TextField,
  MenuItem,
  Switch,
  IconButton,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

// OTHER
import { sUQuestionTypes } from "utils/constants";

const SimpleQuestion = ({
  question = {},
  index = 0,
  updateQuestionAttr = () => {},
  deleteQuestion = () => {},
}) => {
  return (
    <Box className="card" sx={{ mb: 2 }}>
      <QuestionTypeTitle
        value={question.questionType}
        onChange={(event) =>
          updateQuestionAttr("questionType", event.target.value, index)
        }
        sx={{ mb: 1, width: "fit-content" }}
        size="small"
        select
      >
        {sUQuestionTypes().map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </QuestionTypeTitle>
      <TextField
        name="title"
        value={question.title}
        onChange={(event) => {
          updateQuestionAttr("title", event.target.value, index);
        }}
      />
      <ActionsContainer>
        <div className="space-between-centered">
          <Switch
            checked={question.isRequired}
            onChange={(event) =>
              updateQuestionAttr("isRequired", event.target.checked, index)
            }
          />
          <Typography>Required</Typography>
        </div>
        <Box>
          <IconButton>
            <ContentCopyIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={() => deleteQuestion(index)}>
            <DeleteOutlineOutlinedIcon fontSize="small" />
          </IconButton>
        </Box>
      </ActionsContainer>
    </Box>
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

const ActionsContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: 54,
});

export default SimpleQuestion;
