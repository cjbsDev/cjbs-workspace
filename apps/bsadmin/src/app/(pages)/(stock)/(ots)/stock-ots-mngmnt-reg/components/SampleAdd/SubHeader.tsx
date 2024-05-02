import React from "react";
import { Stack, Grid, Link } from "@mui/material";
import { DataCountResultInfo, DeletedButton, OutlinedButton } from "cjbsDSTM";
import { SubHeaderProps } from "../../../../types/subHeader-props";
import { useFormContext } from "react-hook-form";
import { useRecoilState } from "recoil";
import {
  sampleAddAtom,
  sampleAddDataAtom,
  toggleClearedAtom,
} from "./sampleAddAtom";

const SubHeader = ({ totalElements, openPopup }: SubHeaderProps) => {
  const [smpAdd, setSmpAdd] = useRecoilState(sampleAddAtom);
  const [sampleData, setSampleData] = useRecoilState(sampleAddDataAtom);
  const [toggleCleared, setToggleCleared] = useRecoilState(toggleClearedAtom);
  const { getValues, watch, setValue } = useFormContext();
  const sampleUkeyList = getValues("sampleUkeyList");

  const handleDelete = async () => {
    console.log("sampleUkeyList ==>>", sampleUkeyList);
    console.log("selected Ukey List ==>>", smpAdd);
    const filteredArray = sampleUkeyList.filter(
      (item) => !smpAdd.includes(item),
    );
    console.log("filteredArray ==>>", filteredArray);

    setSampleData(filteredArray.toString());
    setValue("sampleUkeyList", filteredArray);
    setToggleCleared(!toggleCleared);
    setSmpAdd([]);
  };

  return (
    <Grid container>
      <Grid item xs={12} sx={{ pt: 0 }}>
        {/*{JSON.stringify(smpAdd)}*/}
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" spacing={1.5} alignItems="center">
            <DataCountResultInfo totalCount={totalElements} />
            <OutlinedButton
              buttonName="샘플 추가"
              size="small"
              onClick={openPopup}
            />
            <DeletedButton buttonName="삭제" onClick={handleDelete} />
          </Stack>

          <Stack
            direction="row"
            spacing={1}
            sx={{ mb: 1.5 }}
            alignItems="center"
          ></Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default SubHeader;
