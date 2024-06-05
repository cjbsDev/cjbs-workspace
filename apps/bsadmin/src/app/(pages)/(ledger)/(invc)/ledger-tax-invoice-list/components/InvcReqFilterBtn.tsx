import React, { useEffect } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import { Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next-nprogress-bar";
import { usePathname } from "next/navigation";
import { useRecoilState } from "recoil";
import { isBillAndRequestAtom } from "../atom";

const InvcReqFilterBtn = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [selected, setSelected] = React.useState(false);
  const [isBillAndRequest, setIsBillAndRequest] =
    useRecoilState(isBillAndRequestAtom);

  useEffect(() => {
    if (selected) {
      router.push(`${pathname}?page=1&size=15&isBillAndRequest=true`);
    } else {
      router.push(`${pathname}`);
    }
  }, [selected]);

  const handleOnChange = () => {};

  return (
    <Stack direction="row" spacing={1} alignItems="center" sx={{ pr: 3 }}>
      <Typography variant="body2">퀵 필터</Typography>
      <SmallToggleBtn
        size="small"
        color="primary"
        value="check"
        selected={selected}
        onChange={() => {
          setSelected(!selected);
          setIsBillAndRequest(!isBillAndRequest);
        }}
      >
        <Typography variant="body2">계산서 요청</Typography>
      </SmallToggleBtn>
    </Stack>
  );
};

export default InvcReqFilterBtn;

const SmallToggleBtn = styled(ToggleButton)(({ theme }) => ({
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
  "&.Mui-selected:hover": {
    backgroundColor: theme.palette.primary.main,
  },
  "&.MuiToggleButton-sizeSmall": {
    padding: "2px 8px",
  },
}));
