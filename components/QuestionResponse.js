// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, Box } from "@mui/material";

const QuestionResponse = ({ number, sentence, answer }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography sx={{ mb: 2 }}>
        {number}. {sentence}
      </Typography>
      <ResponseContainer>
        <Typography sx={{ color: "#B5BBC8", mb: 1 }}>Answer</Typography>
        <Typography>{answer}</Typography>
      </ResponseContainer>
    </Box>
  );
};

const ResponseContainer = styled("div")({
  background: "rgba(114, 155, 255, 0.1)",
  padding: 24,
  borderRadius: 12,
});

export default QuestionResponse;
