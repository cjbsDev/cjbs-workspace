import React from "react";
import { ContainedButton } from "cjbsDSTM";

interface PeriodBtnProps {
  name: string;
  value: string;
}

const PeriodBtn = (props: PeriodBtnProps) => {
  const { name, value } = props;
  return (
    <ContainedButton
      buttonName={name}
      size="small"
      sx={{
        p: 0,
        backgroundColor: "white",
        height: 30,
        color: "black",
      }}
      onClick={() => console.log("PERIOD VALUE", value)}
    />
  );
};

export default PeriodBtn;
