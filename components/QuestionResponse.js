// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, Box } from "@mui/material";

const QuestionResponse = ({ number, sentence, response }) => {
  return (
    <div>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {number}. {sentence}
      </Typography>
      <ResponseContainer>
        <Typography sx={{ color: "#B5BBC8" }}>Answer</Typography>
        <Typography variant="h6">{response}</Typography>
      </ResponseContainer>
    </div>
  );
};

const ResponseContainer = styled("div")({
  background: "rgba(114, 155, 255, 0.1)",
  padding: 24,
  borderRadius: 12,
});

export default QuestionResponse;
