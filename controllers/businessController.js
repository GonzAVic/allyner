import Business from "db/models/Business.model";

const getBusiness = async (_, args) => {
  const business = {
    name: "pedro",
    industry: "TECH",
  };

  console.log("-> business: ", business);
  return business;
};

const createBusiness = async () => {
  try {
    const business = await new Business(input);
    business.save();
  } catch (error) {}
};

const queries = {
  getBusiness,
};

const mutations = { createBusiness };

module.exports = {
  queries,
  mutations,
};
