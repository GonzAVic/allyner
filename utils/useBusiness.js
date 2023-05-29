const { useState, useEffect } = require("react");
import { useMutation, useLazyQuery } from "@apollo/client";

import {
  UPDATE_BUSINESS,
  FIND_BUSINESS,
  CREATE_BUSINESS,
  FIND_BUSINESS_SERVICES,
} from "graphql/apiql";

const useBusiness = (businessId) => {
  const [findBusinessFn, findBusinessHpr] = useLazyQuery(FIND_BUSINESS);
  const [findBusinessServicesFn] = useLazyQuery(FIND_BUSINESS_SERVICES);
  const [updateBusinessFn, updateBusinessHpr] = useMutation(UPDATE_BUSINESS);
  const [createBusinessFn] = useMutation(CREATE_BUSINESS);

  const [business, setBusiness] = useState(null);
  const [services, setServices] = useState([]);

  useEffect(() => {
    if (!businessId) return;
    findBusinessFn({ variables: { id: Number(businessId) } });
    getBusinessServices();
  }, [businessId]);

  useEffect(() => {
    if (!findBusinessHpr.called) return;
    if (!findBusinessHpr.data) return;

    const business_ = { ...findBusinessHpr.data.findBusiness };
    business_.additionalSettings =
      typeof business_.additionalSettings === "object"
        ? business_.additionalSettings
        : JSON.parse(business_.additionalSettings);
    setBusiness(business_);
  }, [findBusinessHpr]);

  useEffect(() => {
    if (!updateBusinessHpr.called) return;
    if (!updateBusinessHpr.data) return;

    setTimeout(() => {
      location.reload();
    }, 200);
  }, [updateBusinessHpr]);

  const getBusinessServices = async () => {
    const response = await findBusinessServicesFn({
      variables: { businessId: Number(businessId) },
    });

    if (response.data && response.data.businessServices) {
      setServices(response.data.businessServices);
    }
  };

  const updateBusiness = (data) => {
    updateBusinessFn({
      variables: {
        input: {
          attributes: { ...data, subDomain: "pedro" },
          id: Number(businessId),
        },
      },
    });
  };

  const createBusiness = async (data) => {
    const response = await createBusinessFn({
      variables: { input: { attributes: data } },
    });
    return response;
  };

  let businessSubdomain = business?.name || "";
  businessSubdomain = businessSubdomain.toLowerCase();

  return {
    business,
    services,
    businessSubdomain,

    updateBusiness,
    createBusiness,
    getBusinessServices,
  };
};

export default useBusiness;
