import { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";

// OTHER
import {
  FIND_ORDER,
  CREATE_ORDER,
  FIND_CLIENT_ORDERS,
  FIND_BUSINESS_ORDERS,
  UPDATE_ORDER,
  CANCEL_MULTIPLE_ORDERS,
  UPDATE_MULTIPLE_ORDERS,
} from "graphql/apiql";
import { serviceReqAdapter } from "./adapters";

const useOrder = (orderId, options) => {
  const [findOrderFn, findOrderHpr] = useLazyQuery(FIND_ORDER);
  const [createOrderFn] = useMutation(CREATE_ORDER);
  const [cancelMultipleOrdersFn] = useMutation(CANCEL_MULTIPLE_ORDERS);
  const [updateMultipleOrdersFn] = useMutation(UPDATE_MULTIPLE_ORDERS);
  const [updateOrderFn, updateOrderHpr] = useMutation(UPDATE_ORDER);
  const [findClientOrdersFn] = useLazyQuery(FIND_CLIENT_ORDERS);
  const [findBusinessOrdersFn] = useLazyQuery(FIND_BUSINESS_ORDERS);

  const [serviceReq, setServiceReq] = useState(null);

  useEffect(() => {
    if (!orderId) return;

    findOrderFn({ variables: { orderId } });
  }, [orderId]);

  useEffect(() => {
    if (!findOrderHpr.called) return;
    if (!findOrderHpr.data) return;

    setServiceReq(serviceReqAdapter(findOrderHpr.data.findOrder));
  }, [findOrderHpr]);

  useEffect(() => {
    if (!updateOrderHpr.called) return;
    if (!updateOrderHpr.data) return;

    setTimeout(() => {
      location.reload();
    }, 200);
  }, [updateOrderHpr]);

  const createOrder = async (data) => {
    if (data.additionalInfo)
      data.additionalInfo = JSON.stringify(data.additionalInfo);
    const response = await createOrderFn({
      variables: { input: { ...data, businessId: options.businessId } },
    });
    return response.data.createOrder;
  };

  const findClientOrders = async () => {
    if (!options.userId) {
      console.log("-> ERROR: No userId");
      return;
    }
    if (!options.businessId) {
      console.log("-> ERROR: No businessId");
      return;
    }
    const response_ = await findClientOrdersFn({
      variables: {
        businessId: options.businessId,
        userId: options.userId,
      },
    });
    if (response_.error) return [];
    const response = response_.data.findClientOrders.map((sr) => {
      return serviceReqAdapter(sr);
    });

    return response;
  };

  const findBusinessOrders = async () => {
    if (!options.businessId) return;
    const response_ = await findBusinessOrdersFn({
      variables: {
        businessId: options.businessId,
      },
    });

    if (response_.error) return [];

    const response = response_.data.findBusinessOrders.map((sr) => {
      return serviceReqAdapter(sr);
    });

    return response;
  };

  const updateOrder = async (data, orderID) => {
    const response = await updateOrderFn({
      variables: {
        input: data,
        orderId: orderID || orderId,
      },
    });

    return response;
  };

  const cancelMultipleOrders = async (ordersIds) => {
    const response = await cancelMultipleOrdersFn({
      variables: { input: ordersIds },
    });

    setTimeout(() => {
      location.reload();
    }, 200);

    return response;
  };

  const updateMultipleOrders = async (ordersIds, status) => {
    console.log("-> status: ", status);
    const response = await updateMultipleOrdersFn({
      variables: { input: ordersIds, status },
    });

    setTimeout(() => {
      location.reload();
    }, 200);

    return response;
  };

  return {
    serviceReq,
    createOrder,
    findClientOrders,
    findBusinessOrders,
    updateOrder,
    cancelMultipleOrders,
    updateMultipleOrders,
  };
};

export default useOrder;
