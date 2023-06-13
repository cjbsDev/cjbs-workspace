export const isNull = (value: string | undefined | null) => {
  if (value === undefined || value === null) {
    return true;
  } else return false;
};
