// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, IconButton, Box, LinearProgress } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const LayoutOne = ({ children }) => {
  return (
    <Container>
      <Header>
        <IconButton>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6">Product Management</Typography>
        <Box sx={{ width: 24, height: 24 }} />
      </Header>
      <LinearProgress variant="determinate" value={30} />
      <ContentContainer>{children}</ContentContainer>
      <ActionsContainer>
        <Action sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}>
          <KeyboardArrowDownIcon fontSize="small" />
        </Action>
        <Action
          sx={{
            ml: 0.4,
            mr: 1,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }}
        >
          <KeyboardArrowUpIcon fontSize="small" />
        </Action>
        <Action variant="body2">Powered by ALLYNER</Action>
      </ActionsContainer>
    </Container>
  );
};

const Container = styled("div")({
  display: "flex",
  flex: 1,
  flexDirection: "column",
});

const Header = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: 72,
  background: "#FFFFFF",
  padding: "0 24px",
  borderBottom: "1px solid #E0E2E8",
});

const ContentContainer = styled("div")({
  display: "flex",
  flex: 1,
  width: "80%",
  maxWidth: 740,
  margin: "auto",
});

const ActionsContainer = styled("div")({
  position: "absolute",
  display: "flex",
  bottom: 48,
  left: "50%",
  transform: "translate(-50%)",
});

const Action = styled(Typography)({
  height: 32,
  padding: "0 8px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "rgba(114, 155, 255, 0.16)",
  borderRadius: 4,
});

export default LayoutOne;
