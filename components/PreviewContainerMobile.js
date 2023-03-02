import React from "react";

// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const PreviewContainerMobile = ({ children, close }) => {
  return (
    <Container>
      <TopBar>
        <Typography>Preview</Typography>
        <IconButton onClick={close}>
          <CloseIcon />
        </IconButton>
      </TopBar>
      <Content>{children}</Content>
    </Container>
  );
};

const Container = styled("div")({
  background: "#FFFFFF",

  position: "absolute",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  overflowX: "hidden",
  overflowY: "auto",
});

const TopBar = styled("div")({
  background: "#E5EAF1",
  height: 48,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 22px",
});

const Content = styled("div")({
  padding: 16,
});

export default PreviewContainerMobile;
