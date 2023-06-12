import User from "db/models/User.model";

const updateUser = async (_, args) => {
  try {
    let { input, userId } = args;

    const user = await User.findOneAndUpdate({ _id: userId }, input, {
      new: true,
    });
    console.log("-> user: ", user);

    return user;
  } catch (error) {
    return error;
  }
};

const findUser = async (_, args) => {
  try {
    let { userId } = args;
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    return error;
  }
};

const queries = { findUser };

const mutations = { updateUser };

module.exports = {
  queries,
  mutations,
};
