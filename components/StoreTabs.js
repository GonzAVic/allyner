import { useRouter } from "next/router";

// MATERIAL UI
import { Button, Box } from "@mui/material";

const StoreTabs = ({ currentTab }) => {
  const router = useRouter();

  return (
    <Box sx={{ paddingBottom: 3, borderBottom: "1px solid #D4D9E6", mb: 3 }}>
      <Button
        variant={`tab${
          router.pathname.includes("authentication-signup") ? "-active" : ""
        }`}
        href="/app/store/authentication-signup"
      >
        Sign Up
      </Button>
      <Button
        variant={`tab${
          router.pathname.includes("authentication-signin") ? "-active" : ""
        }`}
        href="/app/store/authentication-signin"
        sx={{ ml: 1, mr: 1 }}
      >
        Sign In
      </Button>
    </Box>
  );
};

export default StoreTabs;
