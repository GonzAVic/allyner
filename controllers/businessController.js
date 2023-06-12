import Business from "db/models/Business.model";

const createBusiness = async (_, args) => {
  try {
    let { input } = args;

    const business = await new Business(input);
    business.save();

    return business;
  } catch (error) {
    return error;
  }
};

const updateBusiness = async (_, args) => {
  try {
    let { input, businessId } = args;

    const business = await Business.findOneAndUpdate(
      { _id: businessId },
      input,
      {
        new: true,
      }
    );

    return business;
  } catch (error) {
    return error;
  }
};

const findBusiness = async (_, args) => {
  try {
    let { businessId } = args;
    const business = await Business.findById(businessId);
    return business;
  } catch (error) {
    return error;
  }
};

const queries = {
  findBusiness,
};

const mutations = { createBusiness, updateBusiness };

module.exports = {
  queries,
  mutations,
};
