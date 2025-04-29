const VALID_TYPES = ["text", "number", "select", "switch", "slider"];

export const checkValidInputType = (type: string) => {
  return VALID_TYPES.includes(type);
};
