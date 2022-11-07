import Question from "db/models/Question.model";
import Service from "db/models/Service.model";

const updateQuestionnaire = async (_, args) => {
  let { input, serviceId } = args;

  const service = await Service.findById(serviceId);
  // TODO: handle no service

  const questions = input.map((q) => {
    const newQuestion = new Question(q);
    newQuestion.save();
    // TODO: handle new vs existing question
    return newQuestion;
  });

  const questionsId = questions.map((q) => q._id);
  service.questionnaire = questionsId;
  service.save();

  return service;
};

const queries = {};

const mutations = { updateQuestionnaire };

module.exports = {
  queries,
  mutations,
};
