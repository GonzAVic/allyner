//  MATERIAL UI
import { styled } from "@mui/system";
import {
  TextField,
  Switch,
  Box,
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

const QuestionCard = ({ question, index, formik, setActiveQuestion }) => {
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

  return (
    <Card title={question.type}>
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
        <IconButton>
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

      <Box className="space-between-centered" sx={{ mb: 1 }}>
        <Typography variant="small">With Description</Typography>
        <Switch
          checked={question.withDescription}
          onChange={(event) =>
            updateQuestionAttr("withDescription", event.target.checked)
          }
          onFocus={activeQuestion}
        />
      </Box>
      <Box className="space-between-centered" sx={{ mb: 1 }}>
        <Typography variant="small">Required</Typography>
        <Switch
          checked={question.isRequired}
          onChange={(event) =>
            updateQuestionAttr("isRequired", event.target.checked)
          }
          onFocus={activeQuestion}
        />
      </Box>
      <Box className="space-between-centered" sx={{ mb: 1 }}>
        <Typography variant="small">Selection Type</Typography>
        <Switch size="small" />
      </Box>

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
        </>
      )}

      <Button
        variant="text"
        size="small"
        onClick={handleAddOption}
        startIcon={<AddIcon />}
      >
        Add new option
      </Button>
    </Card>
  );
};

const questionWithOptions = ["dropdown", "multiple choice"];

const ActionsContainer = styled("div")({
  position: "absolute",
  top: 16,
  right: 16,
});

export default QuestionCard;
