import React from "react";

//  MATERIAL UI
import { styled } from "@mui/system";
import {
  TextField,
  Switch,
  MenuItem,
  Typography,
  Divider,
  IconButton,
  Button,
  Menu,
  Box,
  Checkbox,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

// COMPONENTS
import Uploader from "components/Uploader";
import { questionTypes } from "utils/constants";

const QuestionCard = ({
  question,
  index,
  formik,
  setActiveQuestion,
  removeQuestion,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const updateQuestionAttr = (attribute, value) => {
    formik.setFieldValue(`questions[${index}].${attribute}`, value);
  };

  const handleAddOption = () => {
    formik.setFieldValue(`questions[${index}].options`, [
      ...question.options,
      "new option",
    ]);
  };

  const handleRemoveOption = (optionIndex) => {
    let options_ = [...question.options];

    options_ = options_.filter((o, index) => {
      return index !== optionIndex;
    });

    formik.setFieldValue(`questions[${index}].options`, options_);
  };

  const activeQuestion = () => {
    setActiveQuestion(index);
  };

  const handleFileUploaded = (values) => {
    formik.setFieldValue(`questions[${index}].options`, [
      ...question.options,
      ...values,
    ]);
  };

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Box className="card" sx={{ mb: 1.5 }}>
      <QuestionTypeTitle
        value={question.type}
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

      <TextField
        name="title"
        value={question.title}
        onChange={(event) => updateQuestionAttr("title", event.target.value)}
        onFocus={activeQuestion}
        sx={{ mb: "16px !important" }}
      />
      {question.isDescriptionActive && (
        <TextField
          sx={{ mb: "16px !important" }}
          name="description"
          value={question.description}
          onChange={(event) =>
            updateQuestionAttr("description", event.target.value)
          }
          onFocus={activeQuestion}
        />
      )}

      {/* {questionsWithMultiple.includes(question.type) && (
        <PropertyControl>
          <Typography variant="small">Selection Type</Typography>
          <TextField
            name="selectionType"
            value={formik.values.selectionType}
            onChange={(event) =>
              updateQuestionAttr("selectionType", event.target.value)
            }
            sx={{ mb: 0, width: "fit-content" }}
            size="medium"
            select
          >
            {SELECTION_TYPE.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </PropertyControl>
      )} */}

      {questionWithOptions.includes(question.type) && (
        <>
          <Box className="space-between-centered" sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Options</Typography>
            <TextField
              name="selectionType"
              value={formik.values.selectionType}
              onChange={(event) =>
                updateQuestionAttr("selectionType", event.target.value)
              }
              sx={{ mb: 0, width: "fit-content" }}
              size="medium"
              select
            >
              {SELECTION_TYPE.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          {question.options.map((op, i) => {
            return (
              <Box className="space-between-centered" sx={{ gap: 2, mb: 2 }}>
                <TextField
                  key={i}
                  name={`questions[${index}].options[${i}]`}
                  value={question.options[i]}
                  onChange={(event) =>
                    updateQuestionAttr(`options[${i}]`, event.target.value)
                  }
                  onFocus={activeQuestion}
                  sx={{ mb: 0 }}
                />
                <IconButton onClick={() => handleRemoveOption(i)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            );
          })}
          <Button
            variant="dashed"
            size="small"
            onClick={handleAddOption}
            startIcon={<AddIcon />}
            fullWidth
          >
            Add new option
          </Button>
        </>
      )}

      {question.type === "picture choice" && (
        <>
          <Divider sx={{ mt: 3, mb: 3 }} />

          <Uploader onFilesUploaded={handleFileUploaded} />
        </>
      )}

      <ActionsContainer>
        <div className="space-between-centered">
          <Switch
            checked={question.isRequired}
            onChange={(event) =>
              updateQuestionAttr("isRequired", event.target.checked)
            }
            onFocus={activeQuestion}
          />{" "}
          <Typography>Required</Typography>
        </div>
        <div className="space-between-centered">
          <IconButton>
            <ContentCopyIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={removeQuestion}>
            <DeleteIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={openMenu}>
            <MoreVertIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={closeMenu}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <MenuItem
              onClick={() => {
                updateQuestionAttr(
                  "isDescriptionActive",
                  !question.isDescriptionActive
                );
                closeMenu();
              }}
              onFocus={activeQuestion}
            >
              <Checkbox checked={question.isDescriptionActive} />
              <Typography>Show Description</Typography>
            </MenuItem>
          </Menu>
        </div>
      </ActionsContainer>
    </Box>
  );
};

const questionWithOptions = ["DROPDOWN", "MULTIPLE"];

const questionsWithMultiple = ["multiple choice", "picture choice", "date"];

const ActionsContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: 24,
});

const QuestionTypeTitle = styled(TextField)({
  "& *": {
    color: "#B5BBC8",
  },
  "& fieldset": {
    border: "none",
  },
});

const SELECTION_TYPE = [
  {
    value: "SINGLE",
    label: "Single select",
  },
  {
    value: "MULTIPLE",
    label: "Multiple select",
  },
];

export default QuestionCard;
