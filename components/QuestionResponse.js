// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, Box } from "@mui/material";

const QuestionResponse = ({ number, sentence, answer, type }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography sx={{ mb: 2 }}>
        {number}. {sentence}
      </Typography>
      <ResponseContainer>
        <Typography sx={{ color: "#B5BBC8", mb: 1 }}>Answer</Typography>
        {type === "FILE" && (
          <img
            src={answer}
            style={{ width: "100px", height: "100px", objectFit: "contain" }}
          />
        )}
        {questoinsWithStringAnswer.includes(type) && (
          <Typography>
            {Boolean(answer)
              ? typeof answer === "string"
                ? answer
                : answer.join(", ")
              : "[COPY] No answer from user"}
          </Typography>
        )}
      </ResponseContainer>
    </Box>
  );
};

const questoinsWithStringAnswer = [
  "SHORT_TEXT",
  "LONG_TEXT",
  "DROPDOWN",
  "DATE",
  "SINGLE_SELECT",
  "MULTIPLE_SELECT",
];

const ResponseContainer = styled("div")({
  background: "rgba(114, 155, 255, 0.1)",
  padding: 24,
  borderRadius: 12,
});

export default QuestionResponse;
