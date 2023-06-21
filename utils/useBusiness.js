const { useState, useEffect } = require("react");
import { useMutation, useLazyQuery } from "@apollo/client";

import {
  UPDATE_BUSINESS,
  FIND_BUSINESS,
  CREATE_BUSINESS,
  FIND_BUSINESS_BY_NAME,
  FIND_BUSINESS_CUSTOMERS,
} from "graphql/apiql";

const useBusiness = (businessID, options = {}) => {
  const [findBusinessFn, findBusinessHpr] = useLazyQuery(FIND_BUSINESS);
  const [findBusinessBySubdomainFn] = useLazyQuery(FIND_BUSINESS_BY_NAME);
  const [findBusinessCustomersFn] = useLazyQuery(FIND_BUSINESS_CUSTOMERS);
  const [updateBusinessFn, updateBusinessHpr] = useMutation(UPDATE_BUSINESS);
  const [createBusinessFn] = useMutation(CREATE_BUSINESS);

  const [businessId, setBusinessId] = useState(null);
  const [business, setBusiness] = useState(null);
  const [services, setServices] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    if (!businessID) return;
    setBusinessId(businessID);
  }, [businessID]);

  useEffect(() => {
    if (!businessId) return;
    findBusinessFn({ variables: { businessId } });
  }, [businessId]);

  useEffect(() => {
    if (options.useBusinessName) {
      findBusinessBySubdomain();
    }
  }, [options.useBusinessName]);

  useEffect(() => {
    if (!findBusinessHpr.called) return;
    if (!findBusinessHpr.data) return;
    console.log("-> findBusinessHpr.data: ", findBusinessHpr.data);
    if (!findBusinessHpr.data.findBusiness) return;
    if (Object.keys(findBusinessHpr.data.findBusiness).length === 0) return;

    const business_ = { ...findBusinessHpr.data.findBusiness };
    business_.additionalData = JSON.parse(business_.additionalData);
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

  const findBusinessBySubdomain = async (businessName) => {
    const response = await findBusinessBySubdomainFn({
      variables: { businessSubdomain: window.location.host.split(".")[0] },
    });
    setBusinessId(response.data.findBusinessBySubdomain.id);
  };

  const findBusinessCustomers = async (businessName) => {
    const response = await findBusinessCustomersFn({
      variables: { businessId },
    });
    return response.data.findBusinessCustomers;
  };

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

  return {
    business,
    services,
    findBusinessBySubdomain,
    findBusinessCustomers,

    updateBusiness,
    createBusiness,
  };
};

export default useBusiness;
