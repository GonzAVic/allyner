export const questionTypes = (pick, valueToLabel) => {
  const values = [
    {
      value: "SHORT_TEXT",
      label: "Short Text",
    },
    {
      value: "LONG_TEXT",
      label: "Long Text",
    },
    {
      value: "DROPDOWN",
      label: "Dropdown",
    },
    {
      value: "SINGLE_SELECT",
      label: "Single Select",
    },
    {
      value: "MULTIPLE_SELECT",
      label: "Multple Select",
    },
    {
      value: "FILE",
      label: "File Upload",
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

export const serviceStatus = (pick, valueToLabel) => {
  const values = [
    {
      value: "ACTIVE",
      label: "Active",
    },
    {
      value: "DRAFT",
      label: "Draft",
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
