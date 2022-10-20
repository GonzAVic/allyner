//  MATERIAL UI
import { styled } from "@mui/system";
import {
  TextField,
  Switch,
  Box,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import PreviewIcon from "@mui/icons-material/Preview";

// COMPONENTS
import Card from "components/Card";

const QuestionCard = ({ question, index, formik, updatePreviewData }) => {
  const updateQuestionAttr = (attribute, value) => {
    formik.setFieldValue(`questions[${index}].${attribute}`, value);
  };

  return (
    <Card title={question.type}>
      <TextField
        label={"Question"}
        name="sentence"
        value={question.sentence}
        onChange={(event) => updateQuestionAttr("sentence", event.target.value)}
      />
      <ActionsContainer>
        <IconButton onClick={() => updatePreviewData(question)}>
          <PreviewIcon fontSize="small" />
        </IconButton>
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
        />
      )}

      <Box className="space-between-centered" sx={{ mb: 1 }}>
        <Typography variant="small">With Description</Typography>
        <Switch
          checked={question.withDescription}
          onChange={(event) =>
            updateQuestionAttr("withDescription", event.target.checked)
          }
        />
      </Box>
      <Box className="space-between-centered" sx={{ mb: 1 }}>
        <Typography variant="small">Required</Typography>
        <Switch
          checked={question.isRequired}
          onChange={(event) =>
            updateQuestionAttr("isRequired", event.target.checked)
          }
        />
      </Box>
      <Box className="space-between-centered" sx={{ mb: 1 }}>
        <Typography variant="small">Selection Type</Typography>
        <Switch size="small" />
      </Box>

      <Divider sx={{ mt: 3 }} />
    </Card>
  );
};

const ActionsContainer = styled("div")({
  position: "absolute",
  top: 16,
  right: 16,
});

export default QuestionCard;
