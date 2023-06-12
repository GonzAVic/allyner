import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLazyQuery, useMutation } from "@apollo/client";

import {
  FIND_SERVICE,
  UPDATE_SERVICE,
  CREATE_SERVICE,
  DELETE_SERVICE,
} from "graphql/apiql";

import { getFileUrl } from "utils/utils";

const useService = (serviceId, options = {}) => {
  const router = useRouter();

  const [getServiceFn, getServiceFnHpr] = useLazyQuery(FIND_SERVICE);
  const [updateServiceFn, updateServiceHpr] = useMutation(UPDATE_SERVICE);
  const [createServiceFn, createServiceHpr] = useMutation(CREATE_SERVICE);
  const [deleteServiceFn] = useMutation(DELETE_SERVICE);

  const [service, setService] = useState(null);

  useEffect(() => {
    if (!serviceId) return;
    if (serviceId === "new") return;
    const variables = {
      serviceId: serviceId,
    };

    getServiceFn({
      variables: variables,
    });
  }, [serviceId]);

  useEffect(() => {
    if (!getServiceFnHpr.called) return;
    if (!getServiceFnHpr.data) return;

    const service_ = getServiceFnHpr.data.findService;
    service_.questionnaire = JSON.parse(service_.questionnaire);
    service_.cover = getFileUrl(service_.cover);
    setService(service_);
  }, [getServiceFnHpr]);

  useEffect(() => {
    if (!updateServiceHpr.called) return;
    if (!updateServiceHpr.data) return;

    location.reload();
  }, [updateServiceHpr]);

  useEffect(() => {
    if (!createServiceHpr.called) return;
    if (!createServiceHpr.data) return;

    const service = createServiceHpr.data.createService;
    router.push({
      pathname: `/app/services/details`,
      query: { id: service.id },
    });
    setTimeout(() => {
      location.reload();
    }, 250);
  }, [createServiceHpr]);

  const updateService = async (data) => {
    if (data.questionnaire) {
      data.questionnaire = JSON.stringify(data.questionnaire);
    }
    const response = updateServiceFn({
      variables: {
        input: data,
        serviceId,
      },
    });
    return response;
  };

  const createService = (data) => {
    createServiceFn({
      variables: {
        input: { ...data, businessId: options.businessId },
      },
    });
  };

  const deleteService = async (serviceId) => {
    const response = await deleteServiceFn({
      variables: { input: { id: serviceId } },
    });
    return response;
  };

  return {
    service,
    updateService,
    createService,
    deleteService,
  };
};

export default useService;
