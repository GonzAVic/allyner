const { useState, useEffect } = require("react");
import { useMutation, useLazyQuery } from "@apollo/client";

import { UPDATE_BUSINESS, FIND_BUSINESS, CREATE_BUSINESS } from "graphql/apiql";

const BUSINESS_ID = 2;

const useBusiness = (businessId) => {
  const [findBusinessFn, findBusinessHpr] = useLazyQuery(FIND_BUSINESS);
  const [updateBusinessFn, updateBusinessHpr] = useMutation(UPDATE_BUSINESS);
  const [createBusinessFn, createBusinessHpr] = useMutation(CREATE_BUSINESS);

  const [business, setBusiness] = useState(null);

  useEffect(() => {
    findBusinessFn({ variables: { id: Number(BUSINESS_ID) } });
  }, []);

  useEffect(() => {
    if (!findBusinessHpr.called) return;
    if (!findBusinessHpr.data) return;

    const business_ = { ...findBusinessHpr.data.findBusiness };
    business_.additionalSettings = JSON.parse(business_.additionalSettings);
    setBusiness(business_);
  }, [findBusinessHpr]);

  const updateBusiness = (data) => {
    updateBusinessFn({
      variables: { input: { attributes: data, id: Number(BUSINESS_ID) } },
    });
  };

  const createBusiness = async (data) => {
    const response = await createBusinessFn({
      variables: { input: { attributes: { ...data, description: "lalala" } } },
    });
    return response;
  };

  let businessSubdomain = business?.name || "";
  businessSubdomain = businessSubdomain.toLowerCase();

  return { business, updateBusiness, businessSubdomain, createBusiness };
};

export default useBusiness;
