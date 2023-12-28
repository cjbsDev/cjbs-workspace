import React from "react";
import SectionHeader from "../SectionHeader";
// import AgncTopSelectbox from "./AgncTopSelectbox";
import dynamic from "next/dynamic";
import { ErrorContainer, Fallback, SkeletonLoading } from "cjbsDSTM";
import GroupBtnList from "./GroupBtnList";
import { Typography } from "@mui/material";
const LazyAgncTopSelectbox = dynamic(() => import("./AgncTopSelectbox"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

const Header = () => {
  return (
    <SectionHeader>
      <SectionHeader.Title>거래처</SectionHeader.Title>
      <SectionHeader.Action>
        {/*<GroupBtnList />*/}
        <ErrorContainer FallbackComponent={Fallback}>
          <LazyAgncTopSelectbox />
        </ErrorContainer>
      </SectionHeader.Action>
    </SectionHeader>
  );
};

export default Header;
