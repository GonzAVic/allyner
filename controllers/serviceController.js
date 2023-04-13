import Service from "db/models/Service.model";

const createService = async (_, args) => {
  try {
    let { input } = args;

    const service = await new Service({
      ...input,
      businesssssId: "6413c7297fbdc9ad02f44f7d",
    });
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

const getService = async (_, args) => {
  try {
    let { serviceId } = args;
    const service = await Service.findById(serviceId);
    return service;
  } catch (error) {
    return error;
  }
};

const queries = {
  getService,
};

const mutations = {
  createService,
  updateService,
};

module.exports = {
  queries,
  mutations,
};
