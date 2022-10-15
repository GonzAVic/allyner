// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, Button } from "@mui/material";

// COMPONENTS
import Sidebar from "./Sidebar";

const DefaultLayout = ({ children, title, secondaryText }) => {
  return (
    <>
      <Container>
        <Sidebar />
        <Content>
          <ContentTop>
            <div>
              <Typography variant="h2">{title}</Typography>
              <Typography>{secondaryText}</Typography>
            </div>
            <Button>New Service</Button>
          </ContentTop>
          <ChildrenContainer>{children}</ChildrenContainer>
        </Content>
      </Container>
    </>
  );
};

const Container = styled("div")({
  display: "flex",
});

const Content = styled("div")({
  padding: 32,
  flex: 1,
  background: "#EFF1F5",
});

const ContentTop = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 40,
});

const ChildrenContainer = styled("div")({});

export default DefaultLayout;
