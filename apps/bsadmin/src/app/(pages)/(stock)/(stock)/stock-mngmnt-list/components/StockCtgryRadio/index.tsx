import React from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import { Title1 } from "cjbsDSTM";
import { useRecoilState } from "recoil";
import { stockCategoryAtom } from "../../atom";

const Index = () => {
  // const [value, setValue] = React.useState("BS_3005001");
  const [value, setValue] = useRecoilState(stockCategoryAtom);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log((event.target as HTMLInputElement).value);
    setValue((event.target as HTMLInputElement).value);
  };
  return (
    <Stack direction="row" spacing={3}>
      <Title1 titleName="재고 관리" />
      <FormControl>
        {/*<FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>*/}
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
          row
        >
          <FormControlLabel
            value="BS_3005001"
            control={<Radio />}
            label="Main"
          />
          <FormControlLabel
            value="BS_3005002"
            control={<Radio />}
            label="소모품"
          />
        </RadioGroup>
      </FormControl>
    </Stack>
  );
};

export default Index;
