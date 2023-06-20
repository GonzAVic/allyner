import Business from "db/models/Business.model";
import User from "db/models/User.model";
import Order from "db/models/Order.model";

var ObjectId = require("mongoose").Types.ObjectId;

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

const findBusinessBySubdomain = async (_, args) => {
  try {
    let { businessSubdomain } = args;

    const business = await Business.findOne({ subdomain: businessSubdomain });
    return business;
  } catch (error) {
    return error;
  }
};

const findBusinessCustomers = async (_, args) => {
  try {
    let { businessId } = args;

    const orders = await Order.find(
      { businessId: new ObjectId(businessId) },
      "userId  additionalInfo createdAt"
    );

    const userIdentifier = (order) => {
      if (order.userId) return order.userId;
      else {
        const additionalInfo = JSON.parse(order.additionalInfo);
        const { clientEmail } = additionalInfo;
        return clientEmail;
      }
    };

    const customersGrouped = orders.reduce((group, order) => {
      const identifier = userIdentifier(order);
      group[identifier] = group[identifier] ?? [];
      group[identifier].push(order);
      return group;
    }, {});

    for (const [key, value] of Object.entries(customersGrouped)) {
      if (key.includes("@")) {
        const additionalInfo = JSON.parse(value[0].additionalInfo);
        const userData = {
          email: additionalInfo.clientEmail,
          orders: value.length,
        };
        customersGrouped[key] = [userData, ...customersGrouped[key]];
      } else {
        const customerData = await User.findById(
          new ObjectId(key),
          "email firstname lastname"
        );
        customersGrouped[key] = [customerData, ...customersGrouped[key]];
      }
    }

    console.log("-> customersGrouped: ", customersGrouped);

    const result = JSON.stringify(customersGrouped);

    return result;
  } catch (error) {
    return error;
  }
};

const queries = {
  findBusiness,
  findBusinessBySubdomain,
  findBusinessCustomers,
};

const mutations = { createBusiness, updateBusiness };

module.exports = {
  queries,
  mutations,
};

// const findBusinessCustomers = async (_, args) => {
//   try {
//     let { businessId } = args;

//     const orders = await Order.find({ businessId: new ObjectId(businessId) });

//     const usersEmail = [];
//     const usersId = [];
//     orders.forEach((o) => {
//       const userIdentifier = (order) => {
//         if (order.userId) return order.userId;
//         else {
//           const additionalInfo = JSON.parse(order.additionalInfo);
//           const { clientEmail } = additionalInfo;
//           return clientEmail;
//         }
//       };

//       if (
//         typeof userIdentifier(o) === "string" &&
//         !usersId.includes(userIdentifier(o))
//       ) {
//         usersEmail.push({ email: userIdentifier(o), id: "---" });
//       }

//       if (
//         typeof userIdentifier(o) !== "string" &&
//         !usersId.includes(userIdentifier(o))
//       ) {
//         usersId.push(userIdentifier(o));
//       }
//     });

//     const customers = await User.find({
//       _id: {
//         $in: usersId,
//       },
//     });

//     const result = [...customers, ...usersEmail];

//     return result;
//   } catch (error) {
//     return error;
//   }
// };
