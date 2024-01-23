import React, { useEffect } from "react";
import { fetcher } from "api";
import useSWR from "swr";
import { SelectBox } from "cjbsDSTM";

interface InputNameProps {
  inputName: string;
}

const AnlsTypeSelectbox = ({ inputName }: InputNameProps) => {
  const { data } = useSWR(
    `/code/list/shortly/value?topValue=Analaysis Type&midValue=`,
    fetcher,
    {
      suspense: true,
    }
  );

  return (
    <SelectBox
      inputName={inputName}
      options={data}
      required={true}
      errorMessage="Ssssss"
      sx={{ width: "100%" }}
    />
  );
};

export default AnlsTypeSelectbox;
