import React from "react";

// MATERIAL UI
import {
  Typography,
  Box,
  TextField,
  MenuItem,
  Switch,
  IconButton,
} from "@mui/material";

// OTHER
import { sUQuestionTypes } from "utils/constants";

const SimpleQuestion = ({ question, updateQuestionAttr }) => {
  return (
    <div>
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
        onChange={(event) =>
          updateQuestionAttr("title", event.target.value, index)
        }
      />
      <ActionsContainer>
        <div className="space-between-centered">
          <Switch checked={true} onChange={() => {}} />
          <Typography>Required</Typography>
        </div>
        <Box>
          <IconButton>
            <ContentCopyIcon />
          </IconButton>
          <IconButton>
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </Box>
      </ActionsContainer>
    </div>
  );
};

export default SimpleQuestion;
