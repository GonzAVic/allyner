import { createTheme } from "@mui/material/styles";

// primary 101828
// seconday #667085

const theme = () => {
  return createTheme({
    typography: {
      h1: {
        fontSize: 30,
        fontWeight: 500,
      },
      h2: {
        fontSize: 24,
        fontWeight: 500,
        marginBottom: 8,
      },
      label: {
        fontSize: 16,
        fontWeight: 500,
      },
      body1: {
        fontSize: 16,
        lineHeight: 1,
      },
      button: {
        fontSize: 14,
        fontWeight: 400,
      },
      small: {
        fontSize: 14,
        fontWeight: 400,
      },
      button: {
        fontSize: 14,
        fontWeight: 500,
      },
    },

    // COMPONENTS
    components: {
      MuiButton: {
        defaultProps: {
          variant: "contained",
        },
        styleOverrides: {
          root: {
            borderRadius: 12,
            padding: "12px 16px",
            textTransform: "capitalize",
          },
        },
      },
    },
  });
};

export default theme;
