import React, {useEffect} from "react";
import { useFormContext, useWatch } from "react-hook-form";
import {cjbsTheme, ErrorContainer, Fallback, InputEAType, InputPriceType, InputValidation} from "cjbsDSTM";
import {Stack, Typography} from "@mui/material";
import dynamic from "next/dynamic";
import LicenseDscntRasnDetail from "./LicenseDscntRasnDetail";

const LazyPrepSelectbox = dynamic(
  () => import("../../../../../../components/OrderSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  }
);

const LicenseDscntRasnCc = (props:any) => {

  const { index, errors } = props;
  const { control } = useFormContext();
  const sampleValue = useWatch({
    name: "sample",
    control,
  });

  const dscntRasnCc = sampleValue[index].dscntRasnCc
  // console.log("dscntRasnCc", dscntRasnCc);

  return (
    <Stack direction="row" alignItems="center" spacing={1} sx={{ width : '100%' }}>
      <ErrorContainer FallbackComponent={Fallback}>
        <LazyPrepSelectbox
          url={"/code/list/shortly/value?topValue=anls itst&midValue=reason"}
          inputName={`sample.[${index}].dscntRasnCc`}
          required={false}
          fullWidth={true}
          sx={{
            width : dscntRasnCc === 'BS_1813004' ? '120px' : '100%',
          }}
        />
      </ErrorContainer>
      {errors.sample?.[index]?.dscntRasnCc && <Typography variant="body2" color={cjbsTheme.palette.error.main}>값을 선택해 주세요.</Typography>}

      <LicenseDscntRasnDetail index={index}/>
    </Stack>
  );
};

export default LicenseDscntRasnCc;
