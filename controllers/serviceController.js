import Service from "db/models/Service.model";

const createService = async (_, args) => {
  try {
    let { input } = args;

    const service = await new Service(input);
    service.save();

    return service;
  } catch (error) {
    return error;
  }
};

const updateService = async (_, args) => {
  try {
    let { input, serviceId } = args;

    const service = await Service.findOneAndUpdate({ _id: serviceId }, input, {
      new: true,
    });

    return service;
  } catch (error) {
    return error;
  }
};

const findService = async (_, args) => {
  try {
    let { serviceId } = args;
    const service = await Service.findById(serviceId);
    return service;
  } catch (error) {
    return error;
  }
};

const queries = {
  findService,
};

const mutations = {
  createService,
  updateService,
};

module.exports = {
  queries,
  mutations,
};
