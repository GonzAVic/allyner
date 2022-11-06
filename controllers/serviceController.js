import Service from "db/models/Service.model";
import Pricing from "db/models/Pricing.model";

const createService = async (_, args) => {
  try {
    let { input } = args;

    const pricingInput = { ...input.pricing, isOriginal: true };
    const pricing = await new Pricing(pricingInput);
    pricing.save();

    const serviceInput = {
      ...input,
      pricing: pricing._id,
      cover: "LALALA",
      isOriginal: true,
    };
    const service = await new Service(serviceInput);
    service.save();

    console.log("-> service: ", service);
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

const getService = async (_, args) => {
  try {
    let { serviceId } = args;
    console.log("-> serviceId: ", serviceId);
    const service = await Service.findById(serviceId);
    console.log("-> service: ", service);
    return service;
  } catch (error) {
    return error;
  }
};

const queries = { getServices, getService };

const mutations = { createService };

module.exports = {
  queries,
  mutations,
};
