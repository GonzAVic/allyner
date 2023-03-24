import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLazyQuery, useMutation } from "@apollo/client";

import { FIND_SERVICE, UPDATE_SERVICE, CREATE_SERVICE } from "graphql/apiql";

const useService = (serviceId, options = {}) => {
  const router = useRouter();

  const [getServiceFn, getServiceFnHpr] = useLazyQuery(FIND_SERVICE);
  const [updateServiceFn, updateServiceHpr] = useMutation(UPDATE_SERVICE);
  const [createServiceFn, createServiceHpr] = useMutation(CREATE_SERVICE);

  const [service, setService] = useState(null);

  useEffect(() => {
    if (!serviceId) return;
    if (serviceId === "new") return;

    getServiceFn({
      variables: {
        id: Number(serviceId),
      },
    });
  }, [serviceId]);

  useEffect(() => {
    if (!getServiceFnHpr.called) return;
    if (!getServiceFnHpr.data) return;

    const service_ = getServiceFnHpr.data.findService;
    setService(service_);
  }, [getServiceFnHpr]);

  useEffect(() => {
    if (!createServiceHpr.called) return;
    if (!createServiceHpr.data) return;

    const service = createServiceHpr.data.createService.service;
    router.push({
      pathname: `/app/services/overview`,
      query: { id: service.id },
    });
  }, [createServiceHpr]);

  const updateService = (data) => {
    console.log("-> serviceId: ", serviceId);
    console.log("-> data: ", data);
    updateServiceFn({
      variables: {
        input: {
          id: serviceId,
          attributes: {
            // FLAG 1
            name: service.name,
            description: service.description,
            businessId: service.businessId,
            ...data,
          },
        },
      },
    });
  };

  const createService = (data) => {
    createServiceFn({
      variables: {
        input: {
          attributes: data,
        },
      },
    });
  };

  return {
    service,
    updateService,
    createService,
  };
};

export default useService;
