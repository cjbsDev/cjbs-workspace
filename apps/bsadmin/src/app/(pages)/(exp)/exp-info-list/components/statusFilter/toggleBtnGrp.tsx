import React, { useEffect, useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import { ToggleButtonGroup } from "@mui/material";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import useStatusTypeList from "../../../../../hooks/useStatusTypeList";
import { styled } from "@mui/material/styles";
import { useResultObject } from "../../../../../components/KeywordSearch/useResultObject";

interface StatusType {
  value: string;
  optionName: string;
}
interface ResultObject {
  orderStatusCc: string | null;
}

const ToggleBtnGrp = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<string | null>(null);
  const [resultObject] = useResultObject() as [ResultObject, unknown];
  console.log("Status resultObject", resultObject);
  const { orderStatusCc } = resultObject;

  useEffect(() => {
    setStatus(orderStatusCc);
  }, []);

  const { data } = useStatusTypeList("order", "status");
  console.log(">>>>>>>>>>>>>", data);

  const valuesToDelete = ["BS_0802001"];

  const filteredStatusTypeListData = data.filter(
    (item) => !valuesToDelete.includes(item.value),
  );

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newStatus: string | null,
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    // console.log("PARAMS", params);

    if (newStatus !== null) {
      params.append("orderStatusCc", newStatus);
      // router.push(`${pathname}?page=1&size=15&orderStatusCc=${newStatus}`);
      router.push(`${pathname}?${params.toString()}`);
      setStatus(newStatus);
    } else {
      params.delete("orderStatusCc");
      // router.push(pathname); // `newStatus`이 `null`일 때의 경로 처리
      router.push(`${pathname}?${params.toString()}`);
      setStatus(null);
    }
    console.log("Append QueryString ==>>", params.toString());
  };

  return (
    <StyledToggleButtonGroup
      color="primary"
      value={status}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      {filteredStatusTypeListData.map((item: StatusType) => {
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
