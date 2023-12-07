export const transformedNullToHyphon = (resData) => {
  const transformedData = Object.keys(resData).reduce((result: any, key) => {
    result[key] = resData[key] !== null ? resData[key] : "-";
    return result;
  }, {});
  return transformedData;
};
