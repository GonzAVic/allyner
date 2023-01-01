import { createTheme } from "@mui/material/styles";

// primary 101828
// seconday #667085

const theme = () => {
  const { palette } = createTheme({
    palette: {
      text: {
        secondary: "#73839D",
      },
    },
  });

  return createTheme({
    ...{ palette },
    typography: {
      h1: {
        fontSize: 64,
        fontWeight: 700,
      },
      h2: {
        fontSize: 48,
        fontWeight: 600,
      },
      h3: {
        fontSize: 40,
        fontWeight: 600,
      },
      h4: {
        fontSize: 32,
        fontWeight: 600,
      },
      h5: {
        fontSize: 24,
        fontWeight: 600,
      },
      h6: {
        fontSize: 20,
        fontWeight: 600,
      },
      subtitle1: {
        fontSize: 16,
        fontWeight: 600,
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
        fontSize: 15,
        fontWeight: 600,
      },
      // allVariants: {
      //   display: "block",
      // },
    },

    // COMPONENTS
    components: {
      MuiTypography: {
        defaultProps: {
          variantMapping: {
            label: "p",
            button: "div",
            small: "div",
          },
        },
      },

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
        variants: [
          {
            props: { variant: "dashed" },
            style: {
              border: "1px dashed #B5BBC8",
              color: "#73839D",
            },
          },
        ],
      },

      MuiSwitch: {
        defaultProps: {
          size: "small",
        },
      },

      MuiIconButton: {
        defaultProps: {
          size: "small",
        },
        styleOverrides: {
          root: {
            "& svg": {
              fill: "#667085",
            },
          },
        },
      },

      MuiInputBase: {
        styleOverrides: {
          root: {
            color: "initial",
            background: "#FFFFFF",
            border: "1px solid #DCDFEA",
            borderRadius: "8px !important",
            padding: "12px 16px",

            input: {
              padding: 0,
            },

            "& .MuiSelect-select": {
              paddingTop: 0,
              paddingBottom: 0,
              paddingLeft: 0,
            },
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
            "& fieldset": {
              border: "none",
            },

            "& label": {
              fontSize: 12,
              fontWeight: 500,
              display: "contents",
              padding: 80,
            },
            "& legend": {
              display: "none",
            },
          },
        },
      },
    },
  });
};

export default theme;
