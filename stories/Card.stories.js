import React from "react";

import { TextField } from "@mui/material";

import Card from "components/Card";

export default {
  title: "application/Card",
  component: Card,
};

const Template = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Card title",
};

export const WithBody = Template.bind({});
WithBody.args = {
  title: "Card title",
  children: "This is some random text as the card content",
};

export const WithTextField = Template.bind({});
WithTextField.args = {
  title: "Card title",
  children: <TextField label="Description" value="Lorem ipsum" />,
};
