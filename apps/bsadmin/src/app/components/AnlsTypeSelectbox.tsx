import React, { useEffect } from "react";
import { fetcher } from "api";
import useSWR from "swr";
import { SelectBox } from "cjbsDSTM";
import { useFormContext, useWatch } from "react-hook-form";

interface InputNameProps {
  inputName: string;
}

const AnlsTypeSelectbox = ({ inputName }: InputNameProps) => {
  const { control, setValue } = useFormContext();
  // const useWatchTest = useWatch({
  //   control,
  //   name: "detailList", // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
  //   // defaultValue: "default", // default value before the render
  // });
  //
  // console.log("USE WatchTest ==>>", useWatchTest);

  const { data } = useSWR(
    `/code/list/shortly/value?topValue=Analaysis Type&midValue=`,
    fetcher,
    {
      suspense: true,
    },
  );
  console.log("AnlsType List", data);
  // const serviceCategoryTypeData = data;

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
