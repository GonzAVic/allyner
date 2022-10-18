import Service from "db/models/Service.model";

const createService = async (_, args) => {
  try {
    console.log("-> createService");
    console.log("-> args: ", args);
    let { input } = args;
    const service = await new Service(input);
    service.save();
    console.log("-> service: ", service);
    return service;
  } catch (error) {
    console.log("-> error: ", error);
    return error;
  }
};

const queries = {};

const mutations = { createService };

module.exports = {
  queries,
  mutations,
};
