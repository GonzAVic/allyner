// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, Box, LinearProgress } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const LayoutOne = ({
  children,
  onArrowDown,
  onArrowUp,
  title,
  progressValue = 0,
  business = {},
  shouldDisplayActions = true,
}) => {
  return (
    <Container>
      <Header>
        <Box className="space-centered">
          {business.logo && (
            <img className="businessLogo" src={business.logo} />
          )}
          <Typography variant="h5">{business.name}</Typography>
        </Box>

        <ServiceTitle variant="h5">{title}</ServiceTitle>
        <Box sx={{ width: 24, height: 24 }} />
      </Header>
      <LinearProgress variant="determinate" value={progressValue} />
      <ContentContainer>{children}</ContentContainer>
      {shouldDisplayActions && (
        <ActionsContainer>
          <Action
            onClick={onArrowUp}
            sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
            isDisabled={!Boolean(onArrowUp)}
          >
            <KeyboardArrowUpIcon fontSize="small" />
          </Action>
          <Action
            onClick={onArrowDown}
            sx={{
              ml: 0.4,
              mr: 1,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }}
          >
            <KeyboardArrowDownIcon fontSize="small" />
          </Action>
          <Action variant="body2">Powered by ALLYNER</Action>
        </ActionsContainer>
      )}
    </Container>
  );
};

const Container = styled("div")({
  position: "relative",
  display: "flex",
  flex: 1,
  flexDirection: "column",

  ".MuiLinearProgress-root": {
    background: "transparent",
  },

  ".businessLogo": {
    height: 50,
    marginRight: 8,
  },
});

const Header = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: 85,
  minHeight: 72,
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

const Action = styled(Typography)(({ theme, isDisabled }) => ({
  height: 32,
  padding: "0 8px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: isDisabled ? "#DDE1EC" : "rgba(114, 155, 255, 0.16)",
  color: isDisabled ? "#B5BBC8" : "initial",
  borderRadius: 4,
  cursor: "pointer",
}));

const ServiceTitle = styled(Typography)({
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
});

export default LayoutOne;
