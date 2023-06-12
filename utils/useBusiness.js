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
  const [updateBusinessFn, updateBusinessHpr] = useMutation(UPDATE_BUSINESS);
  const [createBusinessFn] = useMutation(CREATE_BUSINESS);

  const [business, setBusiness] = useState(null);
  const [services, setServices] = useState([]);

  useEffect(() => {
    if (!businessId) return;
    findBusinessFn({ variables: { businessId } });
  }, [businessId]);

  useEffect(() => {
    if (!findBusinessHpr.called) return;
    if (!findBusinessHpr.data) return;

    const business_ = { ...findBusinessHpr.data.findBusiness };
    business_.additionalData =
      typeof business_.additionalData === "object"
        ? business_.additionalData
        : JSON.parse(business_.additionalData);
    setBusiness(business_);
    setServices(business_.services);
  }, [findBusinessHpr]);

  useEffect(() => {
    if (!updateBusinessHpr.called) return;
    if (!updateBusinessHpr.data) return;

    setTimeout(() => {
      location.reload();
    }, 200);
  }, [updateBusinessHpr]);

  const updateBusiness = (data) => {
    updateBusinessFn({
      variables: {
        input: data,
        businessId,
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
  };
};

export default useBusiness;
