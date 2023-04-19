export const pricingTypes = (pick, valueToLabel) => {
  const values = [
    {
      value: 0,
      label: "Contact for Pricing",
    },
    {
      value: 1,
      label: "Price by time",
    },
    {
      value: 2,
      label: "Fixed Price",
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

export const sUQuestionTypes = (pick, valueToLabel) => {
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

export const industries = [
  "technologies",
  "construction",
  "science",
  "agriculture",
  "manufacturing",
];

export const currencies = (pick, valueToLabel) => {
  const values = [
    {
      value: "RUB",
      label: "Russian ruble",
    },
    {
      value: "EUR",
      label: "Euro",
    },
    {
      value: "USD",
      label: "United States Dollar",
    },
    {
      value: "CAD",
      label: "Canadian Dollar",
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

export const timezones = (pick, valueToLabel) => {
  const values = [
    {
      value: "GMT-12:00",
      label: "Dateline Standard Time",
    },
    {
      value: "GMT-11:00",
      label: "Samoa Standard Time",
    },
    {
      value: "GMT-10:00",
      label: "Hawaiian Standard Time",
    },
    {
      value: "GMT-09:00",
      label: "Alaskan Standard Time",
    },
    {
      value: "GMT-08:00",
      label: "Pacific Standard Time",
    },
    {
      value: "GMT-07:00",
      label: "Mountain Standard Time",
    },
    {
      value: "GMT-06:00",
      label: "Central Standard Time",
    },
    {
      value: "GMT-05:00",
      label: "Eastern Standard Time",
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
