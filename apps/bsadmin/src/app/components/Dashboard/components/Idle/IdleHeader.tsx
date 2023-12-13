import React, { useEffect, useState } from "react";
import SectionHeader from "../SectionHeader";
import { useRecoilState } from "recoil";
import { idleDurationValueAtom } from "./idleAtom";
import { dashboardIdleData } from "../../../../data/inputDataLists";
import { SelectBox2 } from "cjbsDSTM";

const IdleHeader = () => {
  const [duration, setDuration] = useRecoilState(idleDurationValueAtom);

  const handleDuration = (event: { target: { value: any } }) => {
    const { value } = event.target;
    setDuration(value);
  };

  return (
    <SectionHeader>
      <SectionHeader.Title>유휴 거래처 (장기 미거래)</SectionHeader.Title>
      <SectionHeader.Action>
        <SelectBox2
          options={dashboardIdleData}
          value={duration}
          onChange={handleDuration}
        />
      </SectionHeader.Action>
    </SectionHeader>
  );
};

export default IdleHeader;
