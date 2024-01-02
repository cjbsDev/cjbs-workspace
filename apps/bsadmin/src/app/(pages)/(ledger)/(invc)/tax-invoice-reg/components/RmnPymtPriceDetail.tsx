import React from "react";
import useSWR from "swr";
import { fetcher } from "api";
import { useFormContext } from "react-hook-form";
import { InputValidation } from "cjbsDSTM";
import { Typography } from "@mui/material";

const RmnPymtPriceDetail = () => {
  const { getValues } = useFormContext();
  const agncUkey = getValues("agncUkey");
  console.log("AGNCUKEY ==>>", typeof agncUkey);
  const { data } = useSWR(
    () =>
      agncUkey !== "" || undefined
        ? `/invc/list/rmn/pymt/price/${agncUkey}`
        : null,
    fetcher,
    {
      suspense: true,
    },
  );

  console.log("Rmn Payment Price Detail ==>>", data);

  return (
    <>
      {JSON.stringify(data.rmnPymtPriceListDetailList[0])}
      {/*<Typography>sdfsdfsdfsdf</Typography>*/}
    </>
  );
};

export default RmnPymtPriceDetail;
