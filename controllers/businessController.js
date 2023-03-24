import Business from "db/models/Business.model";

const getBusiness = async (_, args) => {
  try {
    let { businessId } = args;

    const business = await Business.findById(businessId);

    return business;
  } catch (error) {
    return error;
  }
};

const createBusiness = async (_, args) => {
  try {
    let { input } = args;

    console.log("-> input: ", input);

    const business = await new Business(input);
    business.save();

    return business;
  } catch (error) {
    return error;
  }
};

const queries = {
  getBusiness,
};

const mutations = { createBusiness };

module.exports = {
  queries,
  mutations,
};
