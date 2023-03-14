import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";

import { FIND_SERVICE, LIST_QUESTIONS } from "graphql/apiql";

const useService = (serviceId, options = {}) => {
  const [getServiceFn, getServiceFnHpr] = useLazyQuery(FIND_SERVICE);
  const [listQuestionsFn, listQuestionsHpr] = useLazyQuery(LIST_QUESTIONS);

  const [service, setService] = useState(null);
  const [serviceQuestions, setServiceQuestions] = useState(null);

  useEffect(() => {
    if (!serviceId) return;

    getServiceFn({
      variables: {
        id: Number(serviceId),
      },
    });
  }, [serviceId]);

  useEffect(() => {
    if (!getServiceFnHpr.called) return;
    if (!getServiceFnHpr.data) return;

    setService(getServiceFnHpr.data.findService);
  }, [getServiceFnHpr]);

  // SERVICE QUESTIONS
  useEffect(() => {
    if (options.fetchQuestions) listQuestionsFn({ variables: { serviceId } });
  }, [options.fetchQuestions]);

  useEffect(() => {
    if (!listQuestionsHpr.called) return;
    if (!listQuestionsHpr.data) return;
  }, [listQuestionsHpr]);

  return {
    service,
  };
};

export default useService;
