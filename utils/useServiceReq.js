import { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";

// OTHER
import { FIND_SERVICE_REQUEST, CREATE_SERVICE_REQUEST } from "graphql/apiql";

const useServiceReq = (serviceReqId) => {
  const [findServiceReqFn, findServiceReqHpr] =
    useLazyQuery(FIND_SERVICE_REQUEST);
  const [createServiceReqFn] = useMutation(CREATE_SERVICE_REQUEST);

  const [serviceReq, setServiceReq] = useState(null);

  useEffect(() => {
    if (!serviceReqId) return;

    findServiceReqFn({ variables: { id: Number(serviceReqId) } });
  }, [serviceReqId]);

  useEffect(() => {
    if (!findServiceReqHpr.called) return;
    if (!findServiceReqHpr.data) return;

    const serviceReq_ = { ...findServiceReqHpr.data.findServiceRequest };
    serviceReq_.frozenService = JSON.parse(serviceReq_.frozenService);
    const frozenServiceCreatedAt = new Date(
      serviceReq_.frozenService.createdAt
    );
    serviceReq_.frozenService.createdAt = `${frozenServiceCreatedAt.getDate()}/${frozenServiceCreatedAt.getMonth()}/${frozenServiceCreatedAt.getFullYear()}`;
    const frozenServiceUpdatedAt = new Date(
      serviceReq_.frozenService.updatedAt
    );
    serviceReq_.frozenService.updatedAt = `${frozenServiceUpdatedAt.getDate()}/${frozenServiceUpdatedAt.getMonth()}/${frozenServiceUpdatedAt.getFullYear()}`;
    serviceReq_.answers = JSON.parse(serviceReq_.answers);
    setServiceReq(serviceReq_);
  }, [findServiceReqHpr]);

  const createServiceReq = async (data) => {
    const response = await createServiceReqFn({
      variables: { input: { attributes: data } },
    });
    return response.data.createServiceRequest.serviceRequest;
  };

  const findClientServiceReqs = () => {};

  return { serviceReq, createServiceReq, findClientServiceReqs };
};

export default useServiceReq;
