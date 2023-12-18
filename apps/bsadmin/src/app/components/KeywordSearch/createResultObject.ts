export const createResultObject = (searchParams) => {
  const resultObject = {};
  for (const [key, value] of searchParams.entries()) {
    resultObject[key] = value;
  }
  return resultObject;
};
