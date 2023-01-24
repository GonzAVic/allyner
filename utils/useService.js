import { useEffect, useState } from "react";
import { useMutation, useLazyQuery } from "@apollo/client";

import { FIND_SERVICE } from "graphql/apiql";

const useService = (serviceId) => {
  const [getServiceFn, getServiceFnHelper] = useLazyQuery(FIND_SERVICE);

  const [service, setService] = useState(null);

  useEffect(() => {
    if (!serviceId) return;

    getServiceFn({
      variables: {
        id: Number(serviceId),
      },
    });
  }, [serviceId]);

  useEffect(() => {
    if (!getServiceFnHelper.called) return;
    if (!getServiceFnHelper.data) return;

    setService(getServiceFnHelper.data.findService);
  }, [getServiceFnHelper]);

  return {
    service,
  };
};

export default useService;
