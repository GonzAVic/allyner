const { useState, useEffect } = require("react");
import { useMutation, useLazyQuery } from "@apollo/client";

import {
  UPDATE_BUSINESS,
  FIND_BUSINESS,
  CREATE_BUSINESS,
  FIND_BUSINESS_SERVICES,
} from "graphql/apiql";

const BUSINESS_ID = 2;

const useBusiness = (businessId) => {
  const [findBusinessFn, findBusinessHpr] = useLazyQuery(FIND_BUSINESS);
  const [findBusinessServicesFn] = useLazyQuery(FIND_BUSINESS_SERVICES);
  const [updateBusinessFn, updateBusinessHpr] = useMutation(UPDATE_BUSINESS);
  const [createBusinessFn, createBusinessHpr] = useMutation(CREATE_BUSINESS);

  const [business, setBusiness] = useState(null);
  const [services, setServices] = useState([]);

  useEffect(() => {
    findBusinessFn({ variables: { id: Number(BUSINESS_ID) } });
    getBusinessServices();
  }, []);

  useEffect(() => {
    if (!findBusinessHpr.called) return;
    if (!findBusinessHpr.data) return;

    const business_ = { ...findBusinessHpr.data.findBusiness };
    business_.additionalSettings = JSON.parse(business_.additionalSettings);
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
      variables: { businessId: Number(BUSINESS_ID) },
    });

    if (response.data && response.data.businessServices) {
      setServices(response.data.businessServices);
    }
  };

  const updateBusiness = (data) => {
    updateBusinessFn({
      variables: { input: { attributes: data, id: Number(BUSINESS_ID) } },
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
