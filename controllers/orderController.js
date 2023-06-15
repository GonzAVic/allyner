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

const findBusinessOrders = async (_, args) => {
  try {
    let { businessId } = args;
    const orders = await Order.find({
      _businessId: businessId,
    });
    console.log("-> orders: ", orders[0].createdAt);
    return orders;
  } catch (error) {
    return error;
  }
};

const findClientOrders = async (_, args) => {
  try {
    let { businessId, userId } = args;
    const orders = await Order.find({
      businessId: new ObjectId(businessId),
      userId: new ObjectId(userId),
    });
    return orders;
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

const mutations = { createOrder, updateOrder };

module.exports = {
  queries,
  mutations,
};
