import { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";

// OTHER
import {
  FIND_ORDER,
  CREATE_ORDER,
  FIND_CLIENT_SERVICE_REQS,
  FIND_BUSINESS_ORDERS,
  UPDATE_ORDER,
} from "graphql/apiql";
import { serviceReqAdapter } from "./adapters";

const useServiceReq = (orderId, options) => {
  const [findOrderFn, findOrderHpr] = useLazyQuery(FIND_ORDER);
  const [createOrderFn] = useMutation(CREATE_ORDER);
  const [updateOrderFn, updateOrderHpr] = useMutation(UPDATE_ORDER);
  const [findClientServiceReqsFn] = useLazyQuery(FIND_CLIENT_SERVICE_REQS);
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

  const createServiceReq = async (data) => {
    if (data.additionalInfo)
      data.additionalInfo = JSON.stringify(data.additionalInfo);
    const response = await createOrderFn({
      variables: { input: { ...data, businessId: "6483b8c176172f4cb7a5d9df" } },
    });
    return response.data.createOrder;
  };

  const findClientServiceReqs = async (businessId, userId) => {
    if (!userId) {
      console.log("-> ERROR: No userId");
      return;
    }
    const response_ = await findClientServiceReqsFn({
      variables: {
        businessId,
        userId,
      },
    });
    if (response_.error) return [];
    const response = response_.data.listUserServiceRequests.map((sr) => {
      return serviceReqAdapter(sr);
    });

    return response;
  };

  const findBusinessOrders = async () => {
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

  const updateOrder = async (data, orderId) => {
    const response = await updateOrderFn({
      variables: {
        input: data,
        orderId,
      },
    });

    return response;
  };

  return {
    serviceReq,
    createServiceReq,
    findClientServiceReqs,
    findBusinessOrders,
    updateOrder,
  };
};

export default useServiceReq;
