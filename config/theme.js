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

      MuiTextField: {
        defaultProps: {
          variant: "outlined",
          fullWidth: true,
          sx: { mb: 2 },
          InputLabelProps: {
            shrink: true,
          },
        },
        styleOverrides: {
          root: {
            // Body Style
            marginTop: 30,
            "& input, .MuiSelect-select": {
              padding: "10px 14px",
              paddingTop: 8,
              // color: evefColorConfig.palette.mediumBlue,
            },
            "& input": {
              color: "initial",
            },

            "& fieldset": {
              border: "1px solid #DCDFEA",
              borderRadius: 8,
            },

            "& label": {
              transform: "translate(0px, -24px)",
            },

            // Select
            "& .MuiSelect-select": {
              color: "initial",
            },
          },
        },
      },
    },
  });
};

export default theme;
