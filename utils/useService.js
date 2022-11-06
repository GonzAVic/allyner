import { useEffect, useState } from "react";
import { useMutation, useLazyQuery } from "@apollo/client";

import { GET_SERVICE } from "graphql/apiql";

const useService = (serviceId) => {
  const [getServiceFn, getServiceFnHelper] = useLazyQuery(GET_SERVICE);

  const [service, setService] = useState(null);

  useEffect(() => {
    if (!serviceId) return;

    getServiceFn({
      variables: {
        serviceId: serviceId,
      },
    });
  }, [serviceId]);

  useEffect(() => {
    if (!getServiceFnHelper.called) return;
    if (!getServiceFnHelper.data) return;

    setService(getServiceFnHelper.data.getService);
  }, [getServiceFnHelper]);

  return {
    service,
  };
};

export default useService;
