import React from "react";

import { Typography } from "@mui/material";

export default {
  title: "mui/Typography",
  component: Typography,
};

const Template = (args) => <Typography {...args} />;

export const Heading1 = Template.bind({});
Heading1.args = {
  variant: "h1",
  children: "Lorem ipsum dolor sit amet",
};

export const Heading2 = Template.bind({});
Heading2.args = {
  variant: "h2",
  children: "Lorem ipsum dolor sit amet",
};

export const Heading3 = Template.bind({});
Heading3.args = {
  variant: "h3",
  children: "Lorem ipsum dolor sit amet",
};

export const Paragraph = Template.bind({});
Paragraph.args = {
  children: "Lorem ipsum dolor sit amet",
};

export const Label = Template.bind({});
Label.args = {
  variant: "label",
  children: "Lorem ipsum dolor sit amet",
};

export const Button = Template.bind({});
Button.args = {
  variant: "button",
  children: "Lorem ipsum dolor sit amet",
};

export const Small = Template.bind({});
Small.args = {
  variant: "small",
  children: "Lorem ipsum dolor sit amet",
};
