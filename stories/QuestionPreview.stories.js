import React from "react";

import QuestionPreview from "components/service/QuestionPreview";

export default {
  title: "application/QuestionPreview",
  component: QuestionPreview,
};

const Template = (args) => <QuestionPreview {...args} />;

export const Default = Template.bind({});
Default.args = {
  previewData: {
    sentence: "What problem you are trying to solve?",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
};
