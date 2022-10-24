import React from "react";

import { Button } from "@mui/material";

export default {
  title: "mui/Button",
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const Contained = Template.bind({});
Contained.args = {
  variant: "contained",
  children: "Button",
};

export const Outlined = Template.bind({});
Outlined.args = {
  variant: "outlined",
  children: "Button",
};

export const Text = Template.bind({});
Text.args = {
  variant: "text",
  children: "Button",
};
