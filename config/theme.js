import { createTheme } from "@mui/material/styles";

// primary 101828
// seconday #667085

const theme = () => {
  const { palette } = createTheme({
    palette: {
      primary: {
        main: "#3C64C5",
      },
      error: {
        main: "#C30000",
      },
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
        lineHeight: "26px",
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
      link: {
        cursor: "pointer",
        textDecoration: "none",
        color: palette.primary.main,
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
            link: "a",
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
            padding: "8px 22px",
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
          {
            props: { variant: "tab" },
            style: {
              background: "#FFFFFF",
              color: "#73839D",
            },
          },
          {
            props: { variant: "tab-active" },
            style: {
              background: "rgba(0, 71, 255, 0.1)",
              color: "#3C64C5",
            },
          },
        ],
      },

      MuiDataGrid: {
        styleOverrides: {
          root: { border: "none" },
          columnHeadersInner: { background: "#FFFFFF" },
          iconSeparator: { display: "none" },
          row: { background: "white" },
        },
      },

      MuiFormHelperText: {
        styleOverrides: {
          root: {
            "&:first-letter": {
              textTransform: "capitalize",
            },
          },
        },
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

      MuiChip: {
        styleOverrides: {
          filledSuccess: {
            background: "#DAF1DB",
            color: "#0F5112",
          },
          filledError: {
            background: "#FAE8E8",
            color: "#FF0000",
          },
          filledPrimary: {
            background: "#D6E2FF",
            color: "#3C64C5",
          },
        },
      },

      MuiInputBase: {
        styleOverrides: {
          root: {
            color: "initial",
            background: "#FFFFFF",
            // border: "1px solid #DCDFEA",
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

      MuiMenuItem: {
        styleOverrides: {
          root: {
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
            // shrink: true,
          },
        },
        styleOverrides: {
          root: {
            // "& fieldset": {
            //   border: "none",
            // },
            // "& label": {
            //   fontSize: 12,
            //   fontWeight: 500,
            //   display: "contents",
            //   padding: 80,
            // },
            // "& legend": {
            //   display: "none",
            // },
          },
        },
      },
    },
  });
};

export default theme;
