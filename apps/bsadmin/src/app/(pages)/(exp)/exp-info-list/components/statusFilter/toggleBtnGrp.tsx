import React, { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import { ToggleButtonGroup } from "@mui/material";
import { usePathname } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import useStatusTypeList from "../../../../../hooks/useStatusTypeList";
import { styled } from "@mui/material/styles";

interface StatusType {
  value: string;
  optionName: string;
}

const ToggleBtnGrp = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [alignment, setAlignment] = useState<string | null>(null);
  const { data } = useStatusTypeList("order", "status");
  // const { data } = useSWR(
  //   `/code/list/shortly/value?topValue=order&midValue=status`,
  //   fetcher,
  //   {
  //     suspense: true,
  //   },
  // );
  // console.log("TYTTTYTYTT", data);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    if (newAlignment !== null) {
      router.push(`${pathname}?page=1&size=15&orderStatusCc=${newAlignment}`);
      setAlignment(newAlignment);
    } else {
      router.push(pathname); // `newAlignment`이 `null`일 때의 경로 처리
      setAlignment(null);
    }
  };

  return (
    <StyledToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      {data.map((item: StatusType) => {
        const { value, optionName } = item;
        return (
          <ToggleButton key={value} value={value}>
            {optionName}
          </ToggleButton>
        );
      })}
    </StyledToggleButtonGroup>
  );
};

export default ToggleBtnGrp;

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    border: `1px solid ${theme.palette.grey["400"]}`,
    padding: "0 6px",
    backgroundColor: "white",
    "&.Mui-disabled": {
      border: 0,
    },
    "&.Mui-selected, &.Mui-selected:hover": {
      backgroundColor: "#000000",
      color: "white",
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
      borderLeft: `1px solid ${theme.palette.grey["400"]}`,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));
