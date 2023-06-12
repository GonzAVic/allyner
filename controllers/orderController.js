import Order from "db/models/Order.model";
const { mongoose } = require("mongoose");

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

const findOrder = async (_, args) => {
  try {
    let { orderId } = args;
    const order = await Order.findById(orderId);
    return order;
  } catch (error) {
    return error;
  }
};

const queries = { findBusinessOrders, findOrder };

const mutations = { createOrder, updateOrder };

module.exports = {
  queries,
  mutations,
};
