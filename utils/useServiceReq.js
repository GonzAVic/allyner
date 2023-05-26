import { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";

// OTHER
import {
  FIND_SERVICE_REQUEST,
  CREATE_SERVICE_REQUEST,
  FIND_CLIENT_SERVICE_REQS,
  FIND_BUSINESS_SERVICE_REQS,
  UPDATE_SERVICE_REQ,
} from "graphql/apiql";
import { serviceReqAdapter } from "./adapters";

const useServiceReq = (serviceReqId) => {
  const [findServiceReqFn, findServiceReqHpr] =
    useLazyQuery(FIND_SERVICE_REQUEST);
  const [createServiceReqFn] = useMutation(CREATE_SERVICE_REQUEST);
  const [updateServiceReqFn] = useMutation(UPDATE_SERVICE_REQ);
  const [findClientServiceReqsFn] = useLazyQuery(FIND_CLIENT_SERVICE_REQS);
  const [findBusinessServiceReqsFn] = useLazyQuery(FIND_BUSINESS_SERVICE_REQS);

  const [serviceReq, setServiceReq] = useState(null);

  useEffect(() => {
    if (!serviceReqId) return;

    findServiceReqFn({ variables: { id: Number(serviceReqId) } });
  }, [serviceReqId]);

  useEffect(() => {
    if (!findServiceReqHpr.called) return;
    if (!findServiceReqHpr.data) return;

    setServiceReq(serviceReqAdapter(findServiceReqHpr.data.findServiceRequest));
  }, [findServiceReqHpr]);

  const createServiceReq = async (data) => {
    const response = await createServiceReqFn({
      variables: { input: { attributes: data } },
    });
    return response.data.createServiceRequest.serviceRequest;
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

    const response = response_.data.listUserServiceRequests.map((sr) => {
      return serviceReqAdapter(sr);
    });

    return response;
  };

  const findBusinessServiceReqs = async (businessId) => {
    const response_ = await findBusinessServiceReqsFn({
      variables: {
        businessId,
      },
    });

    const response = response_.data.businessServiceRequests.map((sr) => {
      return serviceReqAdapter(sr);
    });

    return response;
  };

  const updateServiceReq = async (data, serviceReqId, businessId) => {
    const response = await updateServiceReqFn({
      variables: {
        input: {
          attributes: {
            businessId: Number(businessId),
            surveyId: 1,
            orderStatusId: 2,
            ...data,
          },
          id: serviceReqId,
        },
      },
    });

    return response;
  };

  return {
    serviceReq,
    createServiceReq,
    findClientServiceReqs,
    findBusinessServiceReqs,
    updateServiceReq,
  };
};

export default useServiceReq;
