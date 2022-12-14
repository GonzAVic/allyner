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
      cover: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
      isOriginal: true,
    };
    const service = await new Service(serviceInput);
    service.save();

    return service;
  } catch (error) {
    return error;
  }
};

const updateServiceDetails = async (_, args) => {
  try {
    let { input, serviceId } = args;
    const service = await Service.findById(serviceId);

    service.title = input.title;
    service.description = input.description;
    service.cover = input.cover;
    service.callToAction = input.callToAction;

    await Pricing.findOneAndUpdate({ _id: service.pricing }, input.pricing, {
      new: true,
    });

    service.save();

    return service;
  } catch (error) {
    return error;
  }
};

const updateServiceCheckout = async (_, args) => {
  try {
    let { input, serviceId } = args;
    const service = await Service.findById(serviceId);
    service.checkoutTitle = input.checkoutTitle;
    service.checkoutMessage = input.checkoutMessage;
    service.isGuestCheckoutEnabled = input.isGuestCheckoutEnabled || false;
    service.save();
    return service;
  } catch (error) {
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
    const service = await Service.findById(serviceId);
    return service;
  } catch (error) {
    return error;
  }
};

const queries = { getServices, getService };

const mutations = {
  createService,
  updateServiceCheckout,
  updateServiceDetails,
};

module.exports = {
  queries,
  mutations,
};
