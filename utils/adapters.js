export const serviceAdapter = (data) => {
  const serviceParsed = {};

  if (data.id !== undefined) serviceParsed.id = data.id;
  if (data.type !== undefined) {
    const typeUppercase = data.type.toUpperCase();
    serviceParsed.type = typeUppercase.replace(" ", "_");
  }
  if (data.sentence !== undefined) serviceParsed.sentence = data.sentence;
  if (data.description !== undefined)
    serviceParsed.description = data.description;
  if (data.options !== undefined) serviceParsed.options = data.options;
  if (data.isMultiple !== undefined) serviceParsed.isMultiple = data.isMultiple;
  if (data.isRequired !== undefined) serviceParsed.isRequired = data.isRequired;

  serviceParsed.isDescriptionActive = data.isDescriptionActive;

  return serviceParsed;
};

export const questionAdapter = (data = {}, isSimple = false) => {
  let question = {
    title: data.title || "",
    type: data.type || "SHORT_TEXT",
    isRequired: data.isRequired || false,
  };

  if (isSimple) return question;

  question = {
    ...question,
    options: data.options || [],
    description: data.description || "",
    selectionType: data.selectionType || "SINGLE",
    isDescriptionActive: data.isDescriptionActive || false,
  };

  return question;
};

export const serviceReqAdapter = (order) => {
  const order_ = { ...order };
  order_.frozenService = JSON.parse(order_.frozenService);
  const frozenServiceCreatedAt = new Date(
    Number(order_.frozenService.createdAt)
  );
  order_.frozenService.createdAt = `${frozenServiceCreatedAt.getDate()}/${frozenServiceCreatedAt.getMonth()}/${frozenServiceCreatedAt.getFullYear()}`;
  const frozenServiceUpdatedAt = new Date(
    Number(order_.frozenService.updatedAt)
  );
  order_.frozenService.updatedAt = `${frozenServiceUpdatedAt.getDate()}/${frozenServiceUpdatedAt.getMonth()}/${frozenServiceUpdatedAt.getFullYear()}`;
  order_.answers = JSON.parse(order_.answers);

  const orderCreatedAt = new Date(Number(order_.createdAt));
  order_.createdAt = `${orderCreatedAt.getDate()}/${orderCreatedAt.getMonth()}/${orderCreatedAt.getFullYear()}`;

  order_.additionalInfo = JSON.parse(order_.additionalInfo);
  return order_;
};
