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
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

// COMPONENTS
import Card from "components/Card";
import PropertyControl from "components/PropertyControl";
import Uploader from "components/Uploader";
import { questionTypes } from "utils/constants";

const QuestionCard = ({
  question,
  index,
  formik,
  setActiveQuestion,
  removeQuestion,
}) => {
  const updateQuestionAttr = (attribute, value) => {
    formik.setFieldValue(`questions[${index}].${attribute}`, value);
  };

  const handleAddOption = () => {
    formik.setFieldValue(`questions[${index}].options`, [
      ...question.options,
      "new option",
    ]);
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

  return (
    <Card title={questionTypes(null, question.type)}>
      <TextField
        label={"Question"}
        name="sentence"
        value={question.sentence}
        onChange={(event) => updateQuestionAttr("sentence", event.target.value)}
        onFocus={activeQuestion}
      />
      <ActionsContainer>
        <IconButton>
          <ContentCopyIcon fontSize="small" />
        </IconButton>
        <IconButton onClick={removeQuestion}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </ActionsContainer>
      {question.withDescription && (
        <TextField
          label="Description"
          sx={{ mb: 3 }}
          name="description"
          value={question.description}
          onChange={(event) =>
            updateQuestionAttr("description", event.target.value)
          }
          onFocus={activeQuestion}
        />
      )}

      <PropertyControl>
        <Typography variant="small">With Description</Typography>
        <Switch
          checked={question.withDescription}
          onChange={(event) =>
            updateQuestionAttr("withDescription", event.target.checked)
          }
          onFocus={activeQuestion}
        />
      </PropertyControl>
      <PropertyControl>
        <Typography variant="small">Required</Typography>
        <Switch
          checked={question.isRequired}
          onChange={(event) =>
            updateQuestionAttr("isRequired", event.target.checked)
          }
          onFocus={activeQuestion}
        />
      </PropertyControl>
      {questionsWithMultiple.includes(question.type) && (
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
      )}

      {questionWithOptions.includes(question.type) && (
        <>
          <Divider sx={{ mt: 3, mb: 3 }} />

          {question.options.map((op, i) => {
            return (
              <TextField
                key={i}
                name={`questions[${index}].options[${i}]`}
                value={question.options[i]}
                onChange={(event) =>
                  updateQuestionAttr(`options[${i}]`, event.target.value)
                }
                onFocus={activeQuestion}
              />
            );
          })}
          <Button
            variant="text"
            size="small"
            onClick={handleAddOption}
            startIcon={<AddIcon />}
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
    </Card>
  );
};

const questionWithOptions = ["DROPDOWN", "MULTIPLE"];

const questionsWithMultiple = ["multiple choice", "picture choice", "date"];

const ActionsContainer = styled("div")({
  position: "absolute",
  top: 16,
  right: 16,
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
