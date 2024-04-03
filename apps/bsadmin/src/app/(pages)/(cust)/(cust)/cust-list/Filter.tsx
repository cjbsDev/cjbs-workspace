import React from 'react';
import {Stack, Typography, Checkbox, FormControlLabel} from "@mui/material";
import {useRouter} from "next-nprogress-bar";
import {usePathname} from "next/navigation";

const Filter = () => {
  const router = useRouter()
  const pathname = usePathname();
  const [checked, setChecked] = React.useState(false);

  console.log("CCCCCCCC", pathname)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("event.target.checked", event.target.checked)
    const {checked} = event.target
    if (checked) {
      router.push(`${pathname}?isAgncIncl=${checked ? "Y" : "N"}`)
    } else {
      router.push(`${pathname}`)
    }

    setChecked(checked);
  };

  return (
    <Stack direction="row" alignItems="center">
      <FormControlLabel
        label="소속 거래처(PI)가 없는 고객만 보기"
        control={
          <Checkbox
            checked={checked}
            size="small"
            onChange={handleChange}
          />
        }
      />
    </Stack>
  );
};

export default Filter;