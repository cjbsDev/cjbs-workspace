import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { formatNumberWithCommas } from "cjbsDSTM";
import DisplayMoney from "../../../../../components/DisplayMoney";

const RmnPrePymPrice = () => {
  const { control, setValue, getValues, watch } = useFormContext();

  const getRmnPrePymtPrice = getValues("rmnPrePymtPrice");

  // useEffect(() => {
  //   setValue("", )
  // }, [setValue]);

  return <DisplayMoney price={getRmnPrePymtPrice} />;
};

export default RmnPrePymPrice;
