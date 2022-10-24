import React from "react";

import QuestionCard from "components/service/QuestionCard";

export default {
  title: "application/QuestionCard",
  component: QuestionCard,
};

const Template = (args) => <QuestionCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  question: {
    type: "short text",
    sentence: "What problem you are trying to solve?",
    withDescription: false,
    isRequired: false,
  },
};
