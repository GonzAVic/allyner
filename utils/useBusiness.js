const { useState, useEffect } = require("react");
import { useMutation, useLazyQuery } from "@apollo/client";

import { UPDATE_BUSINESS, FIND_BUSINESS } from "graphql/apiql";

const BUSINESS_ID = 1;

const useBusiness = (businessId) => {
  const [findBusinessFn, findBusinessHpr] = useLazyQuery(FIND_BUSINESS);
  const [updateBusinessFn, updateBusinessHpr] = useMutation(UPDATE_BUSINESS);

  const [business, setBusiness] = useState(null);

  useEffect(() => {
    findBusinessFn({ variables: { id: BUSINESS_ID } });
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
      variables: { input: { attributes: data, id: BUSINESS_ID } },
    });
  };

  return { business, updateBusiness };
};

export default useBusiness;
