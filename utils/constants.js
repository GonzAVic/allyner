export const questionTypes = (pick, valueToLabel) => {
  const values = [
    {
      value: "DROPDOWN",
      label: "Dropdown",
    },
    {
      value: "MULTIPLE",
      label: "Multiple",
    },
    {
      value: "PICTURE",
      label: "Picture",
    },
    {
      value: "DROPDOWN",
      label: "Dropdown",
    },
    {
      value: "SHORT_TEXT",
      label: "Short Text",
    },
    {
      value: "LONG_TEXT",
      label: "Long Text",
    },
    {
      value: "FILE",
      label: "File",
    },
    {
      value: "DATE",
      label: "Date",
    },
  ];

  if (Boolean(pick)) {
    return values.map((e) => e[pick]);
  }

  if (valueToLabel) {
    const element = values.find((e) => e.value === valueToLabel);
    return element.label;
  }

  return values;
};
