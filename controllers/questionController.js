import Question from "db/models/Question.model";
import Service from "db/models/Service.model";

const updateQuestionnaire = async (_, args) => {
  let { input, serviceId } = args;

  const service = await Service.findById(serviceId);
  // TODO: handle no service

  const questionsIdPromises = input.map(async (q) => {
    if (q.id === "new") {
      const newQuestion = new Question(q);
      newQuestion.save();
      return newQuestion.id;
    } else {
      const question = await Question.findOneAndUpdate({ _id: q.id }, q, {
        new: true,
      });
      return question.id;
    }
  });

  Promise.all(questionsIdPromises).then((questionsId) => {
    service.questionnaire = questionsId;
    service.save();
    return service;
  });
};

const queries = {};

const mutations = { updateQuestionnaire };

module.exports = {
  queries,
  mutations,
};
