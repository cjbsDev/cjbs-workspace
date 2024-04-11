import React from "react";
import { useFormContext } from "react-hook-form";

const AnlsTypeMcVal = () => {
  const { getValues } = useFormContext();
  return <div>{getValues("anlsTypeMcVal")}</div>;
};

export default AnlsTypeMcVal;
