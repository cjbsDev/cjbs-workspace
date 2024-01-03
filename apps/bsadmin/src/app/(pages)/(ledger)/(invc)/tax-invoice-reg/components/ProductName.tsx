import React from "react";
import useSWR from "swr";
import { fetcher } from "api";
import { useWatch } from "react-hook-form";
import { InputValidation } from "cjbsDSTM";
import { Typography } from "@mui/material";

interface InputNameProps {
  inputName: string;
  fieldName: string;
  control: any;
  index: number;
}

const ProductName = ({
  inputName,
  fieldName,
  control,
  index,
}: InputNameProps) => {
  const productValue = useWatch({
    name: fieldName,
    control,
  });

  console.log("Product Vaule ==>>", productValue);

  const anlsTypeMc = productValue[index].anlsTypeMc;

  console.log("AnlsTypeMc Vaule ==>>", anlsTypeMc);

  const { data } = useSWR(
    anlsTypeMc !== "" ? `/mngr/esPrMng/anlsType/${anlsTypeMc}` : null,
    fetcher,
    {
      suspense: true,
    },
  );

  return (
    <>
      {anlsTypeMc !== "" ? (
        <>
          <Typography variant="body2">{data}</Typography>
          <InputValidation
            sx={{ display: "none" }}
            inputName={inputName}
            required={true}
            errorMessage="품명을 입력하세요."
            disabled={true}
          />
        </>
      ) : (
        <InputValidation
          inputName={inputName}
          required={true}
          errorMessage="품명을 입력하세요."
        />
      )}
    </>
  );
};

export default ProductName;
