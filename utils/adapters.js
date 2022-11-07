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
  if (data.isRequired !== undefined) serviceParsed.isMultiple = data.isMultiple;
  if (data.isRequired !== undefined) serviceParsed.isRequired = data.isRequired;

  return serviceParsed;
};
