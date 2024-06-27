import React, { useEffect } from "react";
import { fetcher } from "api";
import useSWR from "swr";
import { SelectBox } from "cjbsDSTM";
import { useFormContext, useWatch } from "react-hook-form";

interface InputNameProps {
  inputName: string;
  inputName2: string;
  disabled: boolean;
}

const AnlsTypeSelectbox = ({
  inputName,
  inputName2,
  disabled,
}: InputNameProps) => {
  const { watch } = useFormContext();

  const srvcCategory = watch(inputName2);
  console.log(">>>NNNNNN>>>>", srvcCategory);

  // /code/list/shortly/value?topValue=Analaysis Type&midValue=none

  const { data } = useSWR(
    srvcCategory === "BS_0100005001"
      ? `/code/list/shortly/value?topValue=Analaysis Type&midValue=none`
      : `/mngr/license/srvcType/BS_0100005002/all`,
    fetcher,
    {
      suspense: true,
    },
  );

  return (
    <SelectBox
      inputName={inputName}
      options={data}
      required={true}
      errorMessage="Ssssss"
      sx={{ width: "100%" }}
      disabled={disabled}
    />
  );
};

export default AnlsTypeSelectbox;
