import React from "react";
import SectionHeader from "../SectionHeader";
// import AgncTopSelectbox from "./AgncTopSelectbox";
import dynamic from "next/dynamic";
import { ErrorContainer, Fallback, SkeletonLoading } from "cjbsDSTM";
import GroupBtnList from "./GroupBtnList";
const LazyAgncTopSelectbox = dynamic(() => import("./AgncTopSelectbox"), {
  ssr: false,
  loading: () => <SkeletonLoading height={300} />,
});
const LazyInstTopSelectbox = dynamic(() => import("./InstTopSelectbox"), {
  ssr: false,
  loading: () => <SkeletonLoading height={300} />,
});

const Header = () => {
  return (
    <SectionHeader>
      <SectionHeader.Title>항목 별 매출</SectionHeader.Title>
      <SectionHeader.Action>
        <GroupBtnList />
        <ErrorContainer FallbackComponent={Fallback}>
          <LazyAgncTopSelectbox />
        </ErrorContainer>
      </SectionHeader.Action>
    </SectionHeader>
  );
};

export default Header;
