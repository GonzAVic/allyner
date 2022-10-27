import Service from "db/models/Service.model";

const createService = async (_, args) => {
  try {
    let { input } = args;
    input.isOriginal = true;
    input.cover = "cover.com";

    const service = await new Service(input);
    service.save();
    return service;
  } catch (error) {
    console.log("-> error: ", error);
    return error;
  }
};

const getServices = async () => {
  try {
    const services = await Service.find({});
    return services;
  } catch (error) {
    return error;
  }
};

const queries = { getServices };

const mutations = { createService };

module.exports = {
  queries,
  mutations,
};
