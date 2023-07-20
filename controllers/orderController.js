import Order from "db/models/Order.model";
var ObjectId = require("mongoose").Types.ObjectId;

const createOrder = async (_, args) => {
  try {
    let { input } = args;

    const order = await new Order(input);
    order.save();

    return order;
  } catch (error) {
    return error;
  }
};

const updateOrder = async (_, args) => {
  try {
    let { input, orderId } = args;

    const order = await Order.findOneAndUpdate({ _id: orderId }, input, {
      new: true,
    });

    return order;
  } catch (error) {
    return error;
  }
};

const cancelMultipleOrders = async (_, args) => {
  try {
    let { input } = args;
    console.log("-> input: ", input);

    const orders = await Order.updateMany(
      { _id: { $in: input } },
      { $set: { status: "canceled" } },
      { multi: true }
    );

    return true;
  } catch (error) {
    return error;
  }
};

const updateMultipleOrders = async (_, args) => {
  try {
    let { input, status } = args;
    console.log("-> input: ", input);
    console.log("-> status: ", status);

    const orders = await Order.updateMany(
      { _id: { $in: input } },
      { $set: { status } },
      { multi: true }
    );

    return true;
  } catch (error) {
    return error;
  }
};

const findBusinessOrders = async (_, args) => {
  try {
    let { businessId } = args;
    const orders = await Order.find({
      businessId: new ObjectId(businessId),
    });
    return orders;
  } catch (error) {
    return error;
  }
};

const findClientOrders = async (_, args) => {
  try {
    let { businessId, userId } = args;
    if (!userId.includes("@")) {
      const orders = await Order.find({
        businessId: new ObjectId(businessId),
        userId: new ObjectId(userId),
      });
      return orders;
    } else {
      const regex = new RegExp(userId, "i");
      const orders = await Order.find({ additionalInfo: { $regex: regex } });
      return orders;
    }
  } catch (error) {
    return error;
  }
};

const findOrder = async (_, args) => {
  try {
    let { orderId } = args;
    const order = await Order.findById(orderId);
    return order;
  } catch (error) {
    return error;
  }
};

const queries = { findBusinessOrders, findOrder, findClientOrders };

const mutations = {
  createOrder,
  updateOrder,
  cancelMultipleOrders,
  updateMultipleOrders,
};

module.exports = {
  queries,
  mutations,
};
